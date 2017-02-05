import React, {Component} from 'react';
import {InputGroup, FormGroup, FormControl} from 'react-bootstrap';

export default class CreateOptionsList extends Component{
    render(){
        return (
            <div>
                {this.props.options.map((option, id) => {
                    return (    
                        <FormGroup key={id}>
                        <InputGroup>
                            <InputGroup.Addon>
                            {this.props.noDeleteBtn == "true" ?
                            <input type={this.props.multichoice ? "checkbox" : "radio"} checked={option.correct} disabled/>
                            :<input type={this.props.multichoice ? "checkbox" : "radio"} name="options_list_item_check" checked={option.correct} disabled/>
                            }
                            </InputGroup.Addon>
                            <FormControl type="text" value={option.text} disabled/>
                            {this.props.noDeleteBtn == "true" ? null : <InputGroup.Button>
                                
                                <input type="button" className="btn btn-danger" value="Delete" onClick={()=>this.props.deleteOption(id)}/>
                                
                            </InputGroup.Button>}   
                        </InputGroup>
                        </FormGroup>
                    );
                })}
                
            </div>
        );
    }
}