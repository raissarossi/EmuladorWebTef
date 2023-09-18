import { useEffect, useState } from "react";
import Title from "../../Gerais/Title";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import api from "../../Gerais/Api";
import getToken from "../../Gerais/GetToken";

const GerenciarItens = () => {
    const rota = useNavigate()
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
    return (
        <div className="flex flex-col -mt-10">
            <Title title={"Gerenciar Campos do Emulador"} style={1}/>
            <Dropdown title="Setor" value={"setor"}/>
            <Dropdown title="Tipo Débito" value={"tipo_debito"}/>
            <Dropdown title="Local Débito" value={"local_debito"}/>
            <Dropdown title="Categoria" value={"categoria"}/>
            <Dropdown title="Tipo Serviço" value={"tipo_servico"}/>
        </div>
    );
}

export default GerenciarItens;