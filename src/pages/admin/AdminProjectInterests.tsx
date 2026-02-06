import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin, useContactSubmissions, useUpdateContactStatus, useDeleteContact } from "@/hooks/useAdmin";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LuxuryLoader, DotsLoader } from "@/components/premium/LuxuryLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Mail, Phone, ExternalLink, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function AdminProjectInterests() {
    const { user, loading: authLoading } = useAuth();
    const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
    const { data: contacts, isLoading: contactsLoading } = useContactSubmissions();
    const updateStatus = useUpdateContactStatus();
    const deleteContact = useDeleteContact();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !user) navigate("/auth");
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (!roleLoading && isAdmin === false) navigate("/dashboard");
    }, [isAdmin, roleLoading, navigate]);

    if (authLoading || roleLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <LuxuryLoader />
            </div>
        );
    }

    if (!isAdmin) return null;

    const projectInterests = contacts?.filter(c => c.subject?.startsWith("Project Interest:")) || [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new":
                return "bg-blue-500/10 text-blue-400";
            case "in_progress":
            case "attempted_contact":
                return "bg-orange-500/10 text-orange-400";
            case "resolved":
                return "bg-green-500/10 text-green-400";
            case "closed":
                return "bg-muted text-muted-foreground";
            case "follow_up":
                return "bg-purple-500/10 text-purple-400";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    const getProjectName = (subject: string | null) => {
        if (!subject) return "Unknown Project";
        return subject.replace("Project Interest: ", "");
    };

    const handleWhatsApp = (phone: string | null) => {
        if (!phone) {
            toast.error("No phone number available");
            return;
        }
        // Remove non-digit chars
        const cleanPhone = phone.replace(/\D/g, '');
        window.open(`https://wa.me/${cleanPhone}`, '_blank');
    };

    return (
        <>
            <Helmet>
                <title>Project Interests | BRIXXSPACE Admin</title>
            </Helmet>
            <AdminLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Project Interests</h1>
                        <p className="text-muted-foreground">Manage users interested in specific projects</p>
                    </div>

                    <Card className="bg-card border-border">
                        <CardContent className="p-0">
                            {contactsLoading ? (
                                <div className="p-8 text-center">
                                    <DotsLoader />
                                </div>
                            ) : projectInterests.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground">
                                    No project interests yet
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-border">
                                            <TableHead className="text-muted-foreground">Date</TableHead>
                                            <TableHead className="text-muted-foreground">Project</TableHead>
                                            <TableHead className="text-muted-foreground">User</TableHead>
                                            <TableHead className="text-muted-foreground">Contact</TableHead>
                                            <TableHead className="text-muted-foreground">Actions</TableHead>
                                            <TableHead className="text-muted-foreground">Status</TableHead>
                                            <TableHead className="text-muted-foreground text-right">Delete</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {projectInterests.map((contact) => (
                                            <TableRow key={contact.id} className="border-border">
                                                <TableCell className="text-muted-foreground text-sm">
                                                    {contact.createdAt ? format(new Date(contact.createdAt), "MMM d, yyyy") : "N/A"}
                                                </TableCell>
                                                <TableCell className="font-medium text-foreground">
                                                    {getProjectName(contact.subject)}
                                                </TableCell>
                                                <TableCell className="text-foreground">{contact.name}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                            <Mail className="h-3 w-3" />
                                                            {contact.email}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                            <Phone className="h-3 w-3" />
                                                            {contact.phone || "-"}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {contact.phone && (
                                                            <>
                                                                <Button size="sm" variant="outline" className="h-8 gap-2" onClick={() => window.open(`tel:${contact.phone}`)}>
                                                                    <Phone className="h-3 w-3" />
                                                                    Call
                                                                </Button>
                                                                <Button size="sm" variant="outline" className="h-8 gap-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600 border-green-500/20" onClick={() => handleWhatsApp(contact.phone)}>
                                                                    <MessageCircle className="h-3 w-3" />
                                                                    WhatsApp
                                                                </Button>
                                                            </>
                                                        )}
                                                        {!contact.phone && <span className="text-xs text-muted-foreground">No Phone</span>}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={contact.status}
                                                        onValueChange={(value) => updateStatus.mutate({ id: contact.id, status: value })}
                                                    >
                                                        <SelectTrigger className="w-[140px]">
                                                            <Badge className={getStatusColor(contact.status)}>
                                                                {contact.status.replace("_", " ")}
                                                            </Badge>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="new">New</SelectItem>
                                                            <SelectItem value="attempted_contact">Attempted Contact</SelectItem>
                                                            <SelectItem value="follow_up">Follow Up</SelectItem>
                                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                                            <SelectItem value="resolved">Resolved</SelectItem>
                                                            <SelectItem value="closed">Closed</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button size="icon" variant="ghost" className="text-destructive">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Delete Interest</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete this record? This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    className="bg-destructive text-destructive-foreground"
                                                                    onClick={() => deleteContact.mutate(contact.id)}
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </AdminLayout>
        </>
    );
}
