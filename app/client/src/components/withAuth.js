/*************************************************************
 * File: withAuth.js
 *
 * This file contains the function that verifies whether can
 * access a certain component.
 */

import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = (ComponentToProtect) => {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }
        
        componentDidMount() {
            axios.get('http://localhost:5000/checkToken', {params: {token: localStorage.getItem('token')}})
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ loading: false });
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, redirect: true });
                });
        }


        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/" />;
            }
            return <ComponentToProtect {...this.props} />;
        }
    }
}

export default withAuth