<script setup>
import { ref, watchEffect } from 'vue';

defineProps({
  msg: {
    type: String,
    default: 'Hello',
  },
});

const count = ref(0);

const API_URL = `/api/user`;
const user = ref(null);

watchEffect(async () => {
  const url = `${API_URL}?id=1`;
  user.value = (await (await fetch(url)).json()).user;
});
</script>

<template>
  <h1>{{ msg }}</h1>
  <h2 v-if="user">User: {{ user?.name }}</h2>
  <h2 v-else>Loading... 👾</h2>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
