<template>
  <div class="component-notes-footer">
    <div v-if="showFooter">
      <span v-if="lastUpdate.length > 0">Updated: {{ lastUpdate }}</span>
      <span v-if="lastSavedData.length > 0"> | Last saved data: {{ lastSavedData }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { unix } from 'dayjs';
import { computed } from 'vue';

import { useNotesStore } from '@/Stores/NotesStore';
import { MangaStatusIdToName } from '@/types/MangaStatus';

const store = useNotesStore();
const lastUpdate = computed(() => {
  if (store.entry.updated !== undefined) {
    return unix(store.entry.updated).format('MMM DD, YYYY');
  }
  return '';
});
const lastSavedData = computed(() => {
  const data = store.entry.data?.manga;
  if (data === undefined) {
    return '';
  }
  let text = `Status: ${MangaStatusIdToName[data.status]}`;
  if (Number(data.volumes) > 0) {
    text += ` | Vols: ${data.volumes}`;
  }
  if (Number(data.chapters) > 0) {
    text += ` | Chs: ${data.chapters}`;
  }
  return text;
});
const showFooter = computed(() => lastUpdate.value.length > 0 || store.entry.data?.manga !== undefined);
</script>
<style lang="scss">
.component-notes-footer {
  div {
    font-size: 0.8rem;
    opacity: 0.7;
    margin: 10px 0;
  }
}
</style>
