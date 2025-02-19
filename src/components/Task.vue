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
    <input type="checkbox" :checked="isCompleted" @change="handleToggleState" />

    <textarea
      :value="text"
      @change="handleUpdateText"
      :class="isCompleted ? 'completed' : ''"
    />

    <button class="delete-button" :onclick="handleDeleteItem">
      <img src="/icons/delete.svg" alt="Delete" width="20" height="20" />
    </button>
  </li>
</template>

<style scoped>
li {
  gap: 10px;
  display: flex;
  min-height: 50px;
  padding: 10px 10px;
  justify-items: center;
  transition: all 150ms ease-in-out;
  border-bottom: 1px solid #737373;
}

li:hover > button {
  display: flex;
}

li:focus > button {
  display: flex;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #e5e5e5;
}

textarea {
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  field-sizing: content;
  resize: none;
}

textarea::selection {
  color: #e5e5e5;
  background-color: #262626;
}

input[type="checkbox"] {
  accent-color: #262626;
}

.completed {
  text-decoration: line-through;
}

button {
  background-color: transparent;
  border-radius: 4px;
  border: none;
  display: none;
  height: fit-content;
  padding: 5px;
  transition: all 75ms;
  width: fit-content;
}

button:hover {
  background-color: #d4d4d4;
}
</style>
