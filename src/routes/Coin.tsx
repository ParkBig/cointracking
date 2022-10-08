import { useLocation, useParams, Outlet, Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from 'react-query';
import {Helmet} from "react-helmet"
import { fetchCoinInfo, fetchCoinTickers } from "./api";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface LocationState {
    state: {
        name:string;
        rank:number;
    }
};
interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
};
interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
        };
    };
};

const Coin = () => {
    const {coinId} = useParams(); // 유즈 파람은 지가 알아서 타입 정해줌
    const {state} = useLocation() as LocationState; // 유즈로케이션을 통해 링크에 정보를 담아 넘어온걸 받는다.
    const priceMatch = useMatch("/:coinId/price"); // 이 url과 매치가 된다면 객체를 넘기고 아니면 null 을 줌.
    const chartMatch = useMatch("/:coinId/chart"); // 이 url과 매치가 된다면 객체를 넘기고 아니면 null 을 줌.
    
    // 유즈쿼리에서 아래 isLoading 과 data 부분은 고정으로 명시해줘야 하는데 유즈쿼리하는개 여러개면
    // 아래처럼 중복이 된다 따라서 (: 이름 정해주기) 를 통해 중복을 벗어날 수 있다.
    // useQuery(키값이될내용(배열이된다. 즉, 내가 정해주는겨 ㅇㅋ?), 페치해온데이타함수"이름"(함수를 실행해서 넣는게 아니다!!) )
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId],() => fetchCoinInfo(`${coinId}`));
    const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(["price", coinId],() => fetchCoinTickers(`${coinId}`), {refetchInterval:5000});
    const loading = infoLoading || priceLoading;
    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <Title>
                    {state?.name ? state.name : infoLoading ? "Loading..." : infoData?.name}
                </Title>
            </Header>
            {priceLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                        <span>Price:</span>
                        <span>${priceData?.quotes.USD.price.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply:</span>
                            <span>{priceData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>
                    <Outlet context={{coinId:coinId}}/>
                    {/* 위에 아웃렛이 네스티드 라우트 쓰는 자리 */}
                    {/* context를 통해 하위컴포넌트로 유즈파람없이 해당값을 넘길 수 있음. */}
                </>
            )}
        </Container>
    );
}

export default Coin;
