import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from 'react-query';
import { Helmet } from "react-helmet";
import { fetchCoins } from "./api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height:10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    color: ${prop=>prop.theme.textColor};
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 15px;
    transition: color;
    a {
        align-items: center;
        transition: color 0.2s ease-in;
        display: flex;
    }
    &:hover {
        a {
            color: ${prop=>prop.theme.accentColor}
        }
    }
`;
const Title = styled.h1`
    font-size: 48px;
    color: ${prop=>prop.theme.accentColor};
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new:boolean,
    is_active:boolean,
    type:string
}

const Coins = () => {
    // useQuery(키값이될내용(배열이된다. 즉, 내가 정해주는겨 ㅇㅋ?), 페치해온데이타함수"이름"(함수를 실행해서 넣는게 아니다!!) )
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    const setDarkAtom = useSetRecoilState(isDarkAtom); // 리코일 값 수정할때 쓴다.
    const toggleDarkAtom = () => setDarkAtom(prev=>!prev)
    return (
        <Container>
            {/* 헬멧은 그저 head로 가는 direct link 일 뿐이다. */}
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
                <button onClick={toggleDarkAtom}>Toggle Dark Mode</button>
            </Header>
            {isLoading ? <Loader>Loading...</Loader> : 
            (<CoinsList>
                {data?.slice(0,100).map((prop)=><Coin key={prop.id}><Link to={`/${prop.id}`} state={prop}><Img src={`https://coinicons-api.vercel.app/api/icon/${prop.symbol.toLowerCase()}`}/>{prop.name} &rarr;</Link></Coin>)}
            </CoinsList>)}
        </Container>
    );
}

export default Coins;
