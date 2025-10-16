import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import { AuthProvider } from './context/auth-context';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path='/login' element={<SignIn/>} />
          <Route path='/register' element={<SignUp/>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
