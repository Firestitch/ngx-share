import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Observable } from 'rxjs';
import { ShareConfig } from '../../interfaces';
import { ClipboardService } from 'ngx-clipboard';

export class CopyShare extends Share {

  public platform = Platform.Copy;

  protected _webParamMap = {};

  protected _webUrl = '';
  protected _clipboardService: ClipboardService;

  constructor(config: ShareConfig, clipboardService: ClipboardService) {
    super(config);
    this._clipboardService = clipboardService;
  }

  public open(): Observable<any> {

    return new Observable(observer => {
      this._clipboardService.copyFromContent(this.config.url);
      observer.next(true);
      observer.complete();
    });
  }
}
