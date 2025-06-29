import { memo, useMemo } from "react"
import { PrimaryButton } from "../Atom/button/PrimaryButton"

type Todo = {
  title: string;
  deadline: string;
};

type Props = {
  onClickComplete: (index: number) => void;
  onClickEdit: (index: number) => void;
  onClickDelete: (index: number) => void;
  todoList: Todo[];
};

export const TodoList = memo((props: Props) => {

  const { onClickComplete, onClickEdit, onClickDelete, todoList } = props;

  const renderedTodoList = useMemo(() =>{

  return (
    todoList.map((todo, index) => (
      <li className="text-xl flex items-center space-x-4 pt-5 pl-5" key={index}>
        <p>{todo.title}</p>
        <p>{todo.deadline}</p>
        <PrimaryButton children={"完了"} onClick={() => onClickComplete(index)} />
        <PrimaryButton children={"編集"} onClick={() => onClickEdit(index)} />
        <PrimaryButton children={"削除"} onClick={() => onClickDelete(index)} />
      </li>
    ))
  )
},[todoList, onClickComplete, onClickEdit, onClickDelete]);

return <ul>{renderedTodoList}</ul>

}
)