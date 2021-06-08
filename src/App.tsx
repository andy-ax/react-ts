import React, { Children } from 'react';
import logo from './logo.svg';
import './App.css';

type arg = {
  children: string;
  title: string;
}

const H3 = ({children, title}: arg) => {
  return <h3 title={title}>{children}</h3>
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <H3 title="name">hello</H3>
      </header>
    </div>
  );
}


export default App;
