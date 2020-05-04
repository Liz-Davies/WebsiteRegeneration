import React from 'react';

export default class VolunteerPosition{
    renderExpItems(items){
        return items.map((item)=><li>item</li>);
    }
    render(){
        const {location,positions} = this.props;
        const renderedPositions = positions.map(({title,startDate,endDate,experiences},index)=>{
            return (
                <div class="col-12">
                    <span><strong>{title}}</strong> {{# monthRange this}}{{/monthRange}}</span>
                    <ul class="d-print-none experience">
                        {this.renderExpItems(experiences)}

                    </ul>
                </div>
            )
        })
        return (
            <div class="row ">
                <div class="location col-md-3">
                    <h6>{location}</h6>
                </div>
                    <div class="JobDesc col-lg-9">
                        {renderedPositions}
                    </div>
            </div>

        )
    }
}
