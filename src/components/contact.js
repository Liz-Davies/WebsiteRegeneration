import React from 'react';
import './contact.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare,faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin,faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt,faPaperPlane,faPhone,faSquare} from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faEnvelopeSquare,faPhoneSquare,faGithubSquare, faLinkedin,faTwitterSquare,faExternalLinkAlt );


const CONTACT_METHOD_ICONS={
    linkedin:faLinkedin,
    email:faEnvelopeSquare,
    phone:faPhoneSquare,
    github:faGithubSquare,
    twitter:faTwitterSquare,
    website:faSquare
}
const SORT_PRIORITY={
    email:1,
    phone:2
}
const phoneRegex = /^\+?(\d{1})?[ -]*\(?(\d{3})\)?[ -]*(\d{3})[ -]*(\d{4})$/

function formatPhoneForLink(phoneNum){
    if(phoneNum){
        return phoneNum.replace(phoneRegex,'tel:+$1$2$3$4');
    }
    return "";
}
function formatEmailForLink(email){
    return `mailto:${email}`;
}
const webRegex = /^(?:http:\/\/|https:\/\/)?(?:www.)?/
function formatWebForText(link){
    return link.replace(webRegex,"");
}

export class ContactLink extends React.Component{
    render(){
        const {url,method} = this.props;
        return (
            <a className="contact"
                href={url}>
                <FontAwesomeIcon icon={CONTACT_METHOD_ICONS[method]}/>
            </a>
        )
    }
}

export class ContactButton extends React.Component{
    render(){
        const { onClick,method,className } = this.props;
        return(
            <button type="button"
                className={"contact " + (className || "")}
                onClick={()=>onClick(method)}>
                <FontAwesomeIcon icon={CONTACT_METHOD_ICONS[method]}/>
            </button>
        )
    }
}
class ContactPanel extends React.Component{
    renderEmail(){
        const { contact,method } = this.props;
        if(method === "email"){
            return <a href={formatEmailForLink(contact)}>{contact} <FontAwesomeIcon icon={faPaperPlane}/></a>;
        }
        return null;

    }
    renderPhone(){
        const { contact,method } = this.props;
        if(method === "cell" || method === "phone" || method==="work" || method==="home"){
            return <a href={formatPhoneForLink(contact)}>{contact} <FontAwesomeIcon icon={faPhone}/></a>;
        }
        return null;

    }
    renderWeb(){
        const { contact } = this.props;
        return <a href={contact}>{formatWebForText(contact)} <FontAwesomeIcon icon={faExternalLinkAlt}/></a>;
    }
    render(){
        const { revealed,method,contact } = this.props;
        const link = this.renderPhone() || this.renderEmail() || this.renderWeb();
        return (
            <div className={ "contact-panel " + (revealed ? "revealed" : "") }>
                {link}
            </div>
        )
    }
}
class ContactCardPrint extends React.Component{
    constructor(props){
        super(props);
        const webLocation = [["website",window.location.href.replace(/#.*$/,'')]];
        console.log(faSquare);
        this.contacts = props.contact ? props.contact.concat(webLocation) : webLocation;
    }
    render(){
        const icons = this.contacts.map(([method,target])=>
            <span className="contact-small">
                 {formatWebForText(target)} <FontAwesomeIcon icon={CONTACT_METHOD_ICONS[method]}/>
            </span>
        );
        console.log(icons);
        return(
            <span className="contact-card-print">
                {icons}
            </span>
        );
    }
}

export class ContactCard extends React.Component{
    constructor(props){
        super(props);
        this.prioritizedMethods = props.contact ? Object.entries(props.contact).
            sort(([method1],[method2])=>(SORT_PRIORITY[method2]||0)-(SORT_PRIORITY[method1]||0)):[];
        this.state={
            revealed:null,
            print:window.matchMedia("print").matches
        }
    }
    componentDidMount(){
        let mediaQuery = window.matchMedia("print")
        this.mediaPrint(mediaQuery);
        mediaQuery.addListener(this.mediaPrint.bind(this));
    }
    mediaPrint(e){
        const {print} = this.state;
        if(e.matches && !print){
            this.setState({print:true});

        }else if(!e.matches && print){
            this.setState({print:false});
        }
    }
    onClick(contact){
        const revealed = this.state.revealed;
        if(contact===revealed) this.setState({revealed:null});
        else this.setState({revealed:contact});
    }
    renderTextPanels(){
        const {revealed} = this.state;
        return this.prioritizedMethods.map(
            ([method,target])=><ContactPanel key={method} method={method} revealed={method===revealed} contact={target}/>
        );
    }
    renderButtons(){
        const {revealed} = this.state;
        return this.prioritizedMethods.map(([method])=>
            <ContactButton onClick={this.onClick.bind(this)} className={method === revealed ? "toggled" : ""} key={method} method={method}/>
        );
    }
    render(){
        const {print} = this.state;
        if(print){
            return <ContactCardPrint contact={this.prioritizedMethods}/>
        }
        return (
            <div className="contact-frame">
                {this.renderTextPanels()}

                <span className="contact-card">
                    {this.renderButtons()}
                </span>

            </div>
        )
    }
}
