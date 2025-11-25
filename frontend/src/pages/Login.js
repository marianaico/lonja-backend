/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await client.post('/auth/login', values);
      // Guardamos el token en localStorage
      localStorage.setItem('token', data.token);
      // Redirigimos al dashboard usando React Router
      navigate('/');
    } catch (e) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h3>Ingreso</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register('email', { required: true })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            {...register('password', { required: true })}
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
