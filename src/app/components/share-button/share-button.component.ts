import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { Platforms } from '../../consts/platforms.const';
import { Platform } from '../../enums/platform.emun';
import { ShareEvent } from '../../interfaces/share-event.interface';


@Component({
  selector: 'fs-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsShareButtonComponent {

  @Input() public platform: Platform;
  @Input() public description = '';
  @Input() public title = '';
  @Input() public url = '';
  @Input() public image = '';
  @Input() public showLabel = true;
  @Input() public showIcon = true;
  @Input() public iconOrigin = '';
  @Input() public iconUrl = '';
  @Input() public color = '#ffffff';
  @Input() public href;
  @Input() public beforeOpen: (shareEvent: ShareEvent) => Observable<void|{ url: string }>;
  @Input() public afterOpen: (event: { platform: Platform }) => Observable<any>;
  @Input() public shape: 'square' | 'circle' = 'square';
  @Input() public iconSize: number;
  @Input() public size: number;

  public platformNames = {};

  constructor() {
    this.platformNames = Platforms.reduce((accum, value) => {
      return {
        ...accum,
        [value.value]: value.name,
      };
    }, {});
  }
}
