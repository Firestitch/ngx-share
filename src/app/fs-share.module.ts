import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FsShareButtonComponent } from './components/share-button/share-button.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { FsShareIconComponent } from './components/share-icon/share-icon.component';
import { FsShareComponent } from './components/share/share.component';
import { FsShareService } from './services/share.service';


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
})
export class FsShareModule {
  static forRoot(): ModuleWithProviders<FsShareModule> {
    return {
      ngModule: FsShareModule,
      providers: [FsShareService]
    };
  }
}
