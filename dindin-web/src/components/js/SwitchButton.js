import {React, useState, useEffect} from "react";

import './../css/Modal.css'

function SwitchButton ({data, onChange}) {
    const [isCredit, setIsCredit] = useState(data.type === 'credit')
    const [creditClass, setCreditClass] = useState('btn-credit-on')
    const [debitClass, setDebitClass] = useState('')

    useEffect(() => {
        data.type = isCredit ? 'credit' : 'debit'
        setCreditClass(isCredit ? 'btn-credit-on' : '')
        setDebitClass(!isCredit ? 'btn-debit-on' : '')
        onChange(data.type)
    }, [isCredit])

    return(
        <div className='flex-row mgbt-1'>
            <button 
                onClick={() => { setIsCredit(true) }} 
                className={`btn-cash-in ${creditClass}`}
                id = 'credit-button'> 
                Entrada 
            </button>
            <button 
                onClick={() => { setIsCredit(false) }} 
                className={`btn-cash-out ${debitClass}`}
                id = 'debit-button' >
                Saída
            </button>
        </div>
    )
}

export default SwitchButton