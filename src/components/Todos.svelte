<script lang="ts">
  import { browser } from '$app/env'

  import Todo from './Todo.svelte'
  import type { ITodo, FiltersType } from '$root/types/todo'
  import '$root/styles/global.css'

  let todos: ITodo[] = []

  if (browser) {
    todos = JSON.parse(localStorage.getItem('todos')) ?? []
  }

  $: {
    if (browser) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }

  let todo: string = ''
  let filter: FiltersType = 'all'

  $: todosAmount = todos.length
  $: completed = todos.filter((todo) => todo.completed).length
  $: incomplete = todos.filter((todo) => !todo.completed).length
  $: filteredTodos = filterTodos(todos, filter)

  function generateRandomId() {
    return Date.now()
  }

  function addTodo() {
    let newTodo: ITodo = {
      id: generateRandomId(),
      text: todo,
      completed: false
    }
    todos = [...todos, newTodo]
    todo = ''
  }

  function completeTodo(id: number) {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
  }

  function removeTodo(id: number) {
    todos = todos.filter((todo) => todo.id !== id)
  }

  function editTodo(id: number, newTodo: string) {
    let currentTodo = todos.findIndex((todo) => todo.id === id)
    todos[currentTodo].text = newTodo
  }

  function toggleCompleted(event: MouseEvent) {
    let { checked } = event.target as HTMLInputElement

    todos = todos.map((todo) => ({
      ...todo,
      completed: checked
    }))
  }

  function filterTodos(todos: ITodo[], filter: FiltersType) {
    switch (filter) {
      case 'all':
        return todos
      case 'active':
        return todos.filter((todo) => !todo.completed)
      case 'completed':
        return todos.filter((todo) => todo.completed)
    }
  }

  function clearCompleted() {
    todos = todos.filter((todo) => todo.completed !== true)
  }
</script>

<main>
  <h1 class="title">todos</h1>

  <section class="todos">
    <form on:submit|preventDefault={addTodo}>
      {#if todosAmount > 0}
        <input
          on:click={toggleCompleted}
          type="checkbox"
          id="toggle-all"
          class="toggle-all"
        />
        <label aria-label="Mark all as complete" for="toggle-all"
          >Mark all as complete</label
        >
      {/if}

      <!-- svelte-ignore a11y-autofocus -->
      <input
        bind:value={todo}
        type="text"
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
      />
    </form>

    {#if todosAmount}
      <ul class="todo-list">
        {#each filteredTodos as todo (todo.id)}
          <Todo {todo} {completeTodo} {removeTodo} {editTodo} />
        {/each}
      </ul>

      <div class="actions">
        <span class="todo-count">
          {incomplete}
          {incomplete === 1 ? 'item' : 'items'} left
        </span>
        <div class="filters">
          <button
            on:click={() => (filter = 'all')}
            class:selected={filter === 'all'}
            class="filter"
          >
            All
          </button>
          <button
            on:click={() => (filter = 'active')}
            class:selected={filter === 'active'}
            class="filter"
          >
            Active
          </button>
          <button
            on:click={() => (filter = 'completed')}
            class:selected={filter === 'completed'}
            class="filter"
          >
            Completed
          </button>
        </div>

        <button
          on:click={clearCompleted}
          class:hidden={completed === 0}
          class="clear-completed"
        >
          Clear completed
        </button>
      </div>
    {/if}
  </section>
</main>

<style>
  .title {
    font-size: var(--font-80);
    font-weight: inherit;
    text-align: center;
    color: var(--color-title);
  }

  .todos {
    --width: 90%;
    --todo-bg: hsl(0 0% 98%);
    --todo-text: hsl(220 20% 14%);

    width: var(--width);
    margin: 0 auto;
    color: var(--todo-text);
    background-color: var(--todo-bg);
    border-radius: var(--radius-base);
    border: 1px solid var(--color-gray-90);
    box-shadow: 0 0 4px var(--shadow-1);
  }

  @media (min-width: 540px) {
    .todos {
      --width: 500px;
    }
  }

  .toggle-all {
    width: 1px;
    height: 1px;
    position: absolute;
    opacity: 0;
  }

  .toggle-all + label {
    position: absolute;
    font-size: 0;
  }

  .toggle-all + label:before {
    content: '❯';
    display: block;
    padding: var(--spacing-16);
    font-size: var(--font-24);
    color: var(--color-gray-58);
    transform: rotate(90deg);
  }

  .toggle-all:checked + label:before {
    color: var(--color-gray-28);
  }

  .new-todo {
    width: 100%;
    padding: var(--spacing-16);
    padding-left: 60px;
    font-size: var(--font-24);
    border: none;
    border-bottom: 1px solid var(--shadow-1);
  }

  .todo-list {
    list-style: none;
  }

  .actions {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-8) var(--spacing-16);
    font-size: 0.9rem;
    border-top: 1px solid var(--color-gray-90);
  }

  .actions:before {
    content: '';
    height: 40px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: 0 1px 1px hsla(0, 0%, 0%, 0.2), 0 8px 0 -3px hsl(0, 0%, 96%),
      0 9px 1px -3px hsla(0, 0%, 0%, 0.2), 0 16px 0 -6px hsl(0, 0%, 96%),
      0 17px 2px -6px hsla(0, 0%, 0%, 0.2);
    z-index: -1;
  }

  .filters {
    display: flex;
    gap: var(--spacing-4);
    list-style: none;
  }

  .filter {
    padding: var(--spacing-4) var(--spacing-8);
    border: 1px solid transparent;
    border-radius: var(--radius-base);
  }

  .filter:hover {
    border: 1px solid var(--color-highlight);
  }

  .selected {
    border-color: var(--color-highlight);
  }

  .hidden {
    visibility: hidden;
  }
</style>
