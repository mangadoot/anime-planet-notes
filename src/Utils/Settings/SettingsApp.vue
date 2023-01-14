<template>
  <div class="settingsapp">
    <Dialog header="Settings" :visible.sync="showDialog" :modal="true" :style="{ width: '25vw' }">
      <div>{{ entriesLength }} entries in store</div>
      <Divider />
      <Button label="Export entries" icon="pi pi-save" @click="exportEntries()" />

      <template #footer>
        <Button label="Close" icon="pi pi-times" class="p-button-text" @click="showDialog = false" />
        <!--<Button label="Save" icon="pi pi-check" @click="save()" />-->
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { default as EventEmitter } from 'eventemitter3';
import { saveAs } from 'file-saver';
import Button from 'primevue/button/Button';
import Dialog from 'primevue/dialog/Dialog';
import Divider from 'primevue/divider/Divider';
import { Logger } from 'ts-log';
import { inject, ref } from 'vue';

import { useNotesStore } from '@/Stores/NotesStore';
import DefaultSettings from '@/Utils/Settings/DefaultSettings';
import { SettingsEventType } from '@/Utils/Settings/Settings';
import { SettingsType } from '@/Utils/Settings/SettingsType';

const store = useNotesStore();

let showDialog = ref(false);
let entriesLength = ref(0);

const eventEmitter = inject<EventEmitter<SettingsEventType>>('eventEmitter');
eventEmitter?.on('openDialog', (settings) => {
  showDialog.value = true;
  loadSettings(settings);
  entriesLength.value = store.allEntries().length;
});
const logger = inject<Logger>('logger');

function save(): void {
  logger?.info('saving settings ...');
  showDialog.value = false;
  // const settings: SettingsType = {
  //   enabled: enabled.value,
  // };
  // eventEmitter?.emit('newSettings', settings);
}

function loadSettings(payload?: Partial<SettingsType>): void {
  const settings = DefaultSettings.merge(payload);
  logger?.info('loading settings ...', settings);
  // enabled.value = settings.enabled;
}

function exportEntries(): void {
  const data = JSON.stringify(store.allEntries(), undefined, 2);
  const filename = `anime-planet-notes.export.${dayjs().format('YYYY-MM-DD-HH-mm-ss')}.json`;
  logger?.info(`will export data as ${filename}`, data);
  saveAs(new Blob([data], { type: 'application/json;charset=utf-8' }), filename);
}
</script>
