import ClientForm from './components/ClientForm'
import { Route, Routes } from 'react-router-dom'
import ClientList from './components/ClientList'
import OrderList from './components/OrderList'
import OrderForm from './components/OrderForm'

function App() {
 

  return (
    <Routes>
      <Route path="/client-add" element={<ClientForm/>}/>
      <Route path="/client-list" element={<ClientList/>}/>
      <Route path="/client-edit/:id" element={<ClientForm/>}/>
      <Route path="/client/:id/order-add" element={<OrderForm/>}/>
       <Route path="/client/:id/order-edit/:orderId" element={<OrderForm/>}/>
       <Route path="/client/:id/order-list" element={<OrderList/>}/>
    </Routes>
  )
}

export default App
