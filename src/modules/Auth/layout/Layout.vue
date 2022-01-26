<template>
  <q-layout view="lHh LpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          🥗 Manzana APP
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="full-height">
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script lang="ts">
  import {defineComponent} from "vue";

  export default defineComponent({
    name: "AuthLaoyut",
  })
</script>
