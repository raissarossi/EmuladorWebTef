import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Botao from "../Gerais/Botao";
import Input from "../Gerais/Input";
import api from "../Gerais/Api";
import getToken from "../Gerais/GetToken";

const Login = () => {
    const rota = useNavigate();
    const [formData, setFormData] = useState({
        user: "",
        codigo: "",
    });


    const checkInputs = () => {
        // if (formData.user.length == 6) {
            return formData.user && formData.codigo
        // }

    };
    const isNextDisabled = !checkInputs();

    const logar = () => {
        api.post("auth/jwt/create", {
            bosch_user: formData.user.toUpperCase(),
            password: formData.codigo
        }).then((res) => {
            localStorage.setItem("token", JSON.stringify(res.data.access))
            rota("/homeadmin")
        }).catch(() => {
            alert("usuario ou senha invalidos")
        })

    }
    return (
        <div className="flex justify-center">
            <div className="bosch-form1">
                <h1 className="bosch-titleS">Login:</h1>
                <div className="bg-bosch-grau1 w-5/6 h-[1px]"></div>
                <Input
                    tipo={'text'}
                    texto={'Usuário...'}
                    maxLength={6}
                    required
                    valueI={formData.user}
                    act={(event) => setFormData({ ...formData, user: event.target.value })} />

                    <Input
                        tipo={'password'}
                        texto={'Código de acesso...'}
                        maxLength={10}
                        required
                        valueI={formData.codigo}
                        act={(event) => setFormData({ ...formData, codigo: event.target.value })} />
                    <Botao texto="Esqueci minha senha" style={6} onClick={() => rota("/recuperacaosenha")} />

                <Botao texto={"Entrar"} onClick={() => logar()} style={2} disabled={isNextDisabled} />
                <div className="flex flex-col items-center">
                    <div className="flex">
                        <h2 className="text-base">Não tem acesso?</h2>
                        <Botao texto="Crie aqui" style={1} onClick={() => rota('/solicitacao')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;