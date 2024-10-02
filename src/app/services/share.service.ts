import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from '../components/share-dialog/share-dialog.component';
import { Platforms } from '../consts/platforms.const';
import { Platform } from '../enums/platform.emun';
import { ShareConfig } from '../interfaces';


@Injectable()
export class FsShareService {

  private _platformNames;

  constructor(  
    private _dialog: MatDialog,
  ) {}
  
  public get platformNames() {

    if (!this._platformNames) {
      this._platformNames = Platforms.reduce((accum, value) => {
        return {
          ...accum,
          [value.value]: value.name,
        };
      }, {});
    }

    return this._platformNames;
  }

  public openDialog(platforms: Platform[], shareConfig: ShareConfig) {
    this._dialog.open(ShareDialogComponent, {
      data: {
        shareConfig,
        platforms,
      }
    });
  }

}
