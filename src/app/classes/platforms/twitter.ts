import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Observable } from 'rxjs';

export class TwitterShare extends Share {

  public platform = Platform.Twitter;

  protected _webParamMap = {
    url: 'url',
    description: 'text'
  };

  protected _webUrl = 'https://twitter.com/intent/tweet';

  public open() {

    return new Observable((observer) => {

      this._cordovaPlatformSupported(Platform.Twitter)
      .subscribe(() => {

        (<any>window).plugins.socialsharing.shareViaTwitter(
          this.config.title + (this.config.description ? ' - ' + this.config.description : ''),
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
