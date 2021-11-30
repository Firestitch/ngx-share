import { Input, OnDestroy, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Subject, Observable, of } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { ClipboardService } from 'ngx-clipboard';

import { FsShareService } from '../../services/share.service';
import { Platform } from '../../enums/platform.emun';
import { Platforms } from '../../consts/platforms.const';
import { ShareConfig } from '../../interfaces';
import { Share } from '../../classes/share';
import { Method } from '../../enums/method.enum';
import { ShareEvent } from '../../interfaces/share-event.interface';


@Component({
  selector: 'fs-share',
  templateUrl: './share.component.html',
})
export class FsShareComponent implements OnDestroy, OnInit {

  @Input() platform: Platform;
  @Input() description = '';
  @Input() title = '';
  @Input() url = '';
  @Input() image = '';
  @Input() href = '';
  @Input() beforeOpen: (shareEvent: ShareEvent) => Observable<any> | any;
  @Input() open: (shareEvent: ShareEvent) => Observable<any> | any;

  public platformNames = {};
  public show = true;
  public safeHref: SafeUrl;

  private _destory$ = new Subject();
  private _share: Share;

  constructor(
    private _shareService: FsShareService,
    private _sanitizer: DomSanitizer,
    private _clipboardService: ClipboardService,
  ) {
    this.platformNames = Platforms.reduce((result, value) => {
      result[value.value] = value.name;

      return result;
    }, {});
  }

  public click(event: KeyboardEvent) {
    event.preventDefault();

    of(true)
    .pipe(
      switchMap(() => {
        const result = this.beforeOpen ? this.beforeOpen({ platform: this.platform }) : true;
        return result instanceof Observable ? result : of(true);
      }),
      switchMap(() => {
        const result = this.open ? this.open({ platform: this.platform }) : true;
        return result instanceof Observable ? result : of(true); 
      }),
      takeUntil(this._destory$),
    )
    .subscribe(() => {
      if (this.platform === Platform.Copy) {
        this._clipboardService.copyFromContent(this._share.config.url);

      } else if (this._share.getMethod() === Method.MetaRefesh) {
        this._metaRefresh();

      } else if (this._share.getMethod() === Method.Dialog) {
        this._dialog();
      } else if (this._share.getMethod() === Method.Href) {
        location.href = this.href;
      }
    });
  }

  private _metaRefresh() {
    const newWindow = window.open('', 'Share', 'width=1,height=1')
    const url = this._share.createUrl().toString();
    const html = `
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=` + url + `">
      </head>
      <body></body>
      <script>setTimeout(function() { window.close() }, 1000);</script>
    </html>`

    newWindow.document.open();
    newWindow.document.write(html)
    newWindow.document.close();

    setTimeout(() => {
      if (newWindow) {
        newWindow.close();
      }
    }, 500);
  }

  public ngOnInit() {
    const config: ShareConfig = {
      url: this.url,
      description: this.description,
      title: this.title,
      image: this.image
    }

    this._share = this._shareService.createShare(this.platform, config);

    if (this._share.getMethod() === Method.Href && !this.href) {
      this.href = this._share.createUrl().toString();
    }

    if (this.href) {
      this.safeHref = this._sanitizer.bypassSecurityTrustUrl(this.href);
    } else {
      this.href = 'javascript:;';
    }    
  }

  private _dialog() {
    this._share.open()
    .pipe(
      takeUntil(this._destory$)
    )
    .subscribe(response => {
      // if (this.config.success) {
      //   this.config.success({ platform: this.platform });
      // }
    },
    (error) => {
      // if (this.config.error) {
      //   this.config.error({ platform: this.platform, error: error });
      // }
    });
  }

  ngOnDestroy() {
    this._destory$.next();
    this._destory$.complete();
  }
}
