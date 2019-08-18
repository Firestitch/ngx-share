import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Observable } from 'rxjs';


export class FacebookShare extends Share {

  public platform = Platform.Facebook;

  protected _webUrl = 'https://www.facebook.com/sharer/sharer.php';
  protected _webUrlParams = {
    url: 'u'
  };
  protected _appUrl = '';
  protected _appUrlParams = {};

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
