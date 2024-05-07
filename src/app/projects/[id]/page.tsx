import IssuesPanel from "@/components/issue/IssuesPanel";

export default function ProjectPage({ params }: { params: { id: number } }) {
  return (
    <>
      <IssuesPanel project={{ id: params.id, name: "Not Fetched Yet" }} />
    </>
  );
}
