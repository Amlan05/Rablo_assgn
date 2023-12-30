import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Components.css";
import { useNavigate } from "react-router";

const Prdt_main = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [highPrice, setHighPrice] = useState();
  const [lowPrice, setLowPrice] = useState();

  const fetchProducts = async () => {
    const allPrdts = await axios.get("http://localhost:5000/products");
    let getProducts = allPrdts.data;
    setItems(getProducts.products);
    console.log(items);
  };

  const deletePdt = async (id) => {
    try {
      let deletedPrdt = await axios.delete(
        `http://localhost:5000/products/${id}`
      );
      fetchProducts();
      console.log("deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const ftProduct = async () => {
    try {
      let fp = await axios.get("http://localhost:5000/products/ft");
      setItems(fp.data.ftPrdt);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHigh = async (e) => {
    e.preventDefault()
    try {
      let pHigh = await axios.post("http://localhost:5000/products/above", {"highPrice" : highPrice});
      setItems(pHigh.data)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLow = async (e) => {
    e.preventDefault()
    try {
      let pLow = await axios.post("http://localhost:5000/products/below", {"lowPrice" :lowPrice});
      setItems(pLow.data)
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObject.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const updateProduct = (ID) => {
    navigate(`/update/${ID}`);
    console.log(ID);
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
   
    <>
     {localStorage.getItem("userId") ? 
      <div className="container-fluid">
        <div className="row justify-content-evenly">
          <div className=" col-sm-6 btns">
            <form className="d-flex low" role="search" onSubmit={fetchHigh}>
              <input
                className="form-control me-2"
                type="number"
                min={50}
                max={10000}
                required
                placeholder="Show Products Above ₹"
                aria-label="Search"
                onChange={(e) => setHighPrice(e.target.value)}
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> 
          </div>
          <div className="col-sm-6 btns">
            <form className="d-flex high" onSubmit={fetchLow}>
              <input
                className="form-control me-2"
                type="number"
                min={50}
                max={10000}
                required
                placeholder="Show Products Below ₹"
                onChange={(e) => setLowPrice(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="col-sm-6 btns">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => ftProduct()}
            >
              Show Featured Products
            </button>
          </div>
          <div className="col-sm-6 btns">
            <button
              type="button"
              class="btn btn-success"
              onClick={() => navigate("/addform")}
            >
              Add New Product
            </button>
          </div>
        </div>
        <div className="row mt-5 justify-content-evenly">
          {items &&
            items.map((ele) => {
              return (
                <>
                  <div className="col-lg-3 mt-2 mb-2">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{ele.Name}</h5>
                        <p className="card-text">Product Id:{ele.Product_ID}</p>
                        <p className="card-text">COMPANY:{ele.Company}</p>
                        <p className="card-text">Price:{ele.Price}</p>
                        <p className="card-text">
                          Featured:{ele.Featured ? "Yes" : "No"}
                        </p>
                        <p className="card-text">
                          Manufactured:{formatDate(ele.Created_At)}
                        </p>
                        <p className="card-text">Rating:{ele.Rating}</p>
                        <div className="btn">
                          <a
                            className="btn btn-danger"
                            onClick={() => deletePdt(ele.Product_ID)}
                          >
                            Delete Item
                          </a>
                          <a
                            className="btn btn-secondary"
                            onClick={() => updateProduct(ele.Product_ID)}
                          >
                            Update Item
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
     : navigate('/auth')}
     </>
  );
};

export default Prdt_main;
