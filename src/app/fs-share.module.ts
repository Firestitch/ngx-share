import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';

import { FsShareService } from './services/share.service';
import { FsShareButtonComponent } from './components/share-button/share-button.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { FsShareComponent } from './components/share/share.component';
import { FsShareIconComponent } from './components/share-icon/share-icon.component';


@NgModule({
  imports: [
    CommonModule,
    ClipboardModule,
    DeviceDetectorModule
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
