import { apiClient } from "@/lib/api";
import { Admin, AdminSchema } from "@/types/admin";
import { LoginResponse, LoginResponseSchema } from "@/types/common";


export async function fetchAdminArticles(page: number, limit: number) {
    apiClient.get(`/articles/pending?page=${page}&limit=${limit}`);
}

export async function fetchAdmin(): Promise<Admin> {
    const result = await apiClient.get('/admin');
    return AdminSchema.parse(result.data); 
}

export async function authenticateAdmin(email: string, password: string): Promise<Admin> {
    const result = await apiClient.post('/admin/login', { email, password });
    return AdminSchema.parse(result.data); 
}

export async function updateAdminProfile(email: string ) : Promise<Admin> {
    const result = await apiClient.put('/admin', { email });
    return AdminSchema.parse(result.data);
}

export async function loginAdmin(email: string, password: string): Promise<LoginResponse & Admin> {
    const result = await apiClient.post('/admin/login', { email, password });
    return LoginResponseSchema.and(AdminSchema).parse(result.data);
}

export async function refreshAdminToken(refreshToken: string): Promise<LoginResponse & Admin> {
    const result = await apiClient.post('/admin/refresh-token', { refresh_token: refreshToken });
    return LoginResponseSchema.and(AdminSchema).parse(result.data);
}