import React, { Component } from 'react';

import '../components/login.css';
import logo from '../images/logo-ewally.png';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
            token: '',
        };

        this.changeusername = (event) => {
            this.setState({ username: event.target.value });
        }

        this.changePassword = (event) => {
            this.setState({ password: event.target.value });
        }

        this.validate = () => {
            let usernameError = "";
            let passwordError = "";

            if (!this.state.username) {
                usernameError = "O campo Usuário é de preenchimento obrigatório";
            }

            if (!this.state.password) {
                passwordError = "O campo Senha é de preenchimento obrigatório";
            }

            if (usernameError || passwordError) {
                this.setState({ usernameError, passwordError });
                return false;
            }
            return true;
        };

        this.handleSubmit = event => {
            let url = 'https://apidev.ewally.com.br/user/login';
            event.preventDefault();
            const isValid = this.validate();
            if (isValid) {
                this.setState(this.state);
                var objSend = { username: this.state.username, password: this.state.password };

                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(objSend),
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(res => res.json())
                    .then(json => {
                        if(json.token){
                            this.setState({ token: json.token });
                            localStorage.setItem('TOKEN', json.token)
                            window.location = "/extrato";
                        }
                        alert(json.msg);
                    });
            }
        }
    }

    componentDidMount() {        
        localStorage.clear('TOKEN')
    }

    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="logo" >
                        <img src={logo} alt="eWally"/>
                    </div>
                    <form className="form-group col-md-4 mx-auto" onSubmit={this.handleSubmit} method="post" >
                        <input type="text" name="username" id="username" placeholder="Usuário:" value={this.state.username} className="form-control" onChange={this.changeusername} />
                        <div className="errorBox">
                            {this.state.usernameError}
                        </div>
                        <input type="password" name="password" id="password" placeholder="Senha" value={this.state.password} className="form-control" onChange={this.changePassword} />
                        <div className="errorBox">
                            {this.state.passwordError}
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary col-md-12">Entrar</button>
                        </div>                        
                    </form>
                </div>
            </div>            
        );
    }
}