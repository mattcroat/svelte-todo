<script>
  import '../styles/global.css'
</script>

<main>
  <header>
    <h1 class="title">todos</h1>
  </header>

  <section class="todos">
    <form>
      <input type="checkbox" id="toggle-all" class="toggle-all" />
      <label aria-label="Mark all as complete" for="toggle-all"
        >Mark all as complete</label
      >
      <input
        type="text"
        class="new-todo"
        placeholder="What needs to be done?"
      />
    </form>

    <ul class="todo-list">
      <li class="todo completed">
        <div class="view">
          <input type="checkbox" class="toggle" />
          <label for="todo">Todo</label>
          <button class="btn remove" />
        </div>
      </li>
      <li class="todo">
        <div class="view">
          <input type="checkbox" class="toggle" />
          <label for="todo">Todo</label>
          <button class="btn remove" />
        </div>
      </li>
      <li class="todo">
        <div class="view">
          <input type="checkbox" class="toggle" />
          <label for="todo">Todo</label>
          <button class="btn remove" />
        </div>
      </li>
      <li class="todo editing">
        <div class="view">
          <input type="checkbox" class="toggle" />
          <label for="todo">Editing</label>
          <button class="btn remove" />
        </div>
        <input type="text" class="edit" />
      </li>
    </ul>

    <footer>
      <span class="todo-count">2 items left</span>

      <div class="filters">
        <button class="btn filter selected">All</button>
        <button class="btn filter">Active</button>
        <button class="btn filter">Completed</button>
      </div>

      <button class="btn clear-completed">Clear completed</button>
    </footer>
  </section>
</main>

<style>
  .title {
    font-size: var(--font-80);
    font-weight: inherit;
    text-align: center;
    color: var(--color-highlight);
  }

  .todos {
    --width: 500px;
    --todo-bg: hsl(0 0% 98%);
    --todo-text: hsl(220 20% 14%);

    width: var(--width);
    background-color: hsl(0 0% 98%);
    border-radius: var(--radius-base);
    border: 1px solid var(--color-gray-90);
    box-shadow: 0 0 4px var(--shadow-1);
  }

  form {
    position: relative;
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

  .new-todo,
  .edit {
    width: 100%;
    font-family: inherit;
    font-size: var(--font-24);
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
    border: 1px solid #999;
    border-radius: var(--radius-base);
    box-shadow: inset 0 -1px 5px 0 var(--shadow-1);
  }

  .new-todo {
    padding: var(--spacing-16);
    padding-left: 60px;
    border: none;
    box-shadow: inset 0 -2px 1px var(--shadow-1);
  }

  .todo-list {
    list-style: none;
  }

  .todo-list li {
    font-size: var(--font-24);
    border-bottom: 1px solid #ededed;
  }

  .todo-list li:last-child {
    border-bottom: none;
  }

  .todo-list li.editing .edit {
    width: 100%;
    display: block;
    padding: var(--spacing-8);
  }

  .todo-list li.editing .view {
    display: none;
  }

  .todo-list li .view {
    position: relative;
  }

  .todo-list li .toggle {
    position: absolute;
    top: 24px;
    left: 16px;
    transform: scale(2);
  }

  .todo-list li .toggle {
    opacity: 0;
  }

  .todo-list li .toggle + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: center left;
  }

  .todo-list li .toggle:checked + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
  }

  .todo-list li label {
    display: block;
    padding: var(--spacing-16);
    padding-left: 60px;
    color: var(--color-gray-28);
    transition: color 0.4s;
  }

  .todo-list li.completed label {
    color: var(--color-gray-58);
    text-decoration: line-through;
  }

  .todo-list li .remove {
    width: 40px;
    height: 40px;
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    margin: auto 0;
    font-size: var(--font-32);
    color: var(--color-gray-58);
    transition: color 0.2s ease-out;
  }

  .todo-list li .remove:hover,
  .todo-list li .remove:focus {
    color: #c18585;
  }

  .todo-list li .remove:after {
    content: '×';
  }

  .todo-list li:hover .remove {
    display: block;
  }

  .todo-list li .edit {
    display: none;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: var(--spacing-8) var(--spacing-16);
    font-size: 0.9rem;
    border-top: 1px solid var(--color-gray-90);
  }

  footer:before {
    content: '';
    height: 40px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
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
    display: none;
  }

  .btn {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    background: none;
    border: 0;
    cursor: pointer;
  }

  :focus,
  .toggle:focus + label,
  .toggle-all:focus + label {
    box-shadow: 0 0 2px 2px var(--color-highlight);
    outline: 0;
  }
</style>
