import Input from "./Input.jsx";
import Button from "./Button.jsx";

const FormNewUser = ({onSubmit, onCancel, value, onChangeData, classList}) => {
  return (
    <form className={classList} onSubmit={onSubmit}>
      <Input required={true} value={value.name} inputID='name' label='Nombre' inputType='text' onChange={onChangeData} />
      <Input required={true} value={value.lastname} inputID='lastname' label='Apellido' inputType='text' onChange={onChangeData} />
      <Input required={true} value={value.email} inputID='email' label='Email' inputType='email' onChange={onChangeData} />
      <Input required={true} value={value.password1} inputID='password1' label='Contraseña' inputType='password' onChange={onChangeData} />
      <Input required={true} value={value.password2} inputID='password2' label='Repita Contraseña' inputType='password' onChange={onChangeData} />
      <Button label='Guardar' name='save' type='submit' anotherClass='btn-primary m-1 btn-lg' styles={{width: '200px'}}/>
      <Button label='Cancelar' name='cancel' type='cancel' anotherClass='btn-secondary m-1 btn-lg' styles={{width: '200px'}} onClick={() => onCancel()} />
    </form>
  );
};

export default FormNewUser;
