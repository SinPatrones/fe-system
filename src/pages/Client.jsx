import ClientTable from "../components/ClientTable.jsx";
import {useEffect, useState} from "react";
import FormNewClient from "../components/FormNewClient.jsx";
import ModalContainer from "../components/ModalContainer.jsx";
import Button from "../components/Button.jsx";

const refreshData = [
  {
    clientId: 1,
    name: 'Armando',
    lastName: 'Hinojosa Ccama',
    email: 'armando@gmail.com',
    address: 'en su casa',
    phone: '+51997877168',
    createdAt: '12/12/2023'
  },
  {
    clientId: 2,
    name: 'Pepe',
    lastName: 'Casas Casas',
    email: 'ccpepe@gmail.com',
    address: 'en su casa',
    phone: '+51997877168',
    createdAt: '12/12/2023'
  },
  {
    clientId: 3,
    name: 'Luis',
    lastName: 'Rodriguez Mesa',
    email: 'rmesa@gmail.com',
    address: 'en su casa',
    phone: '+51997877168',
    createdAt: '12/12/2023'
  },
];

const Client = () => {
  const [clientsList, setClientsList] = useState([]);
  const [clientsListBackup, setClientsListBackup] = useState([]);
  const [toUpdateList, setToUpdateList] = useState(new Set());
  const [clientsFounded, setClientsFounded] = useState([]);
  const [inputSearchText, setInputSearchText] = useState('');
  const [tableEditMode, setTableEditMode] = useState(false);
  const [newClient, setNewClient] = useState({
    name: 'juan',
    lastName: '',
    email: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    fetchClientsList();
  }, []);

  const fetchClientsList = () => {
    setClientsList([...refreshData]);
  };

  const setNewClientData = (evt) => {
    const {value, name} = evt.target;
    setNewClient(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const searchByName = () => {
    const clients = clientsList.filter((item) => {
      if (item.name.toUpperCase().includes(inputSearchText.toUpperCase())) {
        return item;
      }
    });

    setClientsFounded([...clients]);
  };

  const editTableData = () => {
    if (tableEditMode) {
      setClientsList([...clientsListBackup]);
      setClientsListBackup([]);
      setToUpdateList(new Set());
      setTableEditMode(false);
    } else {
      setClientsListBackup([...clientsList.map(item => ({...item}))]);
      setTableEditMode(true);
    }
  }

  const onEditMode = (id, attribute, value) => {
    const idsToUpdate = toUpdateList;
    idsToUpdate.add(id);
    setToUpdateList(new Set(idsToUpdate));
    const editing = clientsList.filter(client => client.clientId === id)[0];
    editing[attribute] = value;
    setClientsList(
      [
        ...clientsList.map(client => {
          if (client.clientId === id) {
            return editing;
          }
          return client;
        })
      ]
    );
  };

  const saveTable = () => {
    setToUpdateList(new Set());
    setTableEditMode(false);
  }

  useEffect(() => {
    if (inputSearchText !== '') {
      searchByName();
    } else {
      setClientsFounded([]);
    }
  }, [inputSearchText]);

  return (
    <>
      <h2 className='text-center mb-4'>CLIENTES</h2>
      <div className="mb-3 row">
        <label htmlFor="searchClient" className="col-md-1 text-end">Buscar</label>
        <div className="col-md-5">
          <input type="text" className="form-control" id="searchClient" value={inputSearchText}
                 onChange={evt => setInputSearchText(evt.target.value)}/>
        </div>
        {
          !tableEditMode && (
            <button type="button" className="btn btn-success col-1" data-bs-toggle="modal"
                    data-bs-target="#createClient">
              Registrar
            </button>
          )
        }
        <Button anotherClass='btn-warning col-2' styles={{marginLeft: '4px'}}
                label={tableEditMode ? 'Cancelar' : 'Editar Tabla'}
                onClick={editTableData}/>
        {
          tableEditMode && (
            <Button anotherClass='btn-dark col-2' styles={{marginLeft: '4px'}}
                    label='Guardar'
                    onClick={saveTable}/>
          )
        }
      </div>
      <ClientTable items={clientsFounded.length > 0 ? clientsFounded : clientsList}
                   editMode={tableEditMode} onEditMode={onEditMode}/>
      <ModalContainer modalId='createClient' title='Crear Cliente'>
        <FormNewClient values={newClient} onChange={setNewClientData}/>
      </ModalContainer>
    </>
  );
};

export default Client;
