import { BrowserRouter, Routes } from "react-router-dom";
import { ColorProvider } from "./colorContext";
import { Route } from "react-router-dom";
import { Color } from "./Color";
import { Main } from "./PomTimer/Main";
import { RecordView } from "./components/page/RecordView";
import { Message } from "./components/page/Message";


export default function App() {

    return (
        <ColorProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/color" element={<Color />} />
                <Route path="/record" element={<RecordView />} />
                <Route path="/message" element={<Message />} />
            </Routes>
        </BrowserRouter>
        </ColorProvider>
    )

}