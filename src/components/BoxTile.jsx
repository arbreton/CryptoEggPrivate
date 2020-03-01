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
    box.backColor = getBackColor(hash)
    box.innerBackColor = getInnerBackColor(hash)
    box.boxBackground = getBoxBackColor(hash)
    box.horizontalWrap = getHorizontalRibbonColor(hash)
    box.verticalWrap = getVerticalRibbonColor(hash)
    box.ribbon = getRibbon(hash)
    const boxStyle = {
        background: box.backColor,
    }
    const circleColor = {
        backgroundColor: box.innerBackColor,
        '&::hover' : {
            backgroundImage: 'radial-gradient('+box.backColor+', '+ box.backColor +' 70%);'
        }
    }
    const ribbonColor = {
        backgroundColor: box.ribbon,
    }
   
    const horizontalWrap = {
        backgroundColor: box.horizontalWrap,
    }
    const verticalWrap = {
        backgroundColor: box.verticalWrap,
    }
    const ribbon = {
        backgroundColor: box.innerBackColor,
    }
    const giftbox = {
        backgroundColor: box.boxBackground,
    }
    const lengthHash = 20
    return (
        <div>
            
            <button className={'card'} style={boxStyle} onClick={props.onClick}>
            <div id="circle" style={circleColor}>
                <div id="gift">
                    <div id="ribbon" style={ribbon} >
                        <div id="leftEar" style={ribbonColor}></div>
                        <div id="rightEar" style={ribbonColor}></div>
                    </div>
                    <div id="giftbox" style={giftbox}>
                        <div id="horizontalWrap" style={horizontalWrap}></div>
                        <div id="verticalWrap" style={verticalWrap}></div>
                    </div>
                </div>
            </div>
        </button>
        <div style={{fontColor:'white', fontSize:8, textAlign:'center'}}>{'0x'+props.value.substring(0,lengthHash) 
            + '...'+ props.value.substring(props.value.length-lengthHash,props.value.length)}</div>
        </div>
        
    );
}


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