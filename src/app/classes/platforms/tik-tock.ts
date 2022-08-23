import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Method } from '../../enums/method.enum';


export class TikTokShare extends Share {

  public platform = Platform.TikTok;

  public appSupported() {
    return this._deviceDetectorService.isMobile() || this._deviceDetectorService.isTablet();
  }

  public webSupported() {
    return false;
  }

  public createUrl() {
    const url = 'https://tiktok.com';
    const params = {};

    return this._createUrl(url, params);
  }

  public getMethod() {
    return Method.Href;
  }
}
