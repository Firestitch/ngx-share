import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { isMobile } from '../../helpers';
import { Share } from '../share';


export class InstagramShare extends Share {

  public platform = Platform.Instagram;

  public appSupported() {
    return isMobile();
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
