import React from "react";
import './../css/AddTransactionButton.css'

function AddTransactionButton(props) {
    return <button className='btn-add' onClick={props.onClick}>Adicionar Registro</button>;
}

export default AddTransactionButton
