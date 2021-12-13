import React, {memo} from 'react';
import TodoItem from './TodoItem';

function TodoList(props) {
  const {todoList} = props;

  console.log('re-render');
  return (
    <div>
      {todoList.map((todo) =><TodoItem key={todo.id} todo={todo}>{todo.name}</TodoItem>)}
    </div>
  );
}

export default memo(TodoList);