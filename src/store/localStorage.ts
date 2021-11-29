import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { browser } from '$app/env'

export let todos: Writable<string> = writable()

function updateTodos(todo: string) {
  localStorage.setItem('todos', JSON.stringify(todo))
}

if (browser) {
  let storedTodos = JSON.parse(localStorage.getItem('todos'))
  todos.set(storedTodos)
  todos.subscribe(updateTodos)
}
