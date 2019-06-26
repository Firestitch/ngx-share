import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';

import { FsShareDirective } from './directives/share.directive';
import { FsShareService } from './services/share.service';

@NgModule({
  imports: [
    CommonModule,
    ClipboardModule
  ],
  exports: [
    FsShareDirective,
  ],
  entryComponents: [
  ],
  declarations: [
    FsShareDirective,
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
