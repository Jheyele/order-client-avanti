import { useEffect, useState } from "react"
import { deleteClientById, getClients } from "../services/ClientService";
import { useNavigate } from "react-router-dom";


function ClientList() {

    const [clients, setClients] = useState([]);
    const [clientsRender, setClientsRender] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    async function getAllClients() {
        try {
            const data = await getClients();
            setClients(data);
            setClientsRender(data);
        } catch {
            console.error("Error getClients")
        }
    }

    useEffect(() => {
        getAllClients();
    },[]);

    useEffect(() => {
      const filtered = clients.filter((client) =>
        Object.values(client).some((value) =>
          value.toString().toLowerCase().includes(search.toLowerCase())
        )
      );  
      setClientsRender(filtered)
    },[search])

    const deleteClient = async (id) => {
      try {
          await deleteClientById(id);
          getAllClients();
      } catch {
          console.error("Error deleteClient")
      }
    }

    const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearch(value);
      if (value === "") {
        getClients();
        setClientsRender(clients)
      }
    };

    return (
    <div className="container mt-4">
      <h2>Client List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <button 
        className="btn btn-success btn-sm mb-3"
        onClick={() => navigate(`/client-add`)}
        >
          +
      </button>
      <ul className="list-group">
        {clientsRender.map(client => (
          <li key={client.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-0">{client.name}</h4>
              <p className="mb-0">E-mail: {client.email}</p>
              <p className="mb-0">Phone: {client.phone}</p>
              <p className="mb-0">{client.isAdmin ? 'Admin' : 'User'}</p>
            </div>
            <div>
            <button className="btn btn-success btn-m me-2" onClick={() => navigate(`/client/${client.id}/order-list`)}> Orders </button>
            <button className="btn btn-primary btn-m me-2" onClick={() => navigate(`/client-edit/${client.id}`)}> Edit </button>
            <button className="btn btn-danger" onClick={() => deleteClient(client.id)}> Delete </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    )

}

export default ClientList