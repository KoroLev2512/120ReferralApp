import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style/App.css';
import ScrollTop from './utils/scrollTop';
import Welcome from './components/Welcome';
import Info from './components/Info';

function App() {


  return (

    <BrowserRouter>

    <div className="app">

      <ScrollTop />

      <Routes>
        
      <Route path='/'  element={<Welcome />} />

      <Route path='/info'  element={<Info />} />

        
      </Routes>


    </div>
    
    </BrowserRouter>
  
  );
}




export default App;
