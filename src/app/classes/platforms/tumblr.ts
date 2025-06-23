import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { Share } from '../share';

export class TumblrShare extends Share {

  public platform = Platform.Tumblr;

  public createUrl(shareUrl: string) {
    const url = 'http://tumblr.com/widgets/share/tool';
    const params = {
      url: 'canonicalUrl',
      description: 'caption',
    };

    return this._createUrl(url, params, shareUrl);
  }

  public getMethod() {
    return Method.Dialog;
  }

}
