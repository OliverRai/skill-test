import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather'
import {Table} from 'react-bootstrap'
import axios from 'axios'
import Users from '../../components/Users'
import Pagination from '../../components/Pagination'


import './styles.css';

function ListPessoasPagination(){

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPorPage] = useState(5);

    useEffect(() => {
        const fetchUsers = async() =>{
            setLoading(true);
            const res = await axios.get('http://localhost:8080/api');
            setUsers(res.data);
            setLoading(false)
            
        };

        fetchUsers();
    }, []);

    const indexOfLastUser = currentPage *  usersPorPage;
    const indexOfFirstUser = indexOfLastUser - usersPorPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)


    //para mudar a pagina
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


        return(
            <div className="content-container">
                <Users users={currentUsers} loading={loading}/>
                <Pagination usersPerPage={usersPorPage} totalUsers={users.length} paginate={paginate}/>
            </div>
        )
    }



export default ListPessoasPagination;