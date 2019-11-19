import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Method } from '../../enums/method.enum';


export class PinterestShare extends Share {

  public platform = Platform.Pinterest;

  public createUrl() {
    const url = 'https://www.pinterest.ca/pin/create/button/';
    const params = {
      url: 'url',
      image: 'media',
      description: 'description'
    };

    return this._createUrl(url, params);
  }

  public getMethod() {
    return Method.Dialog;
  }
}
