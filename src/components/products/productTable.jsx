import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Table } from 'reactstrap';
import { productActions } from '../../actions/productAction';
import ModalConfirm from '../commonComponents/modalConfirm';
import ProductDetail from './productDetail';
import ProductEditForm from './productEditForm';
import './productTable.css';

class ProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalDetail: false,
            isOpenModalEdit: false
        }
    }

    componentDidMount = () => {
        this.props.getAllProducts();
    }

    toggleModalDetail = (x) => {
        this.setState((state) => ({
            isOpenModalDetail: !state.isOpenModalDetail,
            productDetail: x
        }));
    }

    deleteProduct = (x) => {
        this.props.deleteProduct(x.id);
    }

    toggleModalEdit = (x) => {
        this.setState((state) => ({
            isOpenModalEdit: !state.isOpenModalEdit,
            productEdit: x
        }));
    }

    render() {
        const { product } = this.props;
        const { isOpenModalDetail, isOpenModalEdit } = this.state;
        let list = [];
        if (product.list && product.isLoading === false) {
            list = product.list;
        }
        console.log(list);
        return (
            <div className="container-fluid">
                <div className="list-product">
                    <Table>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Vendor</th>
                                <th>Tag</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map((x, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                <img
                                                    src={x && x.image && x.image.src}
                                                    alt="errors"
                                                    style={{ width: "4rem", height: "3rem", cursor: "pointer" }}
                                                />
                                            </td>
                                            <td>{x.title}</td>
                                            <th>{
                                                x.status === "active"
                                                    ?
                                                    <Badge color="success" pill>{x.status}</Badge>
                                                    :
                                                    <Badge color="warning" pill>{x.status}</Badge>

                                            }
                                            </th>
                                            <td>{x.vendor}</td>
                                            <td>{x.tags}</td>
                                            <td>
                                                <i className="fas fa-bars detail" onClick={() => this.toggleModalDetail(x)}></i>
                                                <i className="fas fa-pen edit" onClick={() => this.toggleModalEdit(x)}></i>
                                                <ModalConfirm
                                                    icon="trash"
                                                    title={`Delete product ${x.title}`}
                                                    color="#b30000"
                                                    func={() => this.deleteProduct(x)}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                {
                    this.state.productDetail && <ProductDetail
                        isOpenModalDetail={isOpenModalDetail}
                        onToggleModalDetail={this.toggleModalDetail}
                        productDetail={this.state.productDetail}
                    />
                }
                {
                    this.state.productEdit && <ProductEditForm
                        productEditId={this.state.productEdit.id}
                        title={this.state.productEdit.title}
                        body_html={this.state.productEdit.body_html}
                        titleModal={`Editing ${this.state.productEdit.title}`}
                        isOpenModalEdit={isOpenModalEdit}
                        onToggleModalEdit={this.toggleModalEdit}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { product } = state;
    return { product }
}

const mapDispatchToProps = {
    getAllProducts: productActions.getAllProducts,
    deleteProduct: productActions.deleteProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);