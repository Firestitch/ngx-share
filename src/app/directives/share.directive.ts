import { Directive, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { FsShareService } from '../services/share.service';
import { ShareConfig } from '../interfaces/shareconfig.interface';

@Directive({
  selector: '[fsShare]',
})
export class FsShareDirective {

  @Input('platform') platform: string = 'any';
  @Input('shareConfig') shareConfig: any;

  @HostListener('click', ['$event']) onClick($event) {
    this.share();
  }

  constructor(
    public shareService: FsShareService
  ) {}

  private share() {
    // if observalbe subscribe
    if (typeof this.shareConfig == 'object' && typeof this.shareConfig.subscribe === 'function') {
      this.shareConfig.subscribe((config: ShareConfig) => {
        this.doShare(config);
      })
    } else {
      const config: any = (typeof this.shareConfig === 'function') ? this.shareConfig(this.platform) : this.shareConfig;

      if (typeof config == 'object' && typeof config.subscribe === 'function') {
        config.subscribe((config2: ShareConfig) => {
          this.doShare(config2);
        });
      } else {
        this.doShare(config);
      }
    }
  }


  private doShare(shareConfig: ShareConfig) {
    this.shareService.share(shareConfig, this.platform)
    .subscribe(response => {
      if (shareConfig.success) {
        shareConfig.success(response);
      }
    });
  }

}
