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
        LinkedInShare,
        WhatsAppShare,
        TelegramShare,
        TumblrShare,
        MessengerShare,
        RedditShare } from '../classes/platforms';
import { DeviceDetectorService } from 'ngx-device-detector';


@Injectable()
export class FsShareService implements OnDestroy {

  public isMobile = (<any>window).plugins && (<any>window).plugins.socialsharing;

  public twitterAvailable = false;
  public facebookAvailable = false;

  private onDestroy$ = new Subject();
  private onPlatformsChecked$ = new BehaviorSubject<any>(null);


  constructor(
    private _clipboardService: ClipboardService,
    private _device: DeviceDetectorService
  ) {}

  open(platform: Platform, config: ShareConfig): Observable<any> {
    return this.createShare(platform, config).open();
  }

  public createShare(platform: Platform, config: ShareConfig) {

    switch (platform) {
      case Platform.Facebook:
        return new FacebookShare(config, this._device);

      case Platform.Twitter:
          return new TwitterShare(config, this._device);

      case Platform.LinkedIn:
        return new LinkedInShare(config, this._device);

      case Platform.WhatsApp:
        return new WhatsAppShare(config, this._device);

      case Platform.Telegram:
        return new TelegramShare(config, this._device);

      case Platform.Tumblr:
          return new TumblrShare(config, this._device);

      case Platform.Reddit:
          return new RedditShare(config, this._device);

      case Platform.Messenger:
          return new MessengerShare(config, this._device);

      case Platform.Copy:
          return new CopyShare(config, this._device, this._clipboardService);

      // case Platform.Any:
      //   return new AnyShare(config);

      default:
        debugger;
        throw 'Invalid platform';
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onPlatformsChecked$.complete();
  }

}
