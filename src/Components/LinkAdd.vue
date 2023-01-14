<template>
  <div v-if="showDialog" class="component-linkadd">
    <Dialog :visible.sync="dialogVisible" header="Add link" @show="onShow">
      <InputText id="newLink" ref="inputReference" v-model="newLink" type="url" :style="{ width: '30vw' }" />
      <Button icon="pi pi-save" @click="addLink" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button/Button';
import Dialog from 'primevue/dialog/Dialog';
import InputText from 'primevue/inputtext/InputText';
import { ref, watch } from 'vue';

const newLink = ref('');
const inputReference = ref();

const properties = defineProps({
  showDialog: Boolean,
});
const emit = defineEmits<{
  (event: 'save', value: string): void;
  (event: 'update:showDialog', value: boolean): void;
}>();

const dialogVisible = ref(properties.showDialog);
watch(dialogVisible, (newValue) => emit('update:showDialog', newValue));
watch(
  () => properties.showDialog,
  (newValue) => (dialogVisible.value = newValue),
);

function addLink(): void {
  emit('save', newLink.value);
  newLink.value = '';
}
function onShow(): void {
  inputReference.value?.$el.focus();
}
</script>
