import { useNavigate } from 'react-router-dom';
import Botao from '../Gerais/Botao';
import OfficeBlue from '../Images/OfficeBlue.png'
import BotaoSair from '../Gerais/sair';
import BotaoBack from '../Gerais/BotaoBack';
import Title from '../Gerais/Title';
const Aguarde = () => {
    const rota = useNavigate()
    return (
        <div className="flex flex-col items-center justify-evenly -mt-10">
            <div className='w-full flex justify-start pl-6'>
                <Title title={"Voltar"} style={1} />
            </div>
        
            <div className='flex flex-col justify-between items-center px-10 lg:px-32 xl:px-64'>
                <h1 className="text-4xl text-bosch-blau3 font-semibold z-10">Tudo certo...</h1>
                <h1 className="text-2xl text-bosch-blau2 pt-5 z-10">Aguarde o retorno em seu email!</h1>
                <BotaoSair />
            </div>
            <img className="max-h-[750px] px-10 lg:px-32 xl:px-64 2xl:-m-14 z-0" src={OfficeBlue} />
        </div>
    );
}

export default Aguarde;