import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Coins/>}/>
                <Route path="/:coinId" element={<Coin/>}>
                    <Route path="chart" element={<Chart />} />
                    <Route path="price" element={<Price />} />
                    {/* 이 구문이 네스티드 라우트다 */}
                </Route>
            </Routes>
        </Router>
    );
}

export default Routers;
