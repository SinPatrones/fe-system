import ClientTable from "../components/ClientTable.jsx";
import {useEffect, useState} from "react";
import FormNewClient from "../components/FormNewClient.jsx";
import ModalContainer from "../components/ModalContainer.jsx";
import Button from "../components/Button.jsx";
import ModalButton from "../components/ModalButton.jsx";

import axios from "axios";
import swal from "sweetalert";

import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  extraHeaders: {
    channel: 'client'
  }
});

const Client = () => {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
  const [clientsList, setClientsList] = useState([]);
  const [clientsListBackup, setClientsListBackup] = useState([]);
  const [toUpdateList, setToUpdateList] = useState(new Set());
  const [clientsFounded, setClientsFounded] = useState([]);
  const [inputSearchText, setInputSearchText] = useState('');
  const [tableEditMode, setTableEditMode] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    fetchClientsList();
  }, []);

  const fetchClientsList = async () => {
    try {
      const fetchClientsList = await axios.get('http://localhost:3000/api/client');
      setClientsList([...fetchClientsList.data.body]);
    } catch (e) {
      console.log({error: e})
      return swal({
        text: 'Error al cargar lista de clientes',
        icon: 'warning',
      });
    }
  };

  const fetchCreateClient = async () => {
    try {
      return await axios.post('http://localhost:3000/api/client', newClient);
    } catch (e) {
      console.log({error: e});
      return null;
    }
  }

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

  const onSubmitNewClient = async () => {
    const newClientCreated = await fetchCreateClient();
    if (!newClientCreated) {
      return swal({
        text: 'No se pudo crear nuevo cliente',
        icon: 'warning',
      });
    }

  }

  useEffect(() => {
    if (inputSearchText !== '') {
      searchByName();
    } else {
      setClientsFounded([]);
    }
  }, [inputSearchText]);

  useEffect(() => {
    socket.on('connect', () => {
      setSocketIsConnected(true);
    });

    socket.on('disconnect', () => {
      setSocketIsConnected(false);
    });

    socket.on('client', (data) => {
      fetchClientsList();
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('client');
    };
  }, []);

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
            <ModalButton label='Registrar' modalId='createClient' classList='btn-primary col-1'/>
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
      <ModalContainer modalId='createClient' title='Crear Cliente'
                      onSubmit={onSubmitNewClient}>
        <FormNewClient values={newClient} onChange={setNewClientData}/>
      </ModalContainer>
    </>
  );
};

export default Client;
