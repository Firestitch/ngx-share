import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FsShareService } from './services/share.service';
import { FsShareButtonComponent } from './components/share-button/share-button.component';
import { FsShareComponent } from './components/share/share.component';
import { FsShareIconComponent } from './components/share-icon/share-icon.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ShareDialogComponent } from './components';


@NgModule({
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule,
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
    ShareDialogComponent,
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
