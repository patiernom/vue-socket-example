<script setup>
import { ref } from "vue";

import { socketService } from "@/services/socketService.js";
import useTasks from "@/store/useTasks.js";

const STATUS_TITLE = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  IN_REVIEWS: "In Reviews",
  DONE: "Done",
};

const STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  IN_REVIEWS: "in-reviews",
  DONE: "done",
};

const onNew = ref(null);
const onEdit = ref(null);
const title = ref(null);
const description = ref(null);

const { getColumnTasks } = useTasks();

function startDrag(evt, item) {
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.effectAllowed = "move";
  evt.dataTransfer.setData("itemID", item.id);
}

function onDrop(evt, list) {
  const itemID = evt.dataTransfer.getData("itemID");
  socketService.moveTask(itemID, list);
}

function edit(item) {
  onEdit.value = item.id;
  title.value = item.title;
  description.value = item.description;
}

function update() {
  socketService.updateTask({
    id: onEdit.value,
    title: title.value,
    description: description.value,
  });

  onEdit.value = null;
  title.value = null;
  description.value = null;
}

function addTask(status) {
  onNew.value = status;
}

function add(status) {
  socketService.updateTask({
    id: onEdit.value,
    title: title.value,
    description: description.value,
  });

  socketService.createTask({
    title: title.value,
    description: description.value,
    status,
  });

  onNew.value = null;
  title.value = null;
  description.value = null;
}
</script>

<template>
  <div class="column-container">
    <div
      v-for="state in Object.keys(STATUS)"
      :key="STATUS[state]"
      :id="STATUS[state]"
      class="task-column"
    >
      <h3>{{ STATUS_TITLE[state] }}</h3>
      <hr class="custom-hr" />
      <div
        class="task-list drop-zone"
        @drop="onDrop($event, STATUS[state])"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          v-for="item in getColumnTasks(STATUS[state])"
          :key="item.title"
          class="drag-el"
          :draggable="true"
          @dragstart="startDrag($event, item)"
          @dblclick="edit(item)"
        >
          <div v-if="onEdit === item.id">
            <div>
              <label for="title">title: </label>
              <input type="text" id="title" v-model="title" />
            </div>
            <div>
              <label for="description">description: </label>
              <input type="text" id="description" v-model="description" />
            </div>
            <div>
              <button
                class="btn btn-outline-dark"
                type="submit"
                @click.prevent="update()"
              >
                update
              </button>
            </div>
          </div>
          <div v-else>
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </div>
        </div>

        <div class="add-task">
          <div v-if="onNew === STATUS[state]">
            <div>
              <label for="title">title: </label>
              <input type="text" id="title" v-model="title" />
            </div>
            <div>
              <label for="description">description: </label>
              <input type="text" id="description" v-model="description" />
            </div>
            <div>
              <button
                class="btn btn-outline-dark"
                type="submit"
                @click.prevent="add(STATUS[state])"
              >
                Save task
              </button>
            </div>
          </div>
          <button
            v-else
            class="btn btn-outline-dark"
            type="submit"
            @click.prevent="addTask(STATUS[state])"
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="text"] {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.drop-zone {
  margin: 10px 0;
}

.drag-el {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 4px;
  cursor: move;
}

input[type="text"] {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.add-task {
  align-self: end;
}
</style>
