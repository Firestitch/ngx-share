import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';

import { FsShareDirective } from './directives/share.directive';
import { FsShareService } from './services/share.service';
import { FsShareButtonComponent } from './components/share-button/share-button.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { FsShareComponent } from './components/share/share.component';


@NgModule({
  imports: [
    CommonModule,
    ClipboardModule,
    DeviceDetectorModule
  ],
  exports: [
    FsShareComponent,
    FsShareButtonComponent
  ],
  entryComponents: [
  ],
  declarations: [
    FsShareComponent,
    FsShareButtonComponent
  ],
  providers: [
    FsShareService,
  ],
})
export class FsShareModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsShareModule,
      providers: [FsShareService]
    };
  }
}
