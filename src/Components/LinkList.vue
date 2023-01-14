<template>
  <div class="component-linklist">
    <div class="p-d-flex">
      <h2>Custom links:</h2>
      <div class="p-d-flex p-dir-col p-jc-center p-ml-2">
        <Button icon="pi pi-plus" class="p-button-icon icon-button--s" @click="showDialog = true" />
      </div>
    </div>

    <div v-for="link in store.entry.links" :key="link" class="p-pb-2">
      <Button icon="pi pi-minus" class="p-button-icon icon-button--xs p-button-warning" @click="removeLink(link)" />
      <a :href="link" target="_blank">{{ link }}</a>
    </div>

    <LinkAdd :show-dialog.sync="showDialog" @save="onLinkSave" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button/Button';
import { ref } from 'vue';

import LinkAdd from '@/Components/LinkAdd.vue';
import { useNotesStore } from '@/Stores/NotesStore';

const store = useNotesStore();
const showDialog = ref(false);

function onLinkSave(newLink: string): void {
  store.entry.links.push(newLink);
  showDialog.value = false;
}
function removeLink(link: string): void {
  const linkIndex = store.entry.links.indexOf(link);
  if (linkIndex !== -1) {
    store.entry.links.splice(linkIndex, 1);
  }
}
</script>

<style lang="scss">
.component-linklist {
  .icon-button--s,
  .icon-button--xs {
    padding: 4px;
    width: inherit;

    span {
      font-size: 0.75rem;
    }
  }

  .icon-button--xs {
    padding: 2px;
    span {
      font-size: 0.5rem;
    }
  }
}
</style>
