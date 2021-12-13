import Header from "./components/js/Header.js";
import FilterButton from "./components/js/FilterButton.js";
import Resume from "./components/js/Resume.js";
import AddTransactionButton from "./components/js/AddTransactionButton.js";
import Table from "./components/js/Table.js";
import Modal from "./components/js/Modal.js";
import ContainerFilters from "./components/js/ContainerFilters.js";


import "./App.css";
import "./layout.css"

import axios from "axios";
import { useState, useEffect } from 'react'
import { getDay } from 'date-fns'

async function getTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const transactions =  await response.json()
    return transactions
}

function sumByType(transactions, type) {
    const reducer = (previousValue, currentValue) => previousValue + currentValue
    return transactions
        .filter(item => item.type === type)
        .map(item => item.value)
        .reduce(reducer, 0)
}



function App() {
    let [transactions, setTransactions] = useState([])

    const [visible, setModalVisibility] = useState(false)

    const [title, setModalTitle] = useState()
    
    const [modalData, setModalData] = useState()

    const [cashIn, setCashIn] = useState(0)

    const [cashOut, setCashOut] = useState(0)

    const [balance, setBalance] = useState(0)

    const [visibleContainer, setContainerVisibility] = useState(false)
    
    useEffect(() => {
        fetchTransactions()
    }, [cashIn, cashOut, balance])

    async function fetchTransactions() {
        const response = await getTransactions()
        response.forEach(item => item.isVisible = true)

        const creditValue = sumByType(response, 'credit')
        const debitValue = sumByType(response, 'debit')
        
        setTransactions(response)
        setCashIn(creditValue)
        setCashOut(debitValue)
        setBalance(creditValue - debitValue)
    }

    function handleAddTransactionClick() { 
        setModalVisibility(true)
        setModalData({
            type: 'debit',
            value: '', 
            category: '', 
            date: '', 
            description: ''
        })
        setModalTitle('Adicionar Registro')
    }

    function handleCloseModalClick() {
        setModalVisibility(false)
    }

    function handleClickFilterButton() {
        setContainerVisibility(!visibleContainer)
    }

    function onEditClick(data) {
        setModalVisibility(true)
        setModalTitle('Editar registro')
        setModalData(data)
    }

    function filterByValue(filter){
        if (filter) {
            transactions.forEach(item => 
                item.isVisible = item.value >= filter.min && item.value <= filter.max
            )
        } else {
            transactions.forEach(item => item.isVisible = true)
        }
        setTransactions(transactions)
    }

   function onSortClick(field, type) {
        function sortAsc(a, b) {
            if (a[field] > b[field]) {
              return 1;
            }
            if (a[field] < b[field]) {
              return -1;
            }
            return 0;
        }

        function sortDesc(a, b) {
            if (b[field] > a[field]) {
              return 1;
            }
            if (b[field] < a[field]) {
              return -1;
            }
            return 0;
        }

        const newTransactions = [...transactions]

        if(type === 'asc') {
            newTransactions.sort(sortAsc)
        } else {
            newTransactions.sort(sortDesc)
        }
        setTransactions(newTransactions)
    }

    async function handleFormSubmit(data){
        const weekDays = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
        const [dia, mes, ano] = data.date.split('/')
        const date = new Date (ano, (parseInt(mes) - 1), dia)
        data.date = date.toISOString()
        data.value = parseInt(data.value)
        data.week_day = weekDays[getDay(date)]

        if(data.id) {
            await updateTransaction(data)
        } else {
            await createTransction(data)
        }

        fetchTransactions()
        handleCloseModalClick()
    }

    async function createTransction(data) {
        await axios.post('http://localhost:3333/transactions', data)
    }

    async function updateTransaction(data) {
        await axios.put(`http://localhost:3333/transactions/${data.id}`, data)
    }

    async function onDeleteConfirm(data) {
        await axios.delete(`http://localhost:3333/transactions/${data}`)
        fetchTransactions()
    }

    return (
        <div className="App">
            <Header />
            <div className="bodyApp">
                <Resume 
                    entrada={cashIn} 
                    saida={cashOut} 
                    saldo={balance} />
                <AddTransactionButton onClick={handleAddTransactionClick} />
                <FilterButton onClick={handleClickFilterButton}/>
                <ContainerFilters 
                    visibleContainer={visibleContainer}
                    filterByValue={filterByValue}
                />
                <Table 
                    data={transactions} 
                    onEditClick={onEditClick}
                    onDeleteConfirm={onDeleteConfirm}
                    onSortClick={onSortClick}
                />
                <Modal 
                    data={modalData}
                    visible={visible} 
                    onCloseClick={handleCloseModalClick} 
                    title={title}
                    onFormSubmit={handleFormSubmit}/>
                
            </div>
        </div>
    );
}

export default App;
