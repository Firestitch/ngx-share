import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Method } from '../../enums/method.enum';


export class SnapchatShare extends Share {

  public platform = Platform.Snapchat;

  public createUrl() {
    const url = 'https://www.snapchat.com/scan';
    const params = {
      url: 'attachmentUrl'
    };

    return this._createUrl(url, params);
  }

  public getMethod() {
    return Method.Href;
  }
}
