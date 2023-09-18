import React, { useState } from 'react';
import Input from '../../Gerais/Input';
import api from '../../Gerais/Api'
import getToken from '../../Gerais/GetToken';
import { useEffect } from 'react';

function AreaInfo({ formData, setFormData }) {

    const [gb, setGb] = useState([])
    const getGB = () => {
        api.get("solicitacoes/setor/", {
            headers: {
                Authorization: "JWT " + getToken()
            }
        }).then((res) => {
            setGb(res.data)
        })
    }

    const [localDebito, setLocalDebito] = useState([])
    const getLocalDebito = () => {
        api.get("solicitacoes/local_debito/", {
            headers: {
                Authorization: "JWT " + getToken()
            }
        }).then((res) => {
            setLocalDebito(res.data)
        })
    }

    const [tipoDebito, setTipoDebito] = useState([])
    const getTipoDebito = () => {
        api.get("solicitacoes/tipo_debito/", {
            headers: {
                Authorization: "JWT " + getToken()
            }
        }).then((res) => {
            setTipoDebito(res.data)
        })
    }


    useEffect(() => {
        getGB()
        getLocalDebito()
        getTipoDebito()
    }, [])
    return (
        <div id='sign-up-container' className='bosch-form-page'>
            <div className='bosch-input2'>
                <h1 className='bosch-h1'>GB</h1>
                <select id="GB" required value={formData.GB} onChange={(event) => setFormData({ ...formData, GB: event.target.value })} className='bosch-input ' >
                    <option value="" disabled selected className=''>Selecione...</option>
                    {
                        gb.map((item) =>
                            <option value={item.id}>{item.nome_setor}</option>
                        )
                    }
                </select>
            </div>

            <div className='bosch-input2 '>
                <h1 className='bosch-h1'>Ramal:</h1>
                <Input
                    tipo={'num'}
                    texto={'Ramal...'}
                    maxLength={4}
                    required
                    valueI={formData.ramal}
                    act={(event) => setFormData({ ...formData, ramal: event.target.value })} />
            </div>


            <div className='w-5/6 flex items-center'>
                <div className='bosch-input2 items-start'>
                    <h1 className='bosch-h1'>Local Débito:</h1>
                    <select id="Local Debito" value={formData.localDebito} onChange={(event) => setFormData({ ...formData, localDebito: event.target.value })} className='bosch-input3' >
                    <option value="" disabled selected className=''>Selecione...</option>
                    {
                        localDebito.map((item) =>
                            <option value={item.id}>{item.nome_local_debito}</option>
                        )
                    }
                    </select>
                </div>
                <div className='bosch-input2 items-end'>
                    <h1 className='bosch-h1'>N° (RS, OS, CC):</h1>
                    <Input
                        tipo={'num'}
                        texto={'N°...'}
                        maxLength={20}
                        required
                        valueI={formData.num}
                        act={(event) => setFormData({ ...formData, num: event.target.value })} />
                </div>
            </div>


            <div className='bosch-input2'>
                <h1 className='bosch-h1'>Tipo Débito:</h1>
                <select id="Tipo Debito" value={formData.tipoDebito} onChange={(event) => setFormData({ ...formData, tipoDebito: event.target.value })} className='bosch-input' >
                <option value="" disabled selected className=''>Selecione...</option>
                    {
                        tipoDebito.map((item) =>
                            <option value={item.id}>{item.nome_tipo_debito}</option>
                        )
                    }
                </select>
            </div>



        </div>
    );
}

export default AreaInfo;
