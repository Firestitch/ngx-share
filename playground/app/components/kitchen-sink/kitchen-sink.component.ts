import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { Platform, Platforms } from '@firestitch/package';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ShareConfig } from 'src/app/interfaces';
import { ShareEvent } from 'src/app/interfaces/share-event.interface';
import { FsShareService } from 'src/app/services/share.service';
import { FsShareComponent } from '../../../../src/app/components/share/share.component';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { FsColorPickerModule } from '@firestitch/colorpicker';
import { FsShareButtonComponent } from '../../../../src/app/components/share-button/share-button.component';


@Component({
    selector: 'kitchen-sink',
    templateUrl: './kitchen-sink.component.html',
    styleUrls: ['./kitchen-sink.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsShareComponent,
        MatButton,
        MatFormField,
        MatLabel,
        MatSelect,
        FormsModule,
        MatOption,
        MatInput,
        FsColorPickerModule,
        FsShareButtonComponent,
    ],
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
    private _message: FsMessage,
    private _share: FsShareService,
  ) {
  }

  public ngOnInit() {
    const url = window.location.hostname === 'localhost' ? 'https://google.com' : window.location.toString();

    this.config = {
      url,
      title: 'Title',
      image: 'https://www.petmd.com/sites/default/files/petmd-puppy-weight.jpg',
      description: 'Description',
      error: (event: ShareEvent) => {
        this._message.error(`Share failed - ${  event.error  } on the ${  event.platform  } platform`);
      },
    };
  }

  public afterOpen = (event) => {
    console.log(event);
    if (event.platform === 'copy') {
      this._message.success('Link copied');
    } else {
      this._message.success(`${event.platform  } share opened`);
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
  }

  public beforeOpen = (shareEvent: ShareEvent) => {
    return of({ 
      url: 'https://google.com',
    });
  };
}
