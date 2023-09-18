import React, { useEffect, useState } from 'react';
import Input from '../../Gerais/Input';
const MAX_COUNT = 20
function DetalhesPedido({ formData, setFormData }) {
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)
    }

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }

    const remover = (file) => {
        let files = []
        uploadedFiles.forEach(element => {
            if (element != file) {
                files.push(element)
            }
        });
        setUploadedFiles(files)
    }

    useEffect(() => {
        setFormData({ ...formData, anexoDesenho: uploadedFiles })
    }, [uploadedFiles])

    return (
        <div id='other-info-container' className='bosch-form-page'>
            <div className='bosch-input2'>
                <h1 className='bosch-h1'>N° Desenho:</h1>
                <Input
                    tipo={'num'}
                    texto={'N° desenho...'}
                    maxLength={20}
                    required
                    valueI={formData.numDesenho}
                    act={(event) => setFormData({ ...formData, numDesenho: event.target.value })} />
            </div>

            <div className='bosch-input2'>
                <h1 className='bosch-h1'>Grupo:</h1>
                <Input
                    tipo={'text'}
                    texto={'Grupo...'}
                    maxLength={20}
                    required
                    valueI={formData.grupo}
                    act={(event) => setFormData({ ...formData, grupo: event.target.value })} />
            </div>

            <div className='bosch-input2'>
                <h1 className='bosch-h1'>Anexo Desenho:</h1>
                <div className='flex w-5/6 flex-col mt-2'>
                    <div className='flex flex-row justify-between'>
                        <label htmlFor="file" className='cursor-pointer py-1 px-3 sm:px-5 border-[2px] border-bosch-grau1 rounded-md placeholder:text-bosch-grau1 hover:bg-bosch-grau0 hover:bg-opacity-80'>Adicionar</label>
                        <input
                            name='file'
                            id='file'
                            disabled={fileLimit}
                            type='file'
                            multiple
                            onChange={handleFileEvent}
                            className='hidden'
                        />
                        itens: {uploadedFiles.length}
                    </div>
                    <div className='overflow-y-scroll max-h-20 bg-bosch-grau0 bg-opacity-20 border border-bosch-grau1 px-1 mt-1'>
                        {uploadedFiles.map((file) =>
                            <div className='flex justify-between text-sm border-b border-bosch-grau0 border-opacity-40 pt-1'>
                                {file.name}
                                <button onClick={() => { remover(file) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-bosch-rot3 hover:text-bosch-rot1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='w-5/6 flex items-end'>
                <div className='bosch-input2 items-start'>
                    <h1 className='bosch-h1'>Existe Semelhante?</h1>
                    <select id="Existe Semelhante" required defaultValue={'0'} className='bosch-input' value={formData.existeSemelhante} onChange={(event) => setFormData({ ...formData, existeSemelhante: event.target.value })}>
                        <option value='0' selected hidden>Selecione...</option>
                        <option value='1'>Sim</option>
                        <option value='2'>Não</option>
                    </select>
                </div>
                <div className='bosch-input2 items-end'>
                    <h1 className='bosch-h1'>N° do Semelhante:</h1>
                    <Input
                        tipo={'num'}
                        texto={'N° da Solicitação...'}
                        maxLength={5}
                        required
                        valueI={formData.numSemelhante}
                        act={(event) => setFormData({ ...formData, numSemelhante: event.target.value })} />
                </div>
                <div className='bosch-input2 items-end w-3/6'>
                    <h1 className='bosch-h1'>Ano:</h1>
                    <Input
                        tipo={'num'}
                        texto={'Ano...'}
                        maxLength={2}
                        required
                        valueI={formData.numAnoSemelhante}
                        act={(event) => setFormData({ ...formData, numAnoSemelhante: event.target.value })} />
                </div>
            </div>
        </div>
    );
}

export default DetalhesPedido;
