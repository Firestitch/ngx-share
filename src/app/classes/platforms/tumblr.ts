import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';

export class TumblrShare extends Share {

  public platform = Platform.Tumblr;

  protected _webParamMap = {
    url: 'canonicalUrl',
    description: 'caption'
  };

  protected _webUrl = 'http://tumblr.com/widgets/share/tool';
}
