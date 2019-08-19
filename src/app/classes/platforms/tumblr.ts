import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Method } from '../../enums/method.enum';

export class TumblrShare extends Share {

  public platform = Platform.Tumblr;

  public createUrl() {
    const url = 'http://tumblr.com/widgets/share/tool';
    const params = {
      url: 'canonicalUrl',
      description: 'caption'
    };

    return this._createUrl(url, params);
  }

  public getMethod() {
    return Method.Dialog;
  }

}
