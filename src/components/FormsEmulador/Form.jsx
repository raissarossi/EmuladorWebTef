import React, { useEffect, useState } from 'react';
import ServicoInfo from './Pages/ServicoInfo';
import DetalhesPedido from './Pages/DetalhesPedido';
import AreaInfo from './Pages/AreaInfo';
import { useNavigate } from 'react-router-dom';
import Botao from '../Gerais/Botao';
import api from '../Gerais/Api';
import getToken from '../Gerais/GetToken';
import BotaoSair from '../Gerais/sair';
import Title from '../Gerais/Title';


function Form() {
  useEffect(() => {
    api.get('auth/users/me/', {
      headers: {
        Authorization: "JWT " + getToken()
      }
    }).then((res) => {
    }).catch(() => {
      alert("sua conexão excedeu o limite de tempo, por favor faça login novamente");
      rota('/')
    })
  })

  const rota = useNavigate()
  const today = new Date();

  const compareDates = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
    if (date1 > date2) {
      return true
    } else {
      return false;
    }
  };


  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    GB: "",
    ramal: "",
    localDebito: "",
    num: "",
    tipoDebito: "",

    categoria: "",
    tipoServico: "",
    prazo: "",
    descricao: "",

    numDesenho: "",
    grupo: "",
    anexoDesenho: [],
    existeSemelhante: "",
    numSemelhante: "",
    numAnoSemelhante: "",
  });

  const send = () => {

    // const data = {
    //   "setor": formData.GB,
    //   "ramal": formData.ramal,
    //   "local_debito_tipo": formData.localDebito,
    //   "local_debito_numero": formData.num??"-",
    //   "tipo_debito": formData.tipoDebito,
    //   "categoria": formData.categoria,
    //   "tipo_de_servico": formData.tipoServico,
    //   "prazo_pretendido": formData.prazo,
    //   "descricao": formData.descricao,
    //   "n_desenho": formData.numDesenho??"NA",
    //   "grupo": formData.grupo??"NA",
    //   "anexos": formData.anexoDesenho,
    //   "anexo": formData.anexoDesenho[0],
    //   "solicitacao_semelhante": formData.existeSemelhante,
    //   "n_solicitacao_executada": formData.numSemelhante+"-"+formData.numAnoSemelhante == "-"??"NA",
    // }

    api.post("solicitacoes/pedidos/", {
      "setor": formData.GB,
      "ramal": formData.ramal,
      "local_debito_tipo": formData.localDebito,
      "local_debito_numero": formData.num,
      "tipo_debito": formData.tipoDebito,
      "categoria": formData.categoria,
      "tipo_de_servico": formData.tipoServico,
      "prazo_pretendido": formData.prazo,
      "descricao": formData.descricao,
      "n_desenho": formData.numDesenho,
      "grupo": formData.grupo==""?"NA":formData.grupo,
      "anexos": formData.anexoDesenho,
      "anexo": formData.anexoDesenho[0],
      "solicitacao_semelhante": formData.existeSemelhante,
      "n_solicitacao_executada": formData.numSemelhante+"-"+formData.numAnoSemelhante,
    }, {
      headers: {
        "Content-Type": 'multipart/form-data',
        Authorization: "JWT " + getToken()
      }
    }).then((res) => {
    })
    alert("SUBMITTED");
    rota("/aguarde")
  }

  const FormTitles = ['Áreas Infos', 'Serviço Infos', 'Detalhes do Pedido'];

  const checkInputs = () => {
    if (page === 0) {
        return formData.GB && formData.tipoDebito;
    }
    else if (page === 1) {
      if (compareDates(formData.prazo, today.getTime())) {
        return formData.categoria && formData.tipoServico && formData.prazo && formData.descricao;
      }
    }
    else if (page === 2) {
      if (formData.existeSemelhante == "1" && formData.anexoDesenho!=0) {
        return formData.anexoDesenho && formData.existeSemelhante && formData.numSemelhante && formData.numAnoSemelhante;
      }
      if (formData.existeSemelhante == "2"  && formData.anexoDesenho!=0) {
        return formData.anexoDesenho && formData.existeSemelhante;
      }
    }
    return false;
  };
  const isNextDisabled = !checkInputs();

  const PageDisplay = () => {
    if (page === 0) {
      return <AreaInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <ServicoInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <DetalhesPedido formData={formData} setFormData={setFormData} />;
    }
  };
  const [admin, setAdmin] = useState(true)
  const redirecionar = () => {
    api.get('solicitacoes/user_activate/', {
      headers: {
        Authorization: "JWT " + getToken()
      }
    }).catch((res) => {
      setAdmin(false)
    })
  }
  useEffect(() => {
    redirecionar()
}, [])

  return (
    <div className='flex justify-center'>
      {admin == true ? 
      <Title title={"Emulador"} style={2}/>
      : 
      <BotaoSair />
      }

      <div id="form" className="flex flex-col w-9/12 justify-center items-center h-full">

        <div id="progressbar" className="h-3 w-5/6 sm:w-3/6 flex items-center my-10 bg-bosch-grau1 rounded-full">
          <div
            style={{
              width:
                page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%",
            }}
            className="h-3 bg-bosch-blau2 rounded-full"
          ></div>
        </div>

        <div id="form-container" className="flex flex-col items-center bosch-form2">
          <div id="header" className="">
            <h1>{FormTitles[page]}</h1>
          </div>
          <div id="body" className="w-full">
            {PageDisplay()}
          </div>
          <div id="footer" className="flex w-5/6 justify-between">
            <Botao onClick={() => { setPage((currPage) => currPage - 1) }} texto={"PREV"} disabled={page === 0} style={4} />
            <Botao onClick={() => {
              if (page === FormTitles.length - 1) {
                send()
              } else {
                setPage((currPage) => currPage + 1);
              }
            }} texto={page === FormTitles.length - 1 ? "SUBMIT" : "NEXT"} disabled={isNextDisabled} style={5} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
