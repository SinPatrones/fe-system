import Button from "./Button.jsx";
import {BsEraserFill, BsPencil} from 'react-icons/bs';
import {AiOutlineClose, AiOutlineSave} from 'react-icons/ai';
import swal from 'sweetalert';
import InputEditMode from "./InputEditMode.jsx";
import formatDate from "../libs/formatedDate.js";

const ProductsTable = ({
                         items,
                         onEditClick,
                         onEditMode,
                         editMode,
                         valuesToEdit,
                         cancelEdition,
                         fetchRemoveProduct,
                         fetchSaveNewData
                       }) => {

  const onRemove = (productId) => {
    swal({
      title: 'Borrar Cliente',
      text: `¿Desea borrar el Producto con ID <${productId}>?`,
      icon: 'warning',
      buttons: ['No', 'Si']
    })
      .then(answer => {
        if (answer) {
          fetchRemoveProduct(productId)
          swal({
            text: 'Producto borrado con éxito'
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
          <th scope="col">Nombre Producto</th>
          <th scope="col">Categoria</th>
          <th scope="col">Fecha Expiración</th>
          <th scope="col">Existencias</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {
          items.map((item, idx) => {
            return (
              <tr key={`tbl-${item.productId}`} id={item.productId}>
                <th scope="row">{idx + 1}</th>
                <td>
                  {(editMode !== item.productId) && item.productName}
                  {(editMode === item.productId) &&
                    <InputEditMode value={valuesToEdit.productName}
                                   onChange={(evt) => onEditMode(item.productId, 'productName', evt.target.value)}/>}
                </td>
                <td>
                  {(editMode !== item.productId) && item.category}
                  {(editMode === item.productId) &&
                    <InputEditMode value={valuesToEdit.category}
                                   onChange={(evt) => onEditMode(item.productId, 'category', evt.target.value)}/>}
                </td>
                <td>
                  {(editMode !== item.productId) && formatDate(item.expirationDate)}
                  {(editMode === item.productId) &&
                    <InputEditMode value={formatDate(valuesToEdit.expirationDate, true)}
                                   onChange={(evt) => onEditMode(item.productId, 'expirationDate', evt.target.value)}
                                   type={'date'}/>}
                </td>
                <td>
                  {(editMode !== item.productId) && item.stock}
                  {(editMode === item.productId) && <InputEditMode value={valuesToEdit.stock}
                                                                   onChange={(evt) => onEditMode(item.productId, 'stock', evt.target.value)}/>}
                </td>

                <td>
                  {!editMode && <Button label={<BsEraserFill/>} anotherClass='btn-danger'
                                        onClick={() => onRemove(item.productId)}/>}
                  {
                    !editMode && <Button label={<BsPencil/>} anotherClass='btn-success'
                                         styles={{marginLeft: '4px'}}
                                         onClick={() => onEditClick(item.productId)}/>
                  }
                  {(editMode && editMode === item.productId) && <Button label={<AiOutlineClose/>} anotherClass='btn-warning'
                                       styles={{marginLeft: '4px'}}
                                       onClick={cancelEdition}/>}
                  {(editMode && editMode === item.productId) && <Button label={<AiOutlineSave/>} anotherClass='btn-success'
                                       styles={{marginLeft: '4px'}}
                                       onClick={fetchSaveNewData}/>}
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </>
  );
};

export default ProductsTable;
