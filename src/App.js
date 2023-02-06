import { Provider, useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import store from './reducer/store';
import { up } from './counterSlice';
import { CookiesProvider } from 'react-cookie'
import { Navbar } from './navbar';
import { NavBarCss } from './NavbarCss';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.value);
  // {
  //   return state.counter.value
  //   // 최상위객체로 counter가 생김 => 어디서 온 counter? store에 있던 counter!
  // }

  return (
    <div>
      <button onClick={() => {
        // dispatch로 호출할 때 up에 인자를 전달하면
        // payload라는 프로퍼티의 값으로 전달된다.
        dispatch(up(2))
      }}>내용</button> {count}
    </div>
  )
}

function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="counter" element={<Counter />}></Route>
          
        </Routes>
      </Provider >
    </CookiesProvider>
  );
}

export default App;
