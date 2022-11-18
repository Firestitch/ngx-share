import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { DeviceDetectorService } from 'ngx-device-detector';

import { 
  AnyShare,
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
  EmailShare,
  TikTokShare
} from '../classes/platforms';
import { Platforms } from '../consts/platforms.const';
import { ShareConfig } from '../interfaces';
import { Platform } from '../enums/platform.emun';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from '../components';


@Injectable()
export class FsShareService {

  private _platformNames;

  constructor(
    private _device: DeviceDetectorService,    
    private _dialog: MatDialog,
  ) {}
  
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

      case Platform.TikTok:
        return new TikTokShare(config, this._device);

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
      this._platformNames = Platforms.reduce((accum, value) => {
        return {
          ...accum,
          [value.value]: value.name,
        };
      }, {});
    }

    return this._platformNames;
  }

  public openDialog(platforms: Platform[], shareConfig: ShareConfig) {
    this._dialog.open(ShareDialogComponent, {
      data: {
        shareConfig,
        platforms,
      }
    });
  }

}
