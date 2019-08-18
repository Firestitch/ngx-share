import { Directive, Input, HostListener, OnDestroy, Component } from '@angular/core';
import { FsShareService } from '../../services/share.service';
import { Platform } from '../../enums/platform.emun';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Platforms } from '../../consts/platforms.const';
import { transform } from 'lodash-es';
import { ShareConfig } from '../../interfaces';


@Component({
  selector: 'fs-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class FsShareButtonComponent implements OnDestroy {

  @Input() platform: Platform;
  @Input() config: ShareConfig;

  @HostListener('click', ['$event']) onClick($event) {
    this._share();
  }

  public platformNames = [];
  private _destory$ = new Subject();

  constructor(
    public shareService: FsShareService
  ) {
    this.platformNames = transform(Platforms, (result, value) => {
      result[value.value] = value.name;
    }, {});
  }

  private _share() {

    if (this.config.open) {
      this.config.open({ platform: this.platform });
    }

    this.shareService.open(this.platform, this.config)
    .pipe(
      takeUntil(this._destory$)
    )
    .subscribe(response => {
      if (this.config.success) {
        this.config.success({ platform: this.platform });
      }
    },
    (error) => {
      if (this.config.error) {
        this.config.error({ platform: this.platform, error: error });
      }
    });
  }

  ngOnDestroy() {
    this._destory$.next();
    this._destory$.complete();
  }
}
