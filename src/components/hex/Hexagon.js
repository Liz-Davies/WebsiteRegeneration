import React from 'react';
import './hex-style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fas)


export class HexIcon extends React.Component{
    render(){
        const {name,icon} = this.props;
        return (
            <div className="hex hex-icon-frame">
                <div className="hex-mask">
                    <div className="hex-content">
                        <FontAwesomeIcon className="hex-icon" icon={icon}/>
                        <span className="text-capitalize hex-icon-title">
                            {name}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default class HexPie extends React.Component{
    renderNamePlate(){
        const {name,info} = this.props;
        if(!name && !info){
            //if the name and info are empty assume user doesn't want nameplate
            return "";
        }
        return(<div className="hex-name-plate"
            tabIndex={0}>
            <span className="hex-title">
                {name}
            </span>
            {info?<span  className="d-print-none hex-info"><FontAwesomeIcon icon="info-circle"/></span>:''}
        </div>);
    }
    renderOG(){
        const {percent,info} = this.props;
        var rotateLeft = 0;
        var rotateRight = 0;
        if(percent){
            if(percent <= 50 && percent >= 0){
                rotateLeft = (percent/100) * 180;
            }else if(percent > 50 && percent <=100 ){
                rotateLeft = 180;
                rotateRight = ((percent-50)/100) * 180;
            }
        }
        var leftStyle={
            transform: `rotate(-${rotateLeft}deg)`
        }
        var rightStyle={
            transform: `rotate(-${rotateRight}deg)`
        }
        return(
            <div className={"hex hex-pie  "+(info ? "expandable": "")}>
            <div className="hex-mask"><div className="hex-mask"><div className="hex-mask">
            <div className="hex-content">
                <div className="hex-left">
                    <div className="hex-fill" style={leftStyle}></div>
                </div>
                <div className="hex-right">
                    <div className="hex-fill" style={rightStyle}></div>
                </div>

            </div>

            <div className="hex-mask"><div className="hex-mask"><div className="hex-mask">{/*Shadow masks*/}</div></div></div>
            {this.renderNamePlate()}
            {info ? <div className="hex-hover-box"><div className="hex-hover-box-text">{info}</div></div> : ""}
            </div></div></div>

            </div>
        )
    }
    render(){
        const {percent,info} = this.props;
        var rotateLeft = 0;
        var rotateRight = 0;
        if(percent){
            if(percent <= 50 && percent >= 0){
                rotateLeft = (percent/100) * 180;
            }else if(percent > 50 && percent <=100 ){
                rotateLeft = 180;
                rotateRight = ((percent-50)/100) * 180;
            }
        }
        var leftStyle={
            transform: `rotate(-${rotateLeft}deg)`
        }
        var rightStyle={
            transform: `rotate(-${rotateRight}deg)`
        }
        return(
            <div className={"hex hex-pie  "+(info ? "expandable": "")}>
            <div className="hex-mask hex-clip">
            <div className="hex-content">
                <div className="hex-left">
                    <div className="hex-fill" style={leftStyle}></div>
                </div>
                <div className="hex-right">
                    <div className="hex-fill" style={rightStyle}></div>
                </div>

            </div>
            {this.renderNamePlate()}
            {info ? <div className="hex-hover-box"><div className="hex-hover-box-text">{info}</div></div> : ""}
            </div>

            </div>
        )
    }
}
