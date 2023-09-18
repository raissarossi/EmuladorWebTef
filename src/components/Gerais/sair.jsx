import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Botao from "./Botao"

const BotaoSair = () => {
    const rota = useNavigate()

    return (
            <button className="text-bosch-blau2 font-semibold cursor-pointer hover:text-bosch-blau1 text-base absolute top-10 right-6"
            onClick={() => rota('/')}>Sair</button>
            
    );
}

export default BotaoSair;