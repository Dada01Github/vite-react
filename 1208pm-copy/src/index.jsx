// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App1 from './Menu.jsx';
import './styles.css';

const RootComponent = () => (
    <div>
        <div className="title"> This My Dashboard </div>
      <App1 />
    </div>
  );
  
ReactDOM.render(<RootComponent />, document.getElementById('app'));

// ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<App1 />, document.getElementById('app'));