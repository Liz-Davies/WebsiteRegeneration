import React from 'react';
import './navbar.css';

import {Toggle} from './buttons-n-things.js';
import Logo from './logo.js';

import {getCookie,setCookie} from './cookie-utilities.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faMoon);

class NavButton extends React.Component{
    render(){
        const {title,targetId,selected} = this.props;
        return (
            <li className={`nav-button ${selected ? "selected":""}`}>
                <a className="nav-link" href={`#${targetId}`}>
                <span className="nav-text">{title}</span>
                </a>
            </li>
        );
    }
}
class NavGridButton extends React.Component{
    render(){
        const {title,targetId,selected,row} = this.props;
        let style={
            gridRowStart: row+1
        }
        return (
            <li style={style} className={`nav-button nav-grid-button ${selected ? "selected":""}`}>
                <a className="nav-link" href={`#${targetId}`}>
                <span className="nav-text">{title}</span>
                </a>
            </li>
        );
    }
}
export default class Navbar extends React.Component{
    constructor(props){
        super(props)
        const {highlight} = this.props;

        this.offset = window.innerHeight/3;
        this.body_target = document.getElementsByTagName('body')[0];
        //default light/dark
        this.default_on = getCookie('dark_mode') === 'true';
        if(this.default_on) this.body_target.classList.add("dark");

        this.state = {
            highlight:highlight
        }
    }
    collectButtons(){
        //document.getElementsByClassName("content-section")
        let sections = Array.from(document.querySelectorAll(".content-section[data-nav-title]"));
        return Array.prototype.filter.call(sections,(section)=>section.id!==undefined && section.id !==null)
            .map((section)=>({
                targetId:section.id,
                title:section.dataset.navTitle,
            }));
    }

    lightDarkToggle(val){
        var body = document.getElementsByTagName('body')[0];
        setCookie('dark_mode',val,'/');
        body.classList.toggle("dark");
    }
    renderButtons(){
        const {highlight} = this.state;
        return this.buttons !== undefined ?
            this.buttons.map((item)=><NavButton key={item.targetId} selected={highlight===item.targetId} title={item.title} targetId={item.targetId}/>) :
            [];
    }
    handleScroll(e){
        let height = e.target.scrollingElement.scrollTop + this.offset ;
        //first element less than the height
        const focus = this.state.targets.find((item)=> item.position < height);
        this.setState({highlight:focus===undefined? null : focus.targetId})
    }
    resize(){
        this.offset = window.innerHeight/3;
        let b = this.buttons.map((button)=>{
            var elem = document.getElementById(button.targetId);
            return {
                targetId:button.targetId,
                title:button.title,
                position:elem.offsetTop
            };
        }).sort((a,b)=> b.position - a.position );
        this.setState({targets:b})
    }
    componentDidMount(){
        this.buttons = this.collectButtons();
        this.resize();
        window.addEventListener('resize',this.resize.bind(this));
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    toggleShowNav(){
        const {id} = this.props;
        const navbarElem = document.getElementById(id);
        navbarElem.classList.toggle('open');
    }
    render(){
        const buttons = this.renderButtons();
        const {id} = this.props;
        return (
            <nav id={id} className="navbar sticky">
                <span className="nav-brand">
                    <Logo className="logo"/>
                </span>
                <ul className="nav-list ">{buttons}</ul>
                <Toggle id="light-dark-toggle"
                    on={this.default_on}
                    label={<FontAwesomeIcon icon={faMoon}/>}
                    onToggle={this.lightDarkToggle} name="dark_mode"/>
            </nav>
        )
    }
}
var ticking = false;

class NavShuttle extends React.Component {
    constructor(props){
        super(props)

        this.state={
            start:0
        }
    }
    handleScroll(e){
        if(!ticking){
            window.requestAnimationFrame(()=>{
                this.setState({
                    start: (window.scrollY/this.page_height) * this.client_height
                })
                ticking = false;
            })
            ticking = true;
        }

    }
    componentDidMount(){
        this.page_height = document.body.clientHeight;
        this.client_height = document.documentElement.clientHeight;
        this.shuttle_height = `${(this.client_height/this.page_height)*100}%`;
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    render(){
        const {start} = this.state;
        let style={
            top:`${start}px`,
            height:this.shuttle_height,
        }
        return <span style={style} className="nav-shuttle"></span>;
    }
}

export class SideNav extends Navbar{
    constructor(props){
        super(props);
        this.state={
            targets:[],
            gridTemplateRows:"",
        }
    }
    componentDidMount(){
        let totalHeight = document.body.clientHeight;
        let targets_rev = this.props.buttons.map((button)=>{
            var elem = document.getElementById(button.targetId);
            return {
                title:button.title,
                targetId:button.targetId,
                position:elem.offsetTop
            };
        }).sort((a,b)=>b.position - a.position);
        var localEnd = totalHeight;
        let targets = targets_rev.map((button)=>{
            button.height = localEnd - button.position;
            localEnd = button.position;
            return button;
        }).reverse();

        this.setState({
            targets:targets,
            gridTemplateRows: targets.reduce((acc,item)=>`${acc} ${item.height}fr`,`${targets[0].position}fr`)
        })
    }
    renderButtons(){
        return this.state.targets.map(({targetId,title},index)=> <NavGridButton key={targetId} title={title} row={index+1} targetId={targetId}/>);
    }
    renderBrand(){
        const {brandImgUrl,brandText} = this.props;
        if(typeof brandImgUrl !== 'undefined'){
            return (
                <li className="nav-button nav-brand-button">
                <img className="nav-brand"
                    src={brandImgUrl}
                    alt={brandText ? brandText : "brand ID"}
                    href="#" />
                </li>
            );
        }else {
            return <NavGridButton key="brand" row="0" title={brandText ? " " : brandText} targetId=" "/>;
        }
    }
    render(){
        const {id} = this.props;
        const style = {
            gridTemplateRows:this.state.gridTemplateRows,
        }
        return (
            <nav id={id} className="navbar side-nav">
                <ul style={style} className="nav-list nav-grid">
                    {this.renderBrand()}
                    {this.renderButtons()}
                </ul>
                <NavShuttle/>
            </nav>
        )
    }
}
