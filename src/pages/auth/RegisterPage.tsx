import { useState } from 'react';
import { Link, useNavigate } from '@/lib/router-compat';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ak-ui/Input';
import { Button } from '@/components/ak-ui/Button';
import { brand } from '@/lib/brand';
import { supabase } from '@/lib/supabase';
import { getAuthErrorMessage } from '@/utils/auth-errors';

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validate = (): string | null => {
    if (!displayName.trim()) return 'Please enter a display name.';
    if (!email.trim()) return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters long.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    if (!agreed) return 'Please accept the Terms and Privacy Policy to continue.';
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          display_name: displayName.trim(),
        },
      },
    });
    setLoading(false);

    if (signUpError) {
      setError(getAuthErrorMessage(signUpError));
      return;
    }

    if (data.user) {
      // Update the profile display_name that the trigger created with the user's chosen name
      if (data.session) {
        await supabase
          .from('profiles')
          .update({ display_name: displayName.trim() })
          .eq('id', data.user.id);
      }

      setSuccess(true);
      setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
    }
  };

  if (success) {
    return (
      <div className="container-ak py-16 lg:py-24">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-500/15 border border-success-500/30 text-success-400">
            <CheckCircle2 size={28} />
          </div>
          <h1 className="font-display text-2xl font-bold text-ink-50">Account Created!</h1>
          <p className="mt-2 text-ink-400">Welcome to {brand.name}. Redirecting you to your dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-ak py-16 lg:py-24">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient font-display text-base-950 font-bold text-lg">
            {brand.shortName}
          </div>
          <h1 className="font-display text-2xl font-bold text-ink-50">Create Account</h1>
          <p className="mt-2 text-ink-400">Join {brand.name} and start your adventure.</p>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-400">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form className="card-surface p-6 sm:p-8 space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Display Name"
            type="text"
            name="name"
            placeholder="Your gamer tag"
            leftIcon={<User size={18} />}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="username"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            leftIcon={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create a password (min. 6 characters)"
            leftIcon={<Lock size={18} />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-gold-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Input
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Re-enter your password"
            leftIcon={<Lock size={18} />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          <label className="flex items-start gap-2 text-sm text-ink-300 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-base-600 bg-base-800 text-gold-500 focus:ring-gold-500/40"
            />
            <span>
              I agree to the{' '}
              <Link to="/terms" className="text-gold-400 hover:text-gold-300">
                Terms
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-gold-400 hover:text-gold-300">
                Privacy Policy
              </Link>
            </span>
          </label>
          <Button type="submit" fullWidth size="lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating account…
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-400">
          Already have an account?{' '}
          <Link to="/login" className="text-gold-400 hover:text-gold-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
