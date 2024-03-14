import { BrowserRouter, Routes, Route } from 'react-router-dom'
//npm package that enables to implement dynamic routing in a web app

//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar';

//BrowserRoute enables client-side routing by providing a prop to the app
//Routes are used to define routes and Route is the individual route/path
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
