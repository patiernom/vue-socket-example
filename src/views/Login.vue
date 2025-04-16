<script setup>
import useAuth from "../hooks/useAuth.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref();
const password = ref();

const { login, error } = useAuth();
const router = useRouter();

function handleLogin() {
  login({
    username: username.value,
    password: password.value,
    callback: () => {
      router.push({ name: "Dashboard" });
    },
  });
}
</script>

<template>
  <div class="login-container">
    <h2>Join Workspace</h2>
    <p>Enter your name and choose an avatar to get started</p>

    <form name="login-form">
      <div class="mb-3">
        <label for="username">Username: </label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="mb-3">
        <label for="password">Password: </label>
        <input type="password" id="password" v-model="password" />
      </div>
      <p class="error" v-if="error">{{ error }}</p>
      <button
        class="btn btn-outline-dark"
        type="submit"
        @click.prevent="handleLogin()"
      >
        Join Workspace
      </button>
    </form>
  </div>
</template>

<style scoped>
input[type="text"],
input[type="password"] {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.error {
  color: red;
}
</style>
