import { useAuth } from "@/features/auth/hooks/useAuth"
import { UserRole } from "@/types/auth"
import { useRouter } from "next/navigation"

export const useAdminLogin = () => {
    const { login, isLoading } = useAuth()
    const router = useRouter()

    const handleAdminLogin = async (email: string, password: string) => {
        try {
            await login({ email, password, userType: UserRole.ADMIN })
            router.push("/admin/articles")
        } catch (err) {
            console.error("Admin login failed:", err)
        }
    }
    return { handleAdminLogin, isLoading }
}