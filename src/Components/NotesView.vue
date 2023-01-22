<template>
  <div class="component-notes p-d-flex">
    <Textarea v-model="note" />
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import Textarea from 'primevue/textarea/Textarea';
import { ref, watch } from 'vue';

import { useNotesStore } from '@/Stores/NotesStore';

const store = useNotesStore();
const note = ref(store.entry.note);

watch(note, async (newNote) => {
  store.entry.note = newNote;
  store.entry.updated = dayjs().unix();
});
</script>

<style lang="scss">
.component-notes {
  textarea {
    flex-grow: 1;
  }
}
</style>
