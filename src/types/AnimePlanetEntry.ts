import { AnimePlanetMangaData } from '@/types/AnimePlanetMangaData';

export type AnimePlanetEntry = {
  slug: string;
  note: string;
  links: string[];
  data?: {
    manga?: AnimePlanetMangaData;
  };
  updated?: number | undefined;
};
