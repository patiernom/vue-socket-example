<script setup>
import { onMounted, onUnmounted, provide, ref } from "vue";

import { socketService } from "./services/socketService.js";
import Sidebar from "./components/Sidebar.vue";

const isConnected = ref(false);
const showChat = ref(false);

const toggleChat = function () {
  showChat.value = !showChat.value;
};

provide("showChat", { showChat, toggleChat });

onMounted(() => {
  // Connect to the socket server
  socketService.connect();

  // Set up event listeners
  socketService.onConnect(() => {
    console.log("Connected to server");
    isConnected.value = true;
  });

  socketService.onDisconnect(() => {
    console.log("Disconnected from server");
    isConnected.value = false;
  });
});

onUnmounted(() => {
  // Clean up event listeners on component unmount
  socketService.disconnect();
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
