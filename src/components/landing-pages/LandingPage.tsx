import { useState } from "react";
import tagLogoPurple from "../../assets/icons/tag_logo_purple.png";

const tagColors = {
  purple: "#6B21FF",
  purpleLight: "#8B47FF",
  purpleDark: "#4A0FCC",
  ink: "#1A1025",
  mist: "#F5F3FF",
  gray: "#9B8FBB",
};

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Instrument+Sans:ital,wght@0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --purple: ${tagColors.purple};
    --purple-light: ${tagColors.purpleLight};
    --purple-dark: ${tagColors.purpleDark};
    --ink: ${tagColors.ink};
    --mist: ${tagColors.mist};
    --gray: ${tagColors.gray};
  }

  body {
    font-family: 'Instrument Sans', sans-serif;
    background: #FAFAFA;
    color: var(--ink);
    overflow-x: hidden;
  }

  .lp-root {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  /* Background decorations */
  .bg-blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.08;
    pointer-events: none;
    z-index: 0;
  }
  .bg-blob-1 {
    width: 600px; height: 600px;
    background: var(--purple);
    top: -200px; right: -100px;
    animation: floatBlob1 12s ease-in-out infinite;
  }
  .bg-blob-2 {
    width: 400px; height: 400px;
    background: var(--purple-light);
    bottom: 100px; left: -150px;
    animation: floatBlob2 15s ease-in-out infinite;
  }

  @keyframes floatBlob1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-30px, 40px) scale(1.05); }
  }
  @keyframes floatBlob2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(20px, -30px) scale(0.95); }
  }

  /* Grid overlay */
  .bg-grid {
    position: fixed;
    inset: 0;
    background-image: 
      linear-gradient(rgba(107, 33, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(107, 33, 255, 0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    z-index: 0;
  }

  /* Nav */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 20px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(12px);
    background: rgba(250,250,250,0.85);
    border-bottom: 1px solid rgba(107,33,255,0.08);
    transition: all 0.3s;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-logo-img {
    height: 42px;
    width: auto;
    display: block;
  }

  .nav-logo-icon {
    width: 36px; height: 36px;
    background: var(--purple);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transform: rotate(-8deg);
    transition: transform 0.3s;
  }
  .nav-logo-icon:hover { transform: rotate(0deg) scale(1.1); }

  .nav-logo-text {
    font-family: 'Clash Display', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.5px;
  }

  .nav-pill {
    background: var(--purple);
    color: white;
    padding: 8px 20px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Instrument Sans', sans-serif;
  }
  .nav-pill:hover {
    background: var(--purple-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(107,33,255,0.35);
  }

  /* Hero */
  .hero {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 120px 48px 80px;
    gap: 60px;
  }

  .hero-left {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(107,33,255,0.08);
    border: 1px solid rgba(107,33,255,0.15);
    color: var(--purple);
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    width: fit-content;
    animation: fadeSlideUp 0.6s ease both;
  }

  .eyebrow-dot {
    width: 6px; height: 6px;
    background: var(--purple);
    border-radius: 50%;
    animation: pulse 2s ease infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.7); }
  }

  .hero-heading {
    font-family: 'Clash Display', sans-serif;
    font-size: clamp(48px, 5.5vw, 76px);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -2px;
    color: var(--ink);
    animation: fadeSlideUp 0.6s 0.1s ease both;
  }

  .heading-highlight {
    display: inline-block;
    background: var(--purple);
    color: white;
    padding: 2px 18px 6px;
    border-radius: 12px;
    position: relative;
    transform: rotate(-1.5deg);
    margin-left: 4px;
  }

  .hero-sub {
    font-size: 18px;
    color: var(--gray);
    line-height: 1.65;
    max-width: 420px;
    animation: fadeSlideUp 0.6s 0.2s ease both;
    font-style: italic;
  }

  /* Form */
  .tester-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: fadeSlideUp 0.6s 0.3s ease both;
  }

  .form-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--purple);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .form-row {
    display: flex;
    gap: 10px;
  }

  .email-input {
    flex: 1;
    padding: 14px 18px;
    border: 1.5px solid rgba(107,33,255,0.2);
    border-radius: 12px;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 15px;
    color: var(--ink);
    background: white;
    outline: none;
    transition: all 0.2s;
  }
  .email-input::placeholder { color: #C4B8E8; }
  .email-input:focus {
    border-color: var(--purple);
    box-shadow: 0 0 0 4px rgba(107,33,255,0.1);
  }

  .cta-btn {
    padding: 14px 28px;
    background: var(--purple);
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
  }
  .cta-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent);
    transform: translateX(-100%);
    transition: transform 0.4s;
  }
  .cta-btn:hover::after { transform: translateX(100%); }
  .cta-btn:hover {
    background: var(--purple-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(107,33,255,0.4);
  }
  .cta-btn:active { transform: translateY(0); }

  .form-hint {
    font-size: 12px;
    color: var(--gray);
  }

  .form-status {
    margin-top: 6px;
    font-size: 12px;
  }
  .form-status-error {
    color: #b91c1c;
  }
  .form-status-success {
    color: var(--purple);
  }
  .form-status-loading {
    color: var(--purple);
    opacity: 0.9;
  }

  /* Phone mockup */
  .hero-right {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeSlideUp 0.8s 0.2s ease both;
  }

  .phone-wrapper {
    position: relative;
    width: 280px;
    transform: perspective(1000px) rotateY(-8deg) rotateX(2deg);
    transition: transform 0.6s ease;
  }
  .phone-wrapper:hover {
    transform: perspective(1000px) rotateY(-2deg) rotateX(0deg);
  }

  .phone-frame {
    position: relative;
    width: 280px;
    height: 570px;
    background: var(--ink);
    border-radius: 44px;
    padding: 14px;
    box-shadow:
      0 60px 120px rgba(26,16,37,0.35),
      0 30px 60px rgba(107,33,255,0.15),
      inset 0 0 0 1px rgba(255,255,255,0.12);
  }

  .phone-notch {
    position: absolute;
    top: 14px; left: 50%; transform: translateX(-50%);
    width: 110px; height: 30px;
    background: var(--ink);
    border-radius: 0 0 20px 20px;
    z-index: 10;
  }

  .phone-screen {
    width: 100%;
    height: 100%;
    border-radius: 32px;
    overflow: hidden;
    background: #1a0a2e;
    position: relative;
  }

  .phone-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
  }

  /* phone glow */
  .phone-glow {
    position: absolute;
    inset: -40px;
    background: radial-gradient(ellipse at center, rgba(107,33,255,0.2) 0%, transparent 70%);
    pointer-events: none;
  }

  /* floating tags */
  .float-tag {
    position: absolute;
    background: white;
    border-radius: 12px;
    padding: 10px 14px;
    box-shadow: 0 8px 32px rgba(26,16,37,0.15);
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 7px;
    white-space: nowrap;
    animation: floatTag 4s ease-in-out infinite;
  }
  .float-tag-1 {
    right: -30px;
    top: 80px;
    animation-delay: 0s;
  }
  .float-tag-2 {
    left: -40px;
    bottom: 140px;
    animation-delay: 1.5s;
  }
  .float-tag-icon {
    width: 24px; height: 24px;
    background: var(--purple);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  @keyframes floatTag {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  /* Features strip */
  .features-strip {
    position: relative;
    z-index: 1;
    background: var(--ink);
    padding: 48px;
    display: flex;
    justify-content: center;
  }

  .features-inner {
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(255,255,255,0.08);
    border-radius: 20px;
    overflow: hidden;
  }

  .feature-item {
    background: rgba(255,255,255,0.04);
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: background 0.2s;
  }
  .feature-item:hover { background: rgba(107,33,255,0.12); }

  .feature-icon {
    font-size: 28px;
  }

  .feature-title {
    font-family: 'Clash Display', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: white;
    letter-spacing: -0.3px;
  }

  .feature-desc {
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    line-height: 1.6;
  }

  /* Animations */
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Success state */
  .success-msg {
    padding: 14px 18px;
    background: rgba(107,33,255,0.1);
    border: 1px solid rgba(107,33,255,0.25);
    border-radius: 12px;
    color: var(--purple);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: fadeSlideUp 0.4s ease both;
  }

  @media (max-width: 768px) {
    nav { padding: 16px 24px; }
    .hero {
      grid-template-columns: 1fr;
      padding: 100px 24px 60px;
      text-align: center;
    }
    .hero-sub, .hero-eyebrow { margin: 0 auto; }
    .hero-right { order: -1; }
    .phone-wrapper { transform: none; width: 220px; }
    .phone-frame { width: 220px; height: 450px; border-radius: 38px; }
    .float-tag-1 { right: -10px; }
    .float-tag-2 { left: -10px; }
    .features-inner { grid-template-columns: 1fr; }
    .features-strip { padding: 24px; }
    .form-row { flex-direction: column; }
  }
`;

export default function TagLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus({ type: "error", message: "Please enter your email address" });
      return;
    }
    if (!validateEmail(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address" });
      return;
    }

    setStatus({ type: "loading", message: "Submitting..." });
    try {
      const response = await fetch("https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus({ type: "success", message: "Thank you! We'll notify you when we launch." });
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit email");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status.type === "error") {
      setStatus({ type: "idle", message: "" });
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="lp-root">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-grid" />

        {/* Nav */}
        <nav>
          <div className="nav-logo">
            <img
              src={tagLogoPurple}
              alt="Tag logo"
              className="nav-logo-img"
            />
          </div>
          <button
            className="nav-pill"
            onClick={() => document.getElementById("tester-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Join Beta →
          </button>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <div className="eyebrow-dot" />
              iOS Beta · Now Recruiting Testers
            </div>

            <h1 className="hero-heading">
              Create Videos
              <br />
              <span className="heading-highlight">With Friends</span>
            </h1>

            <p className="hero-sub">
              Tag lets friends collaborate remotely to co-create video stories in a simple, fun and spontaneous way.
            </p>

            <form id="tester-form" className="tester-form" onSubmit={handleSubmit}>
              <div className="form-label">Interested? We're looking for iOS testers</div>
              {submitted ? (
                <div className="success-msg">
                  ✓ You're on the list! We'll be in touch soon.
                </div>
              ) : (
                <>
                  <div className="form-row">
                    <input
                      className="email-input"
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={handleInputChange}
                      required
                    />
                    <button className="cta-btn" type="submit" disabled={status.type === "loading"}>
                      {status.type === "loading" ? "Submitting..." : "Become a tester"}
                    </button>
                  </div>
                  <span className="form-hint">No spam. Unsubscribe any time.</span>
                  {status.message && !submitted && (
                    <div className={`form-status form-status-${status.type}`} role="alert">
                      {status.message}
                    </div>
                  )}
                </>
              )}
            </form>
          </div>

          <div className="hero-right">
            <div className="phone-wrapper">
              <div className="phone-glow" />
              <div className="phone-frame">
                <div className="phone-notch" />
                <div className="phone-screen">
                  {/* Decorative screen content */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(160deg, #2d1066 0%, #0f051e 60%, #1a0a2e 100%)",
                      display: "flex",
                      flexDirection: "column",
                      padding: "52px 20px 24px",
                      gap: "16px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Decorative video feed */}
                    {[
                      { color: "#6B21FF", label: "Jordan 🎬", emoji: "🌄" },
                      { color: "#9b5de5", label: "Alex 📲", emoji: "🏖️" },
                      { color: "#4A0FCC", label: "Sam 🎥", emoji: "🌆" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          background: `linear-gradient(135deg, ${item.color}99 0%, ${item.color}44 100%)`,
                          border: `1px solid ${item.color}55`,
                          borderRadius: "16px",
                          padding: "16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          backdropFilter: "blur(8px)",
                          animation: `fadeSlideUp 0.5s ${0.4 + i * 0.15}s ease both`,
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "14px",
                            background: item.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "22px",
                          }}
                        >
                          {item.emoji}
                        </div>
                        <div>
                          <div style={{ color: "white", fontSize: "13px", fontWeight: 600 }}>{item.label}</div>
                          <div
                            style={{
                              width: `${60 + i * 15}px`,
                              height: "4px",
                              background: "rgba(255,255,255,0.2)",
                              borderRadius: "2px",
                              marginTop: "4px",
                            }}
                          />
                        </div>
                        <div style={{ marginLeft: "auto", fontSize: "18px" }}>▶️</div>
                      </div>
                    ))}

                    <div
                      style={{
                        marginTop: "auto",
                        background: tagColors.purple,
                        color: "white",
                        borderRadius: "14px",
                        padding: "14px",
                        textAlign: "center",
                        fontSize: "14px",
                        fontWeight: 700,
                        letterSpacing: "-0.3px",
                        cursor: "pointer",
                      }}
                    >
                      + Add your clip 🎬
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="float-tag float-tag-1">
                <div className="float-tag-icon">🎬</div>
                <div>
                  <div style={{ fontSize: "11px", color: tagColors.gray, fontWeight: 400 }}>New clip from</div>
                  <div style={{ color: tagColors.ink }}>Jordan</div>
                </div>
              </div>
              <div className="float-tag float-tag-2">
                <div className="float-tag-icon">✅</div>
                <div>
                  <div style={{ fontSize: "11px", color: tagColors.gray, fontWeight: 400 }}>Story complete!</div>
                  <div style={{ color: tagColors.ink }}>3 collaborators</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <div className="features-strip">
          <div className="features-inner">
            {[
              {
                icon: "🎥",
                title: "Pass the torch",
                desc: "Record your clip and tag a friend — they pick up the story wherever you left off.",
              },
              {
                icon: "🌍",
                title: "Create remotely",
                desc: "You and your friends can be anywhere in the world and still make something together.",
              },
              {
                icon: "⚡",
                title: "Stay spontaneous",
                desc: "No scripts, no editing apps — just raw, authentic moments stitched into stories.",
              },
            ].map((f, i) => (
              <div key={i} className="feature-item">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}