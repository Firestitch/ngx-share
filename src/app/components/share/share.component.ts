import { Input, HostListener, OnDestroy, Component, OnInit } from '@angular/core';
import { FsShareService } from '../../services/share.service';
import { Platform } from '../../enums/platform.emun';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Platforms } from '../../consts/platforms.const';
import { transform } from 'lodash-es';
import { ShareConfig } from '../../interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { Share } from '../../classes/share';


@Component({
  selector: 'fs-share',
  templateUrl: './share.component.html'
})
export class FsShareComponent implements OnDestroy, OnInit {

  @Input() platform: Platform;
  @Input() config: ShareConfig;

  public platformNames = [];
  public href;
  public show = true;
  private _destory$ = new Subject();
  private _share: Share;

  constructor(
    private _shareService: FsShareService,
    private _sanitizer: DomSanitizer
  ) {
    this.platformNames = transform(Platforms, (result, value) => {
      result[value.value] = value.name;
    }, {});
    this.href = this._sanitizer.bypassSecurityTrustUrl('javascript:;');
  }

  public click(event: KeyboardEvent) {

    if (this._share.appSupported()) {

    const newWindow = window.open('', 'Share', 'width=300,height=300')
    const url = this._share.appUrl.toString();

    //const url = 'http://google.com';
    const html = `
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=` + url + `">
      </head>
      <body></body>
    </html>`

    newWindow .document.open();
    newWindow .document.write(html)
    newWindow .document.close();

    setTimeout(() => {
      if (newWindow) {
        newWindow.close();
      }
    }, 10000);


      // const iframe = document.createElement('iframe');
      // iframe.setAttribute('src', 'about:blank');
      // iframe.setAttribute('name', `fs-share-iframe`);
      // iframe.setAttribute('id', `fs-share-iframe`);
      // iframe.setAttribute('class', 'fs-share-iframe');
      // //iframe.setAttribute('style', 'display: none;');

      // document.body.appendChild(iframe);

      //iframe.contentWindow.document.write();

      return;
    }

    if (this._share.webSupported()) {
      event.preventDefault();
      this._open();
    }
  }

  public ngOnInit() {

    this._share = this._shareService.createShare(this.platform, this.config);
    this.show = this._share.appSupported() || this._share.webSupported();
    if (this._share.appSupported()) {
      //this.href = this._sanitizer.bypassSecurityTrustUrl(this._share.appUrl.toString());
    }
  }

  private _open() {

    if (this.config.open) {
      this.config.open({ platform: this.platform });
    }

    this._share.open()
    .pipe(
      takeUntil(this._destory$)
    )
    .subscribe(response => {
      if (this.config.success) {
        this.config.success({ platform: this.platform });
      }
    },
    (error) => {
      if (this.config.error) {
        this.config.error({ platform: this.platform, error: error });
      }
    });
  }

  ngOnDestroy() {
    this._destory$.next();
    this._destory$.complete();
  }
}
