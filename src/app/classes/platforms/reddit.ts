import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { Share } from '../share';

export class RedditShare extends Share {

  public platform = Platform.Reddit;

  public createUrl(shareUrl: string) {
    const url = 'http://www.reddit.com/submit';
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
