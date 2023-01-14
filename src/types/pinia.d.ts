import 'pinia';

import { type SiteInfo } from '@/types/SiteInfo';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    siteInfo: SiteInfo;
  }
}
