import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Method } from '../../enums/method.enum';

export class RedditShare extends Share {

  public platform = Platform.Reddit

  public createUrl() {
    const url = 'http://www.reddit.com/submit';
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
