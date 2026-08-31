import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfileForm, PasswordForm } from "@/components/portal/settings-forms";

export default async function SettingsPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({ where: { id: session!.user.id } });
  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your account details.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
            <Badge variant="emerald">{user.role}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ProfileForm
            initial={{ name: user.name, phone: user.phone || "", company: user.company || "" }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Update the password used to sign in to Akshara Connect.</CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
