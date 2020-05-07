import React from 'react';
import CountUp from 'react-countup';
import web3 from '../helpers/web3';


const isSelected = {
    true: "selected",
    false: ""
};
class BoxTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           isSelected: false, 
           quantity: 0,
           addressTotal: 0
        };
      }

    equals(nextState, state) {
        return state.addressTotal === nextState.addressTotal && state.quantity === 
        nextState.quantity && this.state.isSelected === nextState.isSelected
    }

    shouldComponentUpdate(nextProps, nextState){
        return !this.equals(nextState, this.state); // equals() is your implementation
    }

    handleClick(plus) {
        var result = this.state.quantity
        if (plus) {
            result+=1
        } else {
            result-=1
        }
        var isSelected = true
        if (result === 0) isSelected = false
        if (result < 0) return
        this.setState({
            isSelected,
            quantity: result
        }) 
    }

    
    

    render() {
        //this.getAddressTotal(this.props.value)
        const address = this.props.address
        const name = this.props.name
        const total = this.props.total
        const myAddress = this.props.myAddress
        const inMarket = this.props.inMarket

        const isDisabled = web3.utils.toChecksumAddress(myAddress) 
        === web3.utils.toChecksumAddress(address)


        return (

        <tr className={isSelected[this.state.isSelected]}>
            {inMarket && <td>{name}</td>}
            {!inMarket && <td>{name}</td>}
            <td onClick={()=>{ this.props.increaseAmount(); this.handleClick(true) }}>
            <CountUp 
                end={parseInt(total)}
                duration={2}
            />
            </td>
            {inMarket && <>
            <td>x {this.state.quantity}</td>
            </>}
            <td>
            {inMarket && <>
                <button onClick={() => {this.props.decreaseAmount(); this.handleClick(false)}} 
                disabled={isDisabled}>
                -
            </button>
                <button onClick={() => {this.props.increaseAmount(); this.handleClick(true)}} 
                    disabled={isDisabled}>
                    +
                </button>
            </>}
            {!inMarket &&
                <button onClick={this.props.onClick} 
                    disabled={isDisabled}>
                    Send
                </button>
            }
            </td>
            </tr>
        );
        }
}



// function BoxTile(props) {
    
// }

// function handleClick() {
//     console.log(getAccount())
//         console.log(this.state.sendingAddress)
//         console.log(this.state.receivingAddress)
//         const address = getAccount()
//         const ethereum = getEthereum()
//         if (
//             //Checks to see if addressses are valid
//             web3.utils.isAddress(address) &&
//             web3.utils.isAddress(address)
//           ) {
//             const transactionParameters = {
//                 nonce: '0x00', // ignored by MetaMask
//                 gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//                 gasLimit: '0x2710',  // customizable by user during MetaMask confirmation.
//                 to: address, // Required except during contract publications.
//                 from: address, // must match user's active address.
//                 value: web3.utils.toHex(web3.utils.toWei('.25')), // Only required to send ether to the recipient from the initiating external account.
//                 data: '', // Optional, but used for defining smart contract creation and interaction.
//                 chainId: 3 // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//               }
              
//               ethereum.sendAsync({
//                 method: 'eth_sendTransaction',
//                 params: [transactionParameters],
//                 from: address,
//               }, () => {

//               })  
            
//           } else {
//             //Alerts if one of the addresses is bad
//             alert("Bad Address");
//           }
// }


export default BoxTile;