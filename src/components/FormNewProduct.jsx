import Input from "./Input.jsx";

const FormNewProduct = ({classList, values, onChange}) => {

  return (
    <form className={classList}>
      <Input required={true} inputID='productName' value={values.productName} label='Nombre Producto' inputType='text' onChange={onChange} />
      <Input required={true} inputID='category' value={values.category} label='Categoría' inputType='text' onChange={onChange} />
      <Input required={true} inputID='expirationDate' value={values.expirationDate} label='Fecha de Expiración' inputType='date' onChange={onChange} />
      <Input required={true} inputID='stock' value={values.stock} label='Existencias' inputType='number' onChange={onChange} />
    </form>
  );
};

export default FormNewProduct;
