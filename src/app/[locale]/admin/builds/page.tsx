'use client';

import { PageHeader } from "@/components/page-header";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { builds as initialBuilds } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Check, Edit, Trash, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react";
import type { Build } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useToast } from "@/hooks/use-toast";


export default function AdminBuildsPage() {
  const t = useTranslations('Admin');
  const { toast } = useToast();
  const [builds, setBuilds] = useState<Build[]>(initialBuilds);
  
  const toggleApproval = (buildId: string) => {
    setBuilds(currentBuilds => 
      currentBuilds.map(build => {
        if (build.id === buildId) {
          const latestVersion = build.versions[0];
          const updatedVersion = { ...latestVersion, isValid: !latestVersion.isValid };
          const updatedVersions = [updatedVersion, ...build.versions.slice(1)];
          return { ...build, versions: updatedVersions };
        }
        return build;
      })
    );
  };

  const deleteBuild = (buildId: string) => {
    setBuilds(currentBuilds => currentBuilds.filter(build => build.id !== buildId));
    toast({
        title: "Build Deleted",
        description: "The build has been successfully deleted.",
    });
  }


  return (
    <div className="space-y-8">
      <PageHeader title={t('buildsManagementTitle')} description={t('buildsManagementDescription')} />
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('buildName')}</TableHead>
              <TableHead>{t('author')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('createdAt')}</TableHead>
              <TableHead className="text-right">{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {builds.map((build) => {
                const latestVersion = build.versions[0];
                return (
                    <TableRow key={build.id}>
                        <TableCell className="font-medium">{build.name}</TableCell>
                        <TableCell>{build.author.name}</TableCell>
                        <TableCell>
                            <Badge variant={latestVersion.isValid ? 'default' : 'destructive'} className={cn(latestVersion.isValid ? 'bg-green-600/20 text-green-400 border-green-600/30' : 'bg-red-600/20 text-red-400 border-red-600/30')}>
                                {latestVersion.isValid ? "Valid" : "Invalid"}
                            </Badge>
                        </TableCell>
                        <TableCell>{new Date(build.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                           <TooltipProvider>
                            <div className="flex items-center justify-end gap-2">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => toggleApproval(build.id)}>
                                            {latestVersion.isValid ? <X className="w-4 h-4 text-red-500" /> : <Check className="w-4 h-4 text-green-500" />}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>{latestVersion.isValid ? t('markInvalid') : t('approve')}</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link href={{ pathname: '/submit', query: { buildId: build.id } }} className={cn(buttonVariants({variant: 'ghost', size: 'icon'}))}>
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>{t('edit')}</TooltipContent>
                                </Tooltip>
                                 <AlertDialog>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon"><Trash className="w-4 h-4 text-destructive" /></Button>
                                            </AlertDialogTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>{t('delete')}</TooltipContent>
                                    </Tooltip>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Delete {build.name}?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this build? This action cannot be undone.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteBuild(build.id)} className={cn(buttonVariants({variant: 'destructive'}))}>
                                            Yes, Delete
                                        </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                           </TooltipProvider>
                        </TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
