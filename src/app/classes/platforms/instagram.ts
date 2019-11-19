import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Method } from '../../enums/method.enum';

export class InstagramShare extends Share {

  public platform = Platform.Instagram;

  public appSupported() {
    return this._deviceDetectorService.isMobile() || this._deviceDetectorService.isTablet();
  }

  public webSupported() {
    return false;
  }

  public createUrl() {
    const url = 'instagram://camera';
    const params = {};

    return this._createUrl(url, params);
  }

  public getMethod() {
    return Method.Href;
  }
}
