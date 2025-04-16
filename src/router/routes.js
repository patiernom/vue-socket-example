import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import { isAuthenticated } from "@/router/guards.js";

export default [
  { name: "Login", path: "/login", component: Login },
  {
    name: "Dashboard",
    path: "/",
    component: Dashboard,
    beforeEnter: isAuthenticated,
  },
];
