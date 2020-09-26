import React, { Component, Link } from 'react'
import ReactPaginate from 'react-paginate';
import * as Icon from 'react-feather'
import UserService from '../service/UserService';

import './styles.css'


export class PaginationExample extends Component{

    constructor(props) {
        super(props)

        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 4,
            currentPage: 0
        }

        this.handlePageClick = this.handlePageClick.bind(this);

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice
        })

    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        UserService.getUsers().then((response) => {
            var tdata = response.data;
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                tdata: response.data,
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                tableData: slice
            })
        });
    }

    deletePessoa(id){
        if(window.confirm('Você tem certeza?')){
            fetch('http://localhost:8080/api/'+id,{
                method: 'DELETE',
                headers: {'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
            });
            this.componentDidMount();
        }
    }

    render() {
        return (
            <div>
                <div className="tabela">
                    <h1>Tabela de Pessoas</h1>
                    <table className="table table-striped">
                        <thead>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>CPF</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Estado Civil</th>
                            <th></th>
                            <th></th>
                        </thead>
                        <tbody>
                            {
                                this.state.tableData.map((tdata, i) => (
                                    <tr key={tdata.id}>
                                        <td>{tdata.id}</td>
                                        <td>{tdata.nome}</td>
                                        <td>{tdata.idade}</td>
                                        <td>{tdata.cpf}</td>
                                        <td>{tdata.cidade}</td>
                                        <td>{tdata.estado}</td>
                                        <td>{tdata.estadoCivil}</td>
                                        <td><button className="btn-del" onClick={() =>this.deletePessoa(tdata.id)}><Icon.Trash></Icon.Trash></button></td>
                                        <td><button className="btn-edit"><Icon.Edit></Icon.Edit></button></td>
                                        
                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                    <div className="table-footer">
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                        />

                        
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default PaginationExample