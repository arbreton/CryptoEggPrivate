import React from 'react';

class Box {
    backColor = 0
    innerBackColor = 0
    boxBackground = 0
    horizontalWrap = 0
    verticalWrap = 0 
    ribbon = 0
}

function BoxTile(props) {
    const box = new Box()
    const hash = props.value

    const name = props.name
    const total = props.total
    box.backColor = getBackColor(hash)
    box.innerBackColor = getInnerBackColor(hash)
    box.boxBackground = getBoxBackColor(hash)
    box.horizontalWrap = getHorizontalRibbonColor(hash)
    box.verticalWrap = getVerticalRibbonColor(hash)
    box.ribbon = getRibbon(hash)

    return (

     <tr>
        <td>{name}</td>
    <td>{total}</td>
        <td><button onClick={props.onClick}>
                Exchange
                </button></td>
      </tr>
        
    );
}

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


function getBackColor(value) {
    return '#' + value.substring(0,6).toString() 
}

function getInnerBackColor(value) {
    return '#' + value.substring(6,12).toString() +"99"
}

function getBoxBackColor(value) {
    return '#' + value.substring(12,18).toString() +"99"
}

function getHorizontalRibbonColor(value) {
    return '#' + value.substring(18,24).toString() +"99"
}

function getVerticalRibbonColor(value) {
    return '#' + value.substring(24,30) +"99"
}

function getRibbon(value) {
    return '#' + value.substring(30,36) +"99"
}



export default BoxTile;