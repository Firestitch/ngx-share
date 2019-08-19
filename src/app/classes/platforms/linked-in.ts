import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Method } from '../../enums/method.enum';

export class LinkedInShare extends Share {

  public platform = Platform.LinkedIn;

  public createUrl() {
    const url = 'http://www.linkedin.com/shareArticle';
    const params = {
      url: 'url',
      title: 'title',
      description: 'summary'
    };

    return this._createUrl(url, params);
  }

  public getMethod() {
    return Method.Dialog;
  }

}
