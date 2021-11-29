import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Method } from '../../enums/method.enum';


export class TwitterShare extends Share {

  public platform = Platform.Twitter;

  public createUrl() {
    const url = 'https://twitter.com/intent/tweet';
    const params = {
      url: 'url',
      description: 'text'
    };

    return this._createUrl(url, params);
  }

  public getMethod() {
    return Method.Dialog;
  }
}
