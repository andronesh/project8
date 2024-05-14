import LoadingSpinner from "@/components/common/LoadingSpinner";
import IssueEditForm from "@/components/issue/IssueEditForm";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default async function BookModal({
  params,
}: {
  params: { issueId: string };
}) {
  const router = useRouter();

  return (
    <Suspense
      fallback={
        <div className="flex p-6 justify-around">
          <LoadingSpinner className="w-16 h-16" />
        </div>
      }
    >
      <IssueEditForm
        // project={project}
        // issue={selectedIssue}
        // onSaved={refreshIssuesList}
        // onRemoved={refreshIssuesList}
        onCancel={() => router.back()}
        projectId={0}
        issue={undefined}
        onSaved={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRemoved={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Suspense>
  );
}
