import { useEffect, useState } from "react";

const Input = ({ texto, tipo, obrigatorio, maxLength, act, valueI }) => {
  const [inputValue, setInputValue] = useState(valueI);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect((()=>{
    setInputValue(valueI)
  }),[valueI])


  function handleInputChange(event) {
    if(tipo == 'num' || tipo == Number){
      const { value } = event.target;
      const onlyNums = value.replace(/[^0-9]/g, ""); // remove qualquer caractere que não seja número
      if (value === onlyNums) { // verifica se o valor inserido é um número
        if (value.length <= maxLength) {
          setInputValue(onlyNums);
          setErrorMsg("");
        } else {
          setInputValue(value.substring(0, maxLength)); // limita o comprimento do valor inserido
        }
      } else {
        setErrorMsg("Insira apenas números");
        setTimeout(() => {
          setErrorMsg("");
        }, 2000); // timer de 2 segundos para remover a mensagem de erro
      }
    }
    else {
      setInputValue(event.target.value);
    }
    act && act(event); // chama a função passada por prop, se ela existir
  }
  

  let inputWidth = "w-24";
  if (maxLength === 4) {
    inputWidth = "w-16";
  } else if (maxLength === 5) {
    inputWidth = "w-10"; 
  } else if (maxLength === 7) {
    inputWidth = "w-28"; 
  } else if (maxLength === 1) {
    inputWidth = "w-8";
  }

  return (
    <>
      <input
        type={tipo}
        value={inputValue}
        onChange = {act}
        onInput = {handleInputChange}
        required={obrigatorio}
        className={"bosch-input"}
        placeholder={texto}
        maxLength={maxLength}
      />
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {/* <p>O valor é: {inputValue}</p> */}
    </>
  );
};

export default Input;