
import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { Share } from '../share';


export class FacebookShare extends Share {

  public platform = Platform.Facebook;
  public navigatorShare = false;

  public createUrl() {
    const url = 'https://www.facebook.com/sharer/sharer.php';
    const params = {
      url: 'u',
    };

    return this._createUrl(url, params);
  }

  public getMethod() {
    return Method.Dialog;
  }
}
