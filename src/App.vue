<template>
  <div class="">
    <editor v-model="state"></editor>
  </div>
</template>

<script lang="ts" setup>

import data from './data.json'
import { MetaData } from './types';
import { editorConfig as config } from './util/editor-config'
const state = ref(data)
provide('config',config)
</script>

<style lang="scss" scoped>

</style>