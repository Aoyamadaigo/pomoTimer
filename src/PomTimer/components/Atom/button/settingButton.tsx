import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  isOpen: boolean;
  onClickOpen: () => void;
  onClickClose: () => void;
};

export const SettingButton = (props: Props) => {
  const { isOpen, onClickOpen, onClickClose } = props;

  return (
    <div>
      <button className="p-2" onClick={onClickOpen}>
        <Settings className="w-6 h-6 text-gray-700" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景オーバーレイ */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={onClickClose}
            />

            {/* サイドバー本体 */}
            <motion.div
              className="fixed p-5 flex flex-col top-0 right-0 min-h-screen w-60 bg-white bg-opacity-90 z-50 shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 60 }}
            >
              <h2 className="font-bold text-2xl">各種設定</h2>
              <ul className="flex flex-col mt-6 space-y-6 font-mono">
                <li><Link to="/color">テーマカラーの設定</Link></li>
                <li><Link to="/record">努力の記録</Link></li>
                <li><Link to="/message">もう少し頑張りたい<br />アナタへ</Link></li>
              </ul>
              <button className="mt-auto text-right text-sm text-gray-500 hover:text-gray-800"
                onClick={onClickClose}>✖ 閉じる</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
