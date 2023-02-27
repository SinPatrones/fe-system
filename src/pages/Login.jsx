import FormLogin from "../components/FormLogin.jsx";
import {useState} from "react";
import FormNewUser from "../components/FormNewUser.jsx";
import swal from 'sweetalert';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
  let navigate = useNavigate();

  const [creatingAccount, setCreatingAccount] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [signupForm, setSignupForm] = useState({
    name: '',
    lastname: '',
    email: '',
    password1: '',
    password2: '',
  })

  const fetchLogin = async () => {
    try {
      return await axios.post('http://localhost:3000/api/auth/login', loginForm);
    } catch (e) {
      return null;
    }
  };

  const fetchSignup = async () => {
    try {
      const data = {...signupForm};
      data.password = data.password1;
      delete data.password1;
      delete data.password2;

      return await axios.post('http://localhost:3000/api/user', data);
    } catch (e) {
      console.log({error: e});
      return null;
    }
  };

  const onChangeData = (evt) => {
    const {name, value} = evt.target;
    setLoginForm({
      ...loginForm,
      [name]: value
    });
  }

  const onChangeNewUserForm = (evt) => {
    console.log('editando', evt.target.name);
    const {name, value} = evt.target;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  }

  const onSubmitLogin = async (evt) => {
    evt.preventDefault();
    const data = await fetchLogin();
    if (!data) {
      return swal({
        title: 'No se pudo iniciar sesión',
        icon: 'warning'
      });
    }
    console.log('Redirigiendo...');
    return navigate('/client');
  }

  const onSubmitSignup = async (evt) => {
    evt.preventDefault();
    const newUser = await fetchSignup();
    if (!newUser){
      return swal({
        title: 'No se pudo registrar usuario',
        icon: 'warning'
      });
    }
    setCreatingAccount(false);
  }

  return (
    <div className='d-flex align-items-center flex-column'>
      {
        !creatingAccount && (
          <>
            <h2>Ingrese credenciales</h2>
            <FormLogin classList='text-center w-50' values={loginForm} onSubmit={onSubmitLogin}
                       onChangeData={onChangeData}/>
            <p className='mt-3'>¿Sin una cuenta?, creala <a href="#"
                                                            onClick={() => setCreatingAccount(true)}>aquí</a>.
            </p>
          </>
        )
      }

      {creatingAccount && (
        <>
          <h2>Registro</h2>
          <FormNewUser classList='w-50 text-center' value={signupForm} onChangeData={onChangeNewUserForm} onSubmit={onSubmitSignup} onCancel={() => setCreatingAccount(false)}/>
        </>
      )}
    </div>
  );
};

export default Login;
