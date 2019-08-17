import { Component, OnInit } from '@angular/core';
import { KitchenSinkConfigureComponent } from '../kitchen-sink-configure';
import { FsExampleComponent } from '@firestitch/example';
import { FsMessage } from '@firestitch/message';
import { ShareConfig } from 'src/app/interfaces';
import { Platforms } from '@firestitch/package';

@Component({
  selector: 'kitchen-sink',
  templateUrl: 'kitchen-sink.component.html',
  styleUrls: ['kitchen-sink.component.scss']
})
export class KitchenSinkComponent implements OnInit {

  public config: ShareConfig = {};
  public platforms = Platforms;

  constructor(private exampleComponent: FsExampleComponent,
              private _message: FsMessage) {
    exampleComponent.setConfigureComponent(KitchenSinkConfigureComponent, { config: this.config });
  }


  ngOnInit() {
    this.config = {
      url: 'https://google.com',
      title: 'Title',
      description: 'Description',
      success: (event) => {
        console.log(event);
        if (event.platform == 'copy') {
          this._message.success('Link copied');
        } else {
          this._message.success(event.platform + ' share complete');
        }
      },
      error: (event) => {
        this._message.error('Share failed - ' + event.error + ' on the ' + event.platform + ' platform');
      }
    };
  }

}
