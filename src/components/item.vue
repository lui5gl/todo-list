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
      <img src="/icons/delete.svg" alt="delete" height="16" width="16" />
    </button>
  </li>
</template>

<style scoped>
li {
  gap: 5px;
  width: 100%;
  display: flex;
  padding: 5px 0;
  align-items: center;
}

input[type="text"] {
  border: none;
  padding: 5px;
  width: 100%;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #262626;
}

.completed {
  text-decoration: line-through;
}

.delete-button {
  border: none;
  margin-left: auto;
  background-color: transparent;
  width: 24px;
  height: 24px;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background-color: #e5e5e5;
  }
}
</style>
