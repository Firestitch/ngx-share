import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';

import { Platform } from '../../enums/platform.emun';
import { ShareConfig } from '../../interfaces/share-config.interface';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FsShareButtonComponent } from '../share-button/share-button.component';
import { FsShareComponent } from '../share/share.component';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: './share-dialog.component.html',
    styleUrls: ['./share-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        FsShareButtonComponent,
        FsShareComponent,
        MatButton,
        MatDialogActions,
        MatDialogClose,
    ],
})
export class ShareDialogComponent implements OnInit {

  public shareConfig: ShareConfig;
  public Platform = Platform;
  public platforms: Platform[];

  public buttonPlatforms = [];
  public copyPlatform = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _dialogRef: MatDialogRef<ShareDialogComponent>,
  ) {}

  public ngOnInit(): void {   
    this.buttonPlatforms = this._data.platforms
      .filter((platform) => platform !== Platform.Copy);

    this.copyPlatform = this._data.platforms
      .some((platform) => platform === Platform.Copy);      

    this.shareConfig = this._data.shareConfig;
  }

  public copy(): void {   
   
  }

  public afterOpen = (): Observable<any> => {
    this._dialogRef.close();

    return of(true);
  };
}
