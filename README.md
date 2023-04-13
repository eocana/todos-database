```js
const data = [
  { id: 1, text: "npm init", done: true },
  { id: 2, text: "npm i express", done: true },
  { id: 3, text: "npm i -D nodemon", done: false },
  { id: 4, text: "npm i cors", done: false },
];
```

## Obtener todos los _todo_

```
GET http://localhost:3000/todos/
```

## Añadir un _todo_

```
POST http://localhost:3000/todos/
{
  text: "nuevo todo"
}
```

## Modificar el estado de un todo

```
PUT http://localhost:3000/todos/:ID
{
  done: true
}
```

## Borrado de un id

```
DELETE http://localhost:3000/todos/:ID
```
