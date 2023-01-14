import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import { getSiteInfo } from '@/SiteInfo';
import { type AnimePlanetEntry } from '@/types/AnimePlanetEntry';

interface State {
  entry: AnimePlanetEntry;
}

type EntryCollection = Array<{ key: string; value: AnimePlanetEntry }>;

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
    importEntries(entries: EntryCollection): void {
      // this.entry
    },
  },
  getters: {
    currentKey: (): string => {
      const siteInfo = getSiteInfo();
      return `apn:${siteInfo.type}:${siteInfo.id}`;
    },
    allEntries: (): (() => EntryCollection) => {
      return () => {
        const entries: EntryCollection = [];
        for (let index = 0; index < localStorage.length; index++) {
          const key = localStorage.key(index);
          if (key === null || !key.startsWith('apn:')) {
            continue;
          }
          const value = useLocalStorage(key, {}, { writeDefaults: false }).value as unknown as AnimePlanetEntry;
          entries.push({ key, value });
        }
        return entries;
      };
    },
  },
});
