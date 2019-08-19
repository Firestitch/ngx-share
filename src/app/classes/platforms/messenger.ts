import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Method } from '../../enums/method.enum';

export class MessengerShare extends Share {

  public platform = Platform.Messenger

  public appSupported() {
    return this._deviceDetectorService.isMobile() || this._deviceDetectorService.isTablet();
  }

  public webSupported() {
    return false;
  }

  public createUrl() {
    const url = 'fb-messenger://share';
    const params = {
      url: 'link'
    };

    return this._createUrl(url, params);
  }

  public getMethod() {
    return Method.Href;
  }

}
