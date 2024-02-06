import React from 'react';

import { FACEBOOK_URL, TWITTER_URL, INSTAGRAM_URL, YOUTUBE_URL, LINKEDIN_URL } from '~/consts/urls';

const socialLinks = [
    {
      url: FACEBOOK_URL,
      iClassName: 'fab fa-facebook-f',
    },
    {
      url: TWITTER_URL,
      iClassName: 'fab fa-twitter',
    },
    {
      url: INSTAGRAM_URL,
      iClassName: 'fab fa-instagram',
    },
    {
      url: YOUTUBE_URL,
      iClassName: 'fab fa-youtube',
    },
    {
      url: LINKEDIN_URL,
      iClassName: 'fab fa-linkedin',
    },
];

const SocialLinks = (props) => {
  return <div className="icon-links">
    {socialLinks.map((socialLink, idx) => <a className="link-item" href={socialLink.url} target="__blank">
      <i class={(socialLink.url == LINKEDIN_URL) ? 'fab fa-linkedin-in' : socialLink.iClassName} />
    </a>)}
  </div>;
};

export default SocialLinks;
