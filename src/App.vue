<script setup lang="ts">
import { ref } from "vue";
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
      <h1>Todo List ✅</h1>
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
  display: flex;
  padding: 50px;
  min-height: 100dvh;
  justify-content: center;
  background: rgb(221, 238, 228);
  background: radial-gradient(
    circle,
    rgba(221, 238, 228, 1) 0%,
    rgba(189, 221, 204, 1) 100%
  );
}

section {
  width: 100%;
  padding: 25px;
  max-width: 40rem;
  border-radius: 10px;
  background-color: #f1f8f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #0e201b;
}

.todo-form {
  display: flex;
}

.todo-input {
  width: 100%;
  border: none;
  padding: 5px 10px;
  border-radius: 4px 0px 0px 4px;
  border: 2px solid #2f6c55;
}

.todo-input:focus {
  outline: none;
  caret-color: #2f6c55;
}

.todo-input::selection {
  background: #2f6c55;
  color: #f1f8f5;
}

.add-input {
  border: none;
  cursor: pointer;
  color: #f1f8f5;
  font-weight: 700;
  padding: 0 25px;
  background: #41886b;
  border-radius: 0px 4px 4px 0px;
  transition: all 75ms ease-in-out;
}

.add-input:hover {
  background: #2f6c55;
}

li {
  border-bottom: 1px solid #334155;
}

li:last-child {
  border-bottom: none;
}
</style>
