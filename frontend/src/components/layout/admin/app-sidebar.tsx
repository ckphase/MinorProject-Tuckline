import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Home, Layers, ShoppingBag, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const navigationLinks = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: Home,
    disabled: false,
  },
  {
    label: 'Products',
    href: '/admin/products',
    icon: Layers,
    disabled: true,
  },
  {
    label: 'Orders',
    href: '/admin/orders',
    icon: ShoppingBag,
    disabled: false,
  },
  {
    label: 'Customers',
    href: '/admin/customers',
    icon: Users,
    disabled: true,
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className='border-b border-border min-h-[69px]'></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {navigationLinks.map((link) => (
            <SidebarMenuButton
              asChild
              className={cn('text-md', {
                'opacity-50 pointer-events-none': link.disabled,
              })}
              size='lg'
              key={link.label}
              disabled={link.disabled}
            >
              <Link to={link.href}>
                <link.icon />
                {link.label}
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
