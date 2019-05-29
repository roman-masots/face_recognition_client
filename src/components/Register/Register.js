import React from 'react';
import './Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        };
        this.form = React.createRef();
        this.validate = this.validate.bind(this);
    }

    validate() {
        if (this.form.current.reportValidity()) {
            this.onSubmitSignIn();
        }
    }

    onEnterKey = event => {
        if (event.charCode === 13) {
            this.onSubmitSignIn();
        }
    }

    onNameChange = event => {
        this.setState({ registerName: event.target.value })
    }

    onEmailChange = event => {
        this.setState({ registerEmail: event.target.value })
    }

    onPasswordChange = event => {
        this.setState({ registerPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home')
                }
            })
    }

    render() {
        return (
            <article ref={this.form} onSubmit={e => e.preventDefault()} className="registerForm center">
                <main>
                    <div>
                        <fieldset className="field zeroPadMarg">
                            <legend className="registerLabel zeroPadMarg">Register</legend>
                            <div className="inputContainer1">
                                <label className="label" htmlFor="name">Name</label>
                                <input
                                    className="registerFormInput"
                                    type="text"
                                    name="name"
                                    onChange={this.onNameChange}
                                    onKeyPress={this.onEnterKey}
                                    required
                                />
                            </div>
                            <div className="inputContainer1">
                                <label className="label" htmlFor="email-address">Email</label>
                                <input
                                    className="registerFormInput"
                                    type="email"
                                    name="email-address"
                                    onChange={this.onEmailChange}
                                    onKeyPress={this.onEnterKey}
                                    required
                                />
                            </div>
                            <div className="inputContainer2">
                                <label className="label" htmlFor="password">Password</label>
                                <input
                                    className="registerFormInput"
                                    type="password"
                                    name="password"
                                    onChange={this.onPasswordChange}
                                    onKeyPress={this.onEnterKey}
                                    required
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.validate}
                                className="label registerButton"
                                type="submit"
                                value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;