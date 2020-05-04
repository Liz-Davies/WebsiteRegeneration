import React from 'react';
import './hex-style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fas)

const EDUCATION_ICON_MAPPING ={
    "computer science":"fa-laptop-code",
    "music":"fa-music",
    "english":"fa-book-open",
    "education":"fa-chalkboard-teacher",
    "math":"fa-square-root-alt",
    "science":"fa-microscope",
    "chemistry":"fa-flask",
    "biology":"fa-dna",
    "physics":"fa-atom",
    "architecture":"fa-archway"
}
const EDUCATION_REGEX = /(?:bachelor | masters |major|majoring )(?:of |in |: )(\w+)/
/*
"endDate": "2020-05",
"startDate": "2016-09",
"location": "Carleton University",
"accreditation": "Bachelor of Computer Science"
*/

export default class HexIcon extends React.Component{
    getIcon(){
        let type = this.props.accreditation.match(EDUCATION_REGEX)
        if(type===undefined || type.length < 2){
            return "";
        }
        return EDUCATION_ICON_MAPPING[type[type.length-1].toLowercase()];
    }
    render(){
        const {name,icon} = this.props;
        return (
            <div className="hex hex-icon-frame">
            <div className="hex-mask"><div className="hex-mask"><div className="hex-mask">
                <div className="hex-content">
                <FontAwesomeIcon className="hex-icon" icon={this.getIcon()}/>
                <span className="text-capitalize hex-ed-title">{accreditation}</span>
                <span className="hex-ed-date"></span>
                </div>
                <div className="hex-mask"><div className="hex-mask"><div className="hex-mask">{/*Shadow masks*/}</div></div></div>
                {info ? <div className="hex-hover-box"><div className="hex-hover-box-text">{info}</div></div> : ""}
            </div></div></div>
            </div>
        );
    }
}
