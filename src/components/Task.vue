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
    <label :class="['check', isCompleted ? 'check-completed' : '']">
      <img
        v-if="isCompleted"
        src="/icons/check.svg"
        alt="Toggle state"
        class="check-icon"
        width="12"
        height="12"
      />
      <input
        type="checkbox"
        :checked="isCompleted"
        @change="handleToggleState"
      />
    </label>

    <textarea
      :value="text"
      @change="handleUpdateText"
      placeholder="Add a task"
      :class="isCompleted ? 'completed' : ''"
    ></textarea>

    <button class="delete-button" :onclick="handleDeleteItem">
      <img src="/icons/delete.svg" alt="Delete" width="18" height="18" />
    </button>
  </li>
</template>

<style scoped>
li {
  gap: 10px;
  padding: 10px;
  display: flex;
  align-items: start;
  justify-items: center;
  transition: all 150ms ease-in-out;
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
  resize: none;
  outline: none;
  field-sizing: content;
  background-color: transparent;
}

textarea::selection {
  color: #e5e5e5;
  background-color: #262626;
}

.check {
  border: 2px solid #443f3f;
  border-radius: 8px;
  width: 20px;
  height: 20px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-completed {
  background-color: #5d5d5d;
  border-color: #5d5d5d;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked {
  label {
    background-color: #443f3f;
  }

  background-color: #443f3f;
}

.completed {
  text-decoration: line-through;
}

button {
  align-items: center;
  border-radius: 4px;
  padding: 5px;
  border: none;
  display: flex;
  height: fit-content;
  justify-content: center;
  transition: all 75ms;
  width: fit-content;
  background-color: transparent;
}

button:hover {
  background-color: #d4d4d4;
}
</style>
