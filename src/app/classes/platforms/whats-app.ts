import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Method } from 'src/app/enums/method.enum';

export class WhatsAppShare extends Share {

  public platform = Platform.WhatsApp;

  public createUrl() {
    const url = this.isMobile() ? 'whatsapp://send' : 'https://wa.me';
    const params = { description: 'text' };

    return this._createUrl(url, params);
  }

  public getMethod() {
    return this.isMobile() ? Method.MetaRefesh : Method.Dialog;
  }

  public buildDecription() {
    return this.config.description + '\n' + this.config.url;
  }

  public isMobile() {
    return this._deviceDetectorService.isMobile() || this._deviceDetectorService.isTablet();
  }
}
