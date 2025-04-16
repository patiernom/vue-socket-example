import { computed, ref } from "vue";

const tasks = ref([]);

/**
 * @typedef {'todo'|'in-progress'|'in-reviews'|'done'} TaskStatus
 */

/**
 * @typedef {Object} TaskData
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} createdBy
 * @property {string} description
 * @property {string} description
 * @property {string} id
 * @property {string} title
 * @property {TaskStatus} status
 */

/**
 *
 * @returns {{updateTasks: (updatedTasks:TaskData[])=> void, tasks: ComputedRef<Array<UnwrapRefSimple<TaskData>[]>>|TaskData[], getColumnTasks: (function(*): UnwrapRefSimple<TaskData>[]|TaskData[])}}
 */
export default function () {
  return {
    updateTasks: (updatedTasks) => {
      tasks.value = updatedTasks;
    },
    tasks: computed(() => tasks.value),
    /**
     * Function to get the tasks for the column
     * @param {TaskStatus} columnState
     * @returns {TaskData[]}
     */
    getColumnTasks: (columnState) =>
      tasks.value.filter(
        /**
         * @param {TaskData} item
         * @returns {boolean}
         */
        (item) => item.status === columnState,
      ),
  };
}
