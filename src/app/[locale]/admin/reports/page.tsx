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
import { reportedCodes } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default async function AdminReportsPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Admin');

  return (
    <div className="space-y-8">
      <PageHeader title={t('reportsManagementTitle')} description={t('reportsManagementDescription')} />
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('reportedCode')}</TableHead>
              <TableHead>{t('platform')}</TableHead>
              <TableHead>{t('buildName')}</TableHead>
              <TableHead>{t('reporter')}</TableHead>
              <TableHead>{t('reportedAt')}</TableHead>
              <TableHead className="text-right">{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportedCodes.map((report, index) => (
                <TableRow key={index}>
                    <TableCell className="font-mono text-xs">{report.code}</TableCell>
                    <TableCell>{report.platform}</TableCell>
                    <TableCell>{report.buildId}</TableCell>
                    <TableCell>{report.reporter.name}</TableCell>
                    <TableCell>{new Date(report.reportedAt).toLocaleDateString(locale)}</TableCell>
                    <TableCell className="text-right">
                       <TooltipProvider>
                        <div className="flex items-center justify-end gap-2">
                            <Tooltip>
                                <TooltipTrigger asChild><Button variant="outline" size="sm"><Check className="w-4 h-4 mr-2 text-green-500" />{t('markValid')}</Button></TooltipTrigger>
                                <TooltipContent>Mark this code as functional.</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild><Button variant="outline" size="sm"><X className="w-4 h-4 mr-2 text-red-500" />{t('markInvalid')}</Button></TooltipTrigger>
                                <TooltipContent>Mark this code as non-functional.</TooltipContent>
                            </Tooltip>
                        </div>
                       </TooltipProvider>
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
