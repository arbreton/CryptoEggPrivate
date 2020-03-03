import React from 'react';
import web3 from '../helpers/web3'

let account = null
let ethereum = null

export function getAccount() {
    return account;
}

export function getEthereum() {
    return ethereum;
}

class Web3Provider extends React.Component {
    
    componentDidMount() {
        this.initializeWeb3()
    }

    async initializeWeb3() {
        ethereum = window.ethereum
        if (typeof window.ethereum !== 'undefined') { 
            const accounts = await ethereum.enable()
            account = accounts[0] 
            web3.eth.getBalance(account, (err, wei) => { })
        }
    }

    render() {
        return true
    }
}

export default Web3Provider;
