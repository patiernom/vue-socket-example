<script setup>
import { ref, onMounted, inject } from "vue";
import { socketService } from "../services/socketService.js";
import KanbanBoard from "../components/KanbanBoard.vue";
import useTasks from "../hooks/useTasks.js";
import useAuth from "../hooks/useAuth.js";

const workspace = ref(null);
const message = ref();

const { currentUser } = useAuth();
const { updateTasks } = useTasks();
const { showChat } = inject("showChat");

onMounted(() => {
  socketService.onWorkspaceUpdate((data) => {
    console.log("Workspace updated:", data);
    workspace.value = data;
    updateTasks(data.tasks);
  });
});

function sendMessage() {
  socketService.sendMessage(message.value);
  message.value = "";
}
</script>

<template>
  <div class="workspace-container">
    <div v-if="workspace">
      <h2>Welcome, {{ currentUser.name }}!</h2>
      <p>There are {{ workspace.users.length - 1 }} users online.</p>
      <KanbanBoard />
      <div class="chat" v-if="showChat">
        <div class="view">
          <div v-for="item in workspace.messages" class="message">
            <b>{{ item.userId }}</b>
            <span>
              {{ item.text }} <small> {{ item.createdAt }} </small>
            </span>
          </div>
        </div>
        <form name="message-form">
          <input type="text" id="message" v-model="message" />
          <button
            class="btn btn-outline-dark"
            type="submit"
            @click.prevent="sendMessage()"
          >
            Send
          </button>
        </form>
      </div>
    </div>
    <p v-else>Loading workspace data...</p>
  </div>
</template>

<style scoped>
input[type="text"] {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 15px 0 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.chat {
  position: absolute;
  transition: all ease-in-out 0.3s;
  background: #ccc;
  padding: 1em;
  box-sizing: border-box;
  height: 300px;
  width: 70%;
  bottom: 0;
  display: flex;
  flex-direction: column;
}

.view {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 15px;
  overflow: scroll;
}

.message {
  display: flex;
  flex-direction: column;
}
</style>
