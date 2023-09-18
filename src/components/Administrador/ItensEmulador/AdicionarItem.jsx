import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Botao from "../../Gerais/Botao";
import Input from "../../Gerais/Input";
import Title from "../../Gerais/Title";
import AddItemAlert from "../Alerts/AddItemAlert";
import api from "../../Gerais/Api";
import getToken from "../../Gerais/GetToken";

const AdicionarItem = () => {
    const rota = useNavigate()
    
    const [disabled, setDisabled] = useState(true)
    const [endpointName, setEndpointName] = useState("")
    const [itemAdd, setItemAdd] = useState("")
    
    const redirecionar = () =>{
        api.get('solicitacoes/user_activate/',{
            headers:{
                Authorization: "JWT "+getToken()
            }
        }).catch((res)=>{
            rota('/')
        })
    }
    
    useEffect(() => {
        redirecionar()
    }, [])


    useEffect(() => {
        if (endpointName != "" && itemAdd != "") {
            setDisabled(false)
        } else {
            setDisabled(true)
        }

    })
    // ahoy = {endpointName: endpointName}

    const postApi = () => {
        if (endpointName == "setor") {
            return { nome_setor: itemAdd }
        }
        if (endpointName == "tipo_debito") {
            return { nome_tipo_debito: itemAdd }
        }
        if (endpointName == "local_debito") {
            return { nome_local_debito: itemAdd }
        }
        if (endpointName == "categoria") {
            return { nome_categoria: itemAdd }
        }
        if (endpointName == "tipo_servico") {
            return { nome_tipo_servico: itemAdd }
        }
    }

    const sendItem = () => {
        AddItemAlert()
        let campo = postApi()
        // campo["nome_"+endpointName] = itemAdd
        api.post(`solicitacoes/${endpointName}/`,
            campo,
            { headers: { Authorization: `JWT ${getToken()}` } }
        ).then((res) => {
        })

        setItemAdd("")
        setEndpointName("")

    }

    return (
        <div className="w-full -mt-10">
            <Title title={"Adicionar item"} style={1} />
            <div className="flex justify-center">
                <div className="bosch-form1">
                    <h1 className="bosch-titleS">Adicionar novo item:</h1>
                    <div className="bg-bosch-grau1 w-5/6 h-[1px]"></div>

                    <div className='bosch-input2'>
                        <h1 className='bosch-h1'>Campos:</h1>
                        <select id="GB" required value={endpointName} onChange={(event) => setEndpointName(event.target.value)} className='bosch-input ' >
                            <option value="" disabled selected className=''>Selecione...</option>
                            <option value='setor'>Setor</option>
                            <option value='tipo_debito'>Tipo Débito</option>
                            <option value='local_debito'>Local Débito</option>
                            <option value='categoria'>Categoria</option>
                            <option value='tipo_servico'>Tipo Serviço</option>
                        </select>
                    </div>

                    <div className='bosch-input2'>
                        <h1 className='bosch-h1'>Item:</h1>
                        <Input
                            tipo={'text'}
                            texto={'Item...'}
                            maxLength={10}
                            required
                            valueI={itemAdd}
                            act={(event) => setItemAdd(event.target.value)} />
                    </div>
                    <Botao texto={"Adicionar"} onClick={() => sendItem()} style={2} disabled={disabled} />
                </div>
            </div>
        </div>
    );
}

export default AdicionarItem;