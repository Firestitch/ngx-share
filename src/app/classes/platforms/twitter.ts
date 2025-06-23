import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { Share } from '../share';


export class TwitterShare extends Share {

  public platform = Platform.Twitter;

  public createUrl(shareUrl: string) {
    const url = 'https://twitter.com/intent/tweet';
    const params = {
      url: 'url',
      description: 'text',
    };

    return this._createUrl(url, params, shareUrl);
  }

  public getMethod() {
    return Method.Dialog;
  }
}
