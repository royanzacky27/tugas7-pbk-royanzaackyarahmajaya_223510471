<template>
    <div class="todo-app">
      <h1 class="title">My Todo List</h1>
      <div class="input-container">
        <input v-model="newTodo" @keyup.enter="handleAddTodo" placeholder="To Do kamu " />
        <input type="date" v-model="newTodoDate" class="date-picker"/>
        <button @click="handleAddTodo" class="add-btn">Add</button>
      </div>
      <div class="todo-container">
        <h2 class="section-title">Tasks</h2>
        <ul class="todo-list">
          <li v-for="(todo, index) in todos" :key="index" :class="{ completed: todo.completed, todo: true }">
            <div class="todo-content">
              <input type="checkbox" :checked="todo.completed" @change="handleToggleTodoCompletion(index)" />
              <span>{{ todo.text }}</span>
              <span class="date">{{ todo.date }}</span>
            </div>
            <button @click="removeTodoAction(index)" class="remove-btn">Remove</button>
          </li>
        </ul>
      </div>
      <p class="incomplete-count">Incomplete tasks: {{ incompleteTodos }}</p>
    </div>
  </template>
  
  <script>
  import { useTodoStore } from '../store/todoStore';
  import { mapActions, mapState, mapGetters } from 'pinia';
  
  export default {
    data() {
      return {
        newTodo: '',
        newTodoDate: ''
      };
    },
    computed: {
      ...mapState(useTodoStore, ['todos']),
      ...mapGetters(useTodoStore, ['incompleteTodos'])
    },
    methods: {
      ...mapActions(useTodoStore, ['addTodo', 'removeTodo', 'toggleTodoCompletion']),
      handleAddTodo() {
        if (this.newTodo.trim() && this.newTodoDate) {
          this.addTodoAction({ text: this.newTodo.trim(), date: this.newTodoDate });
          this.newTodo = '';
          this.newTodoDate = '';
        }
      },
      addTodoAction(todo) {
        this.addTodo(todo);
      },
      handleToggleTodoCompletion(index) {
        this.toggleTodoCompletion(index);
      },
      removeTodoAction(index) {
        this.removeTodo(index);
      }
    }
  };
  </script>
  
  <style scoped>
  .todo-app {
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: center;
    font-size: 2em;
    color: #333;
  }
  
  .input-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  input[type="text"], .date-picker {
    flex: 1;
    padding: 10px;
    font-size: 1em;
    border: 2px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
  }
  
  .add-btn {
    padding: 10px 20px;
    font-size: 1em;
    background-color: #5cb85c;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .add-btn:hover {
    background-color: #4cae4c;
  }
  
  .todo-container {
    margin-top: 20px;
  }
  
  .section-title {
    font-size: 1.5em;
    color: #666;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  
  .todo-list {
    list-style: none;
    padding: 0;
  }
  
  .todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    background: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
    transition: background 0.3s;
  }
  
  .todo:hover {
    background: #f9f9f9;
  }
  
  .todo.completed span {
    text-decoration: line-through;
    color: #999;
  }
  
  .todo.completed {
    background: #e0e0e0;
  }
  
  .todo-content {
    display: flex;
    align-items: center;
  }
  
  .todo-content span {
    margin-left: 10px;
  }
  
  .date {
    margin-left: auto;
    font-size: 0.9em;
    color: #999;
  }
  
  .remove-btn {
    background-color: #d9534f;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 5px 10px;
  }
  
  .remove-btn:hover {
    background-color: #c9302c;
  }
  
  .incomplete-count {
    text-align: center;
    font-size: 1em;
    color: #333;
    margin-top: 20px;
  }
  </style>
  