import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KitchenSinkConfigureComponent } from '../kitchen-sink-configure';
import { FsExampleComponent } from '@firestitch/example';
import { FsMessage } from '@firestitch/message';
import { ShareConfig } from 'src/app/interfaces';
import { Platforms, Platform } from '@firestitch/package';
import { ShareEvent } from 'src/app/interfaces/share-event.interface';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FsShareService } from 'src/app/services';


@Component({
  selector: 'kitchen-sink',
  templateUrl: 'kitchen-sink.component.html',
  styleUrls: ['kitchen-sink.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenSinkComponent implements OnInit {

  public config: ShareConfig = {};
  public platforms = Platforms;
  public shape: any = 'square';
  public size = 100;
  public iconSize;
  public iconColor = '#ffffff';
  public showLabel = true;
  public showIcon = true;

  constructor(
    private exampleComponent: FsExampleComponent,
    private _message: FsMessage,
    private _share: FsShareService,
  ) {
    exampleComponent.setConfigureComponent(KitchenSinkConfigureComponent, { config: this.config });
  }

  public ngOnInit() {
    const url = window.location.hostname === 'localhost' ? 'https://google.com' : window.location.toString();

    this.config = {
      url,
      title: 'Title',
      image: 'https://www.petmd.com/sites/default/files/petmd-puppy-weight.jpg',
      description: 'Description',
      error: (event: ShareEvent) => {
        this._message.error('Share failed - ' + event.error + ' on the ' + event.platform + ' platform');
      }
    };
  }

  public open = (event) => {
    console.log(event);
    if (event.platform == 'copy') {
      this._message.success('Link copied');
    } else {
      this._message.success(event.platform + ' share opened');
    }

    return of(true)
    .pipe(
      delay(1000),
    );
  };

  public openShare() {
    this._share.openDialog([
      Platform.Copy,
      Platform.Facebook,
      Platform.Twitter,
    ],
    this.config);
  };

  public beforeOpen = (shareEvent: ShareEvent) => {
    return of(true);
  };
}
