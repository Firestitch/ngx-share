import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Method } from '../../enums/method.enum';

export class TelegramShare extends Share {

  public platform = Platform.Telegram

  public createUrl() {
    const url = 'https://t.me/share/url';
    const params = {
      url: 'url',
      description: 'text'
    };

    return this._createUrl(url, params);
  }

  public getMethod() {
    return Method.Dialog;
  }

}
