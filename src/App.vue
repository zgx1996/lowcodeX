<template>
    <div class="">
        <Editor v-model="state"></Editor>
    </div>
</template>

<script lang="ts" setup>
import data from './data.json';
import { editorConfig as config } from './util/editor-config';
const state = ref(data);
provide('config', config);
</script>

<style lang="scss" scoped></style>
