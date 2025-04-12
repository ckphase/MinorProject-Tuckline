import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const LoginPage = () => {
  // @ts-expect-error will add types later
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log(formData);
  };

  return (
    <div className='container flex items-center justify-center h-screen'>
      <form
        className='max-w-sm w-full flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <Label>Email</Label>
        <Input
          name='email'
          type='email'
          placeholder='Email'
          required
        />

        <Label>Password</Label>
        <Input
          name='password'
          type='password'
          placeholder='Password'
          required
        />

        <Button type='submit'>Login</Button>
      </form>
    </div>
  );
};
