import { ShareResponse } from './share-response.interface';


export interface ShareConfig {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  success? (shareResponse: ShareResponse);
  error?: any;
}
