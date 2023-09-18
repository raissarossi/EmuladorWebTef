import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Botao from "../Gerais/Botao";
import Input from "../Gerais/Input";
import api from "../Gerais/Api";

const SemSenha = () => {
    const rota = useNavigate();
    const [formData, setFormData] = useState({
        user: "",
        email: "",
    });
    

    const checkInputs = () => {
        if (formData.user.length == 6 && formData.email.includes("@" && "bosch")) {
            return formData.user && formData.email
        }

    };
    const isNextDisabled = !checkInputs();

    const reset_password = () =>{
        api.patch("solicitacoes/reset_password/",{
            bosch_user: formData.user.toUpperCase(),
            email: formData.email
        }).then(()=>{
            rota("/aguarde")
        }).catch((res)=>{
            if (res.response.status == 404){
                alert("usuario não existe")
            }
        })
    }

    return (
        <div className="flex justify-center">
            <div className="bosch-form1">
                <h1 className="bosch-titleS">Recuperação de senha:</h1>
                <div className="bg-bosch-grau1 w-5/6 h-[1px]"></div>
                <Input
                    tipo={'text'}
                    texto={'Usuário...'}
                    maxLength={6}
                    required
                    valueI={formData.user}
                    act={(event) => setFormData({ ...formData, user: event.target.value })} />

                <Input
                    tipo={'text'}
                    texto={'Email cadastrado...'}
                    required
                    valueI={formData.email}
                    act={(event) => setFormData({ ...formData, email: event.target.value })} />

                <Botao texto={"Recuperar Senha"} onClick={() => reset_password()} style={2} disabled={isNextDisabled} />
                
            </div>
        </div>
    );
}

export default SemSenha;