import React, { Component } from 'react';
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from 'reactstrap';
import parser from 'html-react-parser';
import './productDetail.css'

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    toggleModalDetail = () => {
        this.props.onToggleModalDetail();
    }

    render() {
        const { isOpenModalDetail, productDetail } = this.props;
        return (
            <div>
                <Modal isOpen={isOpenModalDetail} contentClassName='modal-detail' toggle={this.toggleModalDetail} fullscreen="md">
                    <ModalHeader toggle={this.toggleModalDetail}>{productDetail && productDetail.title}</ModalHeader>
                    <ModalBody>
                        <div style={{ textAlign: "center" }}>
                            <title>Image:</title>
                            <img
                                src={productDetail && productDetail.image.src}
                                alt="errors"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>
                        <div>
                            {productDetail && parser(productDetail.body_html)}
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" style={{ backgroundColor: "#3b4f66" }} onClick={this.toggleModalDetail}>Close</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ProductDetail;