import { BrowserRouter, Routes, Route } from 'react-router-dom'
//npm package that enables to implement dynamic routing in a web app

//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
              />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
