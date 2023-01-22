<template>
  <div class="component-notes-footer">
    <div v-if="lastUpdate.length > 0">Updated: {{ lastUpdate }}</div>
  </div>
</template>

<script setup lang="ts">
import { unix } from 'dayjs';
import { computed } from 'vue';

import { useNotesStore } from '@/Stores/NotesStore';

const store = useNotesStore();
const lastUpdate = computed(() => {
  if (store.entry.updated !== undefined) {
    return unix(store.entry.updated).format('MMM DD, YYYY');
  }
  return '';
});
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
