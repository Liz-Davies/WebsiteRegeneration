import React from 'react';
import Logo from './logo.js'

import './title.css'

import {ContactCard} from './contact.js';
// <img className="logo logo-dark" alt="logo dark" src="./logo_dark.png"/>
// <img className="logo" alt="logo" src="./logo_contrast_light.png"/>

export default class TitleCard extends React.Component{
    render(){
        const {name,title,contactMethods,className} = this.props;
        console.log(contactMethods)
        return (
            <div id="title" className={className}>
                <div className="title-mask">
                    <Logo className="logo inverse"/>
                    <div className="page-title">
                        <div className="name">
                            {name}
                        </div>
                        <hr/>
                        <div className="career-title">
                            {title}
                        </div>
                    </div>
                    <ContactCard contact={contactMethods}/>
                </div>
            </div>

        );
    }
}
