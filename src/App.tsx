import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import { AuthProvider } from './context/auth-context';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path='/login' element={<SignIn/>} />
          <Route path='/register' element={<SignUp/>} />
          <Route path='/'  element={<Home/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/profile' element={<Profile/>} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
