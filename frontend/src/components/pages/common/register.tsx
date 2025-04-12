import { Input } from '../../ui/input';

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
    <div className='p-4'>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <Input
          name='name'
          placeholder='Full Name'
          required
        />

        <Input
          name='email'
          type='email'
          placeholder='Email'
          required
        />
        <Input
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
    </div>
  );
};
