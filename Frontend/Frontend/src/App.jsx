import React from 'react'
import { Route, Routes } from 'react-router-dom';
import {useState, useEffect} from 'react'
import Header from './Components/Header'
import Prdt_card from './Components/Products/Prdt_card'
import Auth from './Components/Auth/Auth'
import Add_Product from './Components/Products/Add_Product';
import Update_Product from './Components/Products/Update_Product';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState()

  return (
    <>
    <Header data={isLoggedIn}></Header>
    <Routes>
    <Route path="/" exact element={<Prdt_card></Prdt_card>} />
    <Route path="/auth" element={<Auth></Auth>} />
    <Route path='/addform' element={<Add_Product></Add_Product>}></Route>
    <Route path='/update/:id' element={<Update_Product></Update_Product>}></Route>
    </Routes>
    </>
  )
}

export default App


