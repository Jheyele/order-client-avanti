import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { createClient, getClientById, updateClient } from '../services/ClientService';
import { createOrder, getOrderById, updateOrder } from '../services/OrderService';

function OrderForm() {

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const { id, orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function setForm(){
        if(orderId) {
            try{
                const order = await getOrderById(orderId);
                setDescription(order.description);
                setPrice(order.price);
            } catch (error) {
                console.log("Error")
            } 
        }
    }

    setForm()    
  },[id]);

  const handle = async (event) => {
        event.preventDefault();
        try{
            const data = { description, price, clientId: id }
            if(orderId){
                await updateOrder(orderId, data);
            } else {
                await createOrder(data);
            }
           navigate(`/client/${id}/order-list`);
        } catch (error) {
            console.log("Error");
        } 
  }


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
          <form onSubmit={handle}>
            <div className="mb-2">
              <label className="form-label"> Description: </label>
              <input 
                className="form-control"
                type="text" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"> Price: </label>
              <input
                className="form-control" 
                type="number" 
                value={price} 
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">{orderId ? 'Update' : 'Add'}</button>
          </form>
    </div>
  )
}

export default OrderForm
