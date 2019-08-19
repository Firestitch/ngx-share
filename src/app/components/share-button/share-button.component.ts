import { Input, HostListener, OnDestroy, Component, OnInit } from '@angular/core';
import { FsShareService } from '../../services/share.service';
import { Platform } from '../../enums/platform.emun';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Platforms } from '../../consts/platforms.const';
import { transform } from 'lodash-es';
import { ShareConfig } from '../../interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { Share } from '../../classes/share';


@Component({
  selector: 'fs-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class FsShareButtonComponent {

  @Input() platform: Platform;
  @Input() config: ShareConfig;

  public platformNames = [];

  constructor(
  ) {
    this.platformNames = transform(Platforms, (result, value) => {
      result[value.value] = value.name;
    }, {});
  }
}
