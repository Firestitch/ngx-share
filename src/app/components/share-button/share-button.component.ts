import { Directive, Input, HostListener, OnDestroy, Component } from '@angular/core';
import { FsShareService } from '../../services/share.service';
import { Platform } from '../../enums/platform.emun';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Platforms } from '../../consts/platforms.const';
import { chain } from 'lodash-es';


@Component({
  selector: 'fs-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class FsShareButtonComponent implements OnDestroy {

  @Input() platform: Platform;
  @Input() config: any;

  @HostListener('click', ['$event']) onClick($event) {
    this._share();
  }

  public platformNames = [];
  private _destory$ = new Subject();

  constructor(
    public shareService: FsShareService
  ) {
    this.platformNames = chain(Platforms)
                            .keyBy('value')
                            .mapValues('name')
                            .value();
  }

  private _share() {
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