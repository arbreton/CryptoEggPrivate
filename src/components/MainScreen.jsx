import React from 'react';
import '../CryptoEgg.css';
import '../styles/giftboxes.css'
import '../styles/mainscreen.css'
import BoxTile from './BoxTile';
import web3 from '../helpers/web3'

import {
  getAccount
} from '../components/Web3Provider'

const abiArray = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"owners","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sender","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"addSignature","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"printALU","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalInCirculation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnerShip","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"central","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"},{"name":"_custom_fallback","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"signedOwners","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Print","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_old","type":"address"},{"indexed":true,"name":"_new","type":"address"}],"name":"OwnershipTransfered","type":"event"}]')
const contractAddress = '0x8dde40a78b05b419e27f13f6f8e21d18fca28dc0'
const contract = new web3.eth.Contract(abiArray, contractAddress);

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alus: '',
      sendingAddress: '',
      receivingAddress: '',
    };
  }

  componentDidMount() {
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
        gasLimit: "0x7458",
        to: web3.utils.toChecksumAddress(contractAddress),
        value: "0x0",
        data: contract.methods.transfer(web3.utils.toChecksumAddress(depositAddress), amount).encodeABI(),
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

      // var abiArray = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"owners","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sender","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"addSignature","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalInCirculation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnerShip","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"central","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"},{"name":"_custom_fallback","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"signedOwners","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Print","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_old","type":"address"},{"indexed":true,"name":"_new","type":"address"}],"name":"OwnershipTransfered","type":"event"}]')
      // const contractAddress = '0x349E68a146e5f02820FCB0206FC165f398E27024'

      // var contract = new web3.eth.Contract(abiArray, contractAddress);


      let decimals = web3.utils.toBN(3);
      let amount = web3.utils.toBN(this.state.alus);
      // calculate ERC20 token amount
      let value = amount * (web3.utils.toBN(10).pow(decimals));

      this.createTx(address, to, value)

      // contract.methods.transfer(to, value).send({
      //   from: address,
      //   gas: 100000,
      //   gasPrice: 3000000000
      // }, function (error, transactionHash) {
      //   console.log(error)
      //   console.log(transactionHash)
      // });



      //   contract.methods.transfer(to, web3.toBigNumber())
      //   .send({from:address }).on('transactionHash', function(hash){

      // })
      // .on('receipt', function(receipt){

      // })
      // .on('confirmation', function(confirmationNumber, receipt){

      // })
      // .on('error', function(error, receipt) {

      // });

      // const transactionParameters = {
      //     nonce: '0x00', // ignored by MetaMask
      //     gasPrice: '0x2540BE400',
      //     gasLimit: web3.eth.getBlock("latest").gasLimit,  // customizable by user during MetaMask confirmation.
      //     to: contractAddress, // Required except during contract publications.
      //     from: address, // must match user's active address.
      //     value: web3.utils.toHex(web3.utils.toWei('.25')), // Only required to send ether to the recipient from the initiating external account.
      //     data: data, // Optional, but used for defining smart contract creation and interaction.
      //     chainId: 3 // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      //   }

      //   ethereum.sendAsync({
      //     method: 'eth_sendTransaction',
      //     params: [transactionParameters],
      //     from: address,
      //   }, () => {

      //   })  

    } else {
      //Alerts if one of the addresses is bad
      console.log("Bad Address");
    }
  }

  renderSquare(value, name) {
    return ( 
      <BoxTile
          key={value}
          name={name}
          value={value}
          onClick={() => this.handleClick(value)}
        ></BoxTile>
    );
  }

  handleChange(event) {
    const value = event.target.value.replace(/\+|-/ig, '');
    this.setState({
      alus: value
    });
  }

  render() {
    // let hashes = []
    // for (let x=0; x<9; x++) {
    //     hashes.push(crypto.randomBytes(32).toString('hex'))
    // }

    var address = [
      '0xB2fcC40FEEe851d26f53E081AA3cBD9980537F1B',
      '0x6edC9aFA41B8a1Ea7006f085A4483094F45D2675',
      '0xf9AED95D77792adC39F681e5AddFd27Ede21f490',
      '0x0c4869fd5A92ed96Aef6EFAeFCfdC1BEe931B67F',
      '0x9b9e0dD3234c98a4580D051a5a6638804Df8a8C9',
      '0x6317C09d7D2f13C79273D930eF96E9354c5304B7',
      '0x6B45E5ce7CF26ace79D025Eb30F45Ce162b587DF',
      '0xEe5561F1867FA09331C22B891B597b35734B2314',
      '0x9a3051fe54343cdc7313898e988456CeFc79Eeb6',
      '0x1b2F4652373Ef0766b108fA234f4cdcB9dfA99Fd',
    ]

    var names = [
      'Andre',
      'Luis',
      'Nacho',
      'Rafa',
      'Diego',
      'Marcos',
      'Irving',
      'Johann',
      'Abi',
      'Zahory',
    ]
    // contract.getPastEvents('Transfer', {
    //   fromBlock: 6059167,
    //   toBlock: 'latest'
    // })
    // .then(function(events){
    //     console.log(events) // same results as the optional callback above
    // });

    const items = []
    let index = 0
    address.forEach(element => {
      items.push(this.renderSquare(element, names[index]))
      index++;
    })
    return ( 
      <div>
    <h1>
        <span className="blue"></span>High <span className="blue"></span>
            <span className="yellow"> Scores </span> </h1>

                <br>
                    </br>
                    < br>
                        </br>
                        < div style={ { justifyContent: 'center' , } }>
                            <h2> How much you want to Exchange ?
                            </h2>
                            < input className="inputValue" type="number" pattern="[0-9]*" defaultValue={0} onInput={
                                this.handleChange.bind(this) } />

                            </div>
                            <br>
                                </br>
                                < br>
                                    </br>
                                    <table className="container">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <h1> Name </h1>
                                                </th>
                                                < th>
                                                    < h1> Tx 's Total</h1>
                                                        </th>
                                                        <th>
                                                            <h1> Address </h1>
                                                        </th>
                                            </tr>
                                        </thead>
                                        <tbody> 
                                          {
                                            items
                                          } 
                                        </tbody>
                                    </table>
                                    </div>

    );
  }
}


export default MainScreen;