import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';

export class MessengerShare extends Share {

  public platform = Platform.Messenger

  protected _webUrl = '';
  protected _webUrlParams = {};
  protected _appUrl = 'fb-messenger://share';
  protected _appUrlParams = {
    url: 'link'
  };

  public appSupported() {
    return this._deviceDetectorService.isMobile() || this._deviceDetectorService.isTablet();
  }

  public webSupported() {
    return false;
  }
}
