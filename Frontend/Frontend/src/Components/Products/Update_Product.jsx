import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';



const Update_Product = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [ft, setFt] = useState(true)
    const [pData, setPData] = useState({})
    const [status, setStatus] = useState()

    const updateProduct = async(data) => {
        const id = params.id
        try{
            let updatedData = await axios.patch(`http://localhost:5000/products/${id}`, data)
            setStatus("Product Updated Successfully🥳")
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
        updateProduct(pData)
    }

  return (
    <>
    <div className="container-fluid">
    <div className="row justify-content-center">
    <div className="col-6">
        <h1 className="text-center mt-2 mb-4">Update Product</h1>
      <form className="row g-3 addForm" onSubmit={sendData}>
        <div className="col-md-6">
          <label className="form-label">
            Name
          </label>
          <input type="text" className="form-control" pattern="^[a-zA-Z\s]+$" required name="Name" onChange={handleChange}/>
        </div>
        <div className="col-5">
          <label className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Rupees"
            required
            name="Price"
            onChange={handleChange}
            step="any"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">
            Rating
          </label>
          <input type="number" className="form-control" name="Rating" onChange={handleChange} min="1" max="5" step="any"/>
        </div>
        <div className="col-md-5">
          <label for="inputZip" className="form-label">
           Company
          </label>
          <input type="text" className="form-control" required name="Company" onChange={handleChange}/>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" name='Featured' type="checkbox" value={ft} onChange={handleChange}/>
            <label className="form-check-label" for="gridCheck">
              Featured
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update Product
          </button>
        </div>
      </form>
      </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-4">
          <h3 className="text-primary">{status}</h3>
        </div>
      </div>
      </div>
    </>
  )
}

export default Update_Product
