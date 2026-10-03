/**
 * Translates Supabase auth error messages into user-friendly text.
 * Avoids exposing raw database/technical errors to end users.
 */
export function getAuthErrorMessage(error: { message?: string | undefined; code?: string | undefined }): string {
  const msg = error.message ?? '';
  const code = error.code ?? '';

  if (code === 'email_already_registered' || msg.includes('already registered') || msg.includes('already in use')) {
    return 'An account with this email already exists. Try signing in instead.';
  }
  if (code === 'invalid_credentials' || msg.includes('Invalid login credentials')) {
    return 'Incorrect email or password. Please check your details and try again.';
  }
  if (msg.includes('Email not confirmed')) {
    return 'Please check your inbox and confirm your email before signing in.';
  }
  if (msg.includes('Password should be at least')) {
    return 'Password must be at least 6 characters long.';
  }
  if (msg.includes('Unable to validate email address') || msg.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }
  if (msg.includes('User already registered')) {
    return 'An account with this email already exists. Try signing in instead.';
  }
  if (msg.includes('signup is disabled') || msg.includes('Signups not allowed')) {
    return 'New account registration is currently unavailable. Please try again later.';
  }
  if (msg.includes('rate limit') || msg.includes('too many requests')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  if (msg.includes('network') || msg.includes('fetch') || msg.includes('Failed to fetch')) {
    return 'Network error. Please check your connection and try again.';
  }
  if (msg.includes('For security purposes, you can only request this')) {
    return 'Too many password reset requests. Please wait a few minutes before trying again.';
  }

  return 'Something went wrong. Please try again.';
}
