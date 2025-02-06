<script setup lang="ts">
import { ref } from "vue";
import "@fontsource-variable/onest";
import TodoItem from "./components/TodoItem.vue";
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

const handleToggleState = (id: string) => {
  const index = items.value.findIndex((item) => item.id === id);
  items.value[index].completed = !items.value[index].completed;
};

const handleDeleteItem = (id: string) => {
  items.value = items.value.filter((item) => item.id !== id);
  localStorage.setItem("todos", JSON.stringify(items.value));
};

const handleUpdateText = (id: string, text: string) => {
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
        <TodoItem
          v-for="item in items"
          :key="item.id"
          :text="item.text"
          :is-completed="item.completed"
          v-on:update_state="handleToggleState(item.id)"
          v-on:update_text="handleUpdateText(item.id, $event)"
          v-on:delete="handleDeleteItem(item.id)"
        />
      </ul>
    </section>
  </main>
</template>

<style scoped>
main {
  padding: 25px;
  min-height: 100dvh;
  background: rgb(186, 232, 253);
  background: radial-gradient(
    circle,
    rgba(186, 232, 253, 1) 0%,
    rgba(125, 213, 252, 1) 100%
  );
}

section {
  width: 100%;
  margin: auto;
  padding: 25px;
  max-width: 425px;
  border-radius: 5px;
  background-color: #f0faff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #083549;
  text-align: center;
  margin-bottom: 10px;
}

form {
  display: flex;
  border: 2px solid #0ea5e9;
}

input[type="text"] {
  width: 100%;
  border: none;
  padding: 0 10px;
  outline: none;
}

button {
  border: none;
  font-weight: 700;
  color: #f0faff;
  padding: 5px 25px;
  background-color: #0ea5e9;
  cursor: pointer;
}

ul {
  padding: 0;
  list-style: none;
}
</style>
