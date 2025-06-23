import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { Share } from '../share';

export class TelegramShare extends Share {

  public platform = Platform.Telegram;

  public createUrl(shareUrl: string) {
    const url = 'https://t.me/share/url';
    const params = {
      url: 'url',
      description: 'text',
    };

    return this._createUrl(url, params, shareUrl);
  }

  public getMethod() {
    return Method.Dialog;
  }

}
