import { Observable } from 'rxjs';

import { Platforms } from '../consts/platforms.const';
import { Method } from '../enums/method.enum';
import { Platform } from '../enums/platform.emun';
import { isMobile } from '../helpers';
import { ShareConfig } from '../interfaces';


export abstract class Share {

  public config: ShareConfig;
  public navigatorShare = true;


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

        const windowProxy = window.open(this.createUrl(url).toString(), '_system', options.join(','));
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

  protected _createUrl(
    platformUrl: string,
    params: { [key: string]: string },
    shareUrl: string,
  ): URL {
    const data = {
      description: this.buildDecription(),
      title: this.buildTitle(),
      url: shareUrl,
      image: this.config.image,
    };

    const url = new URL(platformUrl);
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

  public abstract platform: Platform;
  public abstract createUrl(shareUrl: string): URL;
  public abstract getMethod(): Method;
}
