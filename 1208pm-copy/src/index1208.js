// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import App1 from './app1';
import './styles.css';

const RootComponent = () => (
    <div>
        <div className="title"> This My Dashboard </div>
      <App />
      <App1 />
    </div>
  );
  
ReactDOM.render(<RootComponent />, document.getElementById('app'));

// ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<App1 />, document.getElementById('app'));