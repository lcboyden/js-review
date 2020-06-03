function getTodos() {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}