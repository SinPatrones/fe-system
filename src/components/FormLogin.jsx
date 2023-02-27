import Input from "./Input.jsx";
import Button from "./Button.jsx";

const FormLogin = ({onSubmit, values, onChangeData, classList = ''}) => {

  return (
    <form className={classList} onSubmit={onSubmit}>
      <Input required={true} inputID='email' value={values.email} label='Email' inputType='email' onChange={onChangeData} />
      <Input required={true} inputID='password' value={values.password} label='Contraseña' inputType='password' onChange={onChangeData} />
      <Button label='Ingresar' name='login' type='submit' anotherClass='btn-primary btn-block' />
    </form>
  );
};

export default FormLogin;
