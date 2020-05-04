import React from 'react';
import './buttons-n-things.css'


export class Toggle extends React.Component{
    static defaultProps = {
        on:false,
        onToggle:()=>{console.log("empty function")},
    }
    constructor(props){
        super(props);
        this.state = {
            on: this.props.on || false,
        }
    }
    toggleAction(){
        const {onToggle} = this.props;
        const {on} = this.state;
        onToggle(!on);
        this.setState({
            on:!on
        });

    }
    render(){
        const {on} = this.state;
        const {className, id, name, label} = this.props;
        return (
            <label id={id} className={"toggle" + (className || "")} >
                <span className="toggle-label">{label || ""} </span>
                <span className="toggle-body">
                    <input type="checkbox"
                        role="switch"
                        checked={on}
                        name={name}
                        value={on}
                        onChange={this.toggleAction.bind(this)}/>
                    <span className="toggle-slider"></span>
                </span>
            </label>
        );
    }
}
