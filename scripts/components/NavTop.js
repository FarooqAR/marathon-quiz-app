import React, {Component} from 'react';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

export default class NavTop extends Component {
     render(){
         return (
             <Navbar>
                <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Quiz App</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav>
                    
                    <LinkContainer to="/create">
                        <NavItem eventKey={2}>Create</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/quizzes">
                        <NavItem eventKey={3}>Quizzes</NavItem>
                    </LinkContainer>
                    
                </Nav>
               
                </Navbar.Collapse>
            </Navbar>
         );
     }
}