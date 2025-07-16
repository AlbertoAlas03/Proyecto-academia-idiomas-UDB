import './App.css';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import MyProfile from './pages/MyProfile';
import Course from './pages/Course';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} >
          <Route index element={<Course />} />
          <Route path='/home/myprofile' element={<MyProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
