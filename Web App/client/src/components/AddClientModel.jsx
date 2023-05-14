import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { ADD_CLIENTS } from '../mutations/ClientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

function AddClientModel () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [[phone], setPhone] = useState('');
  const [addClient] = useMutation(ADD_CLIENTS,{
    variables: {name,email,phone},

    update(cache, {data: {addClient}}) {
        const {clients} = cache.readQuery({
            query:GET_CLIENTS
        });
        cache.writeQuery({
            query: GET_CLIENTS,
            data: {clients: [...clients, addClient]}
        })
    } 
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name,email,phone);

    if(name=== '' || email === '', phone === '') {
        return alert("Please fill all fields");
    }
    addClient(name,email,phone);
    
    setName('');
    setEmail('');
    setPhone('')
  }
  return (
    <>
      <button
        type='button'
        className='btn btn-secondary'
        data-bs-toggle='modal'
        data-bs-target='#addClientModel'
      >
        <div className="d-flex align-item-center">
            <FaUser className='icon' />
            <div>Add Client</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addClientModel'
        tabIndex='-1'
        aria-labelledby='addClientModelLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='addClientModelLabel'>
                Add Client
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Name</label>
                    <input type="text" className="form-control" id='name' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Email</label>
                    <input type="text" className="form-control" id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Phone</label>
                    <input type="numeric" className="form-control" id='phone' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <button className="btn btn-secondary" data-bs-dismiss='modal' onSubmit={onSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddClientModel
