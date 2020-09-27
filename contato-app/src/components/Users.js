import React from 'react'

const Users = ({users,loading}) => {
    if(loading){
        return <h1>Loading</h1>
    }

    return(
        <div className="content-container">
            <ul>
                {users.map(user => (

                    <li key={user.id}>
                        {user.nome}
                    </li>
                ))}


            </ul>
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>CPF</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Estado Civil</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {users.map(user => (
                                <tr key = {user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.idade}</td>
                                    <td>{user.cpf}</td>
                                    <td>{user.cidade}</td>
                                    <td>{user.estado}</td>
                                    <td>{user.estadoCivil}</td>
                                </tr>
                            ))}
        

                    </tbody>
                </table>
        </div>
    )
}

export default Users;