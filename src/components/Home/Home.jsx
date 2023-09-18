import { Link, useNavigate } from "react-router-dom";
import BotaoSair from "../Gerais/sair";
import Title from "../Gerais/Title";
import { useEffect } from "react";
import api from "../Gerais/Api";
import getToken from "../Gerais/GetToken";

const Home = () => {
    const rota = useNavigate()
    const redirecionar = () => {
        api.get('auth/users/me/', {
            headers: {
                Authorization: "JWT " + getToken()
            }
        }).catch((res) => {
            rota('/')
        })
    }

    useEffect(() => {
        redirecionar()
    }, [])
    return (
        <div className="flex w-full justify-evenly flex-col h-full">
            <Title title={"HOME"} style={3} />
            <div className="flex justify-evenly lg:mt-24 flex-wrap">
                <button className="w-48 sm:w-72 h-36 mx-5 mb-5 font-semibold text-bosch-grau5 border-2 border-bosch-grau0 hover:shadow-lg shadow-bosch-grau0 rounded-3xl" onClick={() => rota("/formemulador")}>
                    EMULADOR
                </button>
                <Link target={"_blank"}
                    to={"https://rb-powerbi.bosch.com/reports/powerbi/PBI/Production/BIUsinagemTEF2_406148?rs:embed=true"}
                    className="w-48 sm:w-72 h-36 mx-5 mb-5 font-semibold text-bosch-grau5 border-2 border-bosch-grau0 hover:shadow-lg shadow-bosch-grau0 rounded-3xl flex items-center justify-center">
                    POWER BI
                </Link>
                <button className="w-48 sm:w-72 h-36 mx-5 mb-5 font-semibold text-bosch-grau5 border-2 border-bosch-grau0 hover:shadow-lg shadow-bosch-grau0 rounded-3xl" onClick={() => rota("/mapa")}>
                    MAPA
                </button>
            </div>
            <BotaoSair />

        </div>
    );
}

export default Home;