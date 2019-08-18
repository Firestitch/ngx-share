import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';

export class WhatsAppShare extends Share {

  public platform = Platform.WhatsApp;

  protected _webParamMap = {
    description: 'text'
  };

  //protected _webUrl = 'https://wa.me';

  protected _webUrl = 'whatsapp://send';

  public buildDecription() {
    return this.config.description + '\n' + this.config.url;
  }
}
