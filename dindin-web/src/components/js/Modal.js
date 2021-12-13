import {React, useState, useEffect} from "react";

import closeCard from "../../assets/closeCard.png"
import SwitchButton from './SwitchButton'
import InputMask from 'react-input-mask'

import '../../layout.css'
import './../css/Modal.css'

function Modal(props){
    const [erro, setErro] = useState('')
    const [data, setData] = useState({
        type: 'debit',
        value: '', 
        category: '', 
        date: '', 
        description: ''
    })

    useEffect(() => {    
        if (props.data)
            setData(props.data)
    }, [props.data]);

    function handleOnChange({target}){
        if (target.validity.valid) {
            data[target.id] = target.value
            setData({...data, [target.id] : target.value})
        }
    }

    function handleSubmit (event) {
        event.preventDefault();

        setErro('')

        if(!data.value) {
            setErro('O valor deve ser preenchido')
            return
        }

        if(!data.category) {
            setErro('A categoria deve ser preenchida')
            return
        }

        if(!data.date) {
            setErro('A data deve ser preenchida')
            return
        }

        if(!data.description) {
            setErro('A descrição deve ser preenchida')
            return
        }
        props.onFormSubmit(data)
    }

    function onSwitchChange(value) {
        const newData = { ...data }
        newData.type = value
        setData(data)
    }

    return(
        <div className={`backdrop ${props.visible ? '' : 'hidden'}`}>
            <div className='flex-column modal-container'>
                <div className='flex-row justify-between mgbt-2'>
                    <h3 className='modal-title'>{props.title}</h3>
                    <button className='close-icon' onClick={props.onCloseClick}>
                        <img src={closeCard} alt='Close'/>
                    </button>
                </div>
                <SwitchButton data={data} onChange={onSwitchChange}/>
                <div>
                    {
                        erro && (
                            <div className = 'alert'>
                                {erro}
                            </div>
                        )
                    }
                    <form className='flex-column' onSubmit={handleSubmit}>

                    <label className='label' htmlFor='value'>Valor</label>

                    <input
                        className='input'
                        id='value'
                        name='value'
                        type= "text" 
                        pattern="[0-9]*"
                        onChange={handleOnChange}
                        value={data.value}
                    />

                    <label className='label' htmlFor='category'>Categoria</label>

                    <input
                        className='input'
                        id='category'
                        name='category'
                        type='text'
                        onChange={handleOnChange}
                        value={data.category}
                    />

                    <label className='label' htmlFor='date'>Data</label>

                    <InputMask
                        className='input'
                        mask='99/99/9999'
                        id='date'
                        onChange={handleOnChange}
                        value={data.date}
                    />
                    <label className='label' htmlFor='description'>Descrição</label>

                    <input
                        className='input'
                        id='description'
                        name='description'
                        type='text'
                        onChange={handleOnChange}
                        value={data.description}
                    />

                    <div className='flex-row justify-center'>
                        <button type='submit' className='btn-form' onSubmit={handleSubmit}>Confirmar</button>
                    </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal 