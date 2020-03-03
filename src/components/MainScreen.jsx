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
const contractAddress = '0x869c8FF2A1b60862E7889244F01C8f16cb39DDD8'
const contract = new web3.eth.Contract(abiArray, contractAddress);

class ListPerson {
  constructor(name, total, address) {    
    this.name = name;
    this.total = total;
    this.address = address;
  }
}

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfPersons: [],
      alus: '',
      sendingAddress: '',
      receivingAddress: '',
    };
  }

  initList() {
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

  
    var listOfPersons = []
    listOfPersons.push(new ListPerson('Andre', this.getAddressAmount(address[0]), address[0]))
    listOfPersons.push(new ListPerson('Luis', this.getAddressAmount(address[1]), address[1]))
    listOfPersons.push(new ListPerson('Nacho', this.getAddressAmount(address[2]), address[2]))
    listOfPersons.push(new ListPerson('Rafa', this.getAddressAmount(address[3]), address[3]))
    listOfPersons.push(new ListPerson('Diego', this.getAddressAmount(address[4]), address[4]))
    listOfPersons.push(new ListPerson('Marcos', this.getAddressAmount(address[5]), address[5]))
    listOfPersons.push(new ListPerson('Irving', this.getAddressAmount(address[6]), address[6]))
    listOfPersons.push(new ListPerson('Johann', this.getAddressAmount(address[7]), address[7]))
    listOfPersons.push(new ListPerson('Abi', this.getAddressAmount(address[8]), address[8]))
    listOfPersons.push(new ListPerson('Zahory', this.getAddressAmount(address[9]), address[9]))

    console.log(listOfPersons)
    this.setState({
      listOfPersons
    })
  }

  componentDidMount() {
    this.initList()
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

  renderSquare(value, total, name) {
    return ( 
      <BoxTile
          key={value}
          name={name}
          value={value}
          total={total}
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


  getAddressAmount(address) {
    var addressTotal = 0
    contract.getPastEvents('Transfer', {
      //filter: {_from: '0xB2fcC40FEEe851d26f53E081AA3cBD9980537F1B'},
      fromBlock: 6059167,
      toBlock: 'latest'
    })
    .then(function(events){
      events.forEach(element => {
        if (element.returnValues._to == '0x6580B255d1ab50f304f527c198C4912aFf197c08') return
        if (element.returnValues._from == address) {
          addressTotal+=element.returnValues._value
          console.log(element.returnValues._from + " " 
          +element.returnValues._to + " " +(element.returnValues._value)) 
        }
        // same results as the optional callback above
      })
    });
    return addressTotal
  }

  render() {
    // let hashes = []
    // for (let x=0; x<9; x++) {
    //     hashes.push(crypto.randomBytes(32).toString('hex'))
    // }

    const items = []
    this.state.listOfPersons.forEach(element => {
      items.push(this.renderSquare(element.address, element.total, element.name))
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
                            < input className="inputValue" type="number" pattern="[0-9]*" defaultValue={20} onInput={
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
                                                    < h1> Total Amount Sent </h1>
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