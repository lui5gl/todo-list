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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
        />
      </svg>
    </button>
  </li>
</template>

<style scoped>
li {
  gap: 5px;
  width: 100%;
  display: flex;
  padding: 5px;
  align-items: center;
  transition: background-color 150ms ease-in-out;

  &:hover {
    background-color: #f1f5f9;
  }
}

input[type="text"] {
  border: none;
  padding: 5px;
  width: 100%;
  background-color: transparent;

  &:focus {
    outline: none;
  }
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #295e4c;
}

.completed {
  text-decoration: line-through #2f6c56;
}

.delete-button {
  width: 24px;
  border: none;
  height: 24px;
  margin-left: auto;
  border-radius: 4px;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: #295e4c;
    stroke: white;

    & svg path {
      stroke: white;
    }
  }
}
</style>
