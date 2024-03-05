import React, {Suspense, lazy} from 'react';
import logo from './logo.svg';
import './App.css';
const TradingPairs = lazy(() => import("./TradingPairs/TradingPairs"));

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading ...</div>}>
         <TradingPairs />
      </Suspense>
    </div>
  );
}

export default App;
