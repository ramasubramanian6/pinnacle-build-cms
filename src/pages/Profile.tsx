
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "@/lib/api";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

const Profile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [profile, setProfile] = useState({
        full_name: "",
        email: "", // Read only from auth
        phone: "",
        avatar_url: "",
        company: ""
    });

    useEffect(() => {
        if (user) {
            getProfile();
        }
    }, [user]);

    const getProfile = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/auth/me");

            setProfile({
                full_name: data.fullName || "",
                email: data.email || "",
                phone: data.phone || "",
                avatar_url: data.avatarUrl || "",
                company: data.company || ""
            });
        } catch (error) {
            console.error("Error loading profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async () => {
        try {
            setLoading(true);
            const updates = {
                fullName: profile.full_name,
                phone: profile.phone,
                avatarUrl: profile.avatar_url,
                company: profile.company,
            };

            await api.put("/auth/profile", updates);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Error updating profile");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadImageToCloudinary(file);
            setProfile(prev => ({ ...prev, avatar_url: url }));
            // Auto-save after upload
            await api.put("/auth/profile", { avatarUrl: url });
            toast.success("Avatar updated!");
        } catch (error) {
            toast.error("Error uploading avatar");
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    if (loading && !profile.email) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-[60vh]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-display font-bold mb-8">Account Settings</h1>

                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar Section */}
                            <div className="flex items-center gap-6">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage src={profile.avatar_url} />
                                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
                                        {profile.full_name?.charAt(0) || user?.email?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <Label htmlFor="avatar" className="cursor-pointer">
                                        <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-slate-50 transition-colors">
                                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                            <span>Change Avatar</span>
                                        </div>
                                        <Input
                                            id="avatar"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleAvatarUpload}
                                            disabled={uploading}
                                        />
                                    </Label>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={profile.email} disabled className="bg-slate-50" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        value={profile.full_name}
                                        onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={profile.phone}
                                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company">Company (Optional)</Label>
                                    <Input
                                        id="company"
                                        value={profile.company}
                                        onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <Button onClick={updateProfile} disabled={loading} className="w-full">
                                {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
