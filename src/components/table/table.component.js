import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './table.component.css';
import data from '../../../src/data/MOCK_DATA.json';
import  TransactionsTableComponent  from '../../components/transactions/transactions.table.component';


export default class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            selectedEmp: [],
            currPage: 1,
            selectedMode : false,
            products : data
        };
        this.options = {
            sizePerPageList: [ 5, 10, 15, 20 ],
            sizePerPage: 10,
            page: this.state.currPage,
            defaultSortName: 'id',
            defaultSortOrder: 'asec'
        };
    }

    onRowSelect = (row, isSelected, e) => {
        const {selectedEmp} = this.state;

        console.log(isSelected);

        if (isSelected) {
            selectedEmp.push(row);
        }
        else {
            const index = selectedEmp.indexOf(row);
            if (index > -1) {
                selectedEmp.splice(index, 1);
            }

        }
    }

    onSelectAll =(isSelected, rows)=> {
        const {selectedEmp} = this.state;

        if (isSelected) {
            selectedEmp.push(...rows);
        }
        else {

            for(let i=0; i < rows.length; i++) {
                const index = selectedEmp.indexOf(rows[i]);
                if (index > -1) {
                    selectedEmp.splice(index, 1);
                }
            }


        }
    }

    _renderPayment = () => {
        this.setState({selectedMode : true})
    }

    _executePayment = () => {
        const {products, selectedEmp} = this.state;

        for (let i = 0 ; i < selectedEmp.length ; i++) {
            let index = selectedEmp[i].id;
            products[index-1].isPaid = true;
            products[index-1].dateOfSalary = new Date();
        }
    }

    _onBack = ()=> {
        this.state.selectedEmp= [];
        this.setState({selectedMode : false})
    }

    _cancelPayments = () => {
        this.state.products.map((emp)=> {
            emp.isPaid = false;
            emp.dateOfSalary = '';
        });
        this.setState({selectedEmp: [], selected: []})
        //this.state.selectedEmp = [];

    }

    componentDidMount () {
        console.log('comDidMount')
        this.state.products.map((emp)=> {
            emp.isPaid = false;
            emp.dateOfSalary = '';
        });

    }


    render() {
        const {
            currPage
        } = this.state;

        //var products = data;
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            bgColor: '#cce5ff',
            onSelect: this.onRowSelect,
            onSelectAll: this.onSelectAll,
            selected: this.state.selected
        };


        if (!this.state.selectedMode){
            return (
                <div className="table-style">

                    <div className={"btns-style"}>
                        <button onClick={this._executePayment} className="btn btn-execute">Execute Payments</button>
                        <button onClick={this._renderPayment} className="btn btn-payment">Payment Status</button>
                        <button onClick={this._cancelPayments} className="btn btn-cancel">Cancel Payments</button>
                    </div>

                    <BootstrapTable
                        ref='table'
                        data={ this.state.products }
                        pagination={ true }
                        options={ this.options }
                        selectRow={ selectRowProp }
                        pagination
                        keyBoardNav >
                        <TableHeaderColumn className="header-color" dataField='id' dataSort  width='50' isKey>ID</TableHeaderColumn>
                        <TableHeaderColumn className="header-color" dataField='first_name'  width='140' dataSort >First Name</TableHeaderColumn>
                        <TableHeaderColumn className="header-color" dataField='last_name' width='140' dataSort>Last Name</TableHeaderColumn>
                        <TableHeaderColumn className="header-color" dataField='email' dataSort >Email</TableHeaderColumn>
                        <TableHeaderColumn className="header-color" dataField='gender' width='80'>Gender</TableHeaderColumn>
                        <TableHeaderColumn className="header-color" dataField='birthdate' >Birthdate</TableHeaderColumn>
                        <TableHeaderColumn className="header-color" dataField='salary'  >Salary</TableHeaderColumn>
                    </BootstrapTable>,
                </div>
            );
        }
        else {
            return (
                <TransactionsTableComponent onBack={this._onBack} data={this.state.selectedEmp}/>
            )

        }

    }
}

