<template>
    <div class="">
        <Editor v-model="state"></Editor>
    </div>
</template>

<script lang="ts" setup>
import data from './data.json';
import { TotalData } from './types';
import { editorConfig as config } from './util/editor-config';
const state = ref<TotalData>(data);
provide('config', config);
</script>

<style lang="scss" scoped></style>
