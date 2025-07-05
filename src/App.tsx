import { BrowserRouter, Routes } from "react-router-dom";
import { ColorProvider } from "./PomTimer/colorContext";
import { Route } from "react-router-dom";
import { Color } from "./PomTimer/Color";
import { Main } from "./PomTimer/Main";
import { RecordView } from "./PomTimer/components/pages/RecordView";
import { Message } from "./PomTimer/components/pages/Message";


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