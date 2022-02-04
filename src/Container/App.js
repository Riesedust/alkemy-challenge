import Login from '../Components/Login/Login.jsx';
import Home from '../Components/Home/Home';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar.jsx';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />} exact/> 
      </Routes>
    </div>
  );
}

export default App;
