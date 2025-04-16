import { computed, ref } from "vue";
import { socketService } from "@/services/socketService.js";

const message = ref();
const messages = ref([]);

/**
 * @typedef {Object} MessageData
 * @property {Date} createdAt
 * @property {string} text
 * @property {string} userId
 */

/**
 *
 * @returns {{updateTasks: (updatedTasks:MessageData[])=> void, messages: ComputedRef<Array<UnwrapRefSimple<MessageData>[]>>|MessageData[], message: Ref<string>, sendMessage: ()=>void}}
 */
export default function () {
  return {
    updateMessages: (updatedTasks) => {
      messages.value = updatedTasks;
    },
    messages: computed(() => messages.value),
    message,
    sendMessage: () => {
      socketService.sendMessage(message.value);
      message.value = "";
    },
  };
}
