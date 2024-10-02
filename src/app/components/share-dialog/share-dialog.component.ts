import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { Platform } from '../../enums/platform.emun';
import { ShareConfig } from '../../interfaces/share-config.interface';


@Component({
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

    this.shareConfig = this._data.shareConfig
  }

  public copy(): void {   
   
  }

  public open = (): Observable<any> => {
    this._dialogRef.close();

    return of(true);
  }
}
