import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { Share } from '../share';


export class PinterestShare extends Share {

  public platform = Platform.Pinterest;

  public createUrl(shareUrl: string) {
    const url = 'https://www.pinterest.ca/pin/create/button/';
    const params = {
      url: 'url',
      image: 'media',
      description: 'description',
    };

    return this._createUrl(url, params, shareUrl);
  }

  public getMethod() {
    return Method.Dialog;
  }
}
