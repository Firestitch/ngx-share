import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';

export class TumblrShare extends Share {

  public platform = Platform.Tumblr;

  protected _webUrl = 'http://tumblr.com/widgets/share/tool';
  protected _webUrlParams = {
    url: 'canonicalUrl',
    description: 'caption'
  };
  protected _appUrl = '';
  protected _appUrlParams = {};
}
