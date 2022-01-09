<script lang="ts">
  import { tick } from 'svelte'

  import { useStorage } from '$root/stores/useStorage'
  import type { ITodo, FiltersType } from '$root/types/todo'

  import Todo from './todo.svelte'
  import NewTodo from './add-todo.svelte'
  import Filters from './filter-todos.svelte'
  import ItemsLeft from './todos-left.svelte'
  import ClearCompletedTodos from './clear-completed.svelte'

  let todos = useStorage<ITodo[]>('todos', [])

  let selectedFilter: FiltersType = 'all'
  let filtering = false

  $: amountTodos = $todos.length
  $: completedTodos = $todos.filter((todo) => todo.completed).length
  $: incompleteTodos = $todos.filter((todo) => !todo.completed).length
  $: filteredTodos = filterTodos($todos, selectedFilter)
  $: duration = filtering ? 0 : 250

  function generateRandomId(): number {
    return Date.now()
  }

  function addTodo(todo: string): void {
    let newTodo: ITodo = {
      id: generateRandomId(),
      text: todo,
      completed: false,
    }
    $todos = [...$todos, newTodo]
    todo = ''
  }

  function completeTodo(id: number): void {
    $todos = $todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
  }

  function removeTodo(id: number): void {
    $todos = $todos.filter((todo) => todo.id !== id)
  }

  function editTodo(id: number, newTodo: string): void {
    let currentTodo = $todos.findIndex((todo) => todo.id === id)
    todos[currentTodo].text = newTodo
  }

  function toggleCompleted(event: MouseEvent): void {
    let { checked } = event.target as HTMLInputElement

    $todos = $todos.map((todo) => ({
      ...todo,
      completed: checked,
    }))
  }

  async function setFilter(newFilter: FiltersType): Promise<void> {
    filtering = true
    await tick()
    selectedFilter = newFilter
    await tick()
    filtering = false
  }

  function filterTodos(todos: ITodo[], filter: FiltersType): ITodo[] {
    switch (filter) {
      case 'all':
        return todos
      case 'active':
        return todos.filter((todo) => !todo.completed)
      case 'completed':
        return todos.filter((todo) => todo.completed)
    }
  }

  function clearCompleted(): void {
    $todos = $todos.filter((todo) => todo.completed !== true)
  }
</script>

<main>
  <h1 class="title">todos</h1>

  <section class="todos">
    <NewTodo {addTodo} {toggleCompleted} amount={amountTodos} />

    {#if amountTodos}
      <ul class="todo-list">
        {#each filteredTodos as todo (todo.id)}
          <Todo {todo} {completeTodo} {removeTodo} {editTodo} {duration} />
        {/each}
      </ul>

      <div class="actions">
        <ItemsLeft {incompleteTodos} />
        <Filters {selectedFilter} {setFilter} />
        <ClearCompletedTodos {clearCompleted} {completedTodos} />
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
    --width: 500px;
    --todos-bg: hsl(0 0% 98%);
    --todos-text: hsl(220 20% 14%);

    width: var(--width);
    color: var(--todos-text);
    background-color: var(--todos-bg);
    border-radius: var(--radius-base);
    border: 1px solid var(--color-gray-90);
    box-shadow: 0 0 4px var(--shadow-1);
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
</style>
