import { SiteInfo } from '@/types/SiteInfo';

let info: SiteInfo | undefined;

export const provideSiteInfo = (siteInfo: SiteInfo): void => {
  info = siteInfo;
};

export const getSiteInfo = (): SiteInfo => {
  if (info === undefined) {
    throw new Error('siteinfo was not provided');
  }
  return info;
};
