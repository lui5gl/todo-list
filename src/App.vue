<script setup lang="ts">
import { ref } from "vue";
import Task from "./components/Task.vue";
import type Todo from "./interfaces/iTodoItem";

const tasks = ref<Todo[]>([]);

// Preserve the tasks in the local storage
localStorage.getItem("tasks") &&
  (tasks.value = JSON.parse(localStorage.getItem("tasks") || "[]"));

const handleAddTask = (e: Event) => {
  e.preventDefault();
  const input = document.getElementById("todo_input");
  const isInput = input instanceof HTMLInputElement;

  if (isInput && input.value) {
    tasks.value.push({
      id: crypto.randomUUID(),
      text: input.value,
      completed: false,
    });
    input.value = "";
  }

  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const handleToggleStateTask = (id: string) => {
  const index = tasks.value.findIndex((item) => item.id === id);
  tasks.value[index].completed = !tasks.value[index].completed;

  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const handleDeleteTask = (id: string) => {
  tasks.value = tasks.value.filter((item) => item.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const handleUpdateTextTask = (id: string, text: string) => {
  const index = tasks.value.findIndex((item) => item.id === id);
  tasks.value[index].text = text;
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};
</script>

<template>
  <main>
    <section>
      <h1>Todo List</h1>
      <form class="todo-form" @submit="handleAddTask">
        <input
          id="todo_input"
          type="text"
          class="todo-input"
          placeholder="Add a new todo"
        />
        <button class="add-input" type="submit">Add</button>
      </form>
      <ul>
        <Task
          v-for="item in tasks"
          :key="item.id"
          :text="item.text"
          :is-completed="item.completed"
          @update_state="handleToggleStateTask(item.id)"
          @update_text="handleUpdateTextTask(item.id, $event)"
          @delete="handleDeleteTask(item.id)"
        />
      </ul>
    </section>
  </main>
</template>

<style scoped>
main {
  padding: 25px;
  min-height: 100dvh;
  background: rgb(245, 245, 245);
  background: radial-gradient(
    circle,
    rgba(245, 245, 245, 1) 0%,
    rgba(229, 229, 229, 1) 100%
  );
}

section {
  width: 100%;
  margin: auto;
  padding: 25px;
  max-width: 425px;
  border-radius: 5px;
  background-color: #fafafa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #262626;
  text-align: center;
  margin-bottom: 10px;
}

form {
  display: flex;
  border: 2px solid #262626;
  margin-bottom: 10px;
}

input[type="text"] {
  width: 100%;
  border: none;
  padding: 0 10px;
  outline: none;
  background-color: transparent;
}

button {
  border: none;
  cursor: pointer;
  color: #fafafa;
  font-weight: 700;
  padding: 5px 25px;
  background-color: #262626;
}

ul {
  padding: 0;
  list-style: none;
}
</style>
