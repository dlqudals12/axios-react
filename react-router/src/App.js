import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profile from './Profile';

const App = () => {
  return (
    <div>
      <ul>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />}></Route> 
        </Routes>
      </ul>
      <hr />
      <Routes>
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" exact={true} component={About} />
      <Route path="/profiles/:username"  component={Profile}  />
      </Routes>
    </div>
  );
};

export default App;
