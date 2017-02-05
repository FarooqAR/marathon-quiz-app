import React, {Component} from 'react';
import NavTop from './components/NavTop';
export default class App extends Component {
  constructor(props){
    super(props);
    
  }
  
  
  render() {
    return (
      <div>
        <NavTop></NavTop>
        <div className="container">
          {this.props.children}
        </div>
       </div>
    );
  }
}
