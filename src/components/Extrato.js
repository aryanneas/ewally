import React, { Component } from 'react';

import '../components/extrato.css';

import logo from '../images/logo-ewally.png'

export default class Extrato extends Component {
    constructor(props) {
        super(props);

        this.state = {
            saldo: '',
            dataInicial: '',
            dataFinal: '',
            statementItems: []
        }

        this.changeDataInicial = (event) => {
            this.setState({ dataInicial: event.target.value });
        }

        this.changeDataFinal = (event) => {
            this.setState({ dataFinal: event.target.value });
        }

    }

    componentDidMount() {
        let url = 'https://apidev.ewally.com.br/account/balance';

        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('TOKEN') }
        })
            .then(res => res.json())
            .then(json => {
                if (json.balance) {
                    this.setState({ saldo: json.balance / 100 });
                } else {
                    alert(json.msg);
                    window.location = "/";
                }
            })
    }

    consultarStatement() {
        if (this.state.dataInicial && this.state.dataFinal) {
            let url = 'https://apidev.ewally.com.br/b2b/statement?initialDate=' + this.state.dataInicial + '&finalDate=' + this.state.dataFinal;

            fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('TOKEN') }
            })
                .then(res => res.json())
                .then(json => {
                    if (json.statement) {
                        this.setState({ statementItems: json.statement }); console.log(json.statement);
                    } else {
                        alert(json.msg);
                        window.location = "/";
                    }
                })
        }
    }

    render() {
        return (

            <div className="container">
                <div className="logo" >
                    <img src={logo} alt="eWally" />
                </div>
                <div className="col-md-8 mx-auto text-extrato">
                    <h1>Olá, seja bem-vindo(a)!</h1>
                    <p>Logo abaixo você pode consultar o seu saldo. Além disso, também é possível consultar seu extrato bancário preenchendo apenas alguns dados</p>
                </div>
                <hr></hr>
                <div className="col-md-12 d-md-flex">
                    <div className="col-md-3 col-12 div-saldo" >
                        <h2>Saldo:</h2>
                        <h3>R$ {this.state.saldo}</h3>
                    </div>
                    <div className="col-md-9 align-items-center justify-content-center">
                        <div className="d-flex flex-wrap">
                            <form className="form-group d-inline-flex col-md-10 p-0" >
                                <div className="form-group d-inline-flex align-items-center mr-md-2 col-md-6">
                                    <label htmlFor="de_data" className="mr-2">De:</label>
                                    <input type="date" className="form-control" id="de_data" value={this.state.dataInicial} onChange={this.changeDataInicial} />
                                </div>
                                <div className="form-group d-inline-flex align-items-center mr-md-2 col-md-6">
                                    <label htmlFor="ate_data" className="mr-2">Até:</label>
                                    <input type="date" className="form-control" id="ate_data" value={this.state.dataFinal} onChange={this.changeDataFinal} />
                                </div>
                            </form>
                            <div className="col-md-2 col-12 btn-form">
                                <button type="button" onClick={() => this.consultarStatement()} className="btn btn-primary ">Pesquisar</button>
                            </div>
                        </div>

                        <table className="table table-striped mt-md-3">
                            <thead>
                                <tr>
                                    <th scope="col">Data</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Valor (R$)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.statementItems.map(function (item, index) {
                                    var data = new Date(item.createdAt);
                                    return (
                                        <tr>
                                            <th scope="row" key={index}>{data.toLocaleDateString()}</th>
                                            <td>{item.operationType}</td>
                                            <td className="text-left">R$ {(item.amount / 100).toFixed(2)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}