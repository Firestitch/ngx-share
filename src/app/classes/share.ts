import { Platform } from '../enums/platform.emun';
import { ShareConfig } from '../interfaces';
import { Observable } from 'rxjs';
import { forOwn } from 'lodash-es';
import { Platforms } from '../consts/platforms.const';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Method } from '../enums/method.enum';


export abstract class Share {

  public config: ShareConfig;

  constructor(config: ShareConfig, deviceDetectorService: DeviceDetectorService) {
    this.config = config;
    this._deviceDetectorService = deviceDetectorService;
  }

  public abstract platform: Platform;

  public abstract createUrl(): URL;
  public abstract getMethod(): Method;

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

  public buildDecription() {
    return this.config.description;
  }

  public buildTitle() {
    return this.config.title;
  }

  protected _createUrl(shareUrl, params): URL {
    const url = new URL(shareUrl);

    const data = {
      description: this.buildDecription(),
      title: this.buildTitle(),
      url: this.config.url,
      image: this.config.image
    };

    forOwn(params, (param, key) => {
      const value = data[key];

      if (value) {
        url.searchParams.append(param, value);
      }
    });

    return url;
  }

  public open(): Observable<any> {

    return new Observable((observer) => {

      const navigator = (window as any).navigator;
      if (navigator.share) {
        navigator.share({
          url: this.createUrl().toString(),
        })
          .then(() => {
            alert('Successful share')
          })
          .catch((error) => {
            alert('Error sharing' + JSON.stringify(error));
          });

      } else {

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

        const win = window.open(this.createUrl().toString(), '_system', options.join(','));
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
