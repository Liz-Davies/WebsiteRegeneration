import React from 'react';
import './App.css';
import resume from './resume';
import {HexIconRowSet,HexPieRowSet} from './components/hex/HexRows.js';

import { ExperienceSet } from './components/experience.js';
import { EducationSet } from './components/education.js'
import Navbar from './components/navbar.js';
import TitleCard from'./components/title.js';

//<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@aaronburden?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Aaron Burden"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Aaron Burden</span></a>


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
            <footer>
                <span>Made with React. Template created by Liz Davies.</span>
            </footer>
        </div>
  );
}

export default App;
