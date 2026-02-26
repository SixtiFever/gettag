import { useState } from 'react'
import './Design2.css'
import backgroundVideo from '../../assets/videos_merged/spinning_globe.mp4'
import appStoreIcon from '../../assets/icons/app-store.png'
import googlePlayIcon from '../../assets/icons/google-play.png'

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const LandingPageDesign2 = () => {

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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!email.trim()) {
  //     setStatus({ type: 'error', message: 'Please enter your email address' });
  //     return;
  //   }

  //   if (!validateEmail(email)) {
  //     setStatus({ type: 'error', message: 'Please enter a valid email address' });
  //     return;
  //   }

  //   setStatus({ type: 'loading', message: 'Submitting...' });


  //   try {
  //     sendpulse.init(API_USER_ID, API_SECRET, TOKEN, function(token: any) {
  //       if (token && token.is_error) {
  //           // error handling
  //       }
  
  //       var answerGetter = function(data: any) {
  //         console.log(data);
  //       }
  
  //       sendpulse.addEmails(answerGetter, 445976, [{ email: email, variables:{}}]);
  //       setStatus({ type: 'success', message: 'Success!' });
  //     })
  //   } catch (error) {
  //     console.error('Error submitting email:', error);
  //     setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
  //   }
  // };

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
    <div className="design2-page">
      {/* Hero Section */}
      <section className="design2-hero">
        <div className="design2-video-background">
          <video autoPlay loop muted playsInline>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className="design2-video-overlay"></div>
        </div>

        <header className="design2-header">
          <div className="design2-container">
            <div className="design2-logo">Tag App</div>
          </div>
        </header>

        <div className="design2-hero-content">
          <div className="design2-container">
            <h2 className="design2-tagline">Create video stories together</h2>
            <p className="design2-description">
              Tag lets you build video stories with friends by adding 6-second clips, 
              one person at a time. Record your moment, tag a friend, they add theirs. No editing, 
              no coordination. Turn-based storytelling that's more fun than creating alone.
            </p>
            
            {/* Signup Form */}
            <div className="design2-signup">
              {!isSubmitted ? (
                <form className="design2-form" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleInputChange}
                    className="design2-input"
                    disabled={status.type === 'loading'}
                    required
                  />
                  <button 
                    type="submit" 
                    className="design2-button"
                    disabled={status.type === 'loading'}
                  >
                    {status.type === 'loading' ? 'Submitting...' : 'Keep me updated'}
                  </button>
                  
                  {status.message && (
                    <div className={`design2-status ${status.type}`}>
                      {status.message}
                    </div>
                  )}
                </form>
              ) : (
                <div className="design2-success">
                  <h2>Thank You!</h2>
                  <p>We'll notify you when we launch. Check your email for updates.</p>
                </div>
              )}
            </div>
          </div>

            <div className="coming-soon">
                <div className="coming-soon-content">
                    <div className="coming-soon-title"><p style={{color: 'white'}}>Coming soon</p></div>
                        <div className="platforms">
                            <div className="platform">
                                <div className="platform-icon">
                                    <img src={appStoreIcon} alt="App Store" />
                                </div>
                                <div className="platform-name"><p style={{color: 'white'}}>iOS</p></div>
                            </div>
                            <div className="platform">
                                <div className="platform-icon">
                                    <img src={googlePlayIcon} alt="Google Play" />
                                </div>
                                <div className="platform-name"><p style={{color: 'white'}}>Android</p></div>
                            </div>
                        </div>
                        <div className="coming-soon-email">
                        <a href="mailto:hello@tagapp.com" className="email-link">
                            <p style={{color: 'white'}}>hello@tagapp.com</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="design2-features">
        <div className="design2-container">
          <h2 className="design2-section-title">Why Choose Us</h2>
          <div className="design2-features-grid">
            <div className="design2-feature-card">
              <h3>Feature One</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
            </div>
            <div className="design2-feature-card">
              <h3>Feature Two</h3>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
            </div>
            <div className="design2-feature-card">
              <h3>Feature Three</h3>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Problem/Solution Section */}
      {/* <section className="design2-problem">
        <div className="design2-container">
          <div className="design2-problem-content">
            <h2 className="design2-section-title">The Problem We Solve</h2>
            <p className="design2-problem-text">
              Many people struggle with [placeholder problem description]. Our solution addresses this challenge by providing [placeholder solution description]. 
              We've built a platform that makes it easy to [placeholder value proposition].
            </p>
            <p className="design2-problem-text">
              With our innovative approach, you can [placeholder benefit]. Join us and be part of the change.
            </p>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="design2-cta">
        <div className="design2-container">
          <h2 className="design2-cta-title">Ready to Get Started?</h2>
          <p className="design2-cta-description">Be among the first to experience what's next.</p>
          {!isSubmitted && (
            <form className="design2-cta-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange}
                className="design2-input"
                disabled={status.type === 'loading'}
                required
              />
              <button 
                type="submit" 
                className="design2-button"
                disabled={status.type === 'loading'}
              >
                {status.type === 'loading' ? 'Submitting...' : 'Get Beta Access'}
              </button>
            </form>
          )}
        </div>
      </section> */}

      {/* Footer */}
      
    </div>
  )
}

export default LandingPageDesign2
