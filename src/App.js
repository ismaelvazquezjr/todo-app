import React from 'react';
import TodoApp from './TodoApp';
import Particles from 'react-particles-js';
import './App.css';

function App() {
  return (
    <div className="App">
    <TodoApp />
    <Particles className="todo-particles"
        params={{ 
          particles: { 
            number: { 
              value: 350, 
              density: { 
                enable: true, 
                value_area: 1000, 
              } 
            }, 
          }, 
        }} 
      />
    </div>
  );
}

export default App;
