import { BuildForm } from "@/components/build-form";
import { PageHeader } from "@/components/page-header";
import {unstable_setRequestLocale} from 'next-intl/server';

export default function SubmitBuildPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader 
        title="Submit a New Build"
        description="Share your masterpiece with the Delta Force community. Fill out the details below."
      />
      <BuildForm />
    </div>
  )
}
