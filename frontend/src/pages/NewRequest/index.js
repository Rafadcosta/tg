import React from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logo from '../../assets/logo.png';
import './styles.css';

export default function NewRequest() {
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
              <form>
                <input placeholder="Título do serviço"/>
                <textarea placeholder="Descrição"></textarea>
                <input placeholder="Orçamento possível em reais"/>

                <button className="button" type="submit">Solicitar</button>
              </form>
          </div>
      </div>
    );
}