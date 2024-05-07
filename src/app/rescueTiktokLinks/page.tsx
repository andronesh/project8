import NavSidebar from "@/components/common/NavSidebar";
import LinksPanel from "@/components/rescueTiktokLinks/LinksPanel";

export default async function LinksPage() {
  return (
    <div className=" bg-gray-900 text-gray-300">
      <NavSidebar />
      <div className="p-4 sm:ml-64 h-screen">
        <LinksPanel />
      </div>
    </div>
  );
}
