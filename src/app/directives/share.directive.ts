import { Directive, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { FsShareService } from '../services';
import { ShareData } from '../interfaces';

@Directive({
  selector: '[fsShare]',
})
export class FsShareDirective {

  @Input('platform') platform: string = 'any';
  @Input('data') data: any;
  @Output() public success = new EventEmitter<any>();

  @HostListener('click', ['$event']) onClick($event) {
    this.share();
  }

  constructor(
    public shareService: FsShareService
  ) {

  }

  share() {
    const shareData: ShareData = (typeof this.data === 'function') ? this.data() : this.data;

    this.shareService.share(shareData, this.platform)
    .subscribe(response => {
      console.log('shared - emit now');
      this.success.emit(response);
    })
;
  }


}
