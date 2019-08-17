import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';

export class TelegramShare extends Share {

  public platform = Platform.Telegram

  protected _webParamMap = {
    url: 'url',
    description: 'text'
  };
  protected _webUrl = 'https://t.me/share/url';
}
