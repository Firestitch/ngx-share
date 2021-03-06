import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Observable } from 'rxjs';
import { Method } from '../../enums/method.enum';


export class FacebookShare extends Share {

  public platform = Platform.Facebook;

  public createUrl() {
    const url = 'https://www.facebook.com/sharer/sharer.php';
    const params = {
      url: 'u'
    };

    return this._createUrl(url, params);
  }

  public getMethod() {
    return Method.Dialog;
  }


  public open() {

    return new Observable((observer) => {

      this._cordovaPlatformSupported(Platform.Facebook)
      .subscribe(() => {

        (<any>window).plugins.socialsharing.shareViaFacebook(
          '',
          null,
          this.config.url,
          function(response) {
            observer.next(response);
            observer.complete();
          },
          function(errormsg) {
            observer.error(errormsg);
          }
        );

      }, () => {
        super.open()
        .subscribe((response) => {
          observer.next(response);
          observer.complete();
        });
      });
    });
  }
}
