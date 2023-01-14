<template>
  <div class="component-notes p-d-flex">
    <Textarea v-model="store.entry.note" />
  </div>
</template>
<script setup lang="ts">
import Textarea from 'primevue/textarea/Textarea';

import { useNotesStore } from '@/Stores/NotesStore';

const store = useNotesStore();
</script>

<style lang="scss">
.component-notes {
  textarea {
    flex-grow: 1;
  }
}
</style>
