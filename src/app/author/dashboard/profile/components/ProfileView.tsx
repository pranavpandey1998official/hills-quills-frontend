"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Mail, Calendar, Briefcase, Key, Eye, EyeOff, Lock, Power } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"
import { Author, AuthorStatus } from "@/types/author"
import { useDispatch, useSelector } from "react-redux"
import { sendPasswordOTP, verifyPasswordOTP } from "@/redux/slices/adminSlice"
import { toggleAuthorStatus } from "@/redux/slices/authorsSlice"
import type { AppDispatch, RootState } from "@/redux/store"
import { ProfileViewProps } from "@/types/author"

// Skeleton Loading Component
function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Profile Header Skeleton */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>

      <Separator />

      {/* Profile Details Skeleton */}
      <div className="grid gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center space-x-3">
            <Skeleton className="h-5 w-5" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* About Section Skeleton */}
      <div>
        <Skeleton className="h-6 w-16 mb-2" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      <Separator />

      {/* Security & Settings Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32 mb-2" />
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  )
}

export function ProfileView({ profile, isLoading = false }: ProfileViewProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { otpLoading, isUpdating, error, successMessage } = useSelector((state: RootState) => state.admin)
  
  // Password change dialogs
  const [passwordDialog, setPasswordDialog] = useState(false)
  const [otpDialog, setOtpDialog] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: ""
  })
  const [otp, setOtp] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // OTP timer
  const [otpTimer, setOtpTimer] = useState(0)
  
  // Status toggle
  const [isStatusToggling, setIsStatusToggling] = useState(false)

  // OTP Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(timer => timer - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [otpTimer])

  // Show skeleton while loading
  if (isLoading) {
    return <ProfileSkeleton />
  }

  // Show no profile message only after loading is complete
  if (!profile && !isLoading) {
    return (
      <div className="text-center py-8">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">No Profile Found</h3>
          <p className="text-muted-foreground">
            Unable to load profile information. Please try refreshing the page.
          </p>
        </div>
      </div>
    )
  }

  // This shouldn't happen, but just in case
  if (!profile) {
    return <ProfileSkeleton />
  }

  const handleSendOTP = async () => {
    if (!profile?.email) return
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    
    const result = await dispatch(sendPasswordOTP({ 
      email: profile.email, 
      userType: 'author' 
    }))
    
    if (sendPasswordOTP.fulfilled.match(result)) {
      setPasswordDialog(false)
      setOtpDialog(true)
      setOtpTimer(300) // 5 minutes
      toast.success("OTP sent to your email")
    }
  }
  
  const handleVerifyOTPAndChangePassword = async () => {
    if (!profile?.email || !otp || !passwordForm.newPassword) return
    
    const result = await dispatch(verifyPasswordOTP({
      email: profile.email,
      otp,
      newPassword: passwordForm.newPassword,
      userType: 'author'
    }))
    
    if (verifyPasswordOTP.fulfilled.match(result)) {
      setOtpDialog(false)
      setOtp("")
      setPasswordForm({
        newPassword: "",
        confirmPassword: ""
      })
      toast.success("Password changed successfully")
    }
  }
  
  const handleResendOTP = async () => {
    if (!profile?.email) return
    
    const result = await dispatch(sendPasswordOTP({ 
      email: profile.email, 
      userType: 'author' 
    }))
    
    if (sendPasswordOTP.fulfilled.match(result)) {
      setOtpTimer(300) // 5 minutes
    }
  }
  
  const handleToggleStatus = async () => {
    if (!profile?.id) return
    
    setIsStatusToggling(true)
    
    try {
      const newStatus = profile.is_active === 1 ? false : true
      
      const result = await dispatch(toggleAuthorStatus({ 
        id: profile.id, 
        isActive: newStatus 
      }))
      
      if (toggleAuthorStatus.fulfilled.match(result)) {
        toast.success(`Account ${newStatus ? 'activated' : 'deactivated'} successfully`)
      }
    } catch (error) {
      toast.error("Failed to update account status")
    } finally {
      setIsStatusToggling(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile.profile_photo_url || "/placeholder.svg"} />
          <AvatarFallback className="text-lg">{profile.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{profile.profession || "Author"}</Badge>
            <Badge 
              variant={profile.is_active === 1 ? "default" : "destructive"}
              className={profile.is_active === 1 ? "bg-green-500 hover:bg-green-600" : ""}
            >
              {profile.is_active === 1 ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Profile Details */}
      <div className="grid gap-4">
        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Full Name</p>
            <p className="text-sm text-muted-foreground">{profile.name || "Not provided"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{profile.email || "Not provided"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Briefcase className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Profession</p>
            <p className="text-sm text-muted-foreground">{profile.profession || "Not specified"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Joined</p>
            <p className="text-sm text-muted-foreground">
              {profile.created_at ? formatDistanceToNow(new Date(profile.created_at), { addSuffix: true }) : "Unknown"}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* About Section */}
      <div>
        <h3 className="text-lg font-medium mb-2">About</h3>
        <p className="text-muted-foreground">
          {profile.about || "No bio provided. Click edit to add information about yourself."}
        </p>
      </div>

      <Separator />

      {/* Security & Settings Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-2">Security & Settings</h3>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => setPasswordDialog(true)}
          >
            <Key className="h-4 w-4 mr-2" />
            Change Password
          </Button>
          
          <Button 
            variant={profile.is_active === 1 ? "destructive" : "outline"} 
            className="flex items-center"
            onClick={handleToggleStatus}
            disabled={isStatusToggling}
          >
            <Power className="h-4 w-4 mr-2" />
            {isStatusToggling 
              ? "Updating..." 
              : (profile.is_active === 1 ? "Deactivate Account" : "Activate Account")
            }
          </Button>
        </div>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialog} onOpenChange={setPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Set a new password for your account
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input 
                  id="new-password" 
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input 
                  id="confirm-password" 
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {passwordForm.newPassword && passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
              <Alert variant="destructive">
                <AlertDescription>Passwords do not match</AlertDescription>
              </Alert>
            )}
            
            <Button 
              onClick={handleSendOTP} 
              disabled={!passwordForm.newPassword || !passwordForm.confirmPassword || passwordForm.newPassword !== passwordForm.confirmPassword || otpLoading}
              className="w-full"
            >
              {otpLoading ? "Sending OTP..." : "Send OTP to Email"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* OTP Verification Dialog */}
      <Dialog open={otpDialog} onOpenChange={setOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We've sent a verification code to {profile.email}
            </p>
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
              />
            </div>
            {otpTimer > 0 ? (
              <p className="text-sm text-muted-foreground">
                Resend OTP in {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')}
              </p>
            ) : (
              <Button variant="outline" onClick={handleResendOTP} disabled={otpLoading}>
                {otpLoading ? "Sending..." : "Resend OTP"}
              </Button>
            )}
            <Button 
              onClick={handleVerifyOTPAndChangePassword} 
              disabled={!otp || otp.length !== 6 || isUpdating}
              className="w-full"
            >
              {isUpdating ? "Changing Password..." : "Change Password"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}