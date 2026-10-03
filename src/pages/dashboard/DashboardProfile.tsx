import { useState, useEffect, useRef } from 'react';
import { PageHeader, Card, Input, Button, Badge } from '@/components/ak-ui';
import { Camera, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export function DashboardProfile() {
  const { user, profile, refreshProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name ?? '');
      setUsername(profile.username ?? '');
      setPhone(profile.phone ?? '');
      setCountry(profile.country ?? '');
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

  const handleAvatarUpload = async (file: File) => {
    if (!user) return;
    setUploading(true);
    setError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data: signed, error: signError } = await supabase.storage
        .from('avatars')
        .createSignedUrl(filePath, 60 * 60 * 24 * 365);
      if (signError || !signed) throw signError ?? new Error('Could not get avatar URL');
      const publicUrl = signed.signedUrl;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      await refreshProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload avatar.');
    } finally {
      setUploading(false);
    }
  };

  const checkUsernameUnique = async (value: string): Promise<boolean> => {
    if (!value.trim() || value === profile?.username) return true;
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', value.trim())
      .neq('id', user?.id ?? '')
      .maybeSingle();
    return !data;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setUsernameError(null);

    if (!displayName.trim()) {
      setError('Display name cannot be empty.');
      return;
    }

    if (username.trim() && username.trim() !== profile?.username) {
      const isUnique = await checkUsernameUnique(username.trim());
      if (!isUnique) {
        setUsernameError('This username is already taken.');
        return;
      }
    }

    setSaving(true);
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        display_name: displayName.trim(),
        username: username.trim() || null,
        phone: phone.trim() || null,
        country: country.trim() || null,
      })
      .eq('id', user?.id ?? '');

    setSaving(false);

    if (updateError) {
      setError('Failed to save profile changes. Please try again.');
      return;
    }

    setSuccess(true);
    await refreshProfile();
    setTimeout(() => setSuccess(false), 3000);
  };

  const emailPrefix = user?.email?.split('@')[0] ?? 'U';
  const initials = (displayName || emailPrefix).charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Manage your public profile information."
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Profile' }]}
      />

      {error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-400">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2.5 rounded-lg border border-success-500/30 bg-success-500/10 px-4 py-3 text-sm text-success-400">
          <CheckCircle2 size={18} />
          <span>Profile updated successfully.</span>
        </div>
      )}

      <Card className="p-6 max-w-lg space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-20 w-20 rounded-full object-cover border-2 border-gold-600/40"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/15 border-2 border-gold-600/30 font-display text-2xl text-gold-300">
                {initials}
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-base-950/70">
                <Loader2 size={24} className="animate-spin text-gold-400" />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleAvatarUpload(file);
              }}
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              leftIcon={<Camera size={16} />}
            >
              Change Avatar
            </Button>
            <p className="text-xs text-ink-400">PNG, JPG, WebP up to 2MB.</p>
          </div>
        </div>

        {/* Profile fields */}
        <form className="space-y-5" onSubmit={handleSave}>
          <Input
            label="Display Name"
            type="text"
            placeholder="Your name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Input
            label="Username"
            type="text"
            placeholder="your_gamer_tag"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError ?? undefined}
            hint={usernameError ? undefined : 'A unique handle visible to others.'}
          />
          <Input
            label="Email"
            type="email"
            value={user?.email ?? ''}
            disabled
            hint="Email cannot be changed here. Contact support if needed."
          />
          <Input
            label="Phone"
            type="tel"
            placeholder={'+1 555 000 0000'}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="Country"
            type="text"
            placeholder="United States"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <div className="flex items-center gap-3 pt-1">
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving…
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
            {profile?.status && (
              <Badge variant={profile.status === 'active' ? 'success' : 'warning'}>
                {profile.status}
              </Badge>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
