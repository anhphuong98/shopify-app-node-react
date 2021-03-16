import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

class CustomSpinner extends Component {

    checkLoading = () => {
        const { product } = this.props;
        return product.isLoading;
    }

    render() {
        const { color } = this.props;
        return (
            <React.Fragment>
                {
                    this.checkLoading() && <Spinner color={color} style={{ position: "fixed", left: "50%", top: "50%" }} />
                }
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { product } = state;
    return { product };
}

export default connect(mapStateToProps, null)(CustomSpinner);