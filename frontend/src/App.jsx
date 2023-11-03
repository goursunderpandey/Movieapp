import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Favorite from './components/Favorite';
import Home from './components/Home';
import NavBar from './components/NavBar';
import pic from "../src/assest/netflix.png";

function App() {
  const backgroundStyle = {
    backgroundImage: `url(${pic})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '60vh',
  };
  return (
    <div  style={backgroundStyle} className="App">
    <Router>
    <NavBar/>
      <Routes>
      <Route path='/' index element={<Home/>}/>
        <Route path="/favorite" element={<Favorite/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
