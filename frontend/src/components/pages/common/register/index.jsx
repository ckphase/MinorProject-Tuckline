import styles from './styles.module.css';

export const RegisterPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: e.target.role.value,
    };

    console.log(formData);
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
    >
      <input
        name='name'
        placeholder='Full Name'
        required
      />
      <input
        name='email'
        type='email'
        placeholder='Email'
        required
      />
      <input
        name='password'
        type='password'
        placeholder='Password'
        required
      />
      <select name='role'>
        <option value='customer'>Customer</option>
        <option value='admin'>Admin</option>
      </select>
      <button type='submit'>Register</button>
    </form>
  );
};
