import Input from "./Input.jsx";
import Button from "./Button.jsx";

const FormNewUser = ({onSubmit, onCancel, classList}) => {
  return (
    <form className={classList} onSubmit={onSubmit}>
      <Input required={true} inputID='name' label='Nombre' inputType='text' onChange={() => {}} />
      <Input required={true} inputID='lastName' label='Apellido' inputType='text' onChange={() => {}} />
      <Input required={true} inputID='email' label='Email' inputType='email' onChange={() => {}} />
      <Input required={true} inputID='password1' label='Contraseña' inputType='password' onChange={() => {}} />
      <Input required={true} inputID='password2' label='Repita Contraseña' inputType='password' onChange={() => {}} />
      <Button label='Guardar' name='save' type='submit' anotherClass='btn-primary m-1 btn-lg' styles={{width: '200px'}} onClick={() => {}} />
      <Button label='Cancelar' name='save' type='cancel' anotherClass='btn-secondary m-1 btn-lg' styles={{width: '200px'}} onClick={() => onCancel()} />
    </form>
  );
};

export default FormNewUser;
