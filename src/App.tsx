import React, {Suspense, lazy} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";const TradingPairs = lazy(() => import("./TradingPairs/TradingPairs"));

const App = () => {
  const home = () => (
      <div className="homeStyles">
        <Link to="/trading-pairs">Trading Pairs</Link>
      </div>
  )
  

  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/" element={home()} />
              <Route path="/trading-pairs" 
                    element={<Suspense fallback={<div>Loading...</div>}><TradingPairs /></Suspense>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
