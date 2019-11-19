import { ShareEvent } from './share-event.interface';


export interface ShareConfig {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  success? (shareEvent: ShareEvent);
  open? (shareEvent: ShareEvent);
  beforeOpen? (shareEvent: ShareEvent);
  error? (shareEvent: ShareEvent);
}
