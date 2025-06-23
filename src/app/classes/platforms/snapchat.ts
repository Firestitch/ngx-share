import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { Share } from '../share';


export class SnapchatShare extends Share {

  public platform = Platform.Snapchat;

  public createUrl(shareUrl: string) {
    const url = 'https://www.snapchat.com/scan';
    const params = {
      url: 'attachmentUrl',
    };

    return this._createUrl(url, params, shareUrl);
  }

  public getMethod() {
    return Method.Href;
  }
}
