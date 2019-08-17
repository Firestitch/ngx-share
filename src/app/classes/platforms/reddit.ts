import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';

export class RedditShare extends Share {

  public platform = Platform.Reddit

  protected _webParamMap = {
    url: 'url',
    title: 'title'
  };

  protected _webUrl = 'http://www.reddit.com/submit';
}
