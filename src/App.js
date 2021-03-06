import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Timer } from './components/timer/Timer.jsx';

const App = () => (
  <div className="container mx-auto max-w-xl">
    <Timer />
  </div>
);

export default hot(App);
