import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexChar from "react-apexcharts"
import {useRecoilValue} from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
    coinId: string;
};
interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
};


const Chart = () => {
    const {coinId} = useOutletContext<ChartProps>();
    const isDark = useRecoilValue(isDarkAtom)
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv",coinId],()=>fetchCoinHistory(`${coinId}`));
    return (
        <div>
            {isLoading  ? "Loading chart..." : <ApexChar series={[{name:"sales", data:data?.map(prop=>prop.close) as number[]}]} type="line" options={{theme:{mode:isDark ? "dark" : "light"}, chart:{height:300, width:500, toolbar:{show:false}, background:"transparent"}, grid:{show:false}, stroke:{curve:"smooth",width:3}, yaxis:{show:false}, xaxis:{labels:{show:false, datetimeFormatter:{month:"mmm 'yy"}}, axisTicks:{show:false}, axisBorder:{show:false}, type:"datetime", categories: data?.map(prop=>new Date(prop.time_close).toString())}, fill:{type:"gradient",gradient:{gradientToColors:["#obe881"], stops:[0,100]}}, colors:["#ofbcf9"], tooltip:{y:{formatter: value =>`$ ${value.toFixed(2)}`}}}} />}
        </div>
    );
}

export default Chart;