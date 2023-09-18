import { useEffect, useState } from "react";
import DeletarItemAlert from "../Alerts/DeletarItemAlert";
import api from "../../Gerais/Api"
import getToken from "../../Gerais/GetToken";

const Dropdown = ({ title, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [itens, setItens] = useState([])

    const atualizar = () =>{
        api.get("solicitacoes/"+value+"/", {
            headers: { Authorization: "JWT "+ getToken() }
        }).then((res) => {
            setItens(res.data)
        })
    }

    useEffect((() => {
        atualizar()
    }),[])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };
    
    const excluir = (id, value) => {
        DeletarItemAlert(id, value, atualizar)
    }
    return (
        <div className="relative px-20">
            <button onClick={toggleDropdown} className="bosch-dropdown">
                {isOpen ?
                    <svg className="w-4 h-4 mr-3 mt-1 transition-all transform duration-300 -rotate-180 text-bosch-grau4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    :
                    <svg className="w-4 h-4 mr-3 mt-1 transition-transform duration-300 transform text-bosch-grau4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                }
                <text className="text-lg text-bosch-grau4">
                    {title}
                </text>
            </button>

            {isOpen && (
                <div className="w-full mt-0 origin-top-right bg-white divide-y divide-red-600 rounded-md shadow-lg shadow-slate-100 outline-none">
                    <div className="py-1 mb-3">
                        {itens.map((item)=>
                        <div key={item.id} className="flex justify-between px-4 py-2 hover:bg-bosch-grau0 hover:bg-opacity-20">
                            <text href="#" className="block text-sm text-bosch-grau4" > {item["nome_"+value]} </text>
                            <button onClick={() => excluir(item.id, value)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-bosch-rot3 hover:text-bosch-rot1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}

export default Dropdown;