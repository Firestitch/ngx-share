import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsShareDirective } from './directives';
import { FsShareService } from './services';

@NgModule({
  imports: [
    CommonModule,
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
