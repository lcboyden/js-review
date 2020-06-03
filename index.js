console.log("loaded");
let state = {
  tod: [],
  todos: [],
  isLoading: false,
};

function renderHTML(id, text) {
  document.getElementById(id).innerHTML = text;
}

function getTodos() {
  state.isLoading = true;
  render();
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      state.tod = response.data;
      state.todos = response.data;
      state.isLoading = false;
      console.log(response);
      render();
    })
    .catch((error) => {
      state.isLoading = false;
      console.log(error);
    })
}

function renderTodos() {
  const { todos, isLoading } = state;
  if (isLoading) {
    return '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
  }

  if (todos.length === 0 ) {
    return '<div>No ToDos</div>';
  } else {
    return todos.reduce((todStr, tod) => {
      return todStr + renderTodo(tod);
    }, "");
  }
};

function renderTodo(tod) {
  return `<div class='tod-card'>
      <h3>${tod.userId}</h3>
      <div class='tod-info'>
        <p>title: ${tod.title}</p>
        <p>completed: ${tod.completed}</p>
      </div>
    </div>`;
}

let toggleFilter = true;
function toggleComplete() {
  reset();
  if (toggleFilter == true) {
    filterComplete();
    toggleFilter = false;
    // return "display completed"
  }
  else {
    filterNotComplete();
    toggleFilter = true;
    // return "display incomplete"
  }
}

function filterComplete() {
  console.log("filterComplete clicked");
  const { todos } = state;
  const todosComplete = todos.filter((tod) => tod.completed == true);
  state.todos = todosComplete;
  render();
}

function filterNotComplete() {
  const {todos} = state; 
  const todosNotComplete = todos.filter((tod) => tod.completed == false);
  state.todos = todosNotComplete;
  render();
}

function sortByUserId() {
  const { todos } = state; 
  todos.sort((user1, user2) => {
    return user2.userId - user1.userId; 
  });
  console.log(todos);
  render();
}

function reset() {
  const {tod } = state;
  state.todos = [...tod];
  render();
}

function render() {
  renderHTML("todos", renderTodos());
}
render();