<script setup lang="ts">
import item from "./components/item.vue";
import { ref } from "vue";

const items = ref([
  { text: "Learn Vue 3", completed: false },
  { text: "Learn TypeScript", completed: true },
  { text: "Learn Vite", completed: false },
]);
</script>

<template>
  <main>
    <section>
      <h1>Todo List ✅</h1>
      <form class="todo-form">
        <input type="text" class="todo-input" placeholder="Add a new todo" />
        <button class="add-input" type="submit">Add</button>
      </form>
      <ul>
        <item
          v-for="item in items"
          :text="item.text"
          :is-completed="item.completed"
        />
      </ul>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  padding: 25px;
  min-height: 100dvh;
  justify-content: center;
}

h1 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}

.todo-form {
  display: flex;
}

.todo-input {
  width: 100%;
  border: none;
  padding: 5px;
  max-width: 250px;
  border-radius: 2px;
  margin-right: 10px;
  border: 1px solid #262626;
}

.add-input {
  border: none;
  color: #fafafa;
  padding: 5px 25px;
  border-radius: 2px;
  font-weight: 700;
  background: #262626;
}
</style>
