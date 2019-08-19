import { Input, HostListener, OnDestroy, Component, OnInit } from '@angular/core';
import { FsShareService } from '../../services/share.service';
import { Platform } from '../../enums/platform.emun';
import { ShareConfig } from '../../interfaces';


@Component({
  selector: 'fs-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class FsShareButtonComponent {

  @Input() platform: Platform;
  @Input() config: ShareConfig;
  @Input() showLabels = true;

  public platformNames = [];

  constructor(private _shareService: FsShareService) {

    if (this.showLabels) {
      this.platformNames = this._shareService.platformNames;
    }
  }
}
