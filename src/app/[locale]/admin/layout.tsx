
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';
import { LayoutDashboard, ShieldAlert, Swords, Search, LogOut, User as UserIcon, Users } from 'lucide-react';
import { users as allUsers } from '@/lib/data';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@/navigation';

function AdminSidebar() {
    const pathname = usePathname();
    const t = useTranslations('Admin');

    const menuItems = [
        { href: '/admin/dashboard', label: t('dashboard'), icon: LayoutDashboard },
        { href: '/admin/builds', label: t('builds'), icon: Swords },
        { href: '/admin/users', label: t('users'), icon: Users },
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
                            <SidebarMenuButton href={item.href} isActive={pathname.startsWith(item.href)} tooltip={item.label}>
                                <item.icon />
                                <span>{item.label}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                 </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = allUsers[0]; // Fake user
  if (currentUser.role !== 'admin') {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <p>Access Denied</p>
        </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AdminSidebar />
        <div className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <SidebarTrigger className="sm:hidden" />
                
                <div className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    />
                </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                            <Avatar>
                                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/profile/${currentUser.name}`}><UserIcon className="mr-2 h-4 w-4" /> Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><LogOut className="mr-2 h-4 w-4"/> Sign Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
