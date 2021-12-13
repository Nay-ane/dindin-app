import React from "react";

import './../css/Resume.css'
import '../../layout.css'

function Resume({entrada, saida, saldo}) {
    return (
        <aside className="container-resume flex-cloumn align-center">
            <h3 className='resume-title'>Resumo</h3>

            <div className='flex-row justify-between mgbt-2'>
                <span className="resume-item">Entradas</span>
                <span className="resume-item in"> R$ {entrada.toFixed(2)} </span>
            </div>

             <div className='flex-row justify-between mgbt-2'>
                <span className="resume-item">Saída</span>
                <span className="resume-item out"> R$ {saida.toFixed(2)} </span>
            </div>

            <hr className='hr mgbt-2'/>

            <div className='flex-row justify-between'>
                <span className="resume-item"><b>Saldo</b></span>
                <span className="resume-item balance"> R$ {saldo.toFixed(2)}</span>
            </div>
        </aside>
       
    );
}

export default Resume