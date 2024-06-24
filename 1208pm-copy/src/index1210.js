// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import Chart from './Chart';
const RootComponent = () => (
    <div>
      <Menu />
      <Chart />
    </div>
  );
  
ReactDOM.render(<RootComponent />, document.getElementById('app'));

// ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<App1 />, document.getElementById('app'));