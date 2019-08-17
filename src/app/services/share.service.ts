import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ShareConfig } from '../interfaces';
import { ClipboardService } from 'ngx-clipboard'
import { Platform } from '../enums/platform.emun';
import { FacebookShare,
        TwitterShare,
        CopyShare,
        AnyShare,
        LinkedInShare,
        WhatsAppShare,
        TelegramShare,
        TumblrShare,
        MessengerShare } from '../classes/platforms';


@Injectable()
export class FsShareService implements OnDestroy {

  public isMobile = (<any>window).plugins && (<any>window).plugins.socialsharing;

  public twitterAvailable = false;
  public facebookAvailable = false;

  private onDestroy$ = new Subject();
  private onPlatformsChecked$ = new BehaviorSubject<any>(null);


  constructor(
    private _clipboardService: ClipboardService
  ) {}

  open(platform: Platform, config: ShareConfig): Observable<any> {
    return this.createShare(platform, config).open();
  }

  public createShare(platform: Platform, config: ShareConfig) {
    switch (platform) {
      case Platform.Facebook:
        return new FacebookShare(config);

      case Platform.Twitter:
          return new TwitterShare(config);

      case Platform.LinkedIn:
        return new LinkedInShare(config);

      case Platform.WhatsApp:
        return new WhatsAppShare(config);

      case Platform.Telegram:
        return new TelegramShare(config);

      case Platform.Tumblr:
          return new TumblrShare(config);

      case Platform.Messenger:
          return new MessengerShare(config);

      case Platform.Copy:
          return new CopyShare(config, this._clipboardService);

      case Platform.Any:
        return new AnyShare(config);

      default:
        throw 'Invalid platform';
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onPlatformsChecked$.complete();
  }

}
