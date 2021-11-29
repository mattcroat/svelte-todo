<script lang="ts">
  import { browser } from '$app/env'
  import Todo from './Todo.svelte'
  import type { ITodo, FiltersType } from '$root/types/todo'

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
  $: uncompleted = todos.filter((todo) => !todo.completed).length
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
  <header>
    <h1 class="title">todos</h1>
  </header>

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

      <footer>
        <span class="todo-count">
          {uncompleted}
          {uncompleted === 1 ? 'item' : 'items'} left
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
      </footer>
    {/if}
  </section>
</main>
