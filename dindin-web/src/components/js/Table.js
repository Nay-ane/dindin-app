import {React, useState, useEffect} from "react";
import { format, getDay} from "date-fns";

import '../../layout.css'
import './../css/Table.css'


import edit_icon from '../../assets/edit_icon.png'
import delete_icon from '../../assets/delete_icon.png'
import sortUp_icon from '../../assets/sortUp_icon.png'
import sortDown_icon from '../../assets/sortDown_icon.png'



const Row = ({item, onEditClick, onDeleteConfirm, onSortClick}) => {
    const [popupVisible, setpopupVisibility] = useState(false)

    function onDeleteClick() {
        setpopupVisibility(true)
    }

    function onCancelDelete() {
        setpopupVisibility(false)
    }

   let typeTransaction = item.type === 'credit' ? 'in' : 'out'
    return (
        <tr className='table-line'>
            <td className='data-td'>{format(new Date (item.date), 'dd/MM/yyyy')}</td>
            <td>{item.week_day}</td>
            <td>{item.description}</td>
            <td>{item.category}</td>
            <td className={typeTransaction}>R$ {item.value.toFixed(2)}</td>
            <td><button 
                className='btn-actions-confirm-delete' 
                onClick={() => onEditClick(item)}>
                <img  className='edit_icon' src={edit_icon} alt='editItem'/>
            </button></td>
            <td><button 
                className='btn-actions-confirm-delete'
                onClick={() => onDeleteClick()}>
                <img className='delete_icon'src={delete_icon} alt='editItem'/>
            </button></td>
            <td><PopUpDelete isVisible={popupVisible} onCancelDelete={onCancelDelete} onDeleteConfirm={onDeleteConfirm} itemId={item.id}/></td>
        
        </tr>
    );
};

const PopUpDelete = ({isVisible, onCancelDelete, onDeleteConfirm, itemId}) => {
    return (
        <div className={`container-confirm-delete flex-column align-center ${isVisible ? '' : 'hidden'}`}>
            <h6 className='confirm-message mgbt-1'> Apagar item ?</h6>
            <div className='container-btn flex-row'>
                <button 
                    className='btn-actions-confirm-delete yes'
                    onClick={() => {
                        onDeleteConfirm(itemId)
                        onCancelDelete()
                    }}
                >Sim</button>
                <button 
                    className='btn-actions-confirm-delete no'
                    onClick={onCancelDelete}
                >Não</button>
            </div>
        </div>
    )
}

const Table = ({ data, onEditClick, onDeleteConfirm, popupVisible, onSortClick}) => {
    const [sortIconDate, setSortIconDate] = useState()
    const [sortIconWeekDay, setSortIconWeekDay] = useState()
    const [sortIconValue, setSortIconValue] = useState()

    function onClickDate() {
        if(sortIconDate === sortUp_icon) {
            setSortIconDate(sortDown_icon)
            onSortClick('date', 'desc' )

        } else {
            setSortIconDate(sortUp_icon)
            onSortClick('date','asc')
        } 

        setSortIconWeekDay('')
        setSortIconValue('')
        
    }
    
    function onClickWeekDay() {
        if(sortIconWeekDay === sortUp_icon) {
            setSortIconWeekDay(sortDown_icon)
            onSortClick('week_day', 'desc' )
        } else {
            setSortIconWeekDay(sortUp_icon)
            onSortClick('week_day', 'asc' )
        }
        setSortIconDate('')
        setSortIconValue('')
    }

    function onClickValue() {
        if(sortIconValue === sortUp_icon) {
            setSortIconValue(sortDown_icon)
            onSortClick('value', 'desc' )
        } else {
            setSortIconValue(sortUp_icon)
            onSortClick('value', 'asc' )
        }

        setSortIconWeekDay('')
        setSortIconDate('')
    }

  
    return (
        <table className='table'>
            <thead className ='table-head' >
                <tr className = 'table-column'>
                    <th>
                
                        <button 
                            className={'btn-sort'}
                            onClick={onClickDate} >   
                            Data
                            <img src={sortIconDate} alt=''/>
                        </button>
                    </th>
                    <th>
                       
                        <button 
                            className={'btn-sort'}
                            onClick={onClickWeekDay}>
                            Dia da semana
                           <img src={sortIconWeekDay} alt=''/>
                        </button>
                    </th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th className={''}>
                        <button 
                            className={'btn-sort'}
                            onClick={onClickValue}>
                            Valor
                            <img src={sortIconValue} alt=''/>
                        </button>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody className='table-body'>
                {data.map( item => {
                    if(item.isVisible)
                        return < Row item={item} 
                            key={item.id} 
                            onEditClick={onEditClick} 
                            onDeleteConfirm={onDeleteConfirm} 
                            popupVisible={popupVisible}
                            />
                })}
            </tbody>
        </table>
    );
};

export default Table;
