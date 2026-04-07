import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="container-shell py-16">
      <form onSubmit={submit} className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-premium space-y-4">
        <h1 className="font-serif text-3xl">Author Login</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input className="w-full border border-beige rounded-lg px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border border-beige rounded-lg px-4 py-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-charcoal text-ivory py-3 rounded-lg hover:bg-gold transition">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
