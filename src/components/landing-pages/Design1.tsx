import { useState } from 'react'
import VideoGrid from '../VideoGrid'
import appStoreIcon from '../../assets/icons/app-store.png'
import googlePlayIcon from '../../assets/icons/google-play.png'
import myfeed2Image from '../../assets/images/myfeed2.png'
import './Design1.css'

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}


// var sendpulse = require("sendpulse-api");

const LandingPageDesign1 = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' })
  const API_USER_ID = "131a781e29b893a2e94ec0f1806e6df1";
  const API_SECRET = "ad2c6a3021dcc9c694ad7088a6a655ba";
  const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc5YzMwMWZiYjRmNzYwODgzYmRlNTFlNThjNjJlNWU3ZGM5ZGVlODA2NzUwZmE1ODllYjIyN2JkZWEyNDk2NmU0ZDgzMGY5OWIxNTRiYTcwIn0.eyJhdWQiOiIxMzFhNzgxZTI5Yjg5M2EyZTk0ZWMwZjE4MDZlNmRmMSIsImp0aSI6Ijc5YzMwMWZiYjRmNzYwODgzYmRlNTFlNThjNjJlNWU3ZGM5ZGVlODA2NzUwZmE1ODllYjIyN2JkZWEyNDk2NmU0ZDgzMGY5OWIxNTRiYTcwIiwiaWF0IjoxNzU1MjAwOTQ2LCJuYmYiOjE3NTUyMDA5NDYsImV4cCI6MTc1NTIwNDU0Niwic3ViIjoiIiwic2NvcGVzIjpbXSwidXNlciI6eyJpZCI6OTE4ODEwNCwiZ3JvdXBfaWQiOm51bGwsInBhcmVudF9pZCI6bnVsbCwiY29udGV4dCI6eyJhY2NsaW0iOiIwIn0sImFyZWEiOiJyZXN0IiwiYXBwX2lkIjpudWxsfX0.Oxvv4OqMfSP30JQ8tvaNVspExKUoD9dWhYpo9Jc8TNgQUglQjdI2Xs5qVcUmDCclZJo1yFnt5gM7ftl9OdaFUE7KTmfz11aQc6XSXjn-nvo3cLHpJ5mPYSqfXdiypC-n27zW8m07zHulhw2AEmqy4eanPxWqQdL-CosT7A7OmK_LvuIOHjxjrMcBjrpEk5FI7XuA37ZXM-kzAWgwO5PBRGYrY5xyQ6SteHyhZjKcDAylbwBfVYIber066Lar2ES-2f59Rqmf9I2txJGT7icESyE9dU_kuCfYCqQpVSJHj3WqEPKTGGyVywAzzjcRl1f2MTvkEImeD9vRwZzoi45VbQ"

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }

    if (!validateEmail(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setStatus({ type: 'loading', message: 'Submitting...' });

    try {
      // Submit email using Firebase Function
      const response = await fetch('https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! We\'ll notify you when we launch.' });
        setEmail('');
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit email');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status.type === 'error') {
      setStatus({ type: 'idle', message: '' });
    }
  };

  return (
    <>
      {/* Landing Page Section */}
      <div className="landing-page">
        {/* Video Grid Background */}
        <VideoGrid />
        <div className="video-overlay"></div>

        {/* Content */}
        <div className="content">
          <div className="container">
            {/* Header */}
            <header className="header">
              <div className="logo">
                <span className="logo-icon">🔗</span>
                <span className="logo-text">Tag</span>
              </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
              <div className="hero-section">
                <h1 className="tagline">
                  Collaborative Video Platform
                </h1>
                <p className="description">
                Transform how you create and share stories. Connect with friends through collaborative video experiences 
                that turn individual moments into collective stories through{' '}
                  <span className="micro-chaining-container">
                    <span className="micro-chaining">micro-video chaining</span>
                    <div className="tooltip">
                      <div className="tooltip-content">
                        <h4 className="tooltip-title">Micro-chaining Creation Model</h4>
                        <p className="tooltip-text">
                        Record a 6-second video, tag a friend, and watch your creation grow. 
                        Each tagged user adds their own 6-second contribution, building collaborative 
                        videos where individual creativity becomes collective storytelling.
                        </p>
                      </div>
                    </div>
                  </span>{' '}
                </p>
              </div>

              {/* Signup Form */}
              <div className="signup-section">
                {!isSubmitted ? (
                  <form className="signup-form" onSubmit={handleSubmit}>
                    <h4>Sound interesting? Signup for Beta access!</h4><br></br>
                    <div className="form-group">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={status.type === 'loading'}
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="primary-button"
                      disabled={status.type === 'loading'}
                    >
                      {status.type === 'loading' ? 'Submitting...' : 'Get Beta Access'}
                    </button>
                    
                    {status.message && (
                      <div className={`status-message ${status.type}`}>
                        {status.message}
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="success-message">
                    <h2 className="success-title">Welcome to Tag!</h2>
                    <p className="success-text">
                      Thank you for joining our beta! We'll be in touch soon with your early access.
                    </p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="coming-soon">
          <div className="coming-soon-content">
            <div className="coming-soon-title">Coming Soon</div>
            <div className="platforms">
              <div className="platform">
                <div className="platform-icon">
                  <img src={appStoreIcon} alt="App Store" />
                </div>
                <div className="platform-name">iOS</div>
              </div>
              <div className="platform">
                <div className="platform-icon">
                  <img src={googlePlayIcon} alt="Google Play" />
                </div>
                <div className="platform-name">Android</div>
              </div>
            </div>
            <div className="coming-soon-email">
              <a href="mailto:hello@tagapp.com" className="email-link">
                hello@tagapp.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <section className="social-media-section">
        <div className="social-media-container">
          <div className="social-media-layout">
            <div className="social-media-text">
              <h2 className="social-media-title">(Non)Social Media</h2>
              <h3 className="social-media-subtitle">Social Media has become Commercial Media</h3>
              <p className="social-media-description">
                Companies view social feeds as an opportunity to target users with adverts, 
                influencers, and premedidated agenda-driven content. Users are disillusion and disconnected.
                <br></br><br></br>
                We're building something different - a global platform where genuine connections can be built 
                through authentic, collaborative storytelling.
              </p>
            </div>
            <div className="social-media-image">
              <img src={myfeed2Image} alt="Social media feed showing ads and sponsored content" className="social-media-feed-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Tag Section */}
      <section className="why-tag-section">
        <div className="why-tag-container">
          <h2 className="why-tag-title">Why Tag?</h2>
          <div className="tagline-highlight">
            Connect, collaborate, create. With anyone, anywhere.
          </div>
          <div className="why-tag-content">
            <div className="why-tag-grid">
              <div className="why-tag-item">
                <div className="why-tag-icon">🎬</div>
                <h3 className="why-tag-item-title">Collaborative Storytelling</h3>
                <p className="why-tag-item-description">
                  Create stories together with friends through our unique micro-video chaining system. 
                  Each person adds their perspective, building rich, multi-layered narratives.
                </p>
              </div>
              <div className="why-tag-item">
                <div className="why-tag-icon">⚡</div>
                <h3 className="why-tag-item-title">Quick & Easy</h3>
                <p className="why-tag-item-description">
                  Record 6-second videos that are perfect for capturing authentic moments. 
                  No editing required - just tag and share to start the chain.
                </p>
              </div>
              <div className="why-tag-item">
                <div className="why-tag-icon">🔗</div>
                <h3 className="why-tag-item-title">Connect & Share</h3>
                <p className="why-tag-item-description">
                  Tag friends to join your video chain and watch your creation grow organically. 
                  Every contribution adds to the collective story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-text">
            <p>© 2025 Tag App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default LandingPageDesign1

