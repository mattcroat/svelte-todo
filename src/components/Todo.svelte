<script lang="ts">
  import { fade, slide } from 'svelte/transition'
  import type { ITodo } from '$root/types/todo'

  export let todo: ITodo
  export let completeTodo: (id: number) => void
  export let removeTodo: (id: number) => void
  export let editTodo: (id: number, newTodo: string) => void

  let editing: boolean = false

  function toggleEdit() {
    editing = true
  }

  function handleEdit(event: KeyboardEvent, id: number) {
    let pressedKey = event.key
    let targetElement = event.target as HTMLInputElement
    let newTodo = targetElement.value

    switch (pressedKey) {
      case 'Escape':
        targetElement.blur()
        break
      case 'Enter':
        editTodo(id, newTodo)
        targetElement.blur()
        break
    }
  }

  function handleBlur(event: FocusEvent, id: number) {
    let targetElement = event.target as HTMLInputElement
    let newTodo = targetElement.value

    editTodo(id, newTodo)
    targetElement.blur()
    editing = false
  }
</script>

<li
  in:slide
  out:fade
  class:completed={todo.completed}
  class:editing
  class="todo"
>
  <div class="view">
    <input
      on:change={() => completeTodo(todo.id)}
      checked={todo.completed}
      type="checkbox"
      class="toggle"
      class:completed={todo.completed}
    />
    <label on:dblclick={toggleEdit} for="todo">
      {todo.text}
    </label>
    <button on:click={() => removeTodo(todo.id)} class="remove" />
  </div>

  {#if editing}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:keydown={(event) => handleEdit(event, todo.id)}
      on:blur={(event) => handleBlur(event, todo.id)}
      class="edit"
      type="text"
      value={todo.text}
      autofocus
    />
  {/if}
</li>
