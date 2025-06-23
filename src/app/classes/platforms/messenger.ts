import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { isMobile } from '../../helpers';
import { Share } from '../share';

export class MessengerShare extends Share {

  public platform = Platform.Messenger;

  public appSupported() {
    return isMobile();
  }

  public webSupported() {
    return false;
  }

  public createUrl(shareUrl: string) {
    return isMobile() ? this.createMobileUrl(shareUrl) : this.createDesktopUrl(shareUrl);
  }
  
  public createDesktopUrl(shareUrl: string) {
    const url = 'http://www.facebook.com/dialog/send';
    const params = {
      //app_id: '140586622674265',
      redirect_uri: window.location.href,
      url: 'link',
    };
  
    return this._createUrl(url, params, shareUrl);
  }
  
  public createMobileUrl(shareUrl: string) {
    const url = 'fb-messenger://share';
    const params = {
      url: 'link',
    };

    return this._createUrl(url, params, shareUrl);
  }

  public getMethod() {
    return Method.Href;
  }

}
