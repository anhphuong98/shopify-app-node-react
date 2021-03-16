import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './containers/sidebar/header';
import ProductTable from './containers/products/productTable';
import CustomSpinner from './containers/commonComponents/customSpinner';
import { ToastContainer, toast } from 'react-toastify';
class App extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="content">
                    <CustomSpinner color="secondary" />
                    <ToastContainer
                        enableMultiContainer={true}
                        closeOnClick={true}
                        draggable={false}
                        containerId={'toast-notification'}
                        position={toast.POSITION.TOP_RIGHT}
                    />
                    <Router>
                        <Switch>
                            <Route exact path="/" component={() => <ProductTable />} />
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;
