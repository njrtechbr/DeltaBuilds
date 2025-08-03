import { PageHeader } from "@/components/page-header";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { builds } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Check, Edit, Trash, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default async function AdminBuildsPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Admin');

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
                            <Badge variant={latestVersion.isValid ? 'default' : 'destructive'} className={latestVersion.isValid ? 'bg-green-600/20 text-green-400 border-green-600/30' : 'bg-red-600/20 text-red-400 border-red-600/30'}>
                                {latestVersion.isValid ? t('valid') : t('invalid')}
                            </Badge>
                        </TableCell>
                        <TableCell>{new Date(build.createdAt).toLocaleDateString(locale)}</TableCell>
                        <TableCell className="text-right">
                           <TooltipProvider>
                            <div className="flex items-center justify-end gap-2">
                                <Tooltip>
                                    <TooltipTrigger asChild><Button variant="ghost" size="icon"><Check className="w-4 h-4 text-green-500" /></Button></TooltipTrigger>
                                    <TooltipContent>{t('approve')}</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild><Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button></TooltipTrigger>
                                    <TooltipContent>{t('edit')}</TooltipContent>
                                </Tooltip>
                                 <Tooltip>
                                    <TooltipTrigger asChild><Button variant="ghost" size="icon"><Trash className="w-4 h-4 text-destructive" /></Button></TooltipTrigger>
                                    <TooltipContent>{t('delete')}</TooltipContent>
                                </Tooltip>
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
