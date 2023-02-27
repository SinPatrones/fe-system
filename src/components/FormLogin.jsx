import Input from "./Input.jsx";
import Button from "./Button.jsx";

const FormLogin = ({onSubmit, classList = ''}) => {

  return (
    <form className={classList} onSubmit={onSubmit}>
      <Input required={true} inputID='email' label='Email' inputType='email' onChange={() => {}} />
      <Input required={true} inputID='password1' label='Contraseña' inputType='password' onChange={() => {}} />
      <Button label='Guardar' name='save' type='submit' anotherClass='btn-primary btn-block' onClick={() => {}} />
    </form>
  );
};

export default FormLogin;
