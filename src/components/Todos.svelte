<script lang="ts">
  import type { Todo, Filters } from '$root/types/todo'

  export let todos: Todo[]

  let todo: string = ''
  let filter: Filters = 'all'
  let editing: boolean = false

  $: todosAmount = todos.length
  $: completed = todos.filter((todo) => todo.completed).length
  $: uncompleted = todos.filter((todo) => !todo.completed).length
  $: filteredTodos = filterTodos(todos, filter)

  function generateRandomId() {
    return Date.now()
  }

  function addTodo() {
    let newTodo: Todo = {
      id: generateRandomId(),
      text: todo,
      completed: false
    }
    todos = [...todos, newTodo]
    todo = ''
  }

  function removeTodo(id: number) {
    todos = todos.filter((todo) => todo.id !== id)
  }

  function editTodo(event: KeyboardEvent, id: number) {
    switch (event.key) {
      case 'Escape':
        console.log('escape')
      case 'Enter':
        console.log('enter')
    }
  }

  function toggleCompleted(event: MouseEvent) {
    let { checked } = event.target as HTMLInputElement

    todos = todos.map((todo) => ({
      ...todo,
      completed: checked
    }))
  }

  function filterTodos(todos: Todo[], filter: Filters) {
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
          <li class:completed={todo.completed} class:editing class="todo">
            <div class="view">
              <input
                bind:checked={todo.completed}
                type="checkbox"
                class="toggle"
                class:completed={todo.completed}
              />
              <label on:dblclick={() => (editing = true)} for="todo">
                {todo.text}
              </label>
              <button on:click={() => removeTodo(todo.id)} class="remove" />
            </div>

            {#if editing}
              <input
                class="edit"
                on:input={() => console.log('input')}
                on:blur={() => console.log('blur')}
                value={todo.text}
                type="text"
              />
            {/if}
          </li>
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
