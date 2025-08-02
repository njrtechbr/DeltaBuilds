import { BuildForm } from "@/components/build-form";
import { PageHeader } from "@/components/page-header";

export default function SubmitBuildPage() {
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
