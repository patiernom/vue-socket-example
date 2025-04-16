<script setup>
import { inject } from "vue";

import Avatar from "./Avatar.vue";
import useAuth, { USER_STATUS, STATUS_BADGE } from "@/hooks/useAuth.js";

const { currentUser, changeStatus, isAuthenticated } = useAuth();
const { showChat, toggleChat } = inject("showChat");
</script>

<template>
  <div v-if="isAuthenticated" class="sidebar">
    <div class="sidebar-header">
      <Avatar
        :name="currentUser.name"
        :status="STATUS_BADGE[currentUser.status]"
      />
      <div class="status">
        <span>{{ currentUser.name }}</span>
        <select
          name="status"
          id="status"
          @change="(evt) => changeStatus(evt.target.value)"
        >
          <option
            v-for="item in Object.values(USER_STATUS)"
            :value="item"
            :key="item"
            :selected="item === currentUser.status"
          >
            {{ item }}
          </option>
        </select>
      </div>
    </div>
    <hr class="custom-hr" />
    <div>
      <div
        @click="toggleChat"
        :class="showChat ? 'link activeClass' : 'link inactiveClass'"
      >
        Team Chat
      </div>
    </div>
  </div>
</template>
