type Props = {
  mode: 'signin' | 'signup'
}

export default function AuthPage({ mode }: Props) {
  const isSignUp = mode === 'signup'
  return (
    <div className="lead-page-wrap">
      <div className="lead-shell">
        <div className="lead-aside">
          <div className="lead-brand">AIT</div>
          <h2>Compliance Infrastructure for High-velocity Finance Teams</h2>
          <p>One workspace for validation, reconciliation, CA collaboration, and GST filing orchestration.</p>
          <div className="lead-points">
            <span>Live control dashboard</span>
            <span>AI-powered compliance checks</span>
            <span>Vendor and CA network workflows</span>
          </div>
        </div>
        <div className="lead-card">
          <div className="lead-tag">{isSignUp ? 'Create Workspace' : 'Workspace Access'}</div>
          <h1>{isSignUp ? 'Sign Up' : 'Sign in'}</h1>
          <p>{isSignUp ? 'Start with your work email and set up your AIT workspace.' : 'Enter your credentials to continue to your AIT workspace.'}</p>
          <form className="lead-form">
            <input type="email" placeholder="Work Email" />
            {isSignUp && <input type="text" placeholder="Company Name" />}
            <input type="password" placeholder="Password" />
            <button type="button">{isSignUp ? 'Create Account' : 'Sign in'}</button>
          </form>
          <a className="lead-secondary-link" href={isSignUp ? '/sign-in' : '/sign-up'}>
            {isSignUp ? 'Already have an account? Sign in' : 'New to AIT? Sign Up'}
          </a>
        </div>
      </div>
    </div>
  )
}
