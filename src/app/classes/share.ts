import { Platform } from '../enums/platform.emun';
import { ShareConfig } from '../interfaces';
import { Observable } from 'rxjs';
import { forOwn } from 'lodash-es';
import { Platforms } from '../consts/platforms.const';
import { DeviceDetectorService } from 'ngx-device-detector';


export abstract class Share {

  public config: ShareConfig;

  constructor(config: ShareConfig, deviceDetectorService: DeviceDetectorService) {
    this.config = config;
    this._deviceDetectorService = deviceDetectorService;
  }

  public abstract platform: Platform;

  protected abstract _webUrlParams: Object;
  protected abstract _webUrl: string;
  protected abstract _appUrlParams: Object;
  protected abstract _appUrl: string;

  protected _deviceDetectorService: DeviceDetectorService;

  public getPlatformName() {
    const platform = Platforms.find((item) => {
      return item.value === this.platform;
    });

    return platform ? platform.name : '';
  }

  public appSupported(): boolean {
    return false;
  }

  public webSupported(): boolean {
    return !!this._webUrl;
  }

  public buildDecription() {
    return this.config.description;
  }

  public buildTitle() {
    return this.config.title;
  }

  public get appUrl(): URL {
    return this._createUrl(this._appUrl, this._appUrlParams);
  }

  public get webUrl(): URL {
    return this._createUrl(this._webUrl, this._webUrlParams);
  }

  private _createUrl(u, params): URL {
    const url = new URL(u);

    const data = {
      description: this.buildDecription(),
      title: this.buildTitle(),
      url: this.config.url
    };
if(this.platform === Platform.WhatsApp) {
  debugger;
}
    forOwn(params, (param, key) => {
      const value = data[key];

      if (value) {
        url.searchParams.append(param, value);
      }
    });

    return url;
  }

  public open(): Observable<any> {

    return new Observable(observer => {

      const w: Window = window;
      const width = 800;
      const height = 500;

      const el = document.documentElement;
      const windowWidth = w.innerWidth ? w.innerWidth : el.clientWidth ? el.clientWidth : screen.width;
      const windowHeight = w.innerHeight ? w.innerHeight : el.clientHeight ? el.clientHeight : screen.height;
      const left = (windowWidth - width) / 2;
      const top = (windowHeight - height) / 2;

      const options = [
        'width=' + width,
        'height=' + height,
        'top=' + top,
        'left=' + left
      ];

      const win = window.open(this.webUrl.toString(), '_system', options.join(','));
      const timer = (<any>window).setInterval(() => {
        if (win.closed !== false) {
            window.clearInterval(timer);
            observer.next(true);
            observer.complete();
        }
      }, 200);

      if (win && win.focus) {
        win.focus();
      }

    });
  }

  protected _cordovaPlatformSupported(platform): Observable<any> {
    return new Observable((observer) => {

      if (!(<any>window).plugins) {
        // on desktop, all share options avail.
        observer.error();
        observer.complete();
      } else {
        let domain = platform;
        if ((<any>window).device.platform === 'iOS') {
          if (platform === 'facebook') {
            domain = 'com.apple.social.facebook';
          } else if (platform === 'twitter') {
            domain = 'com.apple.social.twitter';
          }
        } else if ((<any>window).device.platform === 'Android') {
          if (platform === 'facebook') {
            domain = 'com.facebook.katana';
          } else if (platform === 'twitter') {
            domain = 'com.twitter.android';
          }
        }

        (<any>window).plugins.socialsharing.canShareVia(
          domain,
          'msg', null, null, null,
          e => {
            observer.next();
            observer.complete();
          },
          e => {
            observer.error();
            observer.complete();
          }
        );
      }
    });
  }
}
