import './App.css';
import AuthCard from './Components/Cards/AuthCard/AuthCard';
import UnAuthCard from './Components/Cards/UnAuthCard/UnAuthCard';
import { useState } from 'react';

function App() {

  return (
    <div className='screen'>
      
        {/* <UnAuthCard/> */}
        <AuthCard />
      
    </div>
  );
}

export default App;
