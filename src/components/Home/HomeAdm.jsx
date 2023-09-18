import { Link, useNavigate } from "react-router-dom";
import BotaoSair from "../Gerais/sair";
import Title from "../Gerais/Title";
import { useEffect } from "react";
import api from "../Gerais/Api";
import getToken from "../Gerais/GetToken";

const HomeAdm = () => {
    const rota = useNavigate()
    const redirecionar = () => {
        api.get('solicitacoes/user_activate/', {
            headers: {
                Authorization: "JWT " + getToken()
            }
        }).catch((res) => {
            rota('/home')
        })
    }

    useEffect(() => {
        redirecionar()
    }, [])
    return (
        <div className="flex w-full justify-evenly flex-col h-full">
            <Title title={"HOME"} style={3} />
            <div className="flex justify-center">
                <div className="flex justify-evenly lg:mt-24 flex-wrap items-center max-w-6xl">
                    <button className="w-48 sm:w-72 h-36 mx-5 sm:mx-10 mb-5 sm:mb-16 font-semibold text-bosch-grau5 border-2 border-bosch-grau0 hover:shadow-lg shadow-bosch-grau0 rounded-3xl" onClick={() => rota("/aprovacao")}>
                        GERENCIAR USUÁRIOS
                    </button>
                    <button className="w-48 sm:w-72 h-36 mx-5 sm:mx-10 mb-5 sm:mb-16 font-semibold text-bosch-grau5 border-2 border-bosch-grau0 hover:shadow-lg shadow-bosch-grau0 rounded-3xl" onClick={() => rota("/gerenciaritens")}>
                        GERENCIAR CAMPO
                    </button>
                    <button className="w-48 sm:w-72 h-36 mx-5 sm:mx-10 mb-5 sm:mb-16 font-semibold text-bosch-grau5 border-2 border-bosch-grau0 hover:shadow-lg shadow-bosch-grau0 rounded-3xl" onClick={() => rota("/adicionaritem")}>
                        ADICIONAR ITEM
                    </button>
                    <button className="w-48 sm:w-72 h-36 mx-5 sm:mx-10 mb-5 sm:mb-16 font-semibold text-bosch-grau5 border-2 border-bosch-grau0 hover:shadow-lg shadow-bosch-grau0 rounded-3xl" onClick={() => rota("/formemulador")}>
                        EMULADOR
                    </button>
                    <Link target={"_blank"}
                        to={"https://rb-powerbi.bosch.com/reports/powerbi/PBI/Production/BIUsinagemTEF2_406148?rs:embed=true"}
                        className="w-48 sm:w-72 h-36 mx-5 sm:mx-10 mb-5 sm:mb-16 font-semibold text-bosch-grau5 border-2 border-bosch-grau0 hover:shadow-lg shadow-bosch-grau0 rounded-3xl flex items-center justify-center">
                        POWER BI
                    </Link>
                    <button className="w-48 sm:w-72 h-36 mx-5 sm:mx-10 mb-5 sm:mb-16 font-semibold text-bosch-grau5 border-2 border-bosch-grau0 hover:shadow-lg shadow-bosch-grau0 rounded-3xl" onClick={() => rota("/mapa")}>
                        MAPA
                    </button>
                </div>
            </div>
            <BotaoSair />

        </div >
    );
}

export default HomeAdm;