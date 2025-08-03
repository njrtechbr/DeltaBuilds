
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';
import { LayoutDashboard, ShieldAlert, Swords } from 'lucide-react';
import { users } from '@/lib/data';

function AdminSidebar() {
    const pathname = usePathname();
    const t = useTranslations('Admin');

    const menuItems = [
        { href: '/admin/dashboard', label: t('dashboard'), icon: LayoutDashboard },
        { href: '/admin/builds', label: t('builds'), icon: Swords },
        { href: '/admin/reports', label: t('reports'), icon: ShieldAlert },
    ];
    
    return (
        <Sidebar>
            <SidebarHeader>
                 <Logo />
            </SidebarHeader>
            <SidebarContent>
                 <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton href={item.href} isActive={pathname === item.href}>
                                <item.icon />
                                {item.label}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                 </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                {/* Footer content if needed */}
            </SidebarFooter>
        </Sidebar>
    )
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = users[0]; // Fake user
  if (currentUser.role !== 'admin') {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <p>Access Denied</p>
        </div>
    );
  }

  return (
    <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
            <header className="flex h-14 items-center justify-between border-b bg-card px-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold">Admin Panel</h1>
                <Avatar>
                    <AvatarImage src={currentUser.avatarUrl} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </header>
            <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
    </SidebarProvider>
  );
}
