import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Observable } from 'rxjs';
import { Method } from '../../enums/method.enum';

export class TwitterShare extends Share {

  public platform = Platform.Twitter;

  public createUrl() {
    const url = 'https://twitter.com/intent/tweet';
    const params = {
      url: 'url',
      description: 'text'
    };

    return this._createUrl(url, params);
  }

  public getMethod() {
    return Method.Dialog;
  }

  // public open() {

  //   return new Observable((observer) => {

  //     this._cordovaPlatformSupported(Platform.Twitter)
  //     .subscribe(() => {

  //       (<any>window).plugins.socialsharing.shareViaTwitter(
  //         this.config.title + (this.config.description ? ' - ' + this.config.description : ''),
  //         null,
  //         this.config.url,
  //         function(response) {
  //           observer.next(response);
  //           observer.complete();
  //         },
  //         function(errormsg) {
  //           observer.error(errormsg);
  //         }
  //       );

  //     }, () => {

  //       super.open()
  //       .subscribe((response) => {
  //         observer.next(response);
  //         observer.complete();
  //       });
  //     });
  //   });
  // }
}
