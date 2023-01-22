<template>
  <div class="notes-app">
    <h2>Custom notes:</h2>
    <NotesView />
    <LinkList />
    <NotesFooter />
  </div>
</template>

<script setup lang="ts">
import LinkList from '@/Components/LinkList.vue';
import NotesFooter from '@/Components/NotesFooter.vue';
import NotesView from '@/Components/NotesView.vue';
</script>
