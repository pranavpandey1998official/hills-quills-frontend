"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, Calendar, Shield, Edit, Save, X, Lock, Eye, EyeOff } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fetchAdminMe, updateAdminProfile, sendPasswordOTP, verifyPasswordOTP} from "@/redux/slices/adminSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { DashboardLayout } from "../components/DashboardLayout"

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { profile, isLoading, isUpdating, otpLoading, error, successMessage } = useSelector((state: RootState) => state.admin)
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    username: "",
    email: ""
  })
  
  // Password change state
  const [passwordDialog, setPasswordDialog] = useState(false)
  const [otpDialog, setOtpDialog] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: ""
  })
  const [otp, setOtp] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)

  useEffect(() => {
    if (!profile) {
      dispatch(fetchAdminMe())
    }
  }, [dispatch, profile])

  useEffect(() => {
    if (profile && isEditing) {
      setEditForm({
        username: profile.username,
        email: profile.email
      })
    }
  }, [profile, isEditing])

  // OTP Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(timer => timer - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [otpTimer])

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form when canceling
      if (profile) {
        setEditForm({
          username: profile.username,
          email: profile.email
        })
      }
    }
    setIsEditing(!isEditing)
  }

  const handleSaveProfile = async () => {
    if (!profile) return
    
    const updates: any = {}
    if (editForm.username !== profile.username) {
      updates.username = editForm.username
    }
    if (editForm.email !== profile.email) {
      updates.email = editForm.email
    }

    if (Object.keys(updates).length === 0) {
      setIsEditing(false)
      return
    }

    const result = await dispatch(updateAdminProfile(updates))
    if (updateAdminProfile.fulfilled.match(result)) {
      setIsEditing(false)
    }
  }

  const handleSendOTP = async () => {
    if (!profile?.email) return
    
    const result = await dispatch(sendPasswordOTP({ email: profile.email, userType: 'admin' }))
    if (sendPasswordOTP.fulfilled.match(result)) {
      setPasswordDialog(false)
      setOtpDialog(true)
      setOtpTimer(300) // 5 minutes
    }
  }

  const handleVerifyOTPAndChangePassword = async () => {
    if (!profile?.email || !otp || !passwordForm.newPassword) return
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return // Handle error - passwords don't match
    }

    const result = await dispatch(verifyPasswordOTP({
      email: profile.email,
      otp,
      newPassword: passwordForm.newPassword,
      userType: 'admin'
    }))
    
    if (verifyPasswordOTP.fulfilled.match(result)) {
      setOtpDialog(false)
      setPasswordDialog(false)
      setPasswordForm({ newPassword: "", confirmPassword: "" })
      setOtp("")
    }
  }

  const handleResendOTP = async () => {
    if (!profile?.email) return
    await dispatch(sendPasswordOTP({ email: profile.email, userType: 'admin' }))
    setOtpTimer(300)
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Failed to load profile data</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Profile</h1>
          {!isEditing ? (
            <Button onClick={handleEditToggle}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSaveProfile} disabled={isUpdating}>
                <Save className="h-4 w-4 mr-2" />
                {isUpdating ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" onClick={handleEditToggle}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-lg">{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{profile.username}</CardTitle>
                <Badge className="bg-blue-100 text-blue-800">
                  {profile.is_admin ? "Administrator" : "Editor"}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {isEditing ? (
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={editForm.username}
                    onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Enter username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email"
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-sm text-muted-foreground">{profile.username}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Role</p>
                    <p className="text-sm text-muted-foreground">
                      {profile.is_admin ? "Administrator" : "Editor"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Joined</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Settings</h3>
              <div className="space-y-2">
                <Dialog open={passwordDialog} onOpenChange={setPasswordDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showPassword ? "text" : "password"}
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            placeholder="Enter new password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
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

                <Button variant="outline" className="w-full justify-start">
                  Notification Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}