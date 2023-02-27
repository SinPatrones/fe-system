import Button from "./Button.jsx";
import {BsEraserFill} from 'react-icons/bs';
import swal from 'sweetalert';
import InputEditMode from "./InputEditMode.jsx";

const ClientTable = ({items, editMode = false, onEditMode}) => {

  const onRemove = () => {
    swal({
      title: 'Borrar Cliente',
      text: '¿Desea borrar el cliente seleecionado?',
      icon: 'warning',
      buttons: ['No', 'Si']
    })
      .then(answer => {
        if (answer) {
          swal({
            text: 'Cliente borrado con éxito'
          });
        }
      });
  };

  return (
    <>
      {editMode && (
        <div className="alert alert-danger w-50 text-center m-auto" role="alert">
          Ha entrado en modo edición de datos
        </div>
      )}
      <table className="table table-hover table-striped">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Correo</th>
          <th scope="col">Dirección</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Fecha Registro</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {
          items.map((item, idx) => {
            return (
              <tr key={`tbl-${item.clientId}`} id={item.clientId}>
                <th scope="row">{idx + 1}</th>
                <td>
                  {!editMode && item.name}
                  {editMode && <InputEditMode value={item.name} onChange={(evt) => onEditMode(item.clientId, 'name', evt.target.value)} /> }
                </td>
                <td>
                  {!editMode && item.lastName}
                  {editMode && <InputEditMode value={item.lastName} onChange={(evt) => onEditMode(item.clientId, 'lastName', evt.target.value)} />}
                </td>
                <td>
                  {!editMode && item.email}
                  {editMode && <InputEditMode value={item.email} onChange={(evt) => onEditMode(item.clientId, 'email', evt.target.value)} />}
                </td>
                <td>
                  {!editMode && item.address}
                  {editMode && <InputEditMode value={item.address} onChange={(evt) => onEditMode(item.clientId, 'address', evt.target.value)} />}
                </td>
                <td>
                  {!editMode && item.phone}
                  {editMode && <InputEditMode value={item.phone} onChange={(evt) => onEditMode(item.clientId, 'phone', evt.target.value)} />}
                </td>
                <td>
                  {item.createdAt}
                </td>
                {
                  !editMode && (<td>
                    <Button label={<BsEraserFill/>} anotherClass='btn-danger'
                            onClick={onRemove}/>
                  </td>)}
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </>
  );
};

export default ClientTable;
