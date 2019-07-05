import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { forkJoin } from 'rxjs';
import { ShareConfig } from '../interfaces';
import { CeiboShare } from 'ng2-social-share';
import { ClipboardService } from 'ngx-clipboard'



@Injectable()
export class FsShareService implements OnDestroy {

  public isMobile = (<any>window).plugins && (<any>window).plugins.socialsharing;

  public twitterAvailable = false;
  public facebookAvailable = false;

  private onDestroy$ = new Subject();
  private onPlatformsChecked$ = new BehaviorSubject<any>(null);


  constructor(
    private _clipboardService: ClipboardService
  ) {

    forkJoin(this.isTwitterAvailable(), this.isFacebookAvailable())
    .subscribe(response => {
      this.twitterAvailable = response[0];
      this.facebookAvailable = response[1];
      this.onPlatformsChecked$.next(true);
    });
  }




  share(shareData, platform = 'any') {
    if (platform == 'facebook') {
      return this.facebook(shareData);

    } else if (platform == 'twitter') {
      return this.twitter(shareData);

    } else if (platform == 'copy') {
      return new Observable(observer => {
        this._clipboardService.copyFromContent(shareData.url);
        observer.next(true);
        observer.complete();
      });

    } else {
      return this.any(shareData);
    }

  }


  any(shareConfig: ShareConfig) {
    const shareObservable = new Observable(observer => {

      if (this.isMobile) {
        (<any>window).plugins.socialsharing.shareWithOptions(
          {
            // message: shareConfig.title + (shareConfig.description ? ' - ' + shareConfig.description : ''),
            // subject: 'Shared from',
            // files: [shareConfig.image], // an array of filenames either locally or remotely
            url: shareConfig.url,
            chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
          },
          response => {
            observer.next(response);
            // success
            // console.log('Share completed? ' + result.completed);
            // On Android apps mostly return false even while it's true
            // On Android result.app is currently empty.
            // On iOS it's empty when sharing is cancelled (result.completed=false)
            // console.log('Shared to app: ' + result.app);
          },
          errormsg => {
            observer.error(errormsg);
          }
        );

      } else {
        observer.error('share bar only avail on mobile');
      }
    });

    return shareObservable;

  }



  facebook(shareConfig: ShareConfig) {
    const shareObservable = new Observable(observer => {

      if (this.isMobile && this.facebookAvailable) {
        (<any>window).plugins.socialsharing.shareViaFacebook(
          '', // shareConfig.title,
          null, // [shareConfig.image],
          shareConfig.url,
          (response) => {
            // success
            observer.next(response);
          },
          errormsg => {
            // fail
            observer.error(errormsg);
          }
        );

      } else {

        const Sharer = new CeiboShare();
        Sharer.facebook = { u: shareConfig.url };
        Sharer.share();

        // no callback, so just assume its good
        observer.next({});
      }

    });

    return shareObservable;

  }



  twitter(shareConfig: ShareConfig) {
    const shareObservable = new Observable(observer => {
      if (this.isMobile && this.twitterAvailable) {

        (<any>window).plugins.socialsharing.shareViaTwitter(
          shareConfig.title + (shareConfig.description ? ' - ' + shareConfig.description : ''),
          null, // [shareConfig.image],
          shareConfig.url,
          function(response) {
            observer.next(response);
          },
          function(errormsg) {
            observer.error(errormsg);
          }
        );

      } else {

        if (this.isMobile) {
          // doing this hacky method because twitter has a bug where they dont show the login form in inappbrowser
          // TAD-T1393_Share_to_Twiter_on_Mobile_when_no_native_Twitter_app_installed
          window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(shareConfig.title + (shareConfig.description ? ' - ' + shareConfig.description : ''))+'&url='+encodeURIComponent(shareConfig.url), '_system');
        } else {
          const Sharer = new CeiboShare();
          Sharer.twitter = {
            url: shareConfig.url,
            text: shareConfig.title + (shareConfig.description ? ' - ' + shareConfig.description : ''),
            via: '',
            hashtags: ''
          };
          Sharer.share();
        }

        // no callback, so just assume its good
        observer.next({});
      }

    });

    return shareObservable;
  }




  private isPlatformAvailable(app): Observable<any> {
    return new Observable((observer) => {

      if (!(<any>window).plugins) {
        // on desktop, all share options avail.
        observer.next(true);
        observer.complete();
      } else {
        let domain = app;
        if ((<any>window).device.platform === 'iOS') {
          if (app === 'facebook') {
            domain = 'com.apple.social.facebook';
          } else if (app === 'twitter') {
            domain = 'com.apple.social.twitter';
          }
        } else if ((<any>window).device.platform === 'Android') {
          if (app === 'facebook') {
            domain = 'com.facebook.katana';
          } else if (app === 'twitter') {
            domain = 'com.twitter.android';
          }
        }

        (<any>window).plugins.socialsharing.canShareVia(
          domain,
          'msg', null, null, null,
          e => {
            console.log(app + ' is avail', e);
            observer.next(true);
            observer.complete();
          },
          e => {
            console.log(app + ' not avail', e);
            observer.next(false);
            observer.complete();
          }
        );
      }
    });

  }


  isTwitterAvailable(): Observable<any> {
    return this.isPlatformAvailable('twitter');
  }


  isFacebookAvailable(): Observable<any> {
    return this.isPlatformAvailable('facebook');
  }


  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onPlatformsChecked$.complete();
  }

}
