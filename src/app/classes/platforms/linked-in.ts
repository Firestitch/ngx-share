import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { Share } from '../share';

export class LinkedInShare extends Share {

  public platform = Platform.LinkedIn;

  public createUrl(shareUrl: string) {
    const url = 'http://www.linkedin.com/shareArticle/?mini=true';
    const params = {
      url: 'url',
      title: 'title',
      description: 'summary',
    };

    return this._createUrl(url, params, shareUrl);
  }

  public getMethod() {
    return Method.Dialog;
  }

}
