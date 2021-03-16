
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class ModalConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    };

    toggleModal = () => {
        this.setState((state) => ({
            isOpen: !state.isOpen
        }));
    }

    confirm = () => {
        this.toggleModal();
        this.props.func();
    }

    render() {
        const { isOpen } = this.state;
        const { title, icon, color } = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={isOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        <i className="fas fa-exclamation-circle" style={{ color: "#b30000" }}></i>
                        {' '}
                        {title}
                    </ModalHeader>
                    <ModalBody>
                        Do you want to do this?
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" style={{ backgroundColor: "#b30000" }} onClick={this.confirm}>Yes</Button>{' '}
                        <Button size="sm" style={{ backgroundColor: "#3b4f66" }} onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
                <i className={`fas fa-${icon}`} style={{ color: color, cursor: "pointer" }} onClick={this.toggleModal}></i>
            </React.Fragment>
        );
    }
}

export default ModalConfirm;