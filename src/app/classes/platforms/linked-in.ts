import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Observable } from 'rxjs';

export class LinkedInShare extends Share {

  public platform = Platform.LinkedIn;

  protected _webParamMap = {
    url: 'url',
    title: 'title',
    description: 'summary'
  };
  protected _webUrl = 'http://www.linkedin.com/shareArticle';
}
