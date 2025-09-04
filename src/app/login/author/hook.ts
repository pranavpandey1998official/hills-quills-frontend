import { useAuth } from "@/hooks/useAuth"
import { UserRole } from "@/types/auth"
import { useRouter } from "next/navigation"

export const useAuthorLogin = () => {
    const { login, isLoading, error } = useAuth()
    const router = useRouter()

    const handleAuthor = async (email: string, password: string) => {
        try {
            await login({ email, password, userType: UserRole.ADMIN })
            router.push("/admin/dashboard")
        } catch (err) {
            console.error("Admin login failed:", err)
        }
    }
    return { handleAuthor, isLoading, error }
}