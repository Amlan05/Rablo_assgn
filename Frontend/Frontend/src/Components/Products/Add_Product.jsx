import React from "react";
import "../Components.css"
import {useState} from 'react'
import {useNavigate} from 'react-router'
import axios from 'axios'

const Add_Product = () => {

    const navigate = useNavigate()
    const [ft, setFt] = useState(true)
    const [pData, setPData] = useState({})
    const [status, setStatus] = useState()

const addNewProduct = async(data) => {
    try{
        let sentData = await axios.post('http://localhost:5000/products/add', data)
        setStatus("Product Added Successfully🥳")
        setTimeout( () => {
            navigate('/')
        },1000)
    }
   catch(err){
    console.log(err)
   }
}

const handleChange = (e) => {
    if(e.target.name === 'featured'){
        setFt(!ft)
        e.target.value = ft
    }
    setPData({
        ...pData,
        [e.target.name]: e.target.value
    })
}

const sendData = (e) => {
    e.preventDefault()
    addNewProduct(pData)
}

// productId, nameP, price, featured, rating, created, company
  return (
    <>
    <div className="container-fluid">
    <div className="row justify-content-center">
    <div className="col-6">
        <h1 className="text-center mt-2 mb-4">Add Product</h1>
      <form className="row g-3 addForm" onSubmit={sendData}>
        <div className="col-md-6">
          <label className="form-label">
            Product Id
          </label>
          <input type="text" className="form-control" required name="productId" onChange={handleChange}/>
        </div>
        <div className="col-md-6">
          <label className="form-label">
            Name
          </label>
          <input type="text" className="form-control" pattern="^[a-zA-Z\s]+$" required name="nameP" onChange={handleChange}/>
        </div>
        <div className="col-12">
          <label className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Rupees"
            required
            name="price"
            onChange={handleChange}
            step="any"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">
            Rating
          </label>
          <input type="number" className="form-control" name="rating" onChange={handleChange} min="1" max="5" step="any"/>
        </div>
        <div className="col-md-5">
          <label  className="form-label">
            Manufactured
          </label>
          <input type="date" className="form-control" required name="created" onChange={handleChange}/>
        </div>
        <div className="col-md-5">
          <label for="inputZip" className="form-label">
           Company
          </label>
          <input type="text" className="form-control" required name="company" onChange={handleChange}/>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" name='featured' type="checkbox" value={ft} onChange={handleChange}/>
            <label className="form-check-label" for="gridCheck">
              Featured
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </div>
      </form>
      </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-4">
          <h3 className="text-success">{status}</h3>
        </div>
      </div>
      </div>
    </>
  );
};

export default Add_Product;
