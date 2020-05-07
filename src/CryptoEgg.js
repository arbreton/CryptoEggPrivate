import React from 'react';
import './CryptoEgg.css';
import './components/MainScreen';
import MainScreen from './components/MainScreen';
import Web3Provider from './components/Web3Provider'

function CryptoEgg() {
  return (
    <div>
      <Web3Provider></Web3Provider>
      <MainScreen></MainScreen>
    </div>
  );
}

export default CryptoEgg;
