import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';

export class MessengerShare extends Share {

  public platform = Platform.Messenger

  protected _webParamMap = {
    url: 'link'
  };
  protected _webUrl = 'fb-messenger://share';
}
