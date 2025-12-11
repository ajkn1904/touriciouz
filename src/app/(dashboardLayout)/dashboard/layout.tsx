
import { AppSidebar } from "@/src/components/app-sidebar";
import Sidebar from "@/src/components/shared/Sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { getUserSession } from "@/src/services/auth/getUserSession";
import { Separator } from "@radix-ui/react-separator";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserSession()

  if (!session) redirect("/login");
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div className="min-h-dvh flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
