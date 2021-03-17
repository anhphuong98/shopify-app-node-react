import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Navbar, Nav, NavItem, NavLink, NavbarBrand,
    Collapse,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup
} from 'reactstrap';
import { productActions } from '../../actions/productAction';
import './header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        };
    }

    handleChangeSearchValue = (e) => {
        const text = e.target.value;
        this.setState({
            searchValue: text
        });
    }

    submitSearch = () => {
        const query = {
            title: this.state.searchValue
        }
        this.props.getAllProducts(query);
    }

    render() {
        const { searchValue } = this.state;
        return (
            <div className="header">
                <div className="container-fluid">
                    <Navbar light expand="md">
                        <NavbarBrand href="/">
                            <img src="https://cdn.shopify.com/s/files/1/0090/9236/6436/t/3/assets/logo-white.svg?v=915376309332809796"
                                alt="image_errors"
                                className="logo-header"
                            />
                        </NavbarBrand>
                        <Collapse navbar isOpen={true}>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/" active style={{ color: "#FFFFFF" }}>Product Management</NavLink>
                                </NavItem>
                                <NavItem className="nav-item-search">
                                    <InputGroup>
                                        <Input type="search" value={searchValue} onChange={this.handleChangeSearchValue} placeholder="Product title" />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText> <i className="fas fa-search search-box" onClick={this.submitSearch}></i></InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            </div >
        );
    }
}

const mapDispatchToProps = {
    getAllProducts: productActions.getAllProducts
}

export default connect(null, mapDispatchToProps)(Header);