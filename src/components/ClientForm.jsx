import { useEffect, useState } from "react"
import { createClient, getClientById, updateClient } from "../services/ClientService";
import { useNavigate, useParams } from "react-router-dom";


function ClientForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function setForm() {
            try {
                if(id) {
                    const client = await getClientById(id);
                    setName(client.name);
                    setPhone(client.phone);
                    setEmail(client.email);
                    setPassword(client.password);
                    setIsAdmin(client.isAdmin);
                }
            } catch (error) {
                console.log("Error")
            }
        }

        setForm();
    }, [id]);

    const handle = async (event) => {
        event.preventDefault();
        const data = {name, phone, email, password, isAdmin};
        if(id){
            await updateClient(id, data);
        } else {
            await createClient(data);
        }        
        navigate("/");
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handle}>
                <div className="mb-2">
                <label>Name:</label>
                <input className="form-control" type="text" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                <label>Phone:</label>
                <input className="form-control" type="text" value={phone} onChange={e => setPhone(e.target.value)}/>
                </div>
                <div>
                <label>Email:</label>
                <input className="form-control" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                <label>Password:</label>
                <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>         
                <div>
                <label>IsAdmin:</label>
                <input className="form-check" type="checkbox" value={isAdmin} onChange={e => setIsAdmin(e.target.checked)}/>
                </div>   
                <button className="btn btn-primary" type="submit">{id ? 'Update' : 'Add' }</button>  
            </form>
        </div>
    )


}

export default ClientForm