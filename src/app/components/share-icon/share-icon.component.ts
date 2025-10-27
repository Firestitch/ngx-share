import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Subject } from 'rxjs';

import { Platforms } from '../../consts/platforms.const';
import { Platform } from '../../enums/platform.emun';
import { hexToCSSFilter } from '../../models/hex-to-css-filter';


@Component({
    selector: 'fs-share-icon',
    templateUrl: './share-icon.component.html',
    styleUrls: ['./share-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FsShareIconComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public platform: Platform;
  @Input() public size: number = 20;
  @Input() public color;
  @Input() public origin: string;
  @Input() public url: string;

  public svg: SafeHtml;

  private _destroy$ = new Subject();
  
  constructor(
    private _sanitizer: DomSanitizer,
    private _cdRef: ChangeDetectorRef,
    private _el: ElementRef,
  ) {}

  public ngOnInit(): void {
    if(!this.color) {
      const platform = Platforms.find((item) => {
        return item.value === this.platform;
      }); 

      if(platform) {
        this.setColor(platform.color);
      }
    }
  }

  public get svgUrl() {
    if(this.url) {
      return this.url;
    }

    const url = new URL(`/assets/share/${this.platform}.svg`, this.origin || location.origin);

    return url.toString();
  }

  public get dataUrl() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes.color?.currentValue) {
      this.setColor(changes.color.currentValue);
    }     
  }

  public setColor(hex) {
    const cssFilter = hexToCSSFilter(hex);
    const filter = cssFilter.filter.replace(/;$/i, '');
    this._el.nativeElement.style.setProperty('--icon-filter', filter);    
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
