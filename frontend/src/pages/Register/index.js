import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png';
import api from '../../services/api';
import './styles.css';

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    const data = {
      name, 
      email, 
      whatsapp, 
      city, 
      uf
    };

    try {
      const response = await api.post('/users', data);

      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        text: `Seu ID de acesso é: ${response.data.id}`       
      });

      history.push('/');
     } catch(err) { 
      Swal.fire({
        icon: 'error',
        title: 'Opa...',
        text: 'Erro no cadastro, tente novamente!'       
      });
     }
  }

  return (
    <div className="register-container">
        <div className="content">
            <section>
              <img src={logo} alt="Ajuda Aê"/>
              <h1>Cadastro</h1>
              <p>Faça seu cadastro, entre na plataforma, e encontre profissionais para te ajudar a solucionar seus problemas.</p>

              <Link className="back-link" to="/">
                  <FiArrowLeft size={18} color="#5cc7d3"/>
                  Voltar
              </Link>
            </section>
            <form onSubmit={handleRegister}>
              <input 
                placeholder="Nome completo"
                value={name} 
                onChange={e => setName(e.target.value)} />
              <input 
                type="email" 
                placeholder="Email"
                value={email} 
                onChange={e => setEmail(e.target.value)}/>
              <input 
                placeholder="Whatsapp"
                value={whatsapp} 
                onChange={e => setWhatsapp(e.target.value)}/>
              <div className="input-group">
                  <input 
                    placeholder="Cidade"
                    value={city} 
                    onChange={e => setCity(e.target.value)}/>
                  <input 
                    placeholder="UF" 
                    style={{width: 80}}
                    value={uf} 
                    onChange={e => setUf(e.target.value)}/>
              </div>

              <div>
                <label>*Obrigatório o preenchimento de todos os campos.</label></div>
              <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
  );
}