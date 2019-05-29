import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = event => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = event => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
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

    onEnterKey = event => {
        if (event.charCode === 13) {
            this.onSubmitSignIn();
        }
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="registerForm center">
                <main>
                    <div>
                        <fieldset className="field zeroPadMarg">
                            <legend className="registerLabel zeroPadMarg">Sign In</legend>
                            <div className="inputContainer1">
                                <label className="label" htmlFor="email-address">Email</label>
                                <input
                                    className="registerFormInput"
                                    type="email"
                                    name="email-address"
                                    onChange={this.onEmailChange}
                                    onKeyPress={this.onEnterKey}
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
                                />
                            </div>
                        </fieldset>
                        <div>
                            <input
                                onClick={this.onSubmitSignIn}
                                className="label registerButton"
                                type="submit"
                                value="Sign in" />
                        </div>
                        <div className="inputContainer1">
                            <p onClick={() => onRouteChange('register')} className="signInFormRegisterBtn">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;