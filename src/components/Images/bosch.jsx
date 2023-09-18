import React from 'react';
import boschBar from '../Images/boschSupergraphic.svg'


const Bosch = ({ model }) => {

    if (model == "header") {
        return (
            <div className='mb-14'>
                <div className="h-2 w-full overflow-hidden flex items-center">
                    <img src={boschBar} className="w-full" alt="boschBar" />
                </div>
                <div>
                    <img className="h-24" src={require('../Images/boschLogo.png')} />
                </div>
            </div>
        );
    }
    if (model == "footer") {
        return (
            <div className="sm:h-10 w-full overflow-hidden flex fixed bottom-0 flex-col items-end">
                <div className='mx-4 mb-2'>
                    <text className='p-1 text-sm text-bosch-grau4'>Contato:</text>
                    <text className='p-1 text-sm text-bosch-grau4'>leandro.galvao@br.bosch.com</text>
                    <text className='p-1 text-sm text-bosch-grau4'>felipe.lagoa@br.bosch.com</text>
                </div>
                <img src={boschBar} className="w-full" alt="boschBar" />
            </div>
        );
    }
}

export default Bosch;