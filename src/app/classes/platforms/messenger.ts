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
    if(this._deviceDetectorService.isMobile() || this._deviceDetectorService.isTablet()) {
      return this.createMobileUrl();
    } else {
      return this.createDesktopUrl();
    }
  }
  
  public createDesktopUrl() {
    const url = 'http://www.facebook.com/dialog/send';
    const params = {
      //app_id: '140586622674265',
      redirect_uri: window.location.href,
      url: 'link'
    };
  
    return this._createUrl(url, params);
  }
  
  public createMobileUrl() {
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
