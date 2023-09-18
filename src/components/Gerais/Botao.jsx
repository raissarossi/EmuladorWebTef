const Botao = ({ onClick, texto, disabled, style }) => {
    return (
        <>
            {style === 1 ?
                <button className="text-bosch-blau2 font-semibold cursor-pointer hover:text-bosch-blau1 pl-2 text-base" onClick={onClick} disabled={disabled}>{texto}</button>
                :
                style === 2 ?
                    <button className="bg-bosch-blau2 hover:bg-bosch-blau3 text-white px-10 py-1 mt-5 w-5/6 rounded-lg disabled:bg-bosch-grau3" onClick={onClick} disabled={disabled}>{texto}</button>
                    :
                    style === 3 ?
                        <button className="text-bosch-blau2 font-semibold cursor-pointer hover:text-bosch-blau1 text-base absolute top-10 right-6" onClick={onClick} disabled={disabled}>{texto}</button>
                        :
                        style === 4 ?
                            <button className="disabled:bg-transparent disabled:text-transparent bg-bosch-blau2 hover:bg-bosch-blau3 text-white mt-10 py-2 px-5 rounded-md" onClick={onClick} disabled={disabled}>{texto}</button>
                            :
                            style === 5 ?
                                <button className="bg-bosch-blau2 hover:bg-bosch-blau3 disabled:bg-bosch-grau3 text-white mt-10 py-2 px-5 rounded-md cursor-pointer" onClick={onClick} disabled={disabled}>{texto}</button>
                                :
                                style === 6 ?
                                <div className="flex w-5/6 -mt-7 justify-end items-start">
                                    <button className="text-bosch-grau3 cursor-pointer hover:text-bosch-blau1 pr-1 text-base" onClick={onClick} disabled={disabled}>{texto}</button>
                                </div>
                                    :
                                    <></>
            }
        </>
    );
}

export default Botao;