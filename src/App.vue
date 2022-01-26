<template>
  <router-view />
</template>
<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent } from 'vue';
import authService from './modules/Auth/services/auth.service';

export default defineComponent({
  name: 'App',
})
</script>
