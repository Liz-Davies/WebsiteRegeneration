import React from 'react';
import './App.css';
import resume from './resume';
import {HexIconRowSet,HexPieRowSet} from './components/hex/HexRows.js';

import { ExperienceSet } from './components/experience.js';
import { EducationSet } from './components/education.js'
import Navbar from './components/navbar.js';
import TitleCard from'./components/title.js';

import {getCookie,setCookie} from './components/cookie-utilities.js'

export class CookiePopup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            promptForCookies:!(getCookie('accept-cookies')==='true')
        }
    }
    render(){
        if(this.state.promptForCookies){
            return <div className="accept-cookies-popup">
                <button type="button"
                    onClick={()=>{setCookie("accept-cookies",true,"/");this.setState({promptForCookies:false})}}
                    className="close"></button>
                <span className="accept-cookies-text">
                    This web page uses cookies for purely aesthetic reasons. Close the banner to accept.
                </span>
            </div>
        }
        return "";
    }
}


function App() {
    return (
        <div className="App" onScroll={(e)=> console.log(`App scroll: ${e}`)}>
            <TitleCard name={resume.about.proper_name}
                title={resume.about.title}
                contactMethods={resume.about.contact}/>
            <Navbar id="top-nav"/>
            <div className="content-section" data-nav-title="About" id="about">
                <div className="section-header"><h2 className="section-title">About</h2></div>
                <p id="bio">
                    {resume.about.about_me}
                </p>
            </div>
            <div className="content">

                <div className="content-section" data-nav-title="Skills" id="skills">
                    <div className="section-header"><h2 className="section-title">Skills</h2></div>
                    <HexPieRowSet items={resume.skills}/>
                </div>
                <div className="content-section" data-nav-title="Education" id="edu">
                    <div className="section-header"><h2 className="section-title">Education</h2></div>
                    <EducationSet accreditations={resume.education}/>
                </div>
                <div className="content-section" data-nav-title="Work" id="work">
                    <div className="section-header"><h2 className="section-title">Work History</h2></div>
                    <ExperienceSet items={resume.work}/>
                </div>
                <div className="content-section" data-nav-title="Involvement" id="volunteer">
                    <div className="section-header"><h2 className="section-title">Involvement</h2></div>
                    <ExperienceSet print={false} items={resume.extraCurriculars}/>
                </div>
                <div className="content-section" data-nav-title="Interests" id="interests">
                    <div className="section-header"><h2 className="section-title">Interests</h2></div>
                    <HexIconRowSet items={resume.interests}/>
                </div>
            </div>
            <CookiePopup/>
            <footer>
                <span>Made with React. Template created by Liz Davies.</span>
            </footer>
        </div>
  );
}

export default App;
