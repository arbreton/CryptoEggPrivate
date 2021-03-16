import React from 'react';
import '../CryptoEgg.css';
import web3 from '../helpers/web3'
import funcs from '../helpers/alucontract'
import NavBar from '../components/NavBar'
import {
  getAccount
} from '../components/Web3Provider'


class MainScreen extends React.Component {
  
  async getAddressTotal(address) {
    var addressTotal = 0
    await funcs.getContract().getPastEvents('Transfer', {
      filter: {_from: address},
      fromBlock: 6059167,
      toBlock: 'latest'
    })
    .then(function(events){
      events.forEach(element => {
        if (element.returnValues._to === '0x6580B255d1ab50f304f527c198C4912aFf197c08') return
        if (element.returnValues._from === address) {
          addressTotal+=parseInt(element.returnValues._value)
        }
        // same results as the optional callback above
      })
    });
    return addressTotal
}
 
  async componentDidMount() {
    this.setState({
      sendingAddress: getAccount(),
      receivingAddress: getAccount()
    })
  }


  async createTx(fromAddress, depositAddress, amount) {
    try {
      web3.eth.sendTransaction({
        from: web3.utils.toChecksumAddress(fromAddress),
        nonce: "0x00",
        gasPrice: "0x04e3b29200",
        gasLimit: "0x1D4C0",
        to: web3.utils.toChecksumAddress(funcs.getContractAddress()),
        value: "0x0",
        data: funcs.getContract().methods.transfer(web3.utils.toChecksumAddress(depositAddress), amount).encodeABI(),
      }, function(error, hash){
        if (!error)
          console.log(hash);
        else
          console.log(error);
      });
    } catch (err) {
      console.log('\nfailed to send');
      console.log(err);
    }
  }


  async handleClick(to) {
    const address = getAccount()
    if (
      //Checks to see if addressses are valid
      web3.utils.isAddress(address) &&
      web3.utils.isAddress(to)
    ) {

      let decimals = web3.utils.toBN(3);
      let amount = web3.utils.toBN(this.state.alus);
      // calculate ERC20 token amount
      let value = amount * (web3.utils.toBN(10).pow(decimals));

      this.createTx(address, to, value)
    

    } else {
      //Alerts if one of the addresses is bad
      console.log("Bad Address");
    }
  }

  increaseAmount(amount) {
    this.setState({
      alus: parseInt(this.state.alus) + parseInt(amount)
    });
  }

  decreaseAmount(amount) {
    var result = parseInt(this.state.alus) - parseInt(amount)
    if (result < 0) return
    this.setState({
      alus: result
    });
  }

  handleChange(event) {
    const value = event.target.value.replace(/\+|-/ig, '');
    this.setState({
      alus: value
    });
  }

  render() {
    return ( 
      <div>
        <NavBar
                toMembers={() => this.toggleView(false)}
                toMarket={() => this.toggleView(true)}
              ></NavBar>
      </div>
    );
  }
}


export default MainScreen;