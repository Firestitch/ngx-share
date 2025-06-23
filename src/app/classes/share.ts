import { Observable } from 'rxjs';

import { Platforms } from '../consts/platforms.const';
import { Method } from '../enums/method.enum';
import { Platform } from '../enums/platform.emun';
import { isMobile } from '../helpers';
import { ShareConfig } from '../interfaces';


export abstract class Share {

  public config: ShareConfig;
  public navigatorShare = true;

  public abstract platform: Platform;
  public abstract createUrl(): URL;
  public abstract getMethod(): Method;

  constructor(
    config: ShareConfig, 
  ) {
    this.config = config;
  }

  public getPlatformName() {
    const platform = Platforms.find((item) => {
      return item.value === this.platform;
    });

    return platform ? platform.name : '';
  }

  public appSupported(): boolean {
    return true;
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
      image: this.config.image,
    };

    Object.keys(params)
      .forEach((key)=> {
        const param = params[key];
        const value = data[key];

        if (value) {
          url.searchParams.append(param, value);
        } else {
          url.searchParams.append(key, param);
        }
      });

    return url;
  }

  public open(url: string): Observable<any> {
    return new Observable((observer) => {
      const navigator = (window as any).navigator;

      const shareData = {
        title: this.config.title,
        text: this.config.description,
        url,
      };

      if (this.navigatorShare && isMobile() && navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData)
          .then(() => {

          })
          .catch((error) => {
            console.log('Open Sharing Error', error);
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
          `width=${  width}`,
          `height=${  height}`,
          `top=${  top}`,
          `left=${  left}`,
        ];

        const windowProxy = window.open(this.createUrl().toString(), '_system', options.join(','));
        if(windowProxy) {
          const timer = (<any>window).setInterval(() => {
            if (windowProxy.closed) {
              window.clearInterval(timer);
              observer.next(true);
              observer.complete();
            }
          }, 200);

          if (windowProxy && windowProxy.focus) {
            windowProxy.focus();
          }
        } else {
          console.log('Failed to window.open');
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
          (e) => {
            observer.next(null);
            observer.complete();
          },
          (e) => {
            observer.error();
            observer.complete();
          },
        );
      }
    });
  }
}
