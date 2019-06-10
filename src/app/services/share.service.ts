import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { forkJoin } from 'rxjs';
import { ShareConfig } from '../interfaces';
import { CeiboShare } from 'ng2-social-share';



@Injectable()
export class FsShareService implements OnDestroy {

  public isMobile = (<any>window).plugins && (<any>window).plugins.socialsharing;

  public twitterAvailable = false;
  public facebookAvailable = false;

  private onDestroy$ = new Subject();
  private onPlatformsChecked$ = new BehaviorSubject<any>(null);


  constructor() {

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
    } else {
      return this.any(shareData);
    }

  }


  any(shareConfig: ShareConfig) {
    const shareObservable = new Observable(observer => {

      if (this.isMobile) {
        (<any>window).plugins.socialsharing.shareWithOptions(
          {
            message: shareConfig.title,
            //subject: 'Shared from',
            files: [shareConfig.image], // an array of filenames either locally or remotely
            url: shareConfig.url,
            chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
          },
          response => {
            observer.next(response);
            // success
            // console.log('Share completed? ' + result.completed); // On Android apps mostly return false even while it's true
            // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
            // console.log('Shared to app: ' + result.app);
          },
          errormsg => {
            observer.error(errormsg);
          }
        );

      } else {
        //what to do here?  some kinda popup?
        //observer.next(response);
        observer.error('share bar only avail on mobile');
      }
    });

    return shareObservable;

  }



  facebook(shareConfig: ShareConfig) {
    const shareObservable = new Observable(observer => {

      if (this.isMobile) {
        (<any>window).plugins.socialsharing.shareViaFacebook(
          shareConfig.title,
          [shareConfig.image],
          shareConfig.url,
          (response) => {
            // success
            observer.next(response);
          },
          errormsg => {
            //fail
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
      if (this.isMobile) {

        (<any>window).plugins.socialsharing.shareViaTwitter(
          shareConfig.title,
          [shareConfig.image],
          shareConfig.url,
          function(response) {
            observer.next(response);
          },
          function(errormsg) {
            observer.error(errormsg);
          }
        );

      } else {

        const Sharer = new CeiboShare();
        Sharer.twitter = {
          url: shareConfig.url,
          text: shareConfig.title,
          via: '',
          hashtags: ''
        };
        Sharer.share();

        // no callback, so just assume its good
        observer.next({});
      }

    });

    return shareObservable;
  }











  // post(post_id, data = {}): Observable<any> {
  //   return this.fsApi.post(`shares/${post_id}`, data, new FsApiConfig({ key: 'share' }));
  // }

  // goToShare(type, data, account_id: number = null, shareTo = null): void {

  //     const urlData = ['/share', type, data.id];
  //     const queryParams = {};

  //     if (shareTo) {
  //       urlData.push(shareTo);
  //     }

  //     if (account_id) {
  //       queryParams['creator'] = account_id;
  //     }

  //     if (data.root_content_id) {
  //       queryParams['root_content_id'] = data.root_content_id;
  //     }

  //   this.router.navigate(urlData, { queryParams });
  // }

  // getMenuConfig(type, data, creatorAccount = null): Observable<any> {

  //   return Observable.create(observer => {
  //     this.onPlatformsChecked$.subscribe(response => {
  //       if (response) {
  //         const referralCode = this.getReferralCode();
  //         const url = this.getUrl(type, data, referralCode);
  //         const shareData = this.getShareData(type, data);
  //         const creatorAccountId = creatorAccount ? creatorAccount.id : null;

  //         const actions = [
  //           {
  //             label: 'My timeline',
  //             menu: 'share',
  //             group: 'Share on SportGo',
  //             click: () => {
  //               this.goToShare(type, data, creatorAccountId);
  //             }
  //           },
  //           {
  //             label: `Friend's timeline`,
  //             menu: 'share',
  //             group: 'Share on SportGo',
  //             click: () => {
  //               this.goToShare(type, data, creatorAccountId, 'friend');
  //             }
  //           },
  //           {
  //             label: 'Community timeline',
  //             menu: 'share',
  //             group: 'Share on SportGo',
  //             click: () => {
  //               this.goToShare(type, data, creatorAccountId, 'community');
  //             }
  //           },
  //           {
  //             label: 'Facebook',
  //             menu: 'share',
  //             hide: !!this.isMobile,
  //             group: 'Share a link',
  //             click: () => {
  //               // @TODO We need ability to share data with ts code. I didn't found any solutions which allow us to share
  //               // without DOM modifications
  //               const Sharer = new CeiboShare();
  //               Sharer.facebook = { u: url };
  //               Sharer.share();
  //             }
  //           },
  //           {
  //             label: 'Twitter',
  //             menu: 'share',
  //             hide: !!this.isMobile,
  //             group: 'Share a link',
  //             click: () => {
  //               const Sharer = new CeiboShare();
  //               Sharer.twitter = { url: url, text: shareData.text, via: '', hashtags: '' };
  //               Sharer.share();
  //             }
  //           },
  //           {
  //             label: 'Facebook',
  //             menu: 'share',
  //             hide: !(this.isMobile && this.facebookAvailable),
  //             group: 'Share a link',
  //             click: () => {
  //               this.referralService.post({ object_id: data.id }).subscribe(referral => {
  //                 this.appShareFacebook(shareData.text, shareData.image, url);
  //               });
  //             }
  //           },
  //           {
  //             label: 'Twitter',
  //             menu: 'share',
  //             hide: !(this.isMobile && this.twitterAvailable),
  //             group: 'Share a link',
  //             click: () => {
  //               this.appShareTwitter(shareData.text, shareData.image, url);
  //             }
  //           },
  //           {
  //             label: 'More options...',
  //             menu: 'share',
  //             hide: !this.isMobile,
  //             group: 'Share a link',
  //             click: () => {
  //               this.appShare(shareData.text, shareData.image, url);
  //             }
  //           },
  //         ];

  //         remove(actions, { hide: true });

  //         observer.next(actions);
  //         observer.complete();
  //       }
  //     });
  //   });
  // }



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


  appShareFacebook(message, image, url) {
    (<any>window).plugins.socialsharing.shareViaFacebook(
      message,
      [image],
      url,
      () => {
        // success
      },
      errormsg => {
        console.log('Facebook share failed', errormsg);
      }
    );
  }


  appShareTwitter(message, image, url) {
    (<any>window).plugins.socialsharing.shareViaTwitter(
      message,
      [image],
      url,
      resp => {
        // success
      },
      errormsg => {
        console.log('Twitter share failed', errormsg);
      }
    );
  }

  appShare(message, image, url) {
    (<any>window).plugins.socialsharing.shareWithOptions(
      {
        message: message,
        subject: 'Shared from Sportgo',
        files: [image], // an array of filenames either locally or remotely
        url: url,
        chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
      },
      result => {
        // success

        // console.log('Share completed? ' + result.completed); // On Android apps mostly return false even while it's true
        // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        // console.log('Shared to app: ' + result.app);
      },
      errormsg => {
        console.log('Twitter share failed', errormsg);
      }
    );

  }

  // private getUrl(type, data, referralCode) {

  //   const settings = this.appService.settings;

  //   const url = `${environment.websiteUrl}/api/opengraph/${data.id}?ref=${referralCode}`;

  //   return 'https://' + settings.FIREBASE_LINK_DOMAIN + '/?link=' + encodeURIComponent(url) +
  //   '&apn=' + settings.ANDROID_PACKAGE +
  //   '&ibi=' + settings.IOS_PACKAGE +
  //   '&isi=' + settings.IOS_APPSTORE_ID +
  //   '&efr=1';
  // }

  // getReferralCode() {
  //   return UUID.UUID();
  // }

  // createReferral(type, data, referralCode) {
  //   return this.referralService
  //     .post({ object_id: data.id, code: referralCode, type: type }).subscribe(() => { });
  // }

  // private getShareData(type, data): ShareData {
  //   switch (type) {
  //     case 'post':
  //       return this.getPostShareData(data);
  //     case 'event':
  //       return this.getEventShareData(data);
  //     case 'content':
  //       return this.getContentShareData(data);
  //   }
  // }

  // private getPostShareData(post: Post): ShareData {
  //   return {
  //     text: post.description ? String(post.description) : '',
  //     image: this.mediaService.getPreviewImage(this.post['subject_object']),
  //     url: `${environment.websiteUrl}/post/${post.id}`
  //   };
  // }

  // private getEventShareData(event: Event): ShareData {
  //   return {
  //     text: event.name,
  //     image: event.banner ? event.banner.medium : null,
  //     url: `${environment.websiteUrl}/event/${event.id}/info`
  //   };
  // }

  // private getContentShareData(content: Content): ShareData {

  //   let url = null;

  //   switch (content.type) {
  //     case 'series':
  //       url = `${environment.websiteUrl}/content/series/${content.id}`;
  //       break;
  //     case 'segment':
  //       url = `${environment.websiteUrl}/content/segment/${content.root_content_id}/${content.id}`;
  //       break;
  //     default:
  //     url = `${environment.websiteUrl}/content/${content.root_content_id}/${content.id}`;
  //   }

  //   return {
  //     text: content.description,
  //     image: content.image.small,
  //     url: url
  //   };
  // }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onPlatformsChecked$.complete();
  }

}
