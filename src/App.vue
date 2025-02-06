<script setup lang="ts">
import { ref } from "vue";
import Task from "./components/Task.vue";
import type Todo from "./interfaces/iTodoItem";

const items = ref<Todo[]>([]);

localStorage.getItem("todos") &&
  (items.value = JSON.parse(localStorage.getItem("todos") || "[]"));

const onAddTodo = (e: Event) => {
  e.preventDefault();
  const input = document.querySelector(".todo-input");
  const isInput = input instanceof HTMLInputElement;

  if (isInput && input.value) {
    items.value.push({
      id: crypto.randomUUID(),
      text: input.value,
      completed: false,
    });
    input.value = "";
  }

  localStorage.setItem("todos", JSON.stringify(items.value));
};

const handleToggleStateTask = (id: string) => {
  const index = items.value.findIndex((item) => item.id === id);
  items.value[index].completed = !items.value[index].completed;
};

const handleDeleteTask = (id: string) => {
  items.value = items.value.filter((item) => item.id !== id);
  localStorage.setItem("todos", JSON.stringify(items.value));
};

const handleUpdateTextTask = (id: string, text: string) => {
  const index = items.value.findIndex((item) => item.id === id);
  items.value[index].text = text;
  localStorage.setItem("todos", JSON.stringify(items.value));
};
</script>

<template>
  <main>
    <section>
      <h1>Todo List</h1>
      <form class="todo-form" @submit="onAddTodo">
        <input type="text" class="todo-input" placeholder="Add a new todo" />
        <button class="add-input" type="submit">Add</button>
      </form>
      <ul>
        <Task
          v-for="item in items"
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
