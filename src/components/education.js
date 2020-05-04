import React from 'react';
import './education.css';
// {
//     "endDate":"2016-05",
//     "startDate":"2011-09",
//     "location": "Mount Allison Univeristy",
//     "accreditation":"Bachelor of Music"
// }
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
export default class Education extends React.Component{
    render(){
        const {startDate,endDate,location,accreditation,major,minor} = this.props.accreditation;
        return (
            <div className="education">
                <div className="location">{location}</div>
                <div className="accreditation">{accreditation}</div>
                <div className="specialization">
                    {major ? <div className="edu-maj">Major: {major}</div> : "" }
                    {minor ? <div className="edu-min">Minor: {minor}</div> : "" }
                </div>
                {formatDate(startDate,endDate)}
            </div>
        );
    }
}

export class EducationSet extends React.Component{
    render(){
        const { accreditations } = this.props;
        const items = accreditations.map((item)=><Education key={item.startDate} accreditation={item}/>);
        return (
            <div className="accreditation-set">
                {items}
            </div>
        )
    }
}
