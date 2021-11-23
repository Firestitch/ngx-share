import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ShareConfig } from '../interfaces';
import { Platform } from '../enums/platform.emun';
import { AnyShare,
        FacebookShare,
        TwitterShare,
        CopyShare,
        LinkedInShare,
        WhatsAppShare,
        TelegramShare,
        TumblrShare,
        MessengerShare,
        RedditShare,
        PinterestShare,
        InstagramShare,
        SnapchatShare,
        EmailShare
       } from '../classes/platforms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Platforms } from '../consts/platforms.const';
import { transform } from 'lodash-es';


@Injectable()
export class FsShareService implements OnDestroy {

  public isMobile = (<any>window).plugins && (<any>window).plugins.socialsharing;

  public twitterAvailable = false;
  public facebookAvailable = false;

  private onDestroy$ = new Subject();
  private onPlatformsChecked$ = new BehaviorSubject<any>(null);
  private _platformNames;

  constructor(
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

      case Platform.Pinterest:
        return new PinterestShare(config, this._device);

      case Platform.Instagram:
        return new InstagramShare(config, this._device);

      case Platform.Snapchat:
        return new SnapchatShare(config, this._device);
      
      case Platform.Copy:
        return new CopyShare(config, this._device);

      case Platform.Email:
        return new EmailShare(config, this._device);

      case Platform.Any:
        return new AnyShare(config, this._device);
      
      default:
        throw 'Invalid platform: ' + platform;
    }
  }

  public get platformNames() {

    if (!this._platformNames) {
      this._platformNames = transform(Platforms, (result, value) => {
        result[value.value] = value.name;
      }, {});
    }

    return this._platformNames;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onPlatformsChecked$.complete();
  }

}
