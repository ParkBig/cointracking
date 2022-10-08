import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import {RecoilRoot} from "recoil"

import App from './App';


const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // 이 내부에 있는 컴포넌트들은 전부 뜀을 프랍으로 받아올수 있다. => App으로 옮김
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </RecoilRoot>
);
