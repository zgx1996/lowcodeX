<template>
  <div class="">
    <Editor></Editor>
  </div>
</template>

<script lang="ts" setup>
import { editorConfig as config } from './util/editor-config';
provide('config', config);
</script>

<style lang="scss" scoped></style>
