import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style/App.css';
import ScrollTop from './utils/scrollTop';
import Welcome from './components/Welcome';

function App() {

  return (

    <BrowserRouter>


    <div className="app">

      <ScrollTop />

      <Routes>
        
      <Route path='/'  element={<Welcome />} />
        
      </Routes>


    </div>
    
    </BrowserRouter>
  
  );
}




export default App;
