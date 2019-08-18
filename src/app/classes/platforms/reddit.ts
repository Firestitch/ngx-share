import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';

export class RedditShare extends Share {

  public platform = Platform.Reddit

  protected _webUrl = 'http://www.reddit.com/submit';
  protected _webUrlParams = {
    url: 'url',
    title: 'title'
  };
  protected _appUrl = '';
  protected _appUrlParams = {};
}
