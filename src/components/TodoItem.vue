<script setup lang="ts">
defineProps<{ text: string; isCompleted: boolean }>();

const emit = defineEmits<{
  (e: "update_state"): void;
  (e: "update_text", text: string): void;
  (e: "delete"): void;
}>();

const handleToggleState = () => {
  emit("update_state");
};

const handleDeleteItem = () => {
  emit("delete");
};

const handleUpdateText = (e: Event) => {
  emit("update_text", (e.target as HTMLInputElement).value);
};
</script>

<template>
  <li>
    <input
      type="checkbox"
      :checked="isCompleted"
      :onclick="handleToggleState"
    />

    <input
      type="text"
      :value="text"
      v-on:change="handleUpdateText"
      :class="isCompleted ? 'completed' : ''"
    />

    <button class="delete-button" :onclick="handleDeleteItem">
      <img src="/icons/delete.svg" alt="Delete" width="20" height="20" />
    </button>
  </li>
</template>

<style scoped>
li {
  gap: 5px;
  display: flex;
  padding: 10px 10px;
}

li:hover {
  background-color: #e0f5fe;
}

input[type="text"] {
  width: 100%;

  border: none;
  outline: none;
  background-color: transparent;
}

button {
  border: none;
  cursor: pointer;
  background-color: transparent;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-items: center;
  align-items: center;
}

button:hover {
  background-color: #bae8fd;
}
</style>
