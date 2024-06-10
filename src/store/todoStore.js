// src/store/todoStore.js
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(todo) {
      this.todos.push({ ...todo, completed: false });
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodoCompletion(index) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  },
  getters: {
    incompleteTodos: (state) => state.todos.filter(todo => !todo.completed).length
  }
});
