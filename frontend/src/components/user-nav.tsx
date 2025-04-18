import { axios } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { useOrderStore } from '@/lib/store/order-store';
import { MeResponse } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, LogOut, Settings, ShoppingCart, User } from 'lucide-react';
import { ComponentProps } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cart } from './cart';
import { Button, buttonVariants } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner';

export const UserNav = () => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.me],
    queryFn: () => axios.get<MeResponse>('/me').then((res) => res.data),
  });

  if (isLoading) {
    return <Loader2 className='animate-spin' />;
  }

  if (!data) {
    return (
      <div className='space-x-2'>
        <Link
          to='/login'
          className={buttonVariants()}
        >
          Login
        </Link>
        <Link
          to='/register'
          className={buttonVariants({ variant: 'secondary' })}
        >
          Register
        </Link>
      </div>
    );
  }

  const initials = data.user.name
    ?.split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase();

  const isAdmin = data.user.role === 'admin';

  return (
    <div className='flex items-center gap-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full'
          >
            {initials}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-56'
          align='end'
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>
              <User />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {isAdmin ? null : (
            <>
              <DropdownMenuItem asChild>
                <Link
                  to='/orders'
                  className='flex w-full items-center justify-start'
                >
                  <ShoppingCart />
                  <span>Orders</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            asChild
            className='w-full justify-start'
          >
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isAdmin ? null : <Cart />}
    </div>
  );
};

const LogoutButton = (props: ComponentProps<'button'>) => {
  const navigate = useNavigate();
  const { clearCart } = useOrderStore();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => axios.post('/auth/logout').then(() => {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.me] });
      toast.success('Successfully logged out');
      clearCart();
      navigate('/login');
    },
  });

  return (
    <Button
      {...props}
      variant='ghost'
      onClick={() => mutate()}
    >
      {isPending ? <Loader2 className='animate-spin' /> : <LogOut />}
      <span>Log out</span>
    </Button>
  );
};
