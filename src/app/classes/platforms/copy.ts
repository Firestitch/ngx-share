import { Share } from '../share';
import { Platform } from '../../enums/platform.emun';

export class CopyShare extends Share {

  public platform = Platform.Copy;

  public createUrl() {
    return new URL('');
  }

  public getMethod() {
    return null;
  }
}
