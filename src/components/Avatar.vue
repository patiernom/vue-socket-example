<template>
  <div ref="containerRef" class="avatar">
    <img v-if="image" :src="image" class="image" :alt="name" />
    <span v-else-if="name" class="initials"> {{ name[0] }} </span>
    <span :class="'badge ' + status" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  image: {
    type: String,
    default: "",
  },

  name: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    default: "connected",
  },
});

const containerRef = ref();
const fontSize = ref("1rem");

onMounted(() => {
  // The font size should be 50% of the container width
  fontSize.value = `${containerRef.value.clientWidth * 0.5}px`;
});

const bgColor = computed(() => {
  // Don't show a color if the image is provided
  if (props.image) {
    return "transparent";
  }
  // Calculate the hue value based on the name
  const hue =
    props.name.split("").reduce((acc, cur) => {
      return acc + cur.charCodeAt(0);
    }, 0) % 360;
  return `hsla(${hue}, 60%, 50%, 1)`;
});
</script>

<style scoped>
.avatar {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* bind the background color to bgColor */
  background: v-bind(bgColor);
  position: relative;
}

.badge {
  position: absolute;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  top: 4px;
  right: 4px;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initials {
  /* bind the font-size to fontSize */
  font-size: v-bind(fontSize);
  color: white;
  font-family: sans-serif;
  user-select: none;
}
</style>
