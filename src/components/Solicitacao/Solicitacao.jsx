import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Botao from "../Gerais/Botao";
import Input from "../Gerais/Input";
import api from "../Gerais/Api";

const Solicitacao = () => {
    const rota = useNavigate()
    const [formData, setFormData] = useState({
        nome: "",
        user: "",
        email: "",
        justificativa: "",
    });


    const checkInputs = () => {
        if (formData.user.length == 6 && formData.justificativa.length > 30 && formData.email.includes("@" && "bosch")) {
            return formData.nome && formData.user && formData.email && formData.justificativa
        }

    };
    const isNextDisabled = !checkInputs();

    const sendUser = () => {
        api.post("auth/users/", {
            bosch_user: formData.user.toUpperCase(),
            name: formData.nome,
            email: formData.email.toLowerCase(),
            justificativa: formData.justificativa,
            password: 'Senha123456'
        })
    }


    return (
        <div className="flex justify-center">
            <div className="bosch-form1">
                <h1 className="bosch-titleS">Solicitar Acesso:</h1>
                <div className="bg-bosch-grau1 w-5/6 h-[1px]"></div>

                <Input
                    tipo={'text'}
                    texto={'Nome...'}
                    maxLength={50}
                    required
                    valueI={formData.nome}
                    act={(event) => setFormData({ ...formData, nome: event.target.value })} />

                <Input
                    tipo={'text'}
                    texto={'Usuário...'}
                    maxLength={6}
                    required
                    valueI={formData.user}
                    act={(event) => setFormData({ ...formData, user: event.target.value })} />
                <Input
                    tipo={'text'}
                    texto={'Email corporativo...'}
                    maxLength={100}
                    required
                    valueI={formData.email}
                    act={(event) => setFormData({ ...formData, email: event.target.value })} />


                <textarea placeholder="Justificativa..." rows={5} cols={40} maxLength={250} className="bosch-input" required value={formData.justificativa} onChange={(event) => setFormData({ ...formData, justificativa: event.target.value })} />

                <Botao onClick={() =>{sendUser();rota("/aguarde");}} texto={"Solicitar"} disabled={isNextDisabled} style={2}/>

                <div className="flex">
                    <h2 className="text-base">Já tem acesso?</h2>
                    <Botao style={1} texto={"Entrar"} onClick={() => rota("/")}/>
                </div>
            </div>
        </div>
    );
}

export default Solicitacao;