import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logo from '../../assets/logo.png';
import api from '../../services/api';
import Swal from 'sweetalert2';
import './styles.css';

export default function NewRequest() {
  const[title, setTitle] = useState('');
  const[description, setDescription] = useState('');
  const[budget, setBudget] = useState('');

  const userId = localStorage.getItem('userId');

  const history = useHistory();

  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title,
      description,
      budget
    };

    try{
      await api.post('/services', data, {
        headers: {
          Authorization: userId,
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Boa!',
        text: 'O cadastro foi realizado com sucesso!'       
      });

      history.push('/perfil');
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Opa...',
            text: 'Erro ao cadastrar, tente novamente!'       
        }); 
    }
  }

  return (
      <div className="new-request-container">
        <div className="content">
            <section>
              <img src={logo} alt="Ajuda Aê"/>
              <h1>Solicitar serviço</h1>
              <p>Descreva o serviço necessário detalhadamente para que haja mais chances de um profissional  poder te ajudar.</p>

              <Link className="back-link" to="/perfil">
                  <FiArrowLeft size={18} color="#5cc7d3"/>
                  Voltar para a tela inicial
              </Link>
            </section>

            <form onSubmit={handleNewIncident}>
              <input 
                placeholder="Título do serviço"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
              <textarea 
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
                ></textarea>
              <input 
                placeholder="Orçamento possível em reais"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                />

              <button className="button" type="submit">Solicitar</button>
            </form>
        </div>
    </div>
  );
}