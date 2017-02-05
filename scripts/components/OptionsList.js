import React, {Component} from 'react'
export default class  extends Component{
    render(){
        return (
            <div>
                {this.props.options && this.props.options.map((option, id) => {
                    return (
                        <div className="withMargin" key={id}>
                            <label htmlFor={"_" + id}>
                                <input type={this.props.multichoice? 'checkbox' : 'radio'} className="check_box" id={"_" + id} value={option.text} name="check_box" required={!this.props.multichoice}/>
                                &nbsp;{option.text}
                            </label>
                        </div>
                    );
                })}
            </div>
        );
    }
}