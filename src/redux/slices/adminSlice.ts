import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { API_BASE_URL } from "@/types/constant"
import { AdminProfile, AdminState } from "@/types/admin"

const initialState: AdminState = {
  profile: null,
  isLoading: false,
  isUpdating: false,
  otpLoading: false,
  error: null,
  successMessage: null,
}

// Fetch the current admin's profile
export const fetchAdminMe = createAsyncThunk("admin/fetchMe", async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/admin/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch admin profile")
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch admin profile")
    }

    return data.data
  } catch (error) {
    console.error("Error fetching admin profile:", error)
    throw error
  }
})

// Update admin profile
export const updateAdminProfile = createAsyncThunk(
  "admin/updateProfile",
  async (updates: { username?: string; email?: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update profile")
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to update profile")
      }

      return data.data
    } catch (error) {
      console.error("Error updating admin profile:", error)
      throw error
    }
  }
)

// Send OTP for password change
export const sendPasswordOTP = createAsyncThunk(
  "admin/sendPasswordOTP",
  async ({ email, userType }: { email: string; userType: 'admin' | 'author' }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-password-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ email, userType }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to send OTP")
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to send OTP")
      }

      return data.data
    } catch (error) {
      console.error("Error sending OTP:", error)
      throw error
    }
  }
)

// Verify OTP and change password
export const verifyPasswordOTP = createAsyncThunk(
  "admin/verifyPasswordOTP",
  async ({ 
    email, 
    otp, 
    newPassword, 
    userType 
  }: { 
    email: string; 
    otp: string; 
    newPassword: string; 
    userType: 'admin' | 'author' 
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-password-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ email, otp, newPassword, userType }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to verify OTP")
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to verify OTP")
      }

      return data.data
    } catch (error) {
      console.error("Error verifying OTP:", error)
      throw error
    }
  }
)

// For dashboard stats
export const fetchAdminArticles = createAsyncThunk(
  "admin/fetchArticles", 
  async (params: { page: number; limit: number; status: string }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/articles/pending?page=${params.page}&limit=${params.limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch articles")
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch articles")
      }

      return data.data
    } catch (error) {
      console.error("Error fetching admin articles:", error)
      throw error
    }
  }
)

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminState: (state) => {
      state.profile = null
      state.error = null
      state.successMessage = null
    },
    clearMessages: (state) => {
      state.error = null
      state.successMessage = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Admin Me
      .addCase(fetchAdminMe.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAdminMe.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
      })
      .addCase(fetchAdminMe.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch profile"
      })
      
      // Update Profile
      .addCase(updateAdminProfile.pending, (state) => {
        state.isUpdating = true
        state.error = null
        state.successMessage = null
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.isUpdating = false
        state.profile = action.payload
        state.successMessage = "Profile updated successfully"
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.error.message || "Failed to update profile"
      })
      
      // Send Password OTP
      .addCase(sendPasswordOTP.pending, (state) => {
        state.otpLoading = true
        state.error = null
        state.successMessage = null
      })
      .addCase(sendPasswordOTP.fulfilled, (state, action) => {
        state.otpLoading = false
        state.successMessage = "OTP sent to your email"
      })
      .addCase(sendPasswordOTP.rejected, (state, action) => {
        state.otpLoading = false
        state.error = action.error.message || "Failed to send OTP"
      })
      
      // Verify Password OTP
      .addCase(verifyPasswordOTP.pending, (state) => {
        state.isUpdating = true
        state.error = null
        state.successMessage = null
      })
      .addCase(verifyPasswordOTP.fulfilled, (state, action) => {
        state.isUpdating = false
        state.successMessage = "Password changed successfully"
      })
      .addCase(verifyPasswordOTP.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.error.message || "Failed to change password"
      })
  },
})

export const { clearAdminState, clearMessages } = adminSlice.actions
export default adminSlice.reducer