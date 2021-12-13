import { React, useState, useEffect } from "react"
import '../css/ContainerFilters.css'
import '../../layout.css'

function Tag(props) {
    return (
    <label class="miro-radiobutton">
        <input type="radio" value="0" name="radio" />
        <span>{props.text}</span>
    </label>
    )
}

function ContainerFilters({visibleContainer, filterByValue}) {
    const weekDays = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']

    
    const [filter, setFilter] = useState({
        min: '',
        max: ''
    })

    function handleOnChangeFilter({target}){
        if (target.validity.valid) {
            const newFilter = {...filter, [target.name] : target.value}
            setFilter(newFilter)
        }
    }

    function handleClearFilters(){
        const newFilter= {
            min: '',
            max: ''
        }
        setFilter(newFilter)
        filterByValue()
    }

    return (
        <div className={`container-filters flex-row ${visibleContainer ? '' : 'hidden'}`}>
            <div className='container-filter flex-column align-center'>
                <h4 className='container-title'>Dia da semana</h4>                    
            </div>
            <hr className='hr'/>
            <div className='container-filter flex-column align-center'>
                <h4 className='container-title'>Categoria</h4>
            </div>
            <hr className='hr'/>
            <div className='container-filter flex-column'>

                <h4 className='container-title'>Valor</h4>

                <div className='container-filter-value-inputs flex-column'>

                    <label className='label' htmlFor='min-value'>Min</label>

                    <input 
                        className='inputFilter' 
                        id='min-value'
                        name='min'
                        type= "text" 
                        pattern="[0-9]*"
                        onChange={handleOnChangeFilter}
                        value={filter.min}
                    >
                    </input>

                    <label className='label' htmlFor='max-value'>Max</label>

                    <input 
                        className='inputFilter' 
                        id='max-value'
                        type= "text" 
                        pattern="[0-9]*"
                        name='max'
                        onChange={handleOnChangeFilter}
                        value={filter.max}>
                    </input>
                   
                </div>
            </div> 
            <div className='container-btn flex-row align-end'>
                <button 
                    className={'btn-clear-filters'}
                    onClick={handleClearFilters}>
                        Limpar Filtros
                    </button>
                <button 
                    className={'btn-apply-filters'}
                    onClick={() => filterByValue(filter)}>
                        Aplicar Filtros
                    </button>
            </div>
        </div>
    )
}

export default ContainerFilters