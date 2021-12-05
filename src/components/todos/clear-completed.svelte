<script lang="ts">
  export let clearCompleted: () => void
  export let completedTodos: number
</script>

<button
  on:click={clearCompleted}
  class:hidden={completedTodos === 0}
  class="clear-completed"
>
  Clear completed
</button>
