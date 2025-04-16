import { computed, ref } from "vue";
import { find, propEq } from "ramda";

import { socketService } from "@/services/socketService.js";
import { isNilOrEmpty } from "@/mixins/common.js";

export const USER_STATUS = {
  ACTIVE: "active",
  AWAY: "away",
  DO_NOT_DISTURB: "do not disturb",
};

export const STATUS_BADGE = {
  active: "connected",
  away: "away",
  "do not disturb": "disconnected",
};

const mockUserdata = [
  {
    name: "Marco Patierno",
    username: "marco.patierno",
    avatar: "MP",
    status: USER_STATUS.ACTIVE,
  },
  {
    name: "Bob Marley",
    username: "bob.marley",
    avatar: "BM",
    status: USER_STATUS.ACTIVE,
  },
];

const isAuthenticated = ref(false);
const currentUser = ref();
const error = ref();

/**
 * Enum of the user status
 * @typedef {'active'|'away'|'do not disturb'} UserStatus
 */

/**
 * User Object
 * @typedef {Object} UserData
 * @property {string} id
 * @property {string} name
 * @property {string} avatar
 * @property {Date} lastActive
 */

/**
 * Hook to get handle the current user
 * @returns {{login: ((function({username:string, password: string, callback:void}): Promise<void>)|*), isAuthenticated: ComputedRef<boolean>|boolean, error: ComputedRef<string|undefined>|string|undefined, currentUser: ComputedRef<UserData>|UserData, changeStatus: ((function(status:UserStatus): Promise<void>)|*)}}
 */
export default function () {
  return {
    /**
     * Function to authenticate the user
     * @param username - Username of the user
     * @param password - Password of the user
     * @param callback - Function to execute on success
     * @returns {Promise<void>}
     */
    login: async ({ username, password, callback }) => {
      if (
        !isNilOrEmpty(username) &&
        !isNilOrEmpty(password) &&
        ["marco.patierno", "bob.marley"].includes(username)
      ) {
        const user = find(propEq(username, "username"))(mockUserdata);

        socketService.joinWorkspace({ name: user.name, avatar: user.avatar });

        currentUser.value = {
          id: socketService.getSocketId(),
          ...user,
        };

        isAuthenticated.value = true;

        callback();
      } else {
        console.error("Invalid username or password");
        error.value = "Invalid username or password";
      }
    },
    isAuthenticated: computed(() => isAuthenticated.value),
    currentUser: computed(() => currentUser.value),
    error: computed(() => error.value),
    /**
     * Function to modify the current user state
     * @param {TaskStatus} status
     */
    changeStatus: (status) => {
      socketService.updateStatus(status); // 'active', 'away', or 'do-not-disturb'
      currentUser.value = {
        ...currentUser.value,
        status,
      };
    },
  };
}
