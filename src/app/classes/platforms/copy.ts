import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';
import { Observable } from 'rxjs';
import { ShareConfig } from '../../interfaces';
import { ClipboardService } from 'ngx-clipboard';
import { DeviceDetectorService } from 'ngx-device-detector';

export class CopyShare extends Share {

  public platform = Platform.Copy;

  public createUrl() {
    return new URL('');
  }

  public getMethod() {
    return null;
  }


  protected _clipboardService: ClipboardService;

  constructor(config: ShareConfig, deviceDetectorService: DeviceDetectorService, clipboardService: ClipboardService) {
    super(config, deviceDetectorService);
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
