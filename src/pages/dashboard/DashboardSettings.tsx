import { useState } from 'react';
import { PageHeader, Card, Input, Button, Select } from '@/components/ak-ui';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export function DashboardSettings() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('Please fill in all password fields.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    setChangingPassword(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user?.email ?? '',
      password: currentPassword,
    });

    if (signInError) {
      setChangingPassword(false);
      setError('Your current password is incorrect.');
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setChangingPassword(false);

    if (updateError) {
      setError('Failed to update password. Please try again.');
      return;
    }

    setSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Manage your account preferences."
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Settings' }]}
      />

      {error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-400 max-w-lg">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2.5 rounded-lg border border-success-500/30 bg-success-500/10 px-4 py-3 text-sm text-success-400 max-w-lg">
          <CheckCircle2 size={18} />
          <span>Password updated successfully.</span>
        </div>
      )}

      <Card className="p-6 max-w-lg space-y-5">
        <h3 className="font-display text-lg text-ink-50">Notifications</h3>
        <Select label="Order Updates" options={[{ value: 'email', label: 'Email' }, { value: 'push', label: 'Push' }, { value: 'both', label: 'Email & Push' }, { value: 'none', label: 'None' }]} />
        <Select label="Promotional Emails" options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
      </Card>

      <Card className="p-6 max-w-lg space-y-5">
        <h3 className="font-display text-lg text-ink-50">Security</h3>
        <form className="space-y-5" onSubmit={handlePasswordChange}>
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            hint="Minimum 6 characters."
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Button type="submit" disabled={changingPassword}>
            {changingPassword ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Updating…
              </>
            ) : (
              'Update Password'
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
