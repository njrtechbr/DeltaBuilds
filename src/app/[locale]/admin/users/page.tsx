
'use client';

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { User } from "@/lib/types";
import { users as initialUsers } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ShieldCheck, UserCog, UserX, ShieldBan } from "lucide-react";


export default function AdminUsersPage() {
  const t = useTranslations('Admin');
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleSetRole = (userId: string, role: 'admin' | 'user') => {
    setUsers(currentUsers =>
      currentUsers.map(user =>
        user.id === userId ? { ...user, role } : user
      )
    );
    const updatedUser = users.find(u => u.id === userId);
    if (updatedUser) {
        toast({
            title: "Role Changed",
            description: t('roleChangedToast', { username: updatedUser.name, role: role === 'admin' ? t('roleAdmin') : t('roleUser') }),
        });
    }
  };

  const handleSetStatus = (userId: string, status: 'active' | 'banned') => {
    setUsers(currentUsers =>
      currentUsers.map(user =>
        user.id === userId ? { ...user, status } : user
      )
    );
     const updatedUser = users.find(u => u.id === userId);
     if (updatedUser) {
        toast({
            title: status === 'banned' ? "User Banned" : "User Unbanned",
            description: status === 'banned' ? t('userBannedToast', { username: updatedUser.name }) : t('userUnbannedToast', { username: updatedUser.name }),
        });
     }
  };

  const getStatusBadge = (status: 'active' | 'banned') => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-600/20 text-green-400 border-green-600/30">{t('statusActive')}</Badge>
      case 'banned':
        return <Badge variant="destructive" className="bg-red-600/20 text-red-400 border-red-600/30">{t('statusBanned')}</Badge>
    }
  }

  const getRoleBadge = (role: 'admin' | 'user') => {
    switch (role) {
      case 'admin':
        return <Badge variant="secondary" className="bg-purple-600/20 text-purple-400 border-purple-600/30">{t('roleAdmin')}</Badge>
      case 'user':
        return <Badge variant="outline">{t('roleUser')}</Badge>
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('usersManagementTitle')}</CardTitle>
          <CardDescription>{t('usersManagementDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('user')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('reputation')}</TableHead>
                <TableHead>{t('role')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>{user.reputation}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleSetRole(user.id, 'admin')} disabled={user.role === 'admin'}>
                          <ShieldCheck className="mr-2 h-4 w-4" />
                          {t('makeAdmin')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSetRole(user.id, 'user')} disabled={user.role === 'user'}>
                          <UserCog className="mr-2 h-4 w-4" />
                          {t('makeUser')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleSetStatus(user.id, 'banned')} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                            <UserX className="mr-2 h-4 w-4" />
                            {t('ban')}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleSetStatus(user.id, 'active')}>
                            <ShieldBan className="mr-2 h-4 w-4" />
                            {t('unban')}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
