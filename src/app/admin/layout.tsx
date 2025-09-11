import { DashboardLayout } from "@/app/admin/components/DashboardLayout"
import ProtectedRoute from "@/features/auth/components/protectedroute"
import { UserRole } from "@/types/auth"

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  return (
    <ProtectedRoute requiredRole={UserRole.ADMIN}>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  )
}