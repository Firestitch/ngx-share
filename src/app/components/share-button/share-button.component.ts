import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FsShareService } from '../../services/share.service';
import { Platform } from '../../enums/platform.emun';
import { ShareEvent } from '../../interfaces/share-event.interface';


@Component({
  selector: 'fs-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class FsShareButtonComponent implements OnInit {

  @Input() platform: Platform;
  @Input() description = '';
  @Input() title = '';
  @Input() url = '';
  @Input() image = '';
  @Input() showLabel = true;
  @Input() showIcon = true;
  @Input() iconUrl = '';
  @Input() href;
  @Input() beforeOpen: Function;

  @Input('iconHeight') set setIconHeight(value: number) {
    if (value) {
      this.iconStyles.height = value + 'px';
    }
  }

  @Input('size') set setSize(value: number) {
    if (value) {
      const percent = (value / 100);
      this.iconStyles.height = (percent * 20) + 'px';
      this.labelStyles.fontSize = value + '%';
    }
  }

  @Output() open = new EventEmitter<ShareEvent>();

  public platformNames = [];
  public iconStyles: any = {};
  public labelStyles: any = {};

  constructor(private _shareService: FsShareService) {
    this.platformNames = this._shareService.platformNames;
  }

  ngOnInit() {
    if (!this.iconUrl) {
      this.iconUrl = '/assets/@firestitch/share/' + this.platform + '.svg';
    }
  }
}
