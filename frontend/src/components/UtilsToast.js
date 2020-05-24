import React, {Component} from 'react';
import {Toast} from "react-bootstrap";
import './Style.css';

export default class UtilsToast extends Component {
    render() {
        return (
            <div className={this.props.show ? "toast-css" : null}>
                <Toast
                    className={`border text-white ${this.props.type === "success" ? "border-success bg-success" : "border-danger bg-danger"}`}
                    show={this.props.show}>
                    <Toast.Header
                        className={`text-white ${this.props.type === "success" ? "bg-success" : "border-danger bg-danger"}`}
                        closeButton={false}>
                        <strong className="mr-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.props.message}
                    </Toast.Body>
                </Toast>
            </div>
        );
    };
}