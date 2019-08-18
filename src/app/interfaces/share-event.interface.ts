import { Platform } from '../enums/platform.emun';

export interface ShareEvent {
  platform: Platform;
  error?: string
}
