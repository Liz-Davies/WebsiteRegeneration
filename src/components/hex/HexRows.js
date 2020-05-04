import React from 'react';
import HexPie, {HexIcon} from './Hexagon.js';

class AbstractHexRowSet extends React.Component{
    constructor(props){
        super(props)
        if(this.constructor === AbstractHexRowSet){
            throw new TypeError("Abscract class 'AbstractHexRowSet' cannot be instantiated")
        }
    }
    render(){
        const {items} = this.props;
        return (
            <div className="hex-row">
                {this.renderElements(items)}
            </div>
        )
    }
    renderElements(){
            throw new TypeError("The funtion renderElements must be overwritten by a sub class")
    }
}
export class HexIconRowSet extends AbstractHexRowSet{
    renderElements(items){
        return items.map((item,index)=>{return<HexIcon key={index} name={item.name} icon={item.icon}/>});
    }
}
export class HexPieRowSet extends AbstractHexRowSet{
    renderElements(items){
        return items.map((item,index)=> <HexPie key={index} name={item.name} percent={item.percent} info={item.info}/>);
    }
}
