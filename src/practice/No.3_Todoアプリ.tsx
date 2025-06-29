import { useCallback, useState } from "react";
import { PrimaryButton } from "./components/Atom/button/PrimaryButton";
import { TodoModal } from "./assets/organisms/TodoModal";
import { TodoList } from "./assets/organisms/renderedTodoList";

/*
* 配列の配列を使うのでは無く、オブジェクトを使用することで要素の追加などが
* しやすくなる
* これはNG：const [todoList, setTodoList] = useState<Array<string>[]>([])
*/



type  Todo = {
  title: string;
  deadline: string;
};

export default function App() {

  // const [todoList, setTodoList] = useState<Array<string>[]>([])
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("")
  const [deadline, setDeadline] = useState<string>("")
  // const [editTitle, setEditTitle] = useState<string>("")
  // const [editDeadline,setEditDeadline] =useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isNew ,setIsNew] = useState(false)
  const [todoIndex, setTodoIndex] =useState<number>(0)


  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }, [])

  const onChangeDeadline = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value)
  }, [])

  //追加ボタンを押したときのみ、新規作成フラグをtrueにする
  const onClickAdd = useCallback(() => {
    setIsOpen(true);
    setTitle("")
    setDeadline("")
  }, [])

  const onClickComplete = useCallback((index: number) => {
    const newTodoList = [...todoList]
    newTodoList.splice(index, 1)
    setTodoList(newTodoList)
  }, [todoList])

  const onClickEdit = useCallback((index:number) => {
    const seleted = todoList[index]
    setTitle(seleted.title);
    setDeadline(seleted.deadline)
    setIsOpen(true)
    setIsNew(true)
    setTodoIndex(index)
  }, [title,deadline,todoList])

  const onClickCloseModal =()=>{
    setIsOpen(false)
  }

  const onClickClose = useCallback((index:number) => {
    const newTodoList = [...todoList];
    const newTodo = {title,deadline}

    if(isNew == true){
      newTodoList[index] = newTodo
      setTodoList(newTodoList)
    }else{
      newTodoList.push(newTodo)
      setTodoList(newTodoList)
    }
    setIsOpen(false)
    setIsNew(false)
  }, [title,deadline,todoList])

  const onClickDelete = useCallback((index: number) => {
    const newTodoList = [...todoList]
    newTodoList.splice(index, 1)
    setTodoList(newTodoList)
  }, [todoList])

  return (
    <>
    {/* flex-1（TodoList用）	残りのスペースをTodoリストが占めるようにする */}
    {/* overflow-y-auto	多くなったらスクロール可能に */}
      <div className="flex items-center justify-center bg-blue-100 min-h-screen">
        <div className="  h-[500px] w-[600px]  flex flex-col justify-between space-y-5 border border-gray-300 rounded-lg bg-white">
          <h1 className="pt-5 text-center text-3xl text-gray-500 font bold">Todoアプリ</h1> 
           <div className="flex-1 overflow-y-auto">
          <TodoList onClickComplete={onClickComplete} onClickDelete={onClickDelete} 
          onClickEdit={onClickEdit} todoList={todoList}
          />
          </div>
          <div className=" flex  justify-center pb-3 ">
            <PrimaryButton children={"追加する"} onClick={onClickAdd} />
          </div>
        </div>
      </div>
      <TodoModal isOpen={isOpen} onClickClose={()=>onClickClose(todoIndex)} onChangeTitle={onChangeTitle}
        onChangeDeadline={onChangeDeadline} title={title} deadline={deadline} index={todoIndex} onClickCloseModal={onClickCloseModal}
      />

    </>
  )
}