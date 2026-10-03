import { useState } from 'react';
import { Link, useNavigate, useLocation } from '@/lib/router-compat';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ak-ui/Input';
import { Button } from '@/components/ak-ui/Button';
import { brand } from '@/lib/brand';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { getAuthErrorMessage } from '@/utils/auth-errors';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetting, setResetting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const from = (location.state as { from?: string })?.from ?? '/dashboard';

  // Redirect if already logged in
  if (user) {
    navigate(from, { replace: true });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (signInError) {
      setError(getAuthErrorMessage(signInError));
      return;
    }

    navigate(from, { replace: true });
  };

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setError('Enter your email address first, then click "Forgot password?"');
      return;
    }

    setResetting(true);
    setError(null);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim());
    setResetting(false);

    if (resetError) {
      setError(getAuthErrorMessage(resetError));
      return;
    }
    setResetSent(true);
  };

  return (
    <div className="container-ak py-16 lg:py-24">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient font-display text-base-950 font-bold text-lg">
            {brand.shortName}
          </div>
          <h1 className="font-display text-2xl font-bold text-ink-50">Welcome Back</h1>
          <p className="mt-2 text-ink-400">Sign in to your {brand.name} account.</p>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-400">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {resetSent && (
          <div className="mb-4 rounded-lg border border-success-500/30 bg-success-500/10 px-4 py-3 text-sm text-success-400">
            Password reset link sent to {email}. Check your inbox to continue.
          </div>
        )}

        <form className="card-surface p-6 sm:p-8 space-y-5" onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
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
            autoComplete="current-password"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-ink-300 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-base-600 bg-base-800 text-gold-500 focus:ring-gold-500/40"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={resetting}
              className="text-sm text-gold-400 hover:text-gold-300 disabled:opacity-50"
            >
              {resetting ? 'Sending…' : 'Forgot password?'}
            </button>
          </div>
          <Button type="submit" fullWidth size="lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-400">
          Do not have an account?{' '}
          <Link to="/register" className="text-gold-400 hover:text-gold-300 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
