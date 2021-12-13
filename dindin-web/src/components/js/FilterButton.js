import React from "react";
import filter from "../../assets/filter.png";
import './../css/FilterButton.css'

function FilterButton(props) {
    return (
        <button className='open-filters-button' onClick={props.onClick}>
            <span>Filtro</span>
            <img src={filter} alt="filter"/>
        </button>
    );
}

export default FilterButton