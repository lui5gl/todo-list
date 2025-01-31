<script setup lang="ts">
defineProps<{ text: string; isCompleted: boolean }>();
</script>

<template>
  <li>
    <input type="checkbox" :checked="isCompleted" />
    <span :class="isCompleted ? 'completed' : ''">{{ text }}</span>
  </li>
</template>

<style scoped>
li {
  gap: 5px;
  width: 100%;
  display: flex;
  padding: 5px 0;
  align-items: center;
  border-top: 1px solid #737373;
  border-bottom: 1px solid #737373;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #262626;

  &:checked {
    span {
      text-decoration: line-through;
    }
  }
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
