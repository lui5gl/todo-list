<script setup lang="ts">
import { ref } from "vue";

defineProps<{ text: string; isCompleted: boolean }>();

const isMenuOpen = ref(false);

const emit = defineEmits<{
  (e: "update_state"): void;
  (e: "update_text", text: string): void;
  (e: "delete"): void;
}>();

const handleToggleState = () => {
  emit("update_state");
};

const handleDeleteItem = () => {
  const confirmation = confirm("Are you sure you want to delete this task?");
  if (!confirmation) return;

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

    <div class="options">
      <button class="options-button" @click="isMenuOpen = !isMenuOpen">
        <img src="/icons/options.svg" alt="Options" width="14" height="14" />
      </button>
      <div :class="['options-menu', isMenuOpen ? 'options-menu-show' : '']">
        <button class="options-menu-button">Archive</button>
        <button @click="handleDeleteItem" class="options-menu-button">
          Delete
        </button>
      </div>
    </div>
  </li>
</template>

<style scoped>
li {
  gap: 10px;
  padding: 10px;
  display: flex;
  border-radius: 8px;
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
  border: 2px solid #4f4f4f;
  border-radius: 8px;
  width: 20px;
  height: 20px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-completed {
  background-color: #4f4f4f;
  border-color: #4f4f4f;
}

input[type="checkbox"] {
  display: none;
}

.completed {
  text-decoration: line-through;
}

.options {
  position: relative;
}

.options-button {
  border-radius: 8px;
  width: 25px;
  height: 25px;
  aspect-ratio: 1;
  justify-content: center;
  background-color: transparent;
  display: flex;
  align-items: center;
  border: none;
  padding: 5px;
}

.options-button:hover {
  background-color: #d1d1d1;
}

.options-menu {
  display: none;
  padding: 10px;
  position: absolute;
  top: 30px;
  right: 0px;
  top: 25px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.options-menu-button {
  border: none;
  background-color: transparent;
  padding: 5px;
  width: 100%;
  border-radius: 8px;
  padding: 4px 8px;
  text-align: left;
}

.options-menu-show {
  display: block;
  z-index: 100;
}

.options-menu-button:hover {
  background-color: #e5e5e5;
}
</style>
