import { computed, ref } from "vue";

import { socketService } from "@/services/socketService.js";

const isConnected = ref(false);

export default function () {
  return {
    setUpEventListeners: () => {
      socketService.onConnect(() => {
        console.log("Connected to server");
        isConnected.value = true;
      });

      socketService.onDisconnect(() => {
        console.log("Disconnected from server");
        isConnected.value = false;
      });
    },
    connect: () => {
      socketService.connect();
    },
    disconnect: () => {
      socketService.disconnect();
    },
    isConnected: computed(() => isConnected.value),
  };
}
