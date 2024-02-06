import React, { useState } from 'react';
import './styles.scss';
import Footer from '../footer/footer';
import { SUBSCRIBE_URL, DONATE_URL } from '~/consts/urls';
import SocialLinks from '~/components/socialLinks/index.js';

const LandingFooter = () => {
  const [email, setEmail] = useState('');
  return (
    <div className="landing-footer">
      <div className="container">
        <div className="contact">
          <div className="footer-col">
            <div className="title">Subscribe</div>
            <div className="desc">
              Our free monthly newsletter offers the latest news, tools, and
              resources for palliative care, advanced illness, and grief
            </div>
            <div className="subscribe-email">
              <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <div className="submit-btn colored-btn featured-btn">
                <a href={SUBSCRIBE_URL}>
                  Sign up<i class="fas fa-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-col">
            <div className="title">Donate</div>
            <div className="desc">
              Please help us continue our work. Support our registered charity,
              the International Centre for Dignity and Palliative Care, Inc.
            </div>
            <div className="donate colored-btn featured-btn">
              <a href={DONATE_URL}>
                Donate today<i class="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <div className="title">Follow</div>
            <div className="desc">
              Socialize with #VirtualHospice for more news, stories and
              resources from us and our partners across Canada and around the
              world.
            </div>
            <SocialLinks />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingFooter;
