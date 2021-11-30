import { Input, Component, OnInit } from '@angular/core';
import { FsShareService } from '../../services/share.service';
import { Platform } from '../../enums/platform.emun';
import { ShareEvent } from '../../interfaces/share-event.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'fs-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'],
})
export class FsShareButtonComponent implements OnInit {

  @Input() public platform: Platform;
  @Input() public description = '';
  @Input() public title = '';
  @Input() public url = '';
  @Input() public image = '';
  @Input() public showLabel = true;
  @Input() public showIcon = true;
  @Input() public iconUrl = '';
  @Input() public color = '#ffffff';
  @Input() public href;
  @Input() public beforeOpen: (shareEvent: ShareEvent) => Observable<any> | any;
  @Input() public open: (shareEvent: ShareEvent) => Observable<any> | any;
  @Input() public shape: 'square' | 'circle' = 'square';
  @Input() public iconSize: number;
  @Input() public size: number;

  public platformNames = [];

  constructor(private _shareService: FsShareService) {
    this.platformNames = this._shareService.platformNames;
  }

  public ngOnInit(): void {
    if (!this.iconUrl) {
      this.iconUrl = '/assets/@firestitch/share/' + this.platform + '.svg';
    }
  }
}
