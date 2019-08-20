import { Input, HostListener, OnDestroy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FsShareService } from '../../services/share.service';
import { Platform } from '../../enums/platform.emun';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Platforms } from '../../consts/platforms.const';
import { transform } from 'lodash-es';
import { ShareConfig } from '../../interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { Share } from '../../classes/share';
import { Method } from '../../enums/method.enum';
import { ClipboardService } from 'ngx-clipboard';
import { ShareEvent } from '../../interfaces/share-event.interface';


@Component({
  selector: 'fs-share',
  templateUrl: './share.component.html'
})
export class FsShareComponent implements OnDestroy, OnInit {

  @Input() platform: Platform;
  @Input() description = '';
  @Input() title = '';
  @Input() url = '';

  @Output() open = new EventEmitter<ShareEvent>();

  public platformNames = [];
  public href;
  public show = true;
  private _destory$ = new Subject();
  private _share: Share;

  constructor(
    private _shareService: FsShareService,
    private _sanitizer: DomSanitizer,
    private _clipboardService: ClipboardService,
  ) {
    this.platformNames = transform(Platforms, (result, value) => {
      result[value.value] = value.name;
    }, {});
    this.href = this._sanitizer.bypassSecurityTrustUrl('javascript:;');
  }

  public click(event: KeyboardEvent) {

    if (this.platform === Platform.Copy) {
      this._clipboardService.copyFromContent(this._share.config.url);

    } else if (this._share.getMethod() === Method.MetaRefesh) {

      event.preventDefault();
      this._metaRefresh();
    } else if (this._share.getMethod() === Method.Dialog) {

      event.preventDefault();
      this._dialog();
    }

    this.open.emit({ platform: this.platform });
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

    newWindow .document.open();
    newWindow .document.write(html)
    newWindow .document.close();

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
      title: this.title
    }

    this._share = this._shareService.createShare(this.platform, config);
    //this.show = this._share.appSupported() || this._share.webSupported();
    if (this._share.getMethod() === Method.Href) {
      this.href = this._sanitizer.bypassSecurityTrustUrl(this._share.createUrl().toString());
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
