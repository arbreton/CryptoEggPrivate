import web3 from '../helpers/web3';

const deployeAddress = '0x101D450A5Cf279A4875fb31dA5791546406D0767';

const deployedAbi = [{"constant":false,"inputs":[],"name":"approve","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getContractBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"requester","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"approvers","outputs":[{"name":"approver","type":"address"},{"name":"isApproved","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"receiver","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"approversList","type":"address[]"},{"name":"receivedBy","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"}];

function allBoxes() {
    return 'hello'
}

export default new web3.eth.Contract(deployedAbi,deployeAddress);



// allBoxes

// myBoxes

// openBox