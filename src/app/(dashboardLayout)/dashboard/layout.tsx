
import Sidebar from "@/src/components/shared/Sidebar";
import { getUserSession } from "@/src/services/auth/getUserSession";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getUserSession()
  
  if (!session) redirect("/login");
  return (
    <main className="min-h-dvh flex gap-4">
      <Sidebar />
      {children}
    </main>
  );
}
