import { useState } from 'react'
import './Design3.css'
import tagLogo from '../../assets/icons/otter_white_shadow.png'

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export default function Design3() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email address' })
      return
    }
    if (!validateEmail(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address' })
      return
    }
    setStatus({ type: 'loading', message: 'Submitting...' })
    try {
      const response = await fetch('https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (response.ok) {
        setStatus({ type: 'success', message: "Thank you! We'll notify you when we launch." })
        setEmail('')
        setIsSubmitted(true)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit email')
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      setStatus({ type: 'error', message: "Something went wrong. Please try again." })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (status.type === 'error') setStatus({ type: 'idle', message: '' })
  }

  return (
    <main className="design3" role="main">
      <div className="design3-split">
        {/* Left: all copy */}
        <div className="design3-left">
          <div className="design3-copy-inner">
            <section className="design3-hero" aria-labelledby="hero-heading">
              <h1 id="hero-heading">Create video stories together</h1>
              <p className="design3-hero-sub">
                Create video stories with friends by chaining <span className="design3-highlight">6-second clips</span> into a single collaborative video
                {/* Record <span className="design3-highlight">6-second clips</span>, chain them with friends, pass or publish as one video. <span className="design3-value-mint">Simple, spontaneous collaborative video</span> — every clip is part of a shared story, not a solo post. */}
              </p>
            </section>

            {/* Email capture */}
            <section className="design3-signup" aria-labelledby="signup-heading">
              <h2 id="signup-heading" className="visually-hidden">Get early access</h2>
              {!isSubmitted ? (
                <form className="design3-form" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleInputChange}
                    className="design3-input"
                    disabled={status.type === 'loading'}
                    required
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    className="design3-btn design3-btn-submit"
                    disabled={status.type === 'loading'}
                  >
                    {status.type === 'loading' ? 'Submitting...' : 'Get early access'}
                  </button>
                  {status.message && (
                    <div className={`design3-status design3-status-${status.type}`} role="alert">
                      {status.message}
                    </div>
                  )}
                </form>
              ) : (
                <div className="design3-success">
                  <p className="design3-success-title">Thank you!</p>
                  <p className="design3-success-text">We'll notify you when we launch. Check your email for updates.</p>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Right: logo with spotlight */}
        <div className="design3-right">
          <div className="design3-hero-visual">
            <div className="design3-spotlight" aria-hidden>
              <img
                src={tagLogo}
                alt="Tag app mascot with camera"
                className="design3-hero-logo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Coming soon to App Store — bottom left */}
      <div className="design3-coming-soon" aria-label="Coming soon to the App Store">
        <span className="design3-coming-soon-text">Coming soon to the iOS App Store</span>
      </div>
    </main>
  )
}
