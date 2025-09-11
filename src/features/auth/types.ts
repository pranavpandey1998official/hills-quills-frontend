import { Admin } from "./admin";
import { Author } from "./author";
import { LoginResponse } from "@/types/common";

  
  //loginparams
  export type LoginFormProps = {
    isAdmin: boolean;
    handleLogin: (email: string, password: string) => Promise<void>;
    isLoading: boolean;
  }
  
  //useAuth type
  
  export enum UserRole {
    ADMIN = "admin",
    AUTHOR = "author",
    UNKNOWN = "unknown",
  }
  
  export interface User {
    id: string;
    email: string;
    name?: string;
    role: UserRole;
    token: string;
    about?: string;
    profession?: string;
    profile_photo_url?: string;
  }
  
  export type LoginCredentials = {
    email: string;
    password: string;
    userType: UserRole;
  };
  
  //protected route props
  export type ProtectedRouteProps = {
    children: React.ReactNode;
    requiredRole?: UserRole;
  };

class InternalUser {
    role: UserRole;
    refresh_token: string;
    token: string;
  
    constructor(role: UserRole, refresh_token: string = '', token: string = '') {
      this.refresh_token = refresh_token;
      this.token = token;
      this.role = role;
    }
  }
  
  class AdminUser extends InternalUser {
    id: number;
    adminRole: string;
    email: string;
  
    constructor(data: LoginResponse & Admin) {
      super(UserRole.ADMIN, data.refresh_token, data.token);
      this.id = data.id;
      this.adminRole = data.role;
      this.email = data.email;
    }
  }
  
  class AuthorUser extends InternalUser {
    id: number;
    name: string;
    email: string;
    about?: string;
    profession?: string;
    profile_photo_url?: string;
  
    constructor(data: LoginResponse & Author) {
      super(UserRole.AUTHOR, data.refresh_token, data.token);
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.about = data.about;
      this.profession = data.profession;
      this.profile_photo_url = data.profile_photo_url;
    }
  }
  
  class UnknownUser extends InternalUser {
    constructor() {
      super(UserRole.UNKNOWN);
    }
  }