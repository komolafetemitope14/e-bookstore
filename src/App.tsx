import { useState } from 'react'
import './App.css'

const themes = [
  {
    number: '01',
    title: 'Intentional Parenting',
    text: 'Parent with purpose, awareness, and a clear understanding of the values you want to build in your child.',
  },
  {
    number: '02',
    title: 'Character',
    text: 'Help children develop values that guide their choices even when parents are not there to make decisions for them.',
  },
  {
    number: '03',
    title: 'Emotional Resilience',
    text: 'Prepare children to face disappointment, change, pressure, and uncertainty with greater strength and self-awareness.',
  },
  {
    number: '04',
    title: 'Sound Judgement',
    text: 'Encourage thoughtful decision-making so children learn to recognise consequences and choose wisely.',
  },
  {
    number: '05',
    title: 'Independence',
    text: 'Raise children who can think for themselves, take responsibility, and navigate life with confidence and discernment.',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="brand"
            href="#home"
            aria-label="Raising Beyond Today home"
            onClick={closeMenu}
          >
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-page brand-page-left" />
              <span className="brand-page brand-page-right" />
            </span>

            <span className="brand-copy">
              <strong>Raising Beyond Today</strong>
              <small>Abimbola Olamoju</small>
            </span>
          </a>

          <button
            className="menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
            <a href="#book" onClick={closeMenu}>
              The Book
            </a>
            <a href="#themes" onClick={closeMenu}>
              Key Themes
            </a>
            <a href="#author" onClick={closeMenu}>
              The Author
            </a>
            <a className="nav-cta" href="#buy" onClick={closeMenu}>
              Buy the Book
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">A practical guide for today's parents</p>

              <h1>
                Raise for today.
                <span>Prepare for tomorrow.</span>
              </h1>

              <p className="hero-lead">
                Every parent desires a better future for their children. But how
                do we prepare them for a world we cannot fully predict?
              </p>

              <p className="hero-description">
                <strong>Raising Beyond Today</strong> is a practical guide to
                intentional parenting in a digital world — helping parents
                nurture character, resilience, sound judgement, and
                independence.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#buy">
                  Buy the Book
                  <span aria-hidden="true">→</span>
                </a>

                <a className="text-link" href="#book">
                  Discover the book
                  <span aria-hidden="true">↓</span>
                </a>
              </div>

              <div className="hero-proof">
                <div>
                  <strong>Intentional</strong>
                  <span>Parenting</span>
                </div>
                <div>
                  <strong>Practical</strong>
                  <span>Guidance</span>
                </div>
                <div>
                  <strong>Future-ready</strong>
                  <span>Children</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="book-glow" />
              <div className="book-stage">
                <img
                  src={`${import.meta.env.BASE_URL}images/raising-beyond-today.jpeg`}
                  alt="Raising Beyond Today book jacket by Abimbola Olamoju"
                  className="book-image"
                />
              </div>

              <div className="floating-note">
                <span className="floating-note-mark">“</span>
                <p>Invest in their today.</p>
                <strong>Prepare them for tomorrow.</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="intro-strip">
          <div className="container intro-strip-inner">
            <p>For parents raising children in a changing world</p>
            <span aria-hidden="true" />
            <p>Built on real-life experiences and reflections</p>
            <span aria-hidden="true" />
            <p>Focused on values that last beyond childhood</p>
          </div>
        </section>

        <section className="section book-section" id="book">
          <div className="container book-layout">
            <div className="section-heading">
              <p className="eyebrow">Inside the book</p>
              <h2>
                What makes this
                <span>book different?</span>
              </h2>
            </div>

            <div className="book-story">
              <p className="lead-paragraph">
                Raising Beyond Today goes beyond inspiration to explore the
                real-life challenges of intentional parenting.
              </p>

              <p>
                Built on real-life experiences, reflections, and insights from
                everyday parents, it offers practical guidance to help parents
                understand their children’s uniqueness, respond more
                thoughtfully to their behaviour, and nurture character,
                emotional resilience, sound judgement, and independence.
              </p>

              <p>
                This book encourages parents to raise children who can think
                independently, make wise choices, take responsibility, and
                navigate life with confidence and discernment.
              </p>
            </div>
          </div>
        </section>

        <section className="section themes-section" id="themes">
          <div className="container">
            <div className="themes-heading">
              <div>
                <p className="eyebrow eyebrow-light">What you will explore</p>
                <h2>Building what matters for life.</h2>
              </div>

              <p>
                Parenting is not only about managing the present. It is about
                intentionally building qualities children can carry into the
                future.
              </p>
            </div>

            <div className="themes-grid">
              {themes.map((theme) => (
                <article className="theme-card" key={theme.number}>
                  <span className="theme-number">{theme.number}</span>
                  <h3>{theme.title}</h3>
                  <p>{theme.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-section">
          <div className="container quote-inner">
            <span className="large-quote" aria-hidden="true">
              “
            </span>

            <blockquote>
              Because the greatest inheritance is not only what we leave for
              our children, but what we intentionally build in them.
            </blockquote>

            <div className="quote-line" />
            <p>Raising Beyond Today</p>
          </div>
        </section>

        <section className="section author-section" id="author">
          <div className="container author-grid">
            <div className="author-visual">
              <div className="portrait-frame">
                <img
                  src={`${import.meta.env.BASE_URL}images/abimbola-olamoju.jpeg`}
                  alt="Abimbola Olamoju, author of Raising Beyond Today"
                />
              </div>

              <div className="author-name-card">
                <span>Author</span>
                <strong>Abimbola Olamoju</strong>
              </div>
            </div>

            <div className="author-copy">
              <p className="eyebrow">About the author</p>
              <h2>A passionate voice for intentional parenting.</h2>

              <p className="author-intro">
                Abimbola Olamoju is a graduate, a mother, and a passionate
                voice for intentional parenting. She is deeply committed to
                family values, responsibility, and raising children
                intentionally.
              </p>

              <p>
                Her core message is simple yet powerful: parents must be
                intentional, not just about who their children are today, but
                also about who they are becoming.
              </p>

              <p>
                Through her experiences as a mother, she understands that
                intentional parenting is a continuous journey of learning,
                reflection, and growth. Through her work, she encourages
                parents to train, guide, and support their children with divine
                wisdom and consistency.
              </p>

              <p>
                <strong>Raising Beyond Today</strong> reflects her desire to
                help parents prepare their children not just for academic and
                professional success, but for the realities and
                responsibilities of life.
              </p>

              <p>
                As she continues her own journey of raising her children, her
                vision extends beyond her home. She desires to see a generation
                of well-raised, value-driven, and God-fearing children who will
                help build a more responsible and values-oriented society—one
                with fewer children who are abused, neglected, or broken, and
                more who grow into responsible, self-aware, and impactful
                leaders of tomorrow.
              </p>
            </div>
          </div>
        </section>

        <section className="purchase-section" id="buy">
          <div className="container purchase-card">
            <div className="purchase-copy">
              <p className="eyebrow eyebrow-light">Get your copy</p>

              <h2>
                Invest in their today.
                <span>Prepare them for tomorrow.</span>
              </h2>

              <p>
                Start a more intentional parenting journey with practical
                insights designed for the realities families face today.
              </p>

              <div className="purchase-meta">
                <div>
                  <span>Title</span>
                  <strong>Raising Beyond Today</strong>
                </div>

                <div>
                  <span>Author</span>
                  <strong>Abimbola Olamoju</strong>
                </div>

                <div>
                  <span>Currency</span>
                  <strong>Nigerian Naira (₦)</strong>
                </div>
              </div>
            </div>

            <div className="purchase-box">
              <div className="purchase-box-heading">
                <p className="purchase-label">Choose Your Edition</p>
                <h3>Get your copy</h3>
                <p className="purchase-subtitle">
                  Select how you would like to experience Raising Beyond Today.
                </p>
              </div>

              <div className="edition-options">
                <article className="edition-option edition-option-featured">
                  <div className="edition-topline">
                    <span className="edition-badge">Digital Access</span>
                    <span className="edition-availability">Instant after payment</span>
                  </div>

                  <div className="edition-heading">
                    <div>
                      <span className="edition-type">E-Book Edition</span>
                      <h4>E-Book</h4>
                    </div>

                    <div className="edition-price-block">
                      <span>Book price</span>
                      <strong>₦100</strong>
                    </div>
                  </div>

                  <p className="edition-description">
                    Secure online access to the digital edition through your
                    personal account after payment is verified.
                  </p>

                  <ul className="edition-benefits">
                    <li>
                      <span aria-hidden="true">✓</span>
                      Protected digital access
                    </li>
                    <li>
                      <span aria-hidden="true">✓</span>
                      Available after verified payment
                    </li>
                  </ul>

                  <button
                    className="button button-gold purchase-button"
                    type="button"
                    onClick={() =>
                      window.alert(
                        'E-book checkout will be connected to Paystack during UAT.',
                      )
                    }
                  >
                    Pay ₦100 for E-Book
                    <span aria-hidden="true">→</span>
                  </button>
                </article>

                <article className="edition-option">
                  <div className="edition-topline">
                    <span className="edition-badge edition-badge-physical">
                      Physical Copy
                    </span>
                    <span className="edition-availability">
                      Delivery information required
                    </span>
                  </div>

                  <div className="edition-heading">
                    <div>
                      <span className="edition-type">Printed Edition</span>
                      <h4>Hard Cover</h4>
                    </div>

                    <div className="edition-price-block">
                      <span>Book price</span>
                      <strong>₦150</strong>
                    </div>
                  </div>

                  <p className="edition-description">
                    Receive a physical hard-cover copy. We will collect the
                    recipient's delivery information during checkout.
                  </p>

                  <ul className="edition-benefits">
                    <li>
                      <span aria-hidden="true">✓</span>
                      Physical hard-cover edition
                    </li>
                  </ul>

                  <button
                    className="button button-outline purchase-button"
                    type="button"
                    onClick={() =>
                      window.alert(
                        'Hard-cover checkout and delivery details will be connected during UAT.',
                      )
                    }
                  >
                    Pay ₦150 for Hard Cover
                    <span aria-hidden="true">→</span>
                  </button>
                </article>
              </div>

              <div className="payment-assurance">
                <span className="payment-lock" aria-hidden="true">
                  ✓
                </span>
                <p>
                  <strong>Secure checkout</strong>
                  Payment confirmation will only happen after successful
                  server-side verification.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <a className="brand brand-footer" href="#home">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-page brand-page-left" />
                <span className="brand-page brand-page-right" />
              </span>

              <span className="brand-copy">
                <strong>Raising Beyond Today</strong>
                <small>Abimbola Olamoju</small>
              </span>
            </a>

            <p>
              Raising children with intention, wisdom, character, and a vision
              that reaches beyond today.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h3>Explore</h3>
              <a href="#book">The Book</a>
              <a href="#themes">Key Themes</a>
              <a href="#author">The Author</a>
              <a href="#buy">Buy E-Book</a>
            </div>

            <div>
              <h3>Contact</h3>
              <a href="tel:08032739874">08032739874</a>
              <a href="mailto:abimbolaolamoju93@gmail.com">
                abimbolaolamoju93@gmail.com
              </a>
            </div>

            <div>
              <h3>Information</h3>
              <span>Digital Access</span>
              <span>Refund Policy</span>
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} Raising Beyond Today. All rights
            reserved.
          </p>
          <p>Written by Abimbola Olamoju</p>
        </div>
      </footer>
    </div>
  )
}

export default App
