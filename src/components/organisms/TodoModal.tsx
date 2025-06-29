import { useState } from "react"

//親でtitleとdeadlineの変更を管理するため、別々に設定
type Props = {
    title: string
    deadline: string
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDeadline: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickCloseModal:()=>void
    index:number
    onClickClose: (index:number) => void
    isOpen: boolean
}

/*
*🌟親コンポーネントで関数や要素を定義する理由
*親で関数や状態を持つと自由度が上がる	✅	汎用性・再利用性が高い
*title や deadline を他の目的で使える	✅	入力ラベルや内容を差し替えるだけで済む 
*isOpenはモーダルの開閉を親で管理したり、条件に応じて開閉を決めていくので親で管理するとGood！ 
* 
*/

export const TodoModal = (props: Props) => {

    const { onChangeTitle, onChangeDeadline, onClickClose, isOpen, title, deadline ,index,onClickCloseModal } = props;
    // const [isOpen ,setIsOpen] = useState<boolean>(false);
    // const [title,setTitle] = useState<string>("")
    // const [deadline,setDeadline] = useState<string>("")


    return (
        <>
        <div>
            {isOpen === true && (
                <div className=" fixed inset-0 z-50 bg-blue-950 bg-opacity-50 flex items-center justify-center ">
                <div className="flex flex-col justify-between  p-5 w-[400px] h-[450px] border-4 border-white bg-blue-300 rounded-lg">
                    <div className="flex justify-between">
                        <h1 className=" text-3xl font-bold text-gray-100 ">新規作成</h1>
                        <button onClick={onClickCloseModal} 
                                className=" bg-blue-50 rounded-full px-3 py-1 text-xl" 
                        >×</button>
                    </div>
                    <div className=" space-y-5 p-5">
                        <div>
                            <label htmlFor="title" className="text-2xl  text-gray-100">タイトル</label>
                            <p className="mt-3 ml-3">
                                <input id="title" placeholder="タイトル" onChange={onChangeTitle} value={title}
                                    className="w-64 py-3 rounded-lg"
                                />
                            </p>
                        </div>
                        <div>
                            <label htmlFor="deadline"
                                className="text-2xl  text-gray-100"
                            >期限</label>
                            <p className="mt-3 ml-3">

                                <input id="deadline" placeholder="期限" onChange={onChangeDeadline} value={deadline}
                                    className="w-64 py-3 rounded-lg"
                                />
                            </p>
                        </div>
                    </div>
                    <button onClick={()=>onClickClose(index)} 
                    className=" mx-auto mt-5 w-[300px]  bg-blue-50 rounded-full px-3 py-4 text-xl" 
                    >Todoを追加する</button>
                    </div>
                </div>
                
            )}
        </div>
        </>
    )
}
