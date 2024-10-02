import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { isMobile } from '../../helpers';
import { Share } from '../share';

export class MessengerShare extends Share {

  public platform = Platform.Messenger

  public appSupported() {
    return isMobile();
  }

  public webSupported() {
    return false;
  }

  public createUrl() {
    if(isMobile()) {
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
