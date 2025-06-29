import { Link } from "react-router-dom"

export const Sidebar = () => {
    return (
        <div className="min-h-screen w-1/4 bg-teal-300">
            <div className="px-3 pt-5 flex flex-col ">
                <ul className="text-white space-y-4">
                    <li><Link to="/userManagemnet">登録情報</Link></li>
                    <li><Link to="/todo.tsx">Todo管理</Link></li>
                    <li><Link to="/pomTimer.tsx" >ポモドーロタイマー</Link></li>
                    <li><Link to="/functionCal.tsx">関数電卓</Link></li>
                    <li><Link to="/journaling.tsx">ジャーナリング</Link></li>
                </ul>

            </div>

        </div>
    )
}