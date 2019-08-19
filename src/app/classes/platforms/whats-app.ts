import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';

export class WhatsAppShare extends Share {

  public platform = Platform.WhatsApp;

  protected _webUrl = 'https://wa.me';
  protected _webUrlParams = {
    description: 'text'
  };
  protected _appUrl = 'whatsapp://send';
  protected _appUrlParams = {
    description: 'text'
  };

  public buildDecription() {
    return this.config.description + '\n' + this.config.url;
  }

  public appSupported() {
    return this._deviceDetectorService.isMobile() || this._deviceDetectorService.isTablet();
  }
}
