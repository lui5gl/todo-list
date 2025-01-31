<script setup lang="ts">
defineProps<{ text: string; isCompleted: boolean }>();

const emit = defineEmits<{ (e: "update"): void; (e: "delete"): void }>();

const handleToggleState = () => {
  emit("update");
};

const handleDeleteItem = () => {
  emit("delete");
};
</script>

<template>
  <li>
    <input
      type="checkbox"
      :checked="isCompleted"
      :onclick="handleToggleState"
    />
    <span :class="isCompleted ? 'completed' : ''">{{ text }}</span>
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
