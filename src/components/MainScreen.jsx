import React from 'react';
import '../CryptoEgg.css';
import '../styles/giftboxes.css'
import '../styles/mainscreen.css'
import BoxTile from './BoxTile';
import web3 from '../helpers/web3'
import funcs from '../helpers/alucontract'
import NavBar from '../components/NavBar'
import { Container, Button, lightColors } from 'react-floating-action-button'

import {
  getAccount
} from '../components/Web3Provider'

var fullList = []

var myAddress = ''

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
      inMarket: false,
      fullList: [],
      myAlus: '0 ALUS',
      alus: 20,
      sendingAddress: '',
      receivingAddress: '',
    };
  }

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
    // this.setState({
    //     addressTotal
    // })
}

  async initList() {
    if (fullList.length > 0) {
      this.updateListElements(fullList)
      return
    }
    
    var address = [
      '0xB2fcC40FEEe851d26f53E081AA3cBD9980537F1B',
      '0x6edC9aFA41B8a1Ea7006f085A4483094F45D2675',
      '0xf9AED95D77792adC39F681e5AddFd27Ede21f490',
      '0x0c4869fd5A92ed96Aef6EFAeFCfdC1BEe931B67F',
      '0x9b9e0dD3234c98a4580D051a5a6638804Df8a8C9',
      '0xa48Aa030893437469D57625e7a989755bf047B0B',
      '0x6B45E5ce7CF26ace79D025Eb30F45Ce162b587DF',
      '0xEe5561F1867FA09331C22B891B597b35734B2314',
      '0x9a3051fe54343cdc7313898e988456CeFc79Eeb6',
      '0x1b2F4652373Ef0766b108fA234f4cdcB9dfA99Fd',
      '0x3e509146ee51F1a566911B5092FB0C30dCb45707',
      '0x856B762d46274EF1d696103e5Fb2Af2Afee91EcB',
      '0x6580B255d1ab50f304f527c198C4912aFf197c08',
      '0xBCeB21515922dB102695Ca7B72943338899Ae3Ae'
    ]

    var listStatic = []
    listStatic.push(new ListPerson('Central Bank', await this.getAddressTotal(address[11]), address[11]))
    listStatic.push(new ListPerson('Admin Distribution', await this.getAddressTotal(address[12]), address[12]))
  
    var listOfPersons = []
    listOfPersons.push(new ListPerson('Andre', await this.getAddressTotal(address[0]), address[0]))
    listOfPersons.push(new ListPerson('Luis', await this.getAddressTotal(address[1]), address[1]))
    listOfPersons.push(new ListPerson('Nacho', await this.getAddressTotal(address[2]), address[2]))
    listOfPersons.push(new ListPerson('Rafa', await this.getAddressTotal(address[3]), address[3]))
    listOfPersons.push(new ListPerson('Diego', await this.getAddressTotal(address[4]), address[4]))
    listOfPersons.push(new ListPerson('Marcos', await this.getAddressTotal(address[5]), address[5]))
    listOfPersons.push(new ListPerson('Irvin', await this.getAddressTotal(address[6]), address[6]))
    listOfPersons.push(new ListPerson('Johann', await this.getAddressTotal(address[7]), address[7]))
    listOfPersons.push(new ListPerson('Abi', await this.getAddressTotal(address[8]), address[8]))
    listOfPersons.push(new ListPerson('Zahory', await this.getAddressTotal(address[9]), address[9]))
    listOfPersons.push(new ListPerson('Mauricio', await this.getAddressTotal(address[13]), address[13]))

    listOfPersons.sort(function(a, b){
      if(parseInt(a.total) < parseInt(b.total)) { return 1; }
      if(parseInt(a.total) > parseInt(b.total)) { return -1; }
      return 0;
    })

    fullList = listStatic.concat(listOfPersons)

    this.updateListElements(fullList)
  }

  updateListElements(list) {
    if (this.state.inMarket) return
    this.setState({
      fullList: list
    })
  }
 
  async componentDidMount() {
    await this.getMyBalance()
    this.initList()
    this.setState({
      sendingAddress: getAccount(),
      receivingAddress: getAccount()
    })
  }
  async getMyBalance() {
    var tempAlus = '0'
    await web3.eth.getAccounts()
    .then(accounts => {
      myAddress = accounts[0]
    });
    try {
      await funcs.getContract().methods.balanceOf(myAddress)
      .call({from: myAddress}, function(error, result){
        if (error) {
          
        } else {
          tempAlus = result
        }
      });
    } catch (err) {
      console.log('\nfailed to send');
      console.log(err);
    }

    var myAlus = '0'
    if (tempAlus/1000 === 1) {
      myAlus = '1 ALU'
    } else {
      myAlus = tempAlus/1000 + ' ALUS'
    }
    

    this.setState({
      myAlus: myAlus,
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

  renderSquare(address, total, name) {
    return ( 
      <BoxTile
          key={name}
          name={name}
          address={address}
          total={total}
          myAddress={myAddress}
          inMarket={this.state.inMarket}
          increaseAmount={() => this.increaseAmount(total)}
          decreaseAmount={() => this.decreaseAmount(total)}
          onClick={() => this.handleClick(address)}
        ></BoxTile>
    );
  }

  handleChange(event) {
    const value = event.target.value.replace(/\+|-/ig, '');
    this.setState({
      alus: value
    });
  }

  async clearAlus() {
    var value = 0
    const inMarket = this.state.inMarket
    if (inMarket) {
      value = 0
    } else {
      value = 20
    }
    this.toggleView(inMarket)
    await this.setState({
      alus: value
    })
  }

  async toggleView(toMarket) {
    if (toMarket) {
      await this.setState({
        inMarket: toMarket,
        fullList: []
      })
      var listStatic = []
      const aluAddress = '0x3e509146ee51F1a566911B5092FB0C30dCb45707'
      listStatic.push(new ListPerson('Eggs', 3, aluAddress))
      listStatic.push(new ListPerson('Lettuce*', 2, aluAddress))
      listStatic.push(new ListPerson('Bread Loaf', 3, aluAddress))
      listStatic.push(new ListPerson('Spinach*', 2, aluAddress))
      listStatic.push(new ListPerson('Brocoli', 2, aluAddress))
      listStatic.push(new ListPerson('Onion*', 3, aluAddress))
      listStatic.push(new ListPerson('Tomato*', 5, aluAddress))
      listStatic.push(new ListPerson('Avocado*', 10, aluAddress))
      listStatic.push(new ListPerson('Oats*', 4, aluAddress))
      listStatic.push(new ListPerson('Tortilla*', 2, aluAddress))
      listStatic.push(new ListPerson('Serrano*', 2, aluAddress))
      listStatic.push(new ListPerson('Cereal*', 8, aluAddress))
      listStatic.push(new ListPerson('Banana*', 4, aluAddress))
      listStatic.push(new ListPerson('Apple*', 5, aluAddress))
      
      listStatic.push(new ListPerson('Protein bar', 8, aluAddress))
      listStatic.push(new ListPerson('Trail mix', 12, aluAddress))
      listStatic.push(new ListPerson('Chewy Bar', 6, aluAddress))
      listStatic.push(new ListPerson('Granola Bar', 4, aluAddress))

      listStatic.push(new ListPerson('Chips/Veggies', 9, aluAddress))
      listStatic.push(new ListPerson('Chocolate', 12, aluAddress))
      listStatic.push(new ListPerson('Chocolate Mini', 3, aluAddress))
      listStatic.push(new ListPerson('Popcorn', 5, aluAddress))


      listStatic.push(new ListPerson('Chicken Breast', 20, aluAddress))
      listStatic.push(new ListPerson('Hamburger Meat', 15, aluAddress))
      listStatic.push(new ListPerson('Pasta', 15, aluAddress))
      listStatic.push(new ListPerson('Pasta Sauce', 12, aluAddress))
      listStatic.push(new ListPerson('Soup', 11, aluAddress))
      listStatic.push(new ListPerson('Tuna', 9, aluAddress))
      listStatic.push(new ListPerson('Vegetables can', 11, aluAddress))

      listStatic.push(new ListPerson('Gatorade', 13, aluAddress))
      listStatic.push(new ListPerson('Juice V8', 8, aluAddress))
      listStatic.push(new ListPerson('Coconut Water', 13, aluAddress))
      listStatic.push(new ListPerson('Yogurt (greek)', 11, aluAddress))
      listStatic.push(new ListPerson('Yogurt (activia)', 8, aluAddress))

      
 

      await this.setState({
        inMarket: toMarket,
        fullList: listStatic,
        alus: 0
      })
    } else {
      await this.setState({
        inMarket: toMarket,
        fullList: [],
        alus: 20
      })
      this.initList()
    }
  }


  render() {
    const items = []
    this.state.fullList.forEach(element => {
      items.push(this.renderSquare(element.address, element.total, element.name))
    })
    return ( 
      <div>
              <NavBar
                toMembers={() => this.toggleView(false)}
                toMarket={() => this.toggleView(true)}
              ></NavBar>
    <h1>
      {this.state.inMarket && <span>Market</span>}
      {!this.state.inMarket && <span>Members</span>}
            </h1>
                <br></br>
                    <br>
                        </br>
                        <div style={ { justifyContent: 'center' , } }>
                            <h2> How much you want to send?<br></br>(Balance: {this.state.myAlus})
                            
                            </h2>
                            <input className="inputValue" type="number" pattern="[0-9]*" value={this.state.alus} 
                              onChange={this.handleChange.bind(this)} /> <br></br>

                              <button className="buttonClear" onClick={this.clearAlus.bind(this)}>Clear</button>
                              <br></br>
                        </div>
                        
                            <br></br>
                                <br></br>
                          <table className="container">
                          <thead>
                              <tr>
                                  <th>
                                      <h1> Name </h1>
                                  </th>
                                  
              {this.state.inMarket && <>
                <th> <h1>Prices </h1></th>
                <th> <h1>Quantity </h1></th>
              </>}
              {!this.state.inMarket && <>
                <th> <h1>Total Amount Sent </h1></th>
              </>}
                                   
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
                          <Container>

                          {this.state.inMarket && <Button styles={{backgroundColor: "#185875", color: lightColors.white}}
                              onClick={() => this.handleClick('0x3e509146ee51F1a566911B5092FB0C30dCb45707')}>Pay</Button>}
                          </Container>
                          
                          {this.state.inMarket && <p style={{textAlign:"center"}}>* price per piece </p>}
                          </div>

    );
  }
}


export default MainScreen;