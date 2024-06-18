import './App.css';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { CookiesProvider } from 'react-cookie';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';

function App() {
  return (
    <CookiesProvider>
      <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }/>
            <Route path='/sign-up' element={<Signup />}/>
            <Route path='/sign-in' element={<Signin />}/>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </CookiesProvider>
  );
}

export default App;
