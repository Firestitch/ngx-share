import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Observable, Subject, of } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { Share } from '../../classes/share';
import { Platforms } from '../../consts/platforms.const';
import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { createShare } from '../../helpers/create-share';
import { ShareConfig } from '../../interfaces/share-config.interface';
import { ShareEvent } from '../../interfaces/share-event.interface';


@Component({
  selector: 'fs-share',
  templateUrl: './share.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsShareComponent implements OnDestroy, OnInit {

  @Input() public platform: Platform;
  @Input() public description = '';
  @Input() public title = '';
  @Input() public url = '';
  @Input() public image = '';
  @Input() public href = '';
  @Input() public beforeOpen: (shareEvent: ShareEvent) => Observable<void|{ url: string }>;
  @Input() public afterOpen: (event: { platform: Platform }) => Observable<any>;

  public platformNames = {};
  public show = true;
  public safeHref: SafeUrl;

  private _destory$ = new Subject();
  private _share: Share;

  constructor(
    private _sanitizer: DomSanitizer,
  ) {
    this.platformNames = Platforms.reduce((result, value) => {
      result[value.value] = value.name;

      return result;
    }, {});
  }

  public click(mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();

    of(true)
      .pipe(
        switchMap(() => {
          return this.beforeOpen ? this.beforeOpen({ platform: this.platform }) : of(null);
        }),
        tap((event) => {
          const url = (event as any)?.url || this._share.config.url;

          if (this.platform === Platform.Copy) {
            navigator.clipboard.writeText(url);
  
          } else if (this._share.getMethod() === Method.Dialog) {
            this._dialog(url);
          } else if (this._share.getMethod() === Method.Href) {
            location.href = this.href;
          }
        }),
        switchMap(() => {
          return this.afterOpen ? this.afterOpen({ 
            platform: this.platform, 
          }) : of(null);
        }),
        takeUntil(this._destory$),
      )
      .subscribe();
  }

  public ngOnInit() {
    const config: ShareConfig = {
      url: this.url,
      description: this.description,
      title: this.title,
      image: this.image,
    };

    this._share = createShare(this.platform, config);

    if (this._share.getMethod() === Method.Href && !this.href) {
      this.href = this._share.createUrl().toString();
    }

    if (this.href) {
      this.safeHref = this._sanitizer.bypassSecurityTrustUrl(this.href);
    } else {
      this.href = 'javascript:;';
    }    
  }

  public ngOnDestroy() {
    this._destory$.next(null);
    this._destory$.complete();
  }

  private _metaRefresh() {
    const newWindow = window.open('', 'Share', 'width=1,height=1');
    const url = this._share.createUrl().toString();
    const html = `
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=${  url  }">
      </head>
      <body></body>
      <script>setTimeout(function() { window.close() }, 1000);</script>
    </html>`;

    newWindow.document.open();
    newWindow.document.write(html);
    newWindow.document.close();

    setTimeout(() => {
      if (newWindow) {
        newWindow.close();
      }
    }, 500);
  }

  private _dialog(url: string) {
    this._share.open(url)
      .pipe(
        takeUntil(this._destory$),
      )
      .subscribe();
  }
}
