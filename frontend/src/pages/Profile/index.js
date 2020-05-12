import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import logo from '../../assets/logo.png';
import api from '../../services/api';
import Swal from 'sweetalert2';
import './styles.css';

export default function Profile() {

    const [requests, setRequests] = useState([]);

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const history = useHistory();

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setRequests(response.data);
        })
    }, [userId]);

    async function handleDeleteRequest(id){
        try {
            
            await api.delete(`/services/${id}`, {
                headers: {
                    Authorization: userId,
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Boa!',
                text: 'O cadastro foi realizado com sucesso!'       
            });
            
            setRequests(requests.filter(request => request.id !== id));
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Opa...',
                text: 'Erro ao deletar, tente novamente!'       
            }); 
        }
    }

    function handleLogout() {
        localStorage.clear();
       
        history.push('/');
    }

    return (
      <div className="profile-container">
          <header>
              <img src={logo} alt="Ajuda Aê"/>
              <span>Bem vindo(a), {userName}!</span>

              <Link className="button" to="/solicitacao/novo">Solicitar um serviço</Link>

              <button onClick={handleLogout} type="button">
                  <FiPower size={18} color="#f6838d"/>
              </button>
          </header>

          <h1>Serviços solicitados</h1>

          <ul>
              {requests.map(request => (
                <li key={request.id}>
                    <strong>Serviço solicitado:</strong>
                    <p>{request.title}</p>

                    <strong>Descrição:</strong>
                    <p>{request.description}</p>

                    <strong>Orçamento possível:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(request.budget)}</p>

                    <button onClick={() => handleDeleteRequest(request.id)} type="button">
                        <FiTrash2 size={20} color="#737380"/>
                    </button>
                </li>
              ))}
          </ul>
      </div>
    );
}