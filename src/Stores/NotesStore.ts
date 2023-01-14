import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import { getSiteInfo } from '@/SiteInfo';
import { type AnimePlanetEntry } from '@/types/AnimePlanetEntry';

interface State {
  entry: AnimePlanetEntry;
}

const defaultEntry: AnimePlanetEntry = {
  slug: '',
  links: [],
  note: '',
};

export const useNotesStore = defineStore('anime-planet-store', {
  state: (): State => {
    const siteInfo = getSiteInfo();
    return {
      entry: useLocalStorage(
        `apn:${siteInfo.type}:${siteInfo.id}`,
        { ...defaultEntry, slug: siteInfo.slug },
        {
          writeDefaults: false,
        },
      ) as unknown as AnimePlanetEntry,
    };
  },
  actions: {
    // tbd(note: string): void {
    // },
  },
  getters: {
    // tbdgetter(): string {
    // },
  },
});
