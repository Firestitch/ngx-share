import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Platform } from '../../enums/platform.emun';
import { Platforms } from '../../consts/platforms.const';


@Component({
  selector: 'fs-share-icon',
  templateUrl: './share-icon.component.html',
  styleUrls: ['./share-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsShareIconComponent implements OnChanges, OnInit {

  @ViewChild('object1', { static: true })
  public objectRef: ElementRef;

  @Input() public platform: Platform;
  @Input() public size: number = 20;
  @Input() public color: string;

  constructor(
    private _sanitizer: DomSanitizer,
  ) {}

  public get dataUrl() {
    return this._sanitizer
      .bypassSecurityTrustResourceUrl(`/assets/@firestitch/share/${this.platform}.svg`);
  }

  public ngOnInit(): void {
    this.setColor(this.color);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes.color) {
      this.setColor(changes.color.currentValue);
    }     
  }
  
  public setColor(color) {
    this.objectRef.nativeElement
    .addEventListener('load', (event) => {
      event.target.getSVGDocument().querySelectorAll('path')
        .forEach((el) => {
          if(!color) {
            const platform = Platforms
            .find((item) => (String(this.platform) === String(item.value)));
      
            if(platform) {
              color = platform.color;
            }      
          }               

          el.setAttribute('fill', color || '#ffffff');
        });
    });    
  }

}
