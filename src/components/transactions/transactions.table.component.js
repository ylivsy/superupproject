import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './transactions.table.component.css';

export default class TransactionsTableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.options = {
            sizePerPageList: [ 5, 10, 15, 20 ],
            sizePerPage: 10,
            page: this.state.currPage,
            defaultSortName: 'id',
            defaultSortOrder: 'asec'
        };
    }



    render() {
        return (
            <div className={"table-style"}>

                <div className={"btn-goback"}>
                    <img onClick={this.props.onBack} src={require('../../../src/assets/images/back.png')} alt={'go back'} height={37}></img>
                </div>


                <BootstrapTable
                    ref='table'
                    data={ this.props.data }
                    options={ this.options }
                >
                    <TableHeaderColumn className="header-color" dataField='id' dataSort  width='50' isKey>ID</TableHeaderColumn>
                    <TableHeaderColumn className="header-color" dataField='first_name'  width='140' dataSort >First Name</TableHeaderColumn>
                    <TableHeaderColumn className="header-color" dataField='last_name' width='140' dataSort>Last Name</TableHeaderColumn>
                    <TableHeaderColumn className="header-color" dataField='email' dataSort >Email</TableHeaderColumn>
                    <TableHeaderColumn className="header-color" dataField='isPaid' dataSort >Salary</TableHeaderColumn>
                    <TableHeaderColumn className="header-color" dataField='dateOfSalary' dataSort >Date Of Payment</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}