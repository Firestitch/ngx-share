import { Platform } from '../enums/platform.emun';
import { ShareConfig } from '../interfaces';
import { Observable } from 'rxjs';
import { forOwn } from 'lodash-es';
import { Platforms } from '../consts/platforms.const';


export abstract class Share {

  public config: ShareConfig;

  constructor(config: ShareConfig) {
    this.config = config;
  }

  protected abstract _webParamMap: Object;
  protected abstract _webUrl: string;

  public abstract platform: Platform;

  public getPlatformName() {
    const platform = Platforms.find((item) => {
      return item.value === this.platform;
    });

    return platform ? platform.name : '';
  }

  public buildDecription() {
    return this.config.description;
  }

  public buildTitle() {
    return this.config.title;
  }

  public open(): Observable<any> {

    return new Observable(observer => {

      const url = new URL(this._webUrl);
      const w: Window = window;

      const data = {
        description: this.buildDecription(),
        title: this.buildTitle(),
        url: this.config.url
      };

      forOwn(this._webParamMap, (param, key) => {
        const value = data[key];

        if (value) {
          url.searchParams.append(param, value);
        }
      });

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

      const win = window.open(url.toString(), '_system', options.join(','));
      const timer = (<any>window).setInterval(() => {
        if (win.closed !== false) {
            window.clearInterval(timer);
            observer.next(true);
            observer.complete();
        }
      }, 200);

      if (win.focus) {
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
