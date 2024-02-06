import React from 'react';
import './styles.scss';
import Slider from 'react-slick';

import { ReactComponent as Medication } from '~/assets/svg/Medication.svg';
import { ReactComponent as Library } from '~/assets/svg/Library.svg';
import { ReactComponent as Notes } from '~/assets/svg/Notes.svg';
import { ReactComponent as Expenses } from '~/assets/svg/Expenses.svg';
import { ReactComponent as Health } from '~/assets/svg/Health.svg';
import { ReactComponent as Calendar } from '~/assets/svg/Calendar.svg';
import { ReactComponent as SharedAccess } from '~/assets/svg/SharedAccess.svg';
import { ReactComponent as Heart } from '~/assets/svg/Heart.svg';
import { ReactComponent as PreviousArrow } from '~/assets/svg/PreviousArrow.svg';
import { ReactComponent as NextArrow } from '~/assets/svg/NextArrow.svg';

import useAppState from '~/appState';

const feedbackSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <PreviousArrow />,
  prevArrow: <NextArrow />,
};

const partnerSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  nextArrow: <PreviousArrow />,
  prevArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const feedbacks = [
  {
    desc: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labtna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.”',
    personName: 'Name of Person',
  },
  {
    desc: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labtna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.”',
    personName: 'Name of Person',
  },
  {
    desc: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labtna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.”',
    personName: 'Name of Person',
  },
  {
    desc: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labtna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.”',
    personName: 'Name of Person',
  },
];

const steps = [
  {
    title: 'Setup your free account',
    desc: 'It is a long established fact that a reader will be distracted by the content',
  },
  {
    title: 'Enter in your preferences',
    desc: 'It is a long established fact that a reader will be distracted by the content',
  },
  {
    title: 'Start tracking!',
    desc: 'It is a long established fact that a reader will be distracted by the content',
  },
];

const highlights = [
  {
    desc: 'Access, track and plot symptoms over time, including severity and frequency in a simple, easy to manage report that can be shared with healthcare provides and teams',
    imgLink: '/img/landing/sample-highlight.png',
  },
  {
    desc: 'Access and track caregiver wellbeing, preparedness, and comfortability with caregiving and translates into a report that can be shared with healthcare teams or other parties',
    imgLink: '/img/landing/sample-highlight.png',
  },
  {
    desc: "Uses each individuals' responses to symptoms, well-being, and caregiving related items to provide an individualized library of resources, programs and services for each user",
    imgLink: '/img/landing/sample-highlight.png',
  },
  {
    desc: 'Enables linking of multiple user accounts',
    imgLink: '/img/landing/sample-highlight.png',
  },
  {
    desc: 'Determines your geographical location and provides an individualized list of programs and services within your area',
    imgLink: '/img/landing/sample-highlight.png',
  },
];

const reports = [
  {
    title: 'Medication tracker',
    img: <Medication />,
    imgLink: '/img/landing/medication.png',
    hoverText:
      'Create reports from tracked symptoms, concerns and mobility data.',
  },
  {
    title: 'Symptom tracker',
    img: <Health />,
    imgLink: '/img/landing/symptom_tracker.png',
    hoverText:
      'Create reports from tracked symptoms, concerns and mobility data.',
  },
  {
    title: 'Reports',
    img: <Heart />,
    imgLink: '/img/landing/reports.png',
    hoverText:
      'Create reports from tracked symptoms, concerns and mobility data.',
  },
  {
    title: 'Finance tracker',
    img: <Expenses />,
    imgLink: '/img/landing/finance_tracker.png',
    hoverText:
      'Create reports from tracked symptoms, concerns and mobility data.',
  },
  {
    title: 'Library',
    img: <Library />,
    imgLink: '/img/landing/library.png',
    hoverText:
      'Create reports from tracked symptoms, concerns and mobility data.',
  },
  {
    title: 'Calendar',
    img: <Calendar />,
    imgLink: '/img/landing/calendar.png',
    hoverText:
      'Create reports from tracked symptoms, concerns and mobility data.',
  },
  {
    title: 'My notes (journal)',
    img: <Notes />,
    imgLink: '/img/landing/notes.png',
    hoverText:
      'Create reports from tracked symptoms, concerns and mobility data.',
  },
  {
    title: 'Shared access',
    img: <SharedAccess />,
    imgLink: '/img/landing/shared_access.png',
    hoverText:
      'Create reports from tracked symptoms, concerns and mobility data.',
  },
];

// Postfix list for investor names
const investorPostfixList = ['1'];
// Postfix list for partner names
const partnerPostfixList = ['1', '2', '3', '4', '5', '6', '1', '2'];

