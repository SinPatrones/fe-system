import Input from "./Input.jsx";

const FormNewClient = ({classList, values, onChange}) => {

  return (
    <form className={classList}>
      <Input required={true} inputID='name' value={values.name} label='Nombre' inputType='text' onChange={onChange} />
      <Input required={true} inputID='lastName' value={values.lastName} label='Apellido' inputType='text' onChange={onChange} />
      <Input required={true} inputID='email' value={values.email} label='Email' inputType='email' onChange={onChange} />
      <Input required={true} inputID='address' value={values.address} label='Dirección' inputType='text' onChange={onChange} />
      <Input required={true} inputID='phone' value={values.phone} label='Teléfono' inputType='text' onChange={onChange} />
    </form>
  );
};

export default FormNewClient;
