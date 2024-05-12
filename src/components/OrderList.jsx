import { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import { getClientById } from '../services/ClientService';
import {  deleteOrderById } from '../services/OrderService';

function OrderList() {

  const [orders, setOrders] = useState([]);
  const [ordersRender, setOrdersRender] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  async function getOrdersByClientId(){
    try{
        const response = await getClientById(id);
        setOrders(response.order);
        setOrdersRender(response.order);
    } catch (error) {
        console.log("Error")
    } 
  }

  useEffect(() => {
    getOrdersByClientId()    
  },[]);

  useEffect(() => {
    const filtered = orders.filter((order) =>
            order.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
      setOrdersRender(filtered);
  },[searchTerm]);

  const deleteOrder = async (id) => {
    try{
        await deleteOrderById(id);
        getOrdersByClientId()
    } catch (error) {
        console.log("Error")
    } 
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      getOrdersByClientId();
      setOrdersRender(orders)
    }
  };
  
  return (
    <div className="container mt-4">
      <h2>Order List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <button 
        className="btn btn-success mb-3"
        onClick={() => navigate(`/client/${id}/order-add`)}
      >
        +
      </button>
      <ul className="list-group">
        {ordersRender.map(order => (
          <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">{order.description}</h5>
              <p className="mb-0">{order.price}</p>
            </div>
            <div>
              <button 
                className="btn btn-primary btn-sm me-2"
                onClick={() => navigate(`/client/${id}/order-edit/${order.id}`)}
              >
                Edit
              </button>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => deleteOrder(order.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OrderList
