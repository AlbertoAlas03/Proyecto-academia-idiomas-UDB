import './App.css';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import MyProfile from './pages/MyProfile';
import Course from './pages/Course';
import Student from './pages/Student';
import NotFound from './pages/NotFound';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} >
          <Route index element={<Course />} />
          <Route path='/home/myprofile' element={<MyProfile />} />
          <Route path="/home/course/:curso_id" element={<Student />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
