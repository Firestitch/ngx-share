import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Observable, Subject, of } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Share } from '../../classes/share';
import { Platforms } from '../../consts/platforms.const';
import { Method } from '../../enums/method.enum';
import { Platform } from '../../enums/platform.emun';
import { createShare } from '../../helpers/create-share';
import { ShareConfig } from '../../interfaces/share-config.interface';
import { ShareEvent } from '../../interfaces/share-event.interface';


@Component({
    selector: 'fs-share',
    templateUrl: './share.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FsShareComponent implements OnDestroy, OnInit {
  private _sanitizer = inject(DomSanitizer);


  @Input() public platform: Platform;
  @Input() public description = '';
  @Input() public title = '';
  @Input() public url = '';
  @Input() public image = '';
  @Input() public href: SafeUrl;
  @Input() public beforeOpen: (shareEvent: ShareEvent) => Observable<void|{ url: string }>;
  @Input() public afterOpen: (event: { platform: Platform }) => Observable<any>;

  public platformNames = {};
  public show = true;
  public safeHref: SafeUrl;

  private _destory$ = new Subject();
  private _share: Share;
  private _cdRef: ChangeDetectorRef;

  constructor() {
    this.platformNames = Platforms.reduce((result, value) => {
      result[value.value] = value.name;

      return result;
    }, {});
  }

  public click(mouseEvent: MouseEvent) {
    if (this._share.getMethod() === Method.Href) {
      return;
    }

    mouseEvent.preventDefault();

    of(true)
      .pipe(
        switchMap(() => {
          return this.beforeOpen$();
        }),
        tap(({ url }) => {
          if (this.platform === Platform.Copy) {
            navigator.clipboard.writeText(url);
  
          } else if (this._share.getMethod() === Method.Dialog) {
            this._dialog(url);
          }
        }),
        switchMap(() => {
          return this.afterOpen ? this.afterOpen({ 
            platform: this.platform, 
          }) : of(null);
        }),
        takeUntil(this._destory$),
      )
      .subscribe();
  }

  public beforeOpen$(): Observable<{ url: string }> {
    return (this.beforeOpen ? this.beforeOpen({ platform: this.platform }) : of(null))
      .pipe(
        map((event) => {
          const url = (event as any)?.url || this._share.config.url;

          return { url };
        }),
      );
  }

  public ngOnInit() {
    const config: ShareConfig = {
      url: this.url,
      description: this.description,
      title: this.title,
      image: this.image,
    };

    this._share = createShare(this.platform, config);
 
    if (this._share.getMethod() === Method.Href) {
      this.beforeOpen$()
        .pipe(
          tap(({ url }) => {
            const shareUrl = this._share.createUrl(url).toString();
            this.href = this._sanitizer.bypassSecurityTrustUrl(shareUrl);
            this._cdRef.detectChanges();
          }),
        )
        .subscribe();
    }
 
  }

  public ngOnDestroy() {
    this._destory$.next(null);
    this._destory$.complete();
  }

  private _dialog(url: string) {
    this._share.open(url)
      .pipe(
        takeUntil(this._destory$),
      )
      .subscribe();
  }
}
