const BASE_URL = `https://api.coinpaprika.com/v1`;


export function fetchCoins () {
    return fetch(`${BASE_URL}/coins`).then((response)=>response.json());
}
export function fetchCoinInfo (coinId:string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response)=>response.json());
}
export function fetchCoinTickers (coinId:string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response)=>response.json());
}

// 유즈쿼리용 함수이다.
// 이렇게 받아논 데이터를 쓰고자하는 컴포넌트에서 유즈쿼리를 통해 사용 하면 된다.
// 또한 유즈 쿼리로 받아논 데이터는 caching(캐싱)으로 기억해 두고있다. 개지림.
// 이 말은 곧 화면이 다시 돌아왔을때 재 로딩할 필요가 사라진다는 것

// 지금은 한개의 api.ts에 모두 명시했지만, 원래는 3개의 파일이 되어야함.

// 이유 1. 
// 백엔드 응답 데이터 포멧: BASE_URL은 같지만 하위 경로가 다른 상황입니다. 
// 이는 서버에서는 다른 api이고, 서버에서 다른 프로세스로 처리하여 다른 데이터 포멧으로 리턴해줍니다(이부분이 제일 큰 이유일것 같습니다.). 
// 또한 urlOption에 해당하는 하위주소는 coinId와 같이 프로그램 실행중에 동적으로 바인딩 해줘야 하는 부분이 아니므로, 필요성이 부족해 보입니다. 
// 메소드를 분리하고 파라미터를 최소화하여 에러가능성을 줄이는 효과도 있습니다.
// 이유 2.
// 매개변수로 지정한 urlOption 타입이 string이고, 해당 메소드를 사용하는 모든 곳에서 fetch메소드를 호출할 때마다 string타입의 url경로를 손수 입력해줘야 합니다. 
// urlOption는 프로그램 실행중에만 값을 알 수 있는 정보가 아닌, API 문서에 정의된 고정된 요청경로입니다. 
// 파라미터를 잘못 넘겨줄 경우 아예 존재하지 않은 API를 호출할 우려가 있습니다. 
// 지금 예제에서는 urlOption이 동적으로 바인딩 되어야 할 이유가 없어보입니다. 
// 추가로 매개변수의 값들이 고정된 값들 중에서 선택되어 사용해야 할 경우에는 string 타입보다 ENUM타입을 활용해서 안정성을 높이는게 좋습니다.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function fetchCoinHistory(coinId:string)  {
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`).then((response)=>response.json());
}