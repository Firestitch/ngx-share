import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsComponentComponent } from './components/component';
// import { FsComponentService } from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsComponentComponent,
  ],
  entryComponents: [
  ],
  declarations: [
    FsComponentComponent,
  ],
  providers: [
    // FsComponentService,
  ],
})
export class FsShareModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsShareModule,
      // providers: [FsComponentService]
    };
  }
}