const FrontPage = () => {
  const {
    global: { userId },
  } = useAppState();

  return (
    <div className="front-page-style">
      <div className="hero">
        <div className="hero-bg">
          <div className="container">
            <h1>Headline goes here something like this</h1>
            <div className="description">
              <div className="text-content">
                <p>
                  Overview text of what CareHub is and the benefits. Possibly
                  links to jump down the page to get started.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  execellotor.
                </p>
                <p>Mucho contento pour si vour.</p>
                <p>
                  And more text including link to specific features for{' '}
                  <a href="#">Healthcare Providers</a> {'>'}
                </p>
              </div>
              <div className="video-box">
                <iframe
                  src="https://player.vimeo.com/video/80574787?h=e7685d8b76&portrait=0&byline=0"
                  width="100%"
                  height="100%"
                  frameborder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-bg-blue">
        <div className="container">
          <section className="highlights">
            <h2>How can CareHub help me?</h2>
            <p>
              Some space here for paragraph and maybe some bullets for benefits?
            </p>
            <ul>
              <li>What's in it for me?</li>
              <li>Why would I do this?</li>
            </ul>
            <div className="highlight-list">
              {highlights.map((highlight, idx) => (
                <div className="item" key={idx + highlight.imgLink}>
                  <div className="icon">
                    <img src={highlight.imgLink} alt="" />
                  </div>
                  <div className="desc">{highlight.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="container">
        <section className="slider">
          <Slider {...feedbackSliderSettings}>
            {feedbacks.map((feedback, idx) => (
              <div className="feedback" key={idx + feedback.personName}>
                <p>{feedback.desc}</p>
                <div className="name">{feedback.personName}</div>
              </div>
            ))}
          </Slider>
        </section>
        <section className="features">
          <h2>CareHub features</h2>
          <div className="feature-text">
            <p>
              The CareHub is an application for individuals living with life
              limiting illnesses and their caregivers that provides educational
              and supportive information based on each individuals' needs to
              improve the quality of informal care provided at home and by
              healthcare providers. [may need a little more space here for a
              longer blurb or some bullets?]
            </p>
            <p>
              Additional content goes here. The CareHub is an application for
              individuals living with life limiting illnesses and their
              caregivers that provides educational and supportive information
              based on each individuals' needs to improve the quality of
              informal care provided at home and by healthcare providers. [may
              need a little more space here for a longer blurb or some bullets?
            </p>
          </div>
          <div className="feature-list">
            {reports.map((report, idx) => (
              <div className="feature-item" key={report.title + idx}>
                <div className="intro-box">
                  <div className="icon">{report.img}</div>
                  <div className="title">{report.title}</div>
                </div>
                <div className="learn-more-box">
                  <p>{report.hoverText}</p>
                  <div className="learn-more-btn featured-btn">
                    Learn more <i class="fas fa-chevron-right"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="special-features">
            <div className="left-img"></div>
            <div className="content">
              <h2>Special features just for Health Care Providers too</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida.
              </p>
              <ul>
                <li>
                  Esed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </li>
                <li>
                  Esed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Quis ipsum suspendisse ultrices gravida.
                </li>
                <li>
                  Esed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </li>
                <li>
                  Esed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Quis ipsum suspendisse ultrices gravida.
                </li>
                <li>
                  Esed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </li>
              </ul>
              <div className="more-heath-care-btn featured-btn">
                More health care provider features
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </section>
        <section className="how-to">
          <h2>How to get started, what to expect</h2>
          <p>
            Can start now and return later.... How much time investment on the
            front end... Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor
            sit amet, consectetur adipiscing eli.
          </p>
          <p>
            Esed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Quis ipsum suspendisse ultrices gravida.
          </p>
          <div className="steps">
            {steps.map((step, idx) => (
              <div className="step-item" key={step.title + idx}>
                <div className="highlight-number">{idx + 1}</div>
                <div className="content">
                  <div className="title">{step.title}</div>
                  <div className="desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="container">
        <section className="investment-and-partners">
          <h6 className="partners-title">Legal+</h6>
          <div className="investment">
            <div className="investment-from">
              <h3>With investment from</h3>
              <div className="list">
                {investorPostfixList.map((name, idx) => (
                  <div key={idx} className="item">
                    <img src={`/img/landing/investor-${name}.png`} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/*<div className="partners">
            <h3>Partners</h3>
            <div className="slider-box">
              <Slider {...partnerSliderSettings}>
                {partnerPostfixList.map((name, idx) => (
                  <div key={idx} className="partner-item">
                    <img src={`/img/landing/partner-${name}.png`} alt="" />
                  </div>
                ))}
              </Slider>
            </div>
                </div>*/}
        </section>
      </div>
      {!userId && (
        <div className="container">
          <section className="call-to-action">
            <h3>Call to action text to Create your personal CareHub now</h3>
            <div className="create-account-btn featured-btn">
              <a href="/sign-up" target="__blank">
                Create your personal CareHub
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
