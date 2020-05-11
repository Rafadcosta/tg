import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import logo from '../../assets/logo.png';
import hands from '../../assets/hands.png';
import api from '../../services/api';
import Swal from 'sweetalert2';
import './styles.css';

export default function Login() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try{
      const response = await api.post('/sessions', {id});

      localStorage.setItem('userId', id);
      localStorage.setItem('userName', response.data.name);

      history.push('/perfil');
    } catch(err) {
      Swal.fire({
        icon: 'error',
        title: 'Opa...',
        text: 'Falha no login, tente novamente!'       
      });
    }

  }

  return (
    <div className="login-container">
        <section className="form">
          <img src={logo} alt="Ajuda Aê"/>

          <form onSubmit={handleLogin}>
              <h1>Faça seu login</h1>
              <input 
                placeholder="Sua ID"
                value={id}
                onChange={e => setId(e.target.value)}/>
              <button type="submit" className="button">Entrar</button>

              <Link className="back-link" to="/cadastro">
                  <FiLogIn size={18} color="#5cc7d3"/>
                  Não tenho cadastro
              </Link>
          </form>
        </section>

        <img src={hands} alt="Aperto de mãos" className="hands"/>
    </div>
  );
}