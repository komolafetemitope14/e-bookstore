import { useState } from 'react'
import type { FormEvent } from 'react'
import { supabase } from '../lib/supabase'

type AuthMode = 'sign-in' | 'sign-up'

type AuthModalProps = {
  open: boolean
  onClose: () => void
}

function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('sign-up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!open) {
    return null
  }

  const resetFeedback = () => {
    setMessage('')
    setError('')
  }

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode)
    setPassword('')
    setConfirmPassword('')
    resetFeedback()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    resetFeedback()

    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setError('Enter your email address.')
      return
    }

    if (password.length < 8) {
      setError('Your password must be at least 8 characters long.')
      return
    }

    if (mode === 'sign-up' && password !== confirmPassword) {
      setError('The passwords do not match.')
      return
    }

    setLoading(true)

    try {
      if (mode === 'sign-up') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
        })

        if (signUpError) {
          setError(signUpError.message)
          return
        }

        if (data.session) {
          setMessage(
            'Your account has been created and you are now signed in.',
          )
        } else {
          setMessage(
            'Your account has been created. Check your email and confirm your account before signing in.',
          )
        }

        setPassword('')
        setConfirmPassword('')
        return
      }

      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        })

      if (signInError) {
        setError(signInError.message)
        return
      }

      setPassword('')
      setMessage('You are now signed in.')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="auth-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button
          className="auth-modal-close"
          type="button"
          aria-label="Close account window"
          onClick={onClose}
        >
          ×
        </button>

        <div className="auth-modal-heading">
          <p className="purchase-label">Digital Access</p>

          <h2 id="auth-modal-title">
            {mode === 'sign-up'
              ? 'Create your account'
              : 'Welcome back'}
          </h2>

          <p>
            {mode === 'sign-up'
              ? 'Create an account for secure access to your e-book after payment.'
              : 'Sign in to continue to your digital book access.'}
          </p>
        </div>

        <div className="auth-tabs" aria-label="Account options">
          <button
            className={mode === 'sign-up' ? 'auth-tab active' : 'auth-tab'}
            type="button"
            onClick={() => switchMode('sign-up')}
          >
            Sign Up
          </button>

          <button
            className={mode === 'sign-in' ? 'auth-tab active' : 'auth-tab'}
            type="button"
            onClick={() => switchMode('sign-in')}
          >
            Sign In
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="auth-email">
            Email address
            <input
              id="auth-email"
              type="email"
              value={email}
              autoComplete="email"
              required
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label htmlFor="auth-password">
            Password
            <input
              id="auth-password"
              type="password"
              value={password}
              autoComplete={
                mode === 'sign-up' ? 'new-password' : 'current-password'
              }
              minLength={8}
              required
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
            />
          </label>

          {mode === 'sign-up' && (
            <label htmlFor="auth-confirm-password">
              Confirm password
              <input
                id="auth-confirm-password"
                type="password"
                value={confirmPassword}
                autoComplete="new-password"
                minLength={8}
                required
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Enter your password again"
              />
            </label>
          )}

          {error && (
            <p className="auth-feedback auth-error" role="alert">
              {error}
            </p>
          )}

          {message && (
            <p className="auth-feedback auth-success" role="status">
              {message}
            </p>
          )}

          <button
            className="button button-gold auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : mode === 'sign-up'
                ? 'Create Account'
                : 'Sign In'}

            {!loading && <span aria-hidden="true">→</span>}
          </button>
        </form>

        <p className="auth-privacy">
          Your account is for secure digital access. We do not require
          physical delivery information for an e-book account.
        </p>
      </section>
    </div>
  )
}

export default AuthModal
