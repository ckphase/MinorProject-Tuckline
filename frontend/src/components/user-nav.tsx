import { Loader2, LogOut, Settings, User } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { axios } from '@/lib/axios';
import { MeResponse } from '@/types';
import { Link } from 'react-router-dom';

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full'
        >
          AU
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
