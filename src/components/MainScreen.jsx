import React from 'react';
import '../CryptoEgg.css';
import '../styles/giftboxes.css'
import '../styles/mainscreen.css'
import BoxTile from './BoxTile';
import web3 from '../helpers/web3'
import crypto from 'crypto';
import { getAccount, getEthereum } from '../components/Web3Provider'


class MainScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sendingAddress: '',
        receivingAddress: '',
      };
    }

    componentDidMount() {
        this.setState({sendingAddress: getAccount(), receivingAddress: getAccount()})
    }
  
    async handleClick(i) {
        console.log(getAccount())
        console.log(this.state.sendingAddress)
        console.log(this.state.receivingAddress)
        const address = getAccount()
        const ethereum = getEthereum()
        if (
            //Checks to see if addressses are valid
            web3.utils.isAddress(address) &&
            web3.utils.isAddress(address)
          ) {
            const transactionParameters = {
                nonce: '0x00', // ignored by MetaMask
                gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
                gasLimit: '0x2710',  // customizable by user during MetaMask confirmation.
                to: address, // Required except during contract publications.
                from: address, // must match user's active address.
                value: web3.utils.toHex(web3.utils.toWei('.25')), // Only required to send ether to the recipient from the initiating external account.
                data: '', // Optional, but used for defining smart contract creation and interaction.
                chainId: 3 // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
              }
              
              ethereum.sendAsync({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
                from: address,
              }, () => {

              })  
            
          } else {
            //Alerts if one of the addresses is bad
            alert("Bad Address");
          }
    }
  
    renderSquare(value) {
      return (
        <BoxTile
          value={value}
          onClick={() => this.handleClick(value)}
        />
      );
    }
  
    render() {
        let hashes = []
        for (let x=0; x<9; x++) {
            hashes.push(crypto.randomBytes(32).toString('hex'))
        }
        
    //   var hashes = [
    //       'A6F7B874EA69329372AD75353314D7BCACD8C0BE365023DAB195BCAC015D6009',
    //       '688787D8FF144C502C7F5CFFAAFE2CC588D86079F9DE88304C26B0CB99CE91C6',
    //       '725C90C55C9F019F2B8C6F2BC7C7E13B85632B8E08B526C936787EC3FBC5959A',
    //       'E4DA0D6B41172670937D812F5FD9313D32A4A568505A090AAF012EE27C497F85',
    //       'BC9FEE771B69872CF7979D4732016B1E90C6E55A91A4DBBB09A13CD233D42436',
    //       '63ADAA1AF93CEFF486FCDF303ADEAC0716B0C5E34891FE345777637A4E5F3940',
    //       '26773930FCD8DFA978E43A1C94AB56E5CC9BB51D067B568F4C4DBFEC12018B16',
    //       '4E5ADF81A8C617A335AD893122C1DDA48CCBE81B101C3DF4C1BD55989EDE2B63',
    //       'B55238D361D3D7D19F07E06E49B28A1A2E0D5B9937191DE2C55A8312E632646A',
    //       '9D283838FA79966EE1B425586A6706CF9D4582F998900B0C9083F0142BA8BB74',
    //       'D104759C1EF947E92D9ACDED67FA74BC7A77740D48C2C8B83F5E36CF31A6F80B',
    //       '0C9A5E2BF4EE5C679E9C0FEC4FD8EC60CF1D33591F46100962E17A7DC5B2AB49',
    //   ]
    console.log(hashes)
      const items = []
      let index = 0
      hashes.forEach(element => {
          items.push((<div key={index} >{(this.renderSquare(element))}</div>))
          index++;
      })
      return (
        <div>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <div className="btn btn-secondary active">
                    <div type="radio" name="options" id="option1" autoComplete="off" checked>Shop</div>
                </div>
                <div className="btn btn-secondary">
                    <div type="radio" name="options" id="option2" autoComplete="off">My Boxes</div>
                </div>
            </div>
            <div className="container">
                {items}
            </div>
        </div>
        
      );
    }
  }


export default MainScreen;