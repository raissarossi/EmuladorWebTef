import React, { useEffect, useState } from 'react';
import api from '../../Gerais/Api';
import getToken from '../../Gerais/GetToken';

function ServicoInfo({ formData, setFormData }) {

    const [categoria, setCategoria] = useState([])
    const getCategoria = () => {
        api.get("solicitacoes/categoria/", {
            headers: {
                Authorization: "JWT " + getToken()
            }
        }).then((res) => {
            setCategoria(res.data)
        })
    }
    const [tipoServico, setTipoServico] = useState([])
    const getTipoServico = () => {
        api.get("solicitacoes/tipo_servico/", {
            headers: {
                Authorization: "JWT " + getToken()
            }
        }).then((res) => {
            setTipoServico(res.data)
        })
    }

    useEffect(() => {
        getCategoria()
        getTipoServico()
    }, [])

    return (
        <div id='personal-info-container' className='bosch-form-page'>
            <div className='bosch-input2'>
                <h1 className='bosch-h1'>Categoria:</h1>
                <select id="Categoria" required defaultValue={'0'} value={formData.categoria} onChange={(event) => setFormData({ ...formData, categoria: event.target.value })} className='bosch-input' >
                <option value="" disabled selected className=''>Selecione...</option>
                    {
                        categoria.map((item) =>
                            <option value={item.id}>{item.nome_categoria}</option>
                        )
                    }
                </select>
            </div>

            <div className='bosch-input2'>
                <h1 className='bosch-h1'>Tipo Servico:</h1>
                <select id="Tipo Servico" required defaultValue={'0'} value={formData.tipoServico} onChange={(event) => setFormData({ ...formData, tipoServico: event.target.value })} className='bosch-input' >
                <option value="" disabled selected className=''>Selecione...</option>
                    {
                        tipoServico.map((item) =>
                            <option value={item.id}>{item.nome_tipo_servico}</option>
                        )
                    }
                </select>
            </div>

            <div className='bosch-input2'>
                <h1 className='bosch-h1'>Prazo Pretendido:</h1>
                <input type='date' required placeholder='Prazo Pretendido...' value={formData.prazo} onChange={(event) => setFormData({ ...formData, prazo: event.target.value })} className='bosch-input' />
            </div>

            <div className='bosch-input2'>
                <h1 className='bosch-h1'>Descrição:</h1>
                <textarea placeholder="Descrição..." rows={5} cols={40} maxLength={5000} className="bosch-input" required value={formData.descricao} onChange={(event) => setFormData({ ...formData, descricao: event.target.value })} />
            </div>

        </div>
    );
}

export default ServicoInfo;
