import { Component } from '@angular/core';
import { KitchenSinkConfigureComponent } from '../kitchen-sink-configure';
import { FsExampleComponent } from '@firestitch/example';
import { FsMessage } from '@firestitch/message';
import { observable, Observable, of } from 'rxjs';
import { ShareConfig } from 'src/app/interfaces';

@Component({
  selector: 'kitchen-sink',
  templateUrl: 'kitchen-sink.component.html',
  styleUrls: ['kitchen-sink.component.scss']
})
export class KitchenSinkComponent {

  public config = {};

  constructor(private exampleComponent: FsExampleComponent,
              private message: FsMessage) {
    exampleComponent.setConfigureComponent(KitchenSinkConfigureComponent, { config: this.config });
  }


  getShareConfig(medium) {
    return {
      url: 'https://google.com',
      title: 'Google It!',
      success: (response) => {
        console.log(response, medium);
        if (medium == 'copy') {
          alert('Link copied.');
        } else {
          alert('Share complete.');
        }
      },
      fail: (msg) => {
        alert('Share failed - ' + msg);
      }
    };
  }

}
