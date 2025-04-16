<script setup>
import { onMounted, onUnmounted, provide, ref } from "vue";

import Sidebar from "@/components/Sidebar.vue";
import useConnection from "@/store/useConnection.js";

const showChat = ref(false);

const { setUpEventListeners, isConnected, connect, disconnect } =
  useConnection();

const toggleChat = function () {
  showChat.value = !showChat.value;
};

provide("showChat", { showChat, toggleChat });

onMounted(() => {
  // Connect to the socket server
  connect();

  // Set up event listeners
  setUpEventListeners();
});

onUnmounted(() => {
  // Clean up event listeners on component unmount
  disconnect();
});
</script>

<template>
  <div class="app">
    <header>
      <h1>Collaborative Workspace</h1>
      <div class="connection-status">
        <span
          class="status"
          :class="isConnected ? 'connected' : 'disconnected'"
        />
      </div>
    </header>
    <main>
      <Sidebar />
      <router-view v-if="isConnected" key="$route.path" />
    </main>
  </div>
</template>
