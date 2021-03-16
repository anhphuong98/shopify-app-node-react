import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import { productActions } from '../../actions/productAction';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class ProductEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            editorState: EditorState.createEmpty()
        }
    }

    toggleModal = () => {
        this.props.onToggleModalEdit();
    }

    handleTitleChange = (e) => {
        const value = e.target.value;
        this.setState({
            title: value
        });
    }

    static getDerivedStateFromProps = (props, state) => {
        if (props.productEditId !== state.productEditId) {
            const blocksFromHTML = convertFromHTML(props.body_html);
            return {
                ...state,
                productEditId: props.productEditId,
                title: props.title,
                editorState: EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        blocksFromHTML.contentBlocks,
                        blocksFromHTML.entityMap
                    )
                )
            }
        } else {
            return null;
        }
    }

    handleSaveEdit = () => {
        this.props.onToggleModalEdit();
        const data = {
            "product": {
                title: this.state.title,
                id: this.state.productEditId,
                body_html: stateToHTML(this.state.editorState.getCurrentContent())
            }

        };
        this.props.handleEditProduct(this.state.productEditId, data);
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState: editorState
        })
    }

    render() {
        const { title, editorState } = this.state;
        const { titleModal, isOpenModalEdit } = this.props;
        return (
            <div>
                <Modal isOpen={isOpenModalEdit} toggle={this.toggleModal} fullscreen="md">
                    <ModalHeader toggle={this.toggleModal}>{titleModal}</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input value={title} onChange={this.handleTitleChange} type="text" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" style={{ backgroundColor: "#b30000" }} onClick={this.handleSaveEdit}>Save</Button>{' '}
                        <Button size="sm" style={{ backgroundColor: "#3b4f66" }} onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = {
    handleEditProduct: productActions.handleEditProduct
}

export default connect(null, mapDispatchToProps)(ProductEditForm);