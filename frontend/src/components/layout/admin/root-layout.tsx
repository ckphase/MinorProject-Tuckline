import { Outlet } from 'react-router-dom';

import { Appbar } from './appbar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';

export const AdminRootLayout = () => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <Appbar>
        <SidebarTrigger className='-ml-1' />
      </Appbar>
      <Outlet />
    </SidebarInset>
  </SidebarProvider>
);
