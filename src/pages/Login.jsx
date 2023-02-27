import FormLogin from "../components/FormLogin.jsx";
import {useState} from "react";
import FormNewUser from "../components/FormNewUser.jsx";

const Login = () => {
  const [creatingAccount, setCreatingAccount] = useState(false);


  return (
    <div className='d-flex align-items-center flex-column'>
      {
        !creatingAccount && (
          <>
            <h2>Ingrese credenciales</h2>
            <FormLogin classList='text-center w-50' onSubmit={() => {}} />
            <p className='mt-3'>¿Sin una cuenta?, creala <a href="#" onClick={() => setCreatingAccount(true)}>aquí</a>.</p>
          </>
        )
      }

      { creatingAccount && (
        <>
          <h2>Registro</h2>
          <FormNewUser classList='w-50 text-center' onSubmit={() => {}} onCancel={() => setCreatingAccount(false)}/>
        </>
      )}
    </div>
  );
};

export default Login;
