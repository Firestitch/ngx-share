import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsShareService } from './services/share.service';
import { FsShareButtonComponent } from './components/share-button/share-button.component';
import { FsShareComponent } from './components/share/share.component';
import { FsShareIconComponent } from './components/share-icon/share-icon.component';
import { DeviceDetectorService } from 'ngx-device-detector';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsShareComponent,
    FsShareButtonComponent,
    FsShareIconComponent,
  ],
  declarations: [
    FsShareComponent,
    FsShareButtonComponent,
    FsShareIconComponent,
  ],
  providers: [
    DeviceDetectorService,
  ]
})
export class FsShareModule {
  static forRoot(): ModuleWithProviders<FsShareModule> {
    return {
      ngModule: FsShareModule,
      providers: [FsShareService]
    };
  }
}
