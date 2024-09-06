import React from 'react';
import "./SelectCard.css";

function SelectCard({setDisplayCard}) {
  return (
    <div className='SelectCard'>
      <h1>Select the appropriate card</h1>
      <button onClick={()=>{setDisplayCard('auth')}}>Auth Card</button>
      <button onClick={()=>setDisplayCard('unauth')}>UnAuth Card</button>
    </div>
  )
}

export default SelectCard;
