<script lang="ts">
  import Todos from '../components/Todos.svelte'
  import type { Todo } from '../types/todo'

  let todos: Todo[] = [
    {
      id: 1,
      text: 'Todo 1',
      completed: true
    },
    {
      id: 2,
      text: 'Todo 2',
      completed: false
    },
    {
      id: 3,
      text: 'Todo 3',
      completed: false
    },
    {
      id: 4,
      text: 'Todo 4',
      completed: false
    }
  ]
</script>

<Todos {todos} />
