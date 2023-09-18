import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../../Gerais/Title";
import UserAprovacao from "./UserAprovacao";
import getToken from "../../Gerais/GetToken";
import api from "../../Gerais/Api";
import { useNavigate } from "react-router-dom";
import AprovarUserAlert from "../Alerts/AprovarUserAlert";
import DeletarUserAlert from "../Alerts/DeletarUserAlert";

const Aprovacao = () => {
    const rota = useNavigate()
    const redirecionar = () => {
        api.get('solicitacoes/user_activate/', {
            headers: {
                Authorization: "JWT " + getToken()
            }
        }).catch((res) => {
            console.log(res);
            rota('/')
        })
    }

    useEffect(() => {
        redirecionar()
    }, [])
    const [isChecked, setIsChecked] = useState(false);
    const [usuarios, setUsuarios] = useState([
        {
            id: 0,
            name: "default",
            email: "default",
            user: "default",
            is_superuser: false,
        },])

    const atualizar = () => {
        api.get("solicitacoes/user_activate/", {
            headers: {
                Authorization: 'JWT ' + getToken()
            }
        }).then((res) => {

            setUsuarios(res.data)
        })
    }

    useEffect(() => {
        atualizar()
    }, [])


    const trocaAdm = (index, id) => {
        if (usuarios[index].email == "default") {
            return
        }
        setUsuarios((prevUsuarios) => {
            const updatedUsuarios = [...prevUsuarios];
            let estado = !updatedUsuarios[index].is_superuser
            updatedUsuarios[index] = { ...updatedUsuarios[index], is_superuser: estado, };
            api.patch("solicitacoes/user_activate/" + id + "/",
                {
                    is_staff: estado,
                    is_superuser: estado
                },
                {
                    headers: { Authorization: "JWT " + getToken() }
                }
            )
                .catch((res) => {
                    setUsuarios(prevUsuarios)
                })
            return updatedUsuarios
        });
    };

    const aprovar = (id, name) => {
        AprovarUserAlert(id, atualizar, name)

    }
    const excluir = (id, name) => {
        DeletarUserAlert(id, atualizar, name)
    }

    const [pesquisa, setPesquisa] = useState("")


    return (
        <div className="w-full -mt-10 mb-2">
            <Title title={"Aprovação de usuários"} style={1} />
            <div className="px-3 sm:px-10 -mt-10">
                <div className="w-full flex justify-end items-center mb-5">
                    <div className=" border-bosch-grau2 border-2 flex rounded-md items-center p-2">
                        <input type="text" onChange={(e) => setPesquisa(e.target.value)} className="pr-10 outline-none" placeholder="Procurar por user" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-bosch-grau3 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                </div>
                <table className="min-w-full divide-y divide-bosch-grau1 w-5/6">
                    <thead className="bg-bosch-grau0 bg-opacity-25">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-bosch-grau4 uppercase w-2/12">Nome</th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-bosch-grau4 uppercase w-2/12">Email</th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-bosch-grau4 uppercase w-2/12">User</th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-center text-bosch-grau4 uppercase w-1/12">Justificativa</th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-center text-bosch-grau4 uppercase w-1/12">Acesso ADM</th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-center text-bosch-grau4 uppercase w-1/12">Aprovar</th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-center text-bosch-grau4 uppercase w-1/12">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {usuarios.map((item, index) =>
                            <>
                                {item.bosch_user?.includes(pesquisa) || item.name?.includes(pesquisa) || item.email?.includes(pesquisa) ?
                                    <UserAprovacao user={item} index={index} trocaAdm={trocaAdm} aprovar={aprovar} excluir={excluir} />
                                    : <></>
                                }
                            </>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Aprovacao;