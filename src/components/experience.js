import React from 'react'
import './experience.css'

const MONTH_FORMAT = Intl.DateTimeFormat(undefined,{ year: 'numeric', month: 'short',timeZone:'UTC'})

function getDate(date){
    if(date === undefined){
        return null;
    }
    if(date.toLowerCase() === "present") return "Present";
    const dateArr = date.split("-");
    return MONTH_FORMAT.format(new Date(dateArr[0],dateArr[1]-1));
}

function formatDate(start,end){
    const startDate = getDate(start);
    const endDate = getDate(end);
    return (
        <span className="date-range">
            {startDate === null ? "" : <span className="date-start">{startDate} </span>}
            {endDate ===null ? "" : <span className="date-end">{endDate}</span>}
        </span>
    );
}



class ExperienceItem extends React.Component{
    render(){
        const {item} = this.props;
        return (
            <li className="experience-item">{item}</li>
        )
    }
}
export class ExperienceSet extends React.Component{
    render(){
        const { items } = this.props;
        return (
            <div className={"experience-set"}>
               {items.map((item,index)=><Experience key={index} item={item}/>)}
           </div>
       )
    }
}
export class ExperienceSetBrief extends React.Component{
    render(){
        const { items } = this.props;
        return (
            <div className="experience-set brief">
               {items.map((item,index)=><ExperienceBrief key={index} item={item}/>)}
           </div>
       )
    }
}
class ExperiencePosition extends React.Component{
    renderExpItems(experience){
        if(experience === null || typeof(experience) === 'undefined' || experience.length === 0 ){
            return ""
        }
        const items = experience.map((item,index)=><ExperienceItem key={index} item={item}/>);
        return (<ul className="experience-items">
            {items}
        </ul>)
    }
    render(){
        const {startDate,endDate,title,experience} = this.props.position;
        return (
            <span className={(experience && experience.length > 0 ? "" : "compact" )+" experience-position"}>
                <span className="experience-date">{formatDate(startDate,endDate)}</span>
                <span className="experience-detail">
                    <span className="experience-title"><strong>{title}</strong></span>
                    {this.renderExpItems(experience)}
                </span>
            </span>
        );
    }
}
export default class Experience extends React.Component{

    render(){
        const {location,positions} = this.props.item;
        return (
            <span className="experience">
                <h4 className="location">{location}</h4>
                {positions.map((item,index)=><ExperiencePosition key={index} position={item}/>)}
            </span>
        )
    }
}

export class ExperiencePrint extends React.Component{
    renderExpItems(experience){
        if(experience === null || typeof(experience) === 'undefined' || experience.length === 0 ){
            return ""
        }
        const items = experience.map((item,index)=><ExperienceItem key={index} item={item}/>);
        return (<ul className="experience-items">
            {items}
        </ul>)
    }
    render(){
        const {location,startDate,endDate,title,experience} = this.props.item;
        return (
            <span className="experience">
                <h4 className="location">{location}</h4>
                <span className="experience-date">{formatDate(startDate,endDate)}</span>
                <span className="experience-title"><strong>{title}</strong></span>
                {this.renderExpItems(experience)}
            </span>
        )
    }
}

export class ExperienceBrief extends React.Component{
    renderExpItems(items){
        return items.map((item,index)=><ExperienceItem key={index} item={item}/>);
    }
    render(){
        const {location,positions} = this.props.item;
        const renderedPositions = positions.map(({title,startDate,endDate,experience},index)=>{
            return (
                <div className="experience-period">
                    <span className="experience-date">{formatDate(startDate,endDate)}</span>
                    <span className="experience-title"><strong>{title}</strong></span>
                    <ul className="print-none experience-items">
                        {this.renderExpItems(experience)}
                    </ul>
                </div>
            )
        })
        return (
            <div className="experience">
                <h4 className="location">{location}</h4>
                <div className="experience-detail">
                    {renderedPositions}
                </div>
            </div>

        )
    }
}


export class VolunteerPosition extends React.Component{
    renderExpItems(items){
        return items.map((item,index)=><ExperienceItem key={index} item={item}/>);
    }
    render(){
        const {location,positions} = this.props.item;
        const renderedPositions = positions.map(({title,startDate,endDate,experience},index)=>{
            return (
                <div className="col-12">
                    <span className="experience-date">{formatDate(startDate,endDate)}</span>
                    <span className="experience-title"><strong>{title}</strong></span>
                    <ul className="print-none experience-items">
                        {this.renderExpItems(experience)}
                    </ul>
                </div>
            )
        })
        return (
            <div className="experience-placement row ">
                <div className="location col-md-3">
                    <h4>{location}</h4>
                </div>
                <div className="experience-detail col-lg-9">
                    {renderedPositions}
                </div>
            </div>

        )
    }
}
