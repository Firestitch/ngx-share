import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';

export class TelegramShare extends Share {

  public platform = Platform.Telegram

  protected _webUrl = 'https://t.me/share/url';
  protected _webUrlParams = {
    url: 'url',
    description: 'text'
  };
  protected _appUrl = '';
  protected _appUrlParams = {};
}
