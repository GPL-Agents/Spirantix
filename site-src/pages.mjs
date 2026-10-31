import { renderPage } from './layout.mjs';
import { agents, events, lessonIndex } from './data.mjs';

function pageHero(eyebrow, title, lede, actions = '') {
  return `<section class="page-hero">
    <div class="wrap">
      <p class="eyebrow">${eyebrow}</p>
      <h1>${title}</h1>
      <p class="lede">${lede}</p>
${actions ? `      <div class="button-row" style="margin-top:28px">${actions}</div>` : ''}
    </div>
  </section>`;
}

function stopHandIcon() {
  return `<div class="stop-hand" aria-hidden="true">
    <svg viewBox="0 0 24 24">
      <path d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"/>
    </svg>
  </div>`;
}

function eventCards(list, { past = false } = {}) {
  return `<div class="event-list">${list.map(event => `<article class="event-card${past ? ' event-card-past' : ''}">
    <div class="event-date"><span class="day">${event.shortDate}</span> <span>${event.time}</span></div>
    <div>
      <h3>${event.title}</h3>
      <p class="event-meta">${event.host} · ${event.location}</p>
      <p>${event.context}</p>
      ${!past && event.phone ? `<p class="small"><strong>Host phone:</strong> ${event.phone}</p>` : ''}
      ${past ? '' : `<a class="text-link" href="${event.hostUrl}" target="_blank" rel="noopener">${event.hostAction}</a>`}
    </div>
    ${past && event.photo ? `<div class="event-photo">${event.photoUrl ? `<a href="${event.photoUrl.replace(/&/g, '&amp;')}" target="_blank" rel="noopener" aria-label="See photos from this session on Facebook (opens in a new tab)">` : ''}<img src="${event.photo}" alt="${event.photoAlt || ''}" width="320" height="240" loading="lazy">${event.photoUrl ? '</a>' : ''}</div>` : ''}
  </article>`).join('')}</div>`;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function upcomingEvents() {
  const today = todayIso();
  return events.filter(event => event.date >= today);
}

function pastEvents() {
  const today = todayIso();
  return events.filter(event => event.date < today).slice().reverse();
}

function lessonCards(includePlanned = false) {
  const lessons = includePlanned === 'planned'
    ? lessonIndex.filter(lesson => lesson.status === 'planned')
    : includePlanned
      ? lessonIndex
      : lessonIndex.filter(lesson => lesson.status === 'published');
  return `<div class="lesson-grid">${lessons.map(lesson => {
    const published = lesson.status === 'published';
    const content = `<p class="lesson-number">Lesson ${lesson.number}</p>
      <h3>${lesson.title}</h3>
      <p>${lesson.description}</p>
      <p class="lesson-meta">${published ? `${lesson.time} · <span class="text-link">Read the lesson</span>` : '<span class="planned-marker">*</span> Planned for the learning library'}</p>`;
    return published
      ? `<a class="card card-link lesson-card" href="learn/${lesson.slug}.html">${content}</a>`
      : `<article class="card lesson-card">${content}</article>`;
  }).join('')}</div>`;
}

function agentCards() {
  return `<div class="agent-grid">${agents.map(agent => `<a class="card card-link agent-card" href="${agent.page}">
    <picture><source srcset="${agent.image}" type="image/webp"><img src="${agent.fallback}" alt="Illustrated portrait of ${agent.name}, ${agent.role}" loading="lazy"></picture>
    <span class="status ${agent.status === 'Beta' ? 'beta' : ''}">${agent.status}</span>
    <h3>${agent.name}</h3>
    <p><strong>${agent.role}</strong></p>
    <p>${agent.description}</p>
    <span class="text-link">Meet ${agent.name}</span>
  </a>`).join('')}</div>`;
}

const homeBody = `<section class="hero home-hero">
  <div class="wrap">
    <div class="home-hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">AI education and tools for seniors</p>
        <h1>Understand AI. Use it with confidence. <span class="accent-script">Stay safe.</span></h1>
        <p class="lede">Spirantix makes artificial intelligence easier to understand and more useful in everyday life, with plain-language lessons, practical safety guidance, community classes, and tools designed for seniors.</p>
      </div>
      <div class="hero-visual-block">
        <div class="hero-visual">
          <picture>
            <source srcset="assets/grandfather-grandson-learning.webp" type="image/webp">
            <img src="assets/grandfather.grandson.story.png" width="1200" height="848" fetchpriority="high" alt="A grandfather and grandson learning together with a tablet">
          </picture>
        </div>
        <div class="hero-actions">
          <a class="btn" href="learn.html">Start learning</a>
          <a class="btn btn-secondary" href="contact.html?type=speaking">Request a session</a>
        </div>
        <p class="hero-note">Choose Start learning for self-guided lessons, find a nearby event under Classes &amp; Talks, or request a session for your community.</p>
      </div>
    </div>
  </div>
</section>

<section class="home-app-promo" aria-labelledby="home-app-title">
  <div class="wrap">
    <div class="home-app-card">
      <div class="home-app-copy">
        <h2 id="home-app-title">A simpler way to keep track of what matters</h2>
        <ul class="home-app-benefits">
          <li><span class="home-app-icon home-app-icon-people" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></span><span>People and memories</span></li>
          <li><span class="home-app-icon home-app-icon-calendar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM16 2v4M8 2v4M3 10h18"/></svg></span><span>Appointments and reminders</span></li>
          <li><span class="home-app-icon home-app-icon-photo" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></span><span>Photos and treasured items</span></li>
          <li><span class="home-app-icon home-app-icon-safe" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg></span><span>Safe &amp; private chat &amp; web search</span></li>
        </ul>
      </div>
      <div class="home-app-media">
        <p class="home-app-beta">Now in beta</p>
        <div class="home-app-devices" aria-label="Preview of Spirantix Concierge on a tablet and phone">
          <div class="home-app-tablet">
            <img src="assets/spirantix-concierge-beta.png" alt="Spirantix Concierge showing the search box, seven day view, daily plan, and recent memories" width="1130" height="1260" loading="lazy">
          </div>
          <div class="home-app-phone" aria-hidden="true">
            <img src="assets/spirantix-concierge-beta.png" alt="" width="1130" height="1260" loading="lazy">
          </div>
        </div>
        <a class="btn home-app-cta" href="https://api.spirantix.ai/app">Try Spirantix Concierge</a>
      </div>
    </div>
  </div>
</section>

<section class="section section-soft home-video-section" aria-labelledby="home-video-title">
  <div class="wrap">
    <div class="section-heading center">
      <p class="eyebrow">Meet Spirantix</p>
      <h2 id="home-video-title">AI education and practical tools for seniors</h2>
      <p class="lede">See how Spirantix helps seniors understand AI, use it safely and confidently, and benefit from tools designed around real lives.</p>
    </div>
    <div class="home-video-frame">
      <iframe src="https://www.youtube-nocookie.com/embed/93hMN3aOeZo?rel=0" title="Introducing Spirantix.ai, AI education and tools for seniors" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div class="button-row home-video-actions">
      <a class="btn btn-secondary" href="https://www.youtube.com/watch?v=93hMN3aOeZo" target="_blank" rel="noopener">Watch on YouTube</a>
    </div>
  </div>
</section>

<section class="section section-white">
  <div class="wrap">
    <div class="section-heading center begin-heading">
      <p class="eyebrow">A clear place to begin</p>
      <h2>AI should feel useful, not overwhelming</h2>
      <p>Choose the path that fits what you want to do today.</p>
    </div>
    <div class="grid-3">
      <a class="card card-link" href="learn.html"><div class="icon">1</div><h3>Understand AI</h3><p>Learn what AI is, how it reached today’s tools, and what it can and cannot do.</p><span class="text-link">Visit the learning hub</span></a>
      <a class="card card-link" href="learn/better-prompts.html"><div class="icon">2</div><h3>Use it with confidence</h3><p>Practice asking useful questions and turn AI into a patient helper for everyday tasks.</p><span class="text-link">Learn how to ask</span></a>
      <a class="card card-link" href="safety.html"><div class="icon">3</div><h3>Protect what matters</h3><p>Spot scams, false AI answers, and misinformation, then learn how to respond.</p><span class="text-link">Explore Stay Safe</span></a>
    </div>
  </div>
</section>

<section class="section section-soft">
  <div class="wrap">
    <div class="section-heading">
      <p class="eyebrow">Upcoming in-person learning</p>
      <h2>Join a Spirantix session</h2>
      <p>Attendance is managed by each host. Contact the location directly for availability and other details.</p>
    </div>
    ${eventCards(upcomingEvents().slice(0, 2))}
    <div class="button-row" style="margin-top:30px"><a class="btn btn-teal" href="classes.html">See classes and talks</a><a class="text-link" href="contact.html?type=speaking">Bring a session to your community</a></div>
  </div>
</section>
${pastEvents().length ? `<section class="section section-soft">
  <div class="wrap">
    <div class="section-heading">
      <p class="eyebrow">Past sessions</p>
      <h2>Recent Spirantix sessions</h2>
    </div>
    ${eventCards(pastEvents().slice(0, 2), { past: true })}
  </div>
</section>` : ''}

<section class="section section-white">
  <div class="wrap facebook-layout">
    <div class="section-heading">
      <p class="eyebrow">Follow along</p>
      <h2>See recent updates on Facebook</h2>
      <p>Photos and notes from classes, talks, and community sessions.</p>
    </div>
    <div id="fb-root"></div>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v20.0"></script>
    <div class="facebook-embed">
      <div class="fb-page" data-href="https://www.facebook.com/profile.php?id=61594442789361" data-tabs="timeline" data-width="500" data-height="560" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="false">
        <blockquote cite="https://www.facebook.com/profile.php?id=61594442789361" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/profile.php?id=61594442789361">Spirantix</a></blockquote>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-heading">
      <p class="eyebrow">Start here</p>
      <h2>Friendly introductions to AI</h2>
      <p>Each lesson explains one idea in ordinary language and includes a practical activity.</p>
    </div>
    ${lessonCards(false)}
    <div class="button-row" style="margin-top:30px"><a class="btn btn-secondary" href="learn.html">See the full learning plan</a></div>
  </div>
</section>

<section class="section section-white">
  <div class="wrap home-safety-section">
    <p class="eyebrow">Stay safe</p>
    <h2>Pause, check, and protect your information</h2>
    <div class="grid-2 home-safety-content">
    <div>
      <p class="lede">Scammers use urgency, secrecy, and familiar names to push people into acting before they have time to think. A few simple habits can make a real difference.</p>
      <a class="btn" href="safety.html">Learn the warning signs</a>
    </div>
    <div class="callout callout-light safety-callout">
      ${stopHandIcon()}
      <div>
        <h3>The most useful first step</h3>
        <p>If a message asks for money, passwords, codes, account numbers, or immediate action, stop. Contact the person or organization using a number or website you already trust.</p>
      </div>
    </div>
    </div>
  </div>
</section>

<section class="section section-blue">
  <div class="wrap">
    <div class="section-heading center">
      <p class="eyebrow">Spirantix products</p>
      <h2>AI tools designed around real lives</h2>
      <p>Our developing product family helps with memory, stories, authenticity, and family possessions. The experience begins with one concierge, so you do not need to decide which specialist to ask.</p>
    </div>
    <div class="callout concierge-callout">
      <picture>
        <img src="assets/snap-emery-tablet.webp" width="300" height="300" loading="lazy" alt="An older woman comfortably using a tablet at home">
      </picture>
      <div>
        <p class="eyebrow" style="color:var(--mint)">Your starting point</p>
        <h3>Spirantix Concierge</h3>
        <p>You explain what you need once. The concierge listens, guides the conversation, and brings in Emery, Capsa, Addie, or Heri when their specialty can help.</p>
      </div>
    </div>
    ${agentCards()}
    <div class="button-row" style="margin-top:30px;justify-content:center"><a class="btn btn-secondary" href="products.html">Explore Spirantix products</a></div>
  </div>
</section>

<section class="section section-dark">
  <div class="narrow" style="text-align:center">
    <p class="eyebrow" style="color:var(--mint)">Learning for your community</p>
    <h2>Bring an approachable AI session to your residents or members</h2>
    <p class="lede">Single talks, guest sessions, and multi-week courses are available. In-person learning is preferred, with video sessions available when needed.</p>
    <a class="btn" href="contact.html?type=speaking">Request information</a>
  </div>
</section>`;

const learnBody = `<section class="page-hero media-page-hero">
  <div class="wrap media-page-hero-grid">
    <div class="media-page-hero-copy">
      <p class="eyebrow">Learning hub</p>
      <h1>Learn AI one useful step at a time</h1>
      <p class="lede">You do not need a technical background. Begin with a short lesson, try one example, and return whenever you are ready for the next step.</p>
      <div class="button-row" style="margin-top:28px"><a class="btn" href="learn/what-is-ai.html">Start with lesson one</a><a class="btn btn-secondary" href="classes.html">Learn in person</a></div>
    </div>
    <div class="media-page-hero-image">
      <img src="assets/senior.learn.png" alt="Older woman taking notes while learning on a laptop" width="1122" height="1402">
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="section-heading"><p class="eyebrow">Available now</p><h2>Begin with the basics</h2><p>These lessons give you a practical foundation for using ChatGPT, Claude, and other AI assistants.</p></div>
    ${lessonCards(false)}
  </div>
</section>
<section class="section section-white">
  <div class="wrap">
    <div class="section-heading"><p class="eyebrow">Coming next</p><h2>The complete introductory path</h2><p>Six more lessons will expand the library with search, Projects, privacy, scam awareness, agents and connections, and using the Spirantix Concierge.</p></div>
    ${lessonCards('planned')}
  </div>
</section>
<section class="section section-soft"><div class="wrap grid-2" style="align-items:center"><div><p class="eyebrow">Prefer to learn with a group?</p><h2>Join a class or invite Spirantix to your community</h2><p>Sessions can be shaped for a single introduction, an existing course, or a multi-week learning program.</p></div><div class="button-row"><a class="btn btn-teal" href="classes.html">See upcoming sessions</a><a class="btn btn-secondary" href="contact.html?type=speaking">Request a session</a></div></div></section>`;

const safetyBody = `<section class="page-hero media-page-hero">
  <div class="wrap media-page-hero-grid">
    <div class="media-page-hero-copy">
      <p class="eyebrow">Stay Safe</p>
      <h1>Use AI with curiosity and good judgment</h1>
      <p class="lede">AI can be helpful, but it can make mistakes. It can also help scammers create convincing messages, voices, images, and video. Slow down and verify unexpected requests before you respond.</p>
      <div class="button-row" style="margin-top:28px"><a class="btn" href="#warning-signs">See the warning signs</a></div>
    </div>
    <div class="media-page-hero-image">
      <img src="assets/senior.stay.safe.png" alt="Older man reviewing a document beside a laptop" width="1122" height="1402">
    </div>
  </div>
</section>
<section class="section section-white real-story-section" aria-labelledby="real-story-title">
  <div class="wrap">
    <div class="real-story-intro">
      <p class="eyebrow">Scams can look and sound real</p>
      <h2 id="real-story-title">A familiar face, voice, or company name is not proof</h2>
      <p>Scammers can use public photos, recordings, and personal details to imitate someone you know. When a large payment is possible, they may invest significant time and money to make the story convincing. End the conversation and contact the person or company independently using a number you already know.</p>
    </div>
    <article class="real-story-card">
      <a class="real-story-image" href="https://www.cbsnews.com/texas/news/north-texas-gold-bar-scam-elderly-victim-loses-2-million/" target="_blank" rel="noopener noreferrer" aria-label="Read the CBS News report about the North Texas gold bar scam">
        <img src="https://assets2.cbsnewsstatic.com/hub/i/r/2026/02/04/c8b0d87c-7f63-4139-8b09-db8d2bcc2faf/thumbnail/1200x630/879bf6572b312966f90c00afb53e63c1/jd.png" alt="CBS News Texas report about a retiree who lost his savings in a gold bar scam" loading="lazy">
        <span>Image: CBS News Texas</span>
      </a>
      <div class="real-story-copy">
        <div class="real-story-label"><span>Real story</span><strong>$2 million lost</strong></div>
        <h3>A false bank warning cost one retiree his life savings</h3>
        <p>Robert Brown, a 78-year-old retired geologist, received an email claiming that his bank account had been hacked. Scammers told him to move his money into gold and cryptocurrency for “safekeeping.” Instead, they stole more than $2 million and emptied his retirement savings.</p>
        <p class="real-story-warning"><strong>Remember:</strong> A real bank will not tell you to protect your money by buying gold or cryptocurrency, or by handing valuables to a courier. Call your bank using the number on the back of your card.</p>
        <a class="btn" href="https://www.cbsnews.com/texas/news/north-texas-gold-bar-scam-elderly-victim-loses-2-million/" target="_blank" rel="noopener noreferrer">Read the CBS News story</a>
      </div>
    </article>
  </div>
</section>
<section class="section section-white" id="warning-signs">
  <div class="wrap">
    <div class="section-heading"><p class="eyebrow">Four warning signs</p><h2>Pause when a message uses pressure</h2><p>One warning sign does not prove something is a scam, but it is a good reason to stop and verify.</p></div>
    <div class="grid-4">
      <div class="card"><div class="icon">!</div><h3>Urgency</h3><p>You are told to act immediately or something terrible will happen.</p></div>
      <div class="card"><div class="icon">$</div><h3>Unusual payment</h3><p>You are told to use gift cards, cryptocurrency, a wire transfer, or a payment app.</p></div>
      <div class="card"><div class="icon">?</div><h3>Secrecy</h3><p>You are told not to speak with family, a bank, or another person you trust.</p></div>
      <div class="card"><div class="icon">#</div><h3>Private information</h3><p>You are asked for a password, verification code, account number, or Social Security number.</p></div>
    </div>
  </div>
</section>
<section class="section section-soft" id="the-numbers">
  <div class="wrap">
    <div class="section-heading"><p class="eyebrow">The scale of the problem</p><h2>Two sets of numbers worth knowing</h2><p>Official and industry reports show how much money these crimes move every year.</p></div>
    <div class="charts-grid">
      <figure class="chart-figure">
        <img src="assets/chart-elder-scams.png" width="1600" height="660" loading="lazy" alt="Bar chart: fraud losses reported by adults 60 and over rose from 0.6 billion dollars in 2020 to 2.4 billion dollars in 2024, about four times higher. Phone calls carry the highest median loss of any contact method, at 2,210 dollars.">
        <figcaption>Losses reported by adults 60 and over rose about four-fold, from $0.6 billion in 2020 to $2.4 billion in 2024, and phone calls carry the highest median loss of any contact method. Source: FTC, <em>Protecting Older Consumers 2024–2025</em> (December 2025).</figcaption>
      </figure>
      <figure class="chart-figure">
        <img src="assets/chart-ransomware.png" width="1600" height="660" loading="lazy" alt="Bar chart: the average cost to recover from a ransomware attack was 2.73 million dollars in 2024 and 1.53 million dollars in 2025. About 49 percent of companies hit paid the ransom, with a median payment of 1 million dollars.">
        <figcaption>The average cost to recover from a ransomware attack was $1.53 million in 2025, and about half of the companies hit paid a median $1 million ransom. Source: Sophos, <em>The State of Ransomware 2025</em>.</figcaption>
      </figure>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="safety-response-heading">
      ${stopHandIcon()}
      <div><p class="eyebrow">A safer response</p><h2>Stop, leave, and check another&nbsp;way</h2></div>
    </div>
    <ol>
      <li><strong>Stop the conversation.</strong> You do not need to explain or argue. Hang up, close the message, or leave the website.</li>
      <li><strong>Do not use the contact information they supplied.</strong> Use the number on the back of your card, an official statement, or a website you already know.</li>
      <li><strong>Speak with someone you trust.</strong> Pressure often feels less convincing once you say the story out loud.</li>
      <li><strong>Take action quickly if money or information was shared.</strong> Contact the bank, card issuer, payment service, or affected account directly.</li>
    </ol>
    <div class="notice" style="margin-top:30px"><strong>A familiar face or voice is not proof.</strong> AI tools can imitate a family member using photos, video, or a short voice recording posted online. End the conversation and contact that person using a number you already know.</div>
  </div>
</section>
<section class="section section-blue privacy-safety-section">
  <div class="wrap grid-2">
    <div>
      <p class="eyebrow">Your information</p>
      <h2>Keep sensitive details out of AI chats</h2>
      <p>Do not paste passwords, verification codes, complete financial account numbers, Social Security numbers, medical records, or copies of identity documents into a general AI assistant.</p>
      <p>For personal tasks, remove names and identifying details whenever the task can be completed without them.</p>
    </div>
    <div class="callout privacy-checklist">
      <h3>Before you share, ask</h3>
      <ul>
        <li>Would I be comfortable putting this information into an ordinary email?</li>
        <li>Does the AI really need this detail to help me?</li>
        <li>Can I replace the real information with a general description?</li>
      </ul>
    </div>
  </div>
</section>
<section class="section section-white">
  <div class="wrap phishing-guide">
    <div class="section-heading">
      <p class="eyebrow">Use AI as a second opinion</p>
      <h2>Check a suspicious email before you click</h2>
      <p>An AI assistant can compare the sender’s full email address with the company named in the message and point out common phishing or scam warning signs.</p>
    </div>

    <div class="phishing-steps">
      <article class="phishing-step">
        <span class="step-number">1</span>
        <div><h3>Expand the sender details</h3><p>Select the sender’s name, address, or small details arrow near <strong>From</strong>. This reveals the complete email address, not just the friendly display name.</p></div>
      </article>
      <article class="phishing-step">
        <span class="step-number">2</span>
        <div><h3>Copy without clicking</h3><p>Copy the visible header, including the full From address and subject, plus the message body. Do not open links or attachments. Remove passwords, codes, account numbers, and other private details.</p></div>
      </article>
      <article class="phishing-step">
        <span class="step-number">3</span>
        <div><h3>Ask AI to explain the risk</h3><p>Paste the copied text into ChatGPT, Claude, or another AI assistant. Ask it to compare the sender’s domain with the real company and explain anything suspicious.</p></div>
      </article>
    </div>

    <div class="phishing-demo" aria-label="Example showing an expanded email sender address copied into an AI assistant">
      <div class="email-example">
        <div class="demo-window-bar"><span></span><span></span><span></span><strong>Email</strong></div>
        <div class="email-header">
          <div class="email-row"><span>From</span><strong>Account Support</strong><span class="details-pill">Details ▲</span></div>
          <div class="sender-address">account-alerts@secure-company-help.com</div>
          <div class="email-row"><span>Subject</span><strong>Immediate action required</strong></div>
        </div>
        <div class="email-body-example">
          <p>Your account will be closed today. Use the link below to confirm your password immediately.</p>
          <span class="unsafe-link">Confirm my account</span>
        </div>
        <div class="demo-warning">Do not select the link</div>
      </div>

      <div class="copy-direction" aria-hidden="true"><span>Copy</span><strong>→</strong></div>

      <div class="ai-example">
        <div class="demo-window-bar ai-bar"><strong>AI assistant</strong></div>
        <div class="ai-prompt-example">
          <span class="prompt-label">Ask:</span>
          <p>Review this email for phishing or scam warning signs. Compare the full sender address and domain with the company it claims to represent. Do not tell me it is safe. Explain any mismatch and tell me how to verify the message independently.</p>
          <div class="pasted-email">Paste the email header and body here</div>
        </div>
      </div>
    </div>

    <div class="domain-check">
      <div><span class="domain-label">Claims to be from</span><strong>company.com</strong></div>
      <span class="domain-not-equal" aria-hidden="true">≠</span>
      <div><span class="domain-label">Actually sent from</span><strong>secure-company-help.com</strong></div>
    </div>

    <div class="notice phishing-notice"><strong>Never click first.</strong> A sender address that does not match the company’s official domain is a serious warning sign. An address that looks correct is not proof that the email is safe. Open the company’s website yourself or call a number you already trust to confirm the request.</div>
  </div>
</section>
<section class="section section-soft">
  <div class="wrap">
    <p class="eyebrow">If something already happened</p>
    <h2>Act quickly and do not be embarrassed</h2>
    <p>Scams are designed to be convincing. Contact the company used to send the money, your bank, or the affected account provider immediately. Change exposed passwords and turn on two-factor authentication where available.</p>
    <p>For a step-by-step recovery guide, visit the <a href="https://consumer.ftc.gov/articles/what-do-if-you-were-scammed" target="_blank" rel="noopener">Federal Trade Commission’s consumer advice</a>. You can report fraud at <a href="https://reportfraud.ftc.gov/" target="_blank" rel="noopener">ReportFraud.ftc.gov</a>.</p>
  </div>
</section>`;

const classesBody = `<section class="page-hero media-page-hero">
  <div class="wrap media-page-hero-grid">
    <div class="media-page-hero-copy">
      <p class="eyebrow">Classes</p>
      <h1>Bring practical AI learning to your community</h1>
      <p class="lede">Spirantix offers approachable sessions for seniors who want to understand today’s AI tools, use them in everyday life, and protect their important information.</p>
      <div class="button-row" style="margin-top:28px"><a class="btn" href="contact.html?type=speaking">Request a session</a><a class="btn btn-secondary" href="#upcoming">See upcoming sessions</a></div>
    </div>
    <div class="media-page-hero-image">
      <img src="assets/classes-hero-leawood.jpg" alt="Greg presenting an AI learning session to residents at Town Village of Leawood" width="1400" height="1050">
    </div>
  </div>
</section>
<section class="section section-white" id="upcoming">
  <div class="wrap">
    <div class="section-heading"><p class="eyebrow">Upcoming</p><h2>In-person learning</h2><p>Contact the host directly for attendance requirements, availability, and other event details.</p></div>
    ${eventCards(upcomingEvents())}
  </div>
</section>
${pastEvents().length ? `<section class="section section-white" id="past">
  <div class="wrap">
    <div class="section-heading"><p class="eyebrow">Past sessions</p><h2>Recent in-person learning</h2></div>
    ${eventCards(pastEvents(), { past: true })}
  </div>
</section>` : ''}
<section class="section">
  <div class="wrap grid-2" style="align-items:start">
    <div>
      <p class="eyebrow">For senior communities and learning centers</p>
      <h2>A session shaped around your residents or members</h2>
      <p>Programs can begin with the basics, concentrate on everyday uses, focus on safety, or fit into a course already underway.</p>
      <p>In-person learning is preferred because questions and conversation are an important part of the experience. Video sessions are also available when distance or scheduling makes them a better choice.</p>
      <p><a class="text-link" href="output/pdf/spirantix-classes-and-talks.pdf">Download the one-page classes and talks overview (PDF)</a></p>
    </div>
    <div class="callout callout-light">
      <h3>Cost</h3>
      <p>Many sessions are offered at no cost. For engagements requiring travel, a minimum fee may be requested to help cover expenses.</p>
      <a class="btn btn-teal" href="contact.html?type=speaking">Ask about your community</a>
    </div>
  </div>
</section>
<section class="section section-blue">
  <div class="wrap">
    <div class="section-heading center"><p class="eyebrow">Flexible formats</p><h2>From one conversation to a complete course</h2></div>
    <div class="grid-4">
      <div class="card"><h3>Introductory talk</h3><p>A welcoming overview of what AI is and where it may be useful.</p></div>
      <div class="card"><h3>Hands-on workshop</h3><p>Guided practice using prompts, follow-up questions, and everyday examples.</p></div>
      <div class="card"><h3>Guest session</h3><p>A focused contribution to an existing technology or lifelong-learning course.</p></div>
      <div class="card"><h3>Multi-week course</h3><p>A paced learning path covering foundations, practical use, safety, and discussion.</p></div>
    </div>
  </div>
</section>
<section class="section section-white">
  <div class="wrap grid-2">
    <div><p class="eyebrow">What participants learn</p><h2>Useful skills they can practice immediately</h2><ul><li>What generative AI is and where its answers come from</li><li>How to begin with ChatGPT or Claude</li><li>How to write a clearer prompt</li><li>When a search engine is the better choice</li><li>What information should stay private</li><li>How to slow down and evaluate something suspicious</li></ul></div>
    <div><p class="eyebrow">What the host provides</p><h2>A simple room setup</h2><ul><li>A room appropriate for the expected group</li><li>A screen or projector</li><li>Reliable internet access</li><li>An estimate of group size</li><li>A point of contact for scheduling and attendance questions</li></ul></div>
  </div>
</section>
<section class="section section-dark"><div class="narrow" style="text-align:center"><p class="eyebrow" style="color:var(--mint)">Start a conversation</p><h2>Tell us about your community</h2><p>Share your location, group size, preferred timing, and program ideas.</p><a class="btn" href="contact.html?type=speaking">Request information</a></div></section>`;

const seniorWebsites = [
  ['HumanGood', 'https://www.humangood.org/resources', 'Guides, podcasts, videos, and articles about senior living, wellness, financial planning, downsizing, caregiving, and memory support.'],
  ['AARP', 'https://www.aarp.org/', 'Articles, tools, discounts, and programs covering health, money, work, travel, caregiving, and everyday life.'],
  ['New York Times Games', 'https://www.nytimes.com/crosswords', 'Daily word and logic games, including Wordle, the Crossword, Connections, and Spelling Bee. Some games require a subscription.'],
  ['TED', 'https://www.ted.com/', 'Talks and educational videos from speakers around the world on science, culture, health, technology, and personal growth.'],
  ['Medicare', 'https://www.medicare.gov/', 'The official federal source for Medicare coverage, plans, providers, cards, premiums, and fraud reporting.'],
  ['Rest Less', 'https://restless.co.uk/', 'The current destination of OlderIsWiser, with articles and resources about work, money, health, learning, and life after 50.'],
  ['The Chicago Financial Planner', 'https://thechicagofinancialplanner.com/', 'Detailed articles about financial planning, investments, retirement accounts, and decisions that can affect retirement.'],
  ['Sixty and Me', 'https://sixtyandme.com/', 'A lifestyle publication for women over 60 covering travel, relationships, health, money, beauty, and retirement.'],
  ['Alliance for Retired Americans', 'https://retiredamericans.org/', 'News and advocacy from a politically active organization focused on retirees, health care, pensions, and public policy.'],
  ['Pogo', 'https://www.pogo.com/', 'A collection of free online card, puzzle, board, word, and matching games, with optional accounts and purchases.'],
  ['Suddenly Senior', 'https://www.suddenlysenior.com/', 'Humor, nostalgia, articles, and resources written for older adults and longtime readers.'],
  ['thirdAGE', 'https://thirdage.com/', 'Lifestyle articles about health, relationships, money, beauty, travel, and other aspects of life after midlife.'],
  ["Senior's Guide to Computers", 'https://seniorsguidetocomputers.com/', 'Beginner-friendly computer tutorials covering hardware, software, email, accessibility, security, and backups.'],
  ['LoveToKnow Aging', 'https://www.lovetoknow.com/life/aging', 'Practical articles about retirement, activities, caregiving, wellness, housing, relationships, and daily life.'],
  ['Evergreen Club', 'https://www.evergreenclub.com/', 'A membership-based network of economical homestays in the United States and Canada for travelers age 50 and older.'],
  ['Facebook', 'https://www.facebook.com/', 'A social network for keeping up with family, friends, organizations, and interest groups. Review privacy settings and be cautious with unexpected messages.'],
  ['Reddit', 'https://www.reddit.com/', 'Discussion communities covering thousands of interests. Advice comes from other users, so verify important claims elsewhere.'],
  ['Road Scholar', 'https://www.roadscholar.org/', 'Educational travel programs and learning adventures created primarily for adults over 50.'],
  ['National Alliance for Caregiving', 'https://www.caregiving.org/', 'Research, advocacy, and practical resources supporting family caregivers and the people they care for.'],
  ['Grandkids Matter', 'https://grandkidsmatter.org/', 'Ideas and guidance for grandparents about communication, relationships, activities, and supporting grandchildren.'],
  ['Workforce50', 'https://www.workforce50.com/', 'Job listings and career information for experienced workers, people over 50, and those making a career change.'],
  ['StatPearls', 'https://www.statpearls.com/', 'Clinical reference material about medical conditions, symptoms, and treatments. Use it to inform conversations, not replace medical care.'],
  ['National Institute on Aging', 'https://www.nia.nih.gov/', 'Research-based information from the National Institutes of Health about aging, health conditions, caregiving, and clinical research.'],
  ['Where You Live Matters', 'https://www.whereyoulivematters.org/', 'Information and planning tools for comparing senior living choices and understanding different community options.']
];

function seniorWebsiteCards() {
  return seniorWebsites.map(([name, url, description]) => `<a class="card card-link" href="${url}" target="_blank" rel="noopener"><h3>${name}</h3><p>${description}</p><span class="text-link">Visit website</span></a>`).join('');
}

const seniorWebsitesSection = `<section class="section section-soft" id="websites" data-filter-group="websites">
  <div class="wrap">
    <div class="section-heading">
      <p class="eyebrow">Websites for older adults</p>
      <h2>Helpful places across the web</h2>
      <p>A growing collection of useful websites for older adults and their families. Spirantix reviews and updates these recommendations regularly as helpful new resources emerge and existing ones change.</p>
    </div>
    <div class="grid-3">${seniorWebsiteCards()}</div>
  </div>
</section>`;

const resourceDirectory = [
  {
    id: 'ai-learning',
    eyebrow: 'Keep learning',
    title: 'AI learning and training',
    blurb: 'Classes, courses, and free training that help older adults build confidence with AI and everyday technology.',
    entries: [
      ['Senior Planet from AARP', 'https://seniorplanet.org/ai', 'Free online and in-person classes from AARP, including courses about AI and everyday technology. Aimed at adults 60 and older.'],
      ['OATS (Older Adults Technology Services)', 'https://oats.org', 'A nonprofit that runs technology training for older adults and created the Senior Planet program. Offers free and low-cost classes.'],
      ['GetSetUp', 'https://www.getsetup.io/en-US', 'Live online classes for adults 55 and older, including AI topics. A subscription service that is often free through libraries and Medicare Advantage plans.'],
      ['Cyber-Seniors', 'https://cyberseniors.org', 'Free technology help from trained volunteer mentors, with lessons and phone support for older adults.'],
      ['Candoo Tech', 'https://www.candootech.com', 'A paid tech concierge service that offers remote help by phone and screen share, plus training for older adults and their families. Also serves senior living and health plans.'],
      ['Best Buy / Geek Squad Health', 'https://www.bestbuyhealth.com/geek-squad-tech-support/', 'In-person and in-home technology help and classes from Best Buy. Support is offered through a paid membership or per-session fees.'],
      ['Boise State University SAS (AI Tools for Seniors)', 'https://broncolearn.boisestate.edu/browse/allcourses/nonbsuaffiliated/sass/courses/ai-tools-for-seniors', 'A free, self-paced online course from Boise State University that introduces AI tools to older adults.'],
      ['Osher Lifelong Learning Institutes (OLLI)', 'https://www.osherfoundation.org/olli.html', 'University-based lifelong learning programs for adults 50 and older. Course offerings vary by location and may include technology and AI topics.'],
      ['SeniorNet', 'https://www.seniornetli.org/', 'A nonprofit that offers small-group, in-person technology classes for adults 50 and older, taught by volunteers.'],
      ['AbilityNet', 'https://abilitynet.org.uk', 'A UK charity that provides free webinars and remote help with technology and accessibility for older adults and people with disabilities.'],
      ['DigitalLearn / LearnFree (GCFGlobal)', 'https://www.digitallearn.org', 'Free online courses about computers, the internet, and AI basics. DigitalLearn comes from the Public Library Association, and LearnFree comes from GCFGlobal.'],
      ['Google Applied Digital Skills', 'https://learndigital.withgoogle.com/digital-skills', 'Free, video-based lessons from Google that teach practical digital skills, from spreadsheets to online tools. A company resource.'],
      ['IBM SkillsBuild', 'https://skillsbuild.org', 'Free online courses from IBM about technology and workplace skills. Some programs include sessions designed for older adults.'],
      ['OpenAI Academy', "https://academy.openai.com", "OpenAI's own free learning hub with courses and guides about using AI. It is a company resource, so it focuses on OpenAI products."],
      ['Coursera', 'https://www.coursera.org', 'An online learning platform with many AI and technology courses. Some courses can be audited for free, while certificates and full access require payment.'],
      ['LinkedIn Learning', 'https://www.linkedin.com/learning', 'A paid subscription library of video courses about technology, business, and creative skills, including AI topics. Part of LinkedIn.'],
    ]
  },
  {
    id: 'memory-care',
    eyebrow: 'Memory and care',
    title: 'Memory, companionship, and care',
    blurb: 'Companionship, memory support, monitoring, and daily-living services for older adults, families, and care organizations.',
    entries: [
      ['NewDays (Sunny)', 'https://www.newdays.ai', 'An AI companion and memory support service for people with mild cognitive impairment or dementia, built around clinician-guided brain training. A paid service, often covered by Medicare.'],
      ['Intuition Robotics (ElliQ)', 'https://elliq.com', 'A tabletop companion robot that offers conversation, reminders, and family connection for older adults. The device and monthly service are paid, and some state programs offer subsidies.'],
      ['Meela', 'https://www.meela.ai', 'A screen-free AI companion that calls by phone, with optional help arranging rides. A paid subscription service that is also sold to senior living communities.'],
      ['Ella AI', 'https://www.ella-ai-care.com', 'An early-stage AI companion app designed for people with dementia and their caregivers. Pricing has not been widely published.'],
      ['Wonderful Platform (Avadin)', 'https://www.businesswire.com/news/home/20251215591957/en/', 'A care platform for senior living operators that combines software and in-facility hardware. A business-to-business service, not sold directly to families.'],
      ['Memoryboard', 'https://memoryboard.com', 'An in-room digital message board for senior living communities and families that shows messages, photos, and reminders. Pricing is not widely published.'],
      ['CarePredict', 'https://www.carepredict.com', 'A wearable and sensor system that tracks daily activity and alerts caregivers to changes. Sold to senior living communities and care organizations.'],
      ['CareYaya (QuikTok / Yaya Bear)', 'https://www.careyaya.org', 'An organization that connects families with student caregivers and offers a phone-based AI companion and a story-to-autobiography service. Some features require a subscription.'],
      ['Sensi.AI', 'https://www.sensi.ai', 'An audio-based monitoring service that uses AI to understand activity and safety at home. Sold to home care agencies rather than to individuals.'],
      ['MapHabit', 'https://maphabit.com', 'An app that helps people with memory or developmental challenges follow daily routines through visual, step-by-step guides. Often provided through health care or state programs.'],
      ['GrandPad', 'https://www.grandpad.net', 'A simplified tablet designed for older adults, with large buttons, family photo sharing, and video calls. The tablet and a monthly plan are paid.'],
      ['Amazon (Echo Show, Alexa, Alexa Together)', 'https://www.amazon.com', "Amazon's voice assistant can set reminders, answer questions, and make calls, and Alexa Together adds caregiving features. Hardware and some services are paid."],
      ['Meta (Muse)', 'https://ai.meta.com/muse/', 'A general-purpose personal AI from Meta that can remember details across conversations, available in some apps and devices. Not designed specifically for older adults.'],
      ["Alzheimer's Association", 'https://www.alz.org', 'A nonprofit that provides education, support, and a 24-hour helpline for people living with dementia and their caregivers. A free information resource.'],
    ]
  },
  {
    id: 'photos-stories',
    eyebrow: 'Photos and stories',
    title: 'Photos, stories, and legacy',
    blurb: 'Apps and services for reminiscence, life stories, photo memories, and recording a personal history for family.',
    entries: [
      ['GreyMatters', 'https://greymatterstous.com', 'An app that builds life-story albums and reminiscence activities for people with dementia. Often provided through care organizations.'],
      ['LifeBio', 'https://www.lifebio.org', "A life-story and reminiscence platform that captures memories in a person's own voice. Offered mainly to senior living and health care providers."],
      ['Memory Lane Games', 'https://www.memorylanegames.com', 'An app with reminiscence games and prompts built around photos and familiar topics. Free and subscription options are available.'],
      ['MindMate', 'https://www.mindmate-app.com', 'An app with brain-training games, lifestyle tips, and tracking for people with memory concerns and their caregivers. Offered with a free tier and a paid tier.'],
      ['Lumosity', 'https://www.lumosity.com', 'A brain-training app with games designed to challenge memory, attention, and problem solving. A paid subscription service.'],
      ['2000 Paces', 'https://www.2000paces.com', 'An app and service that uses photos to prompt memories and conversation with older adults. Pricing is not widely published.'],
      ['Kodak Memory Shots', 'https://memory-shots.org/en', 'A caregiver-guided tool that creates AI-generated images to spark memories for people with dementia. Free with limited use, from Kodak and an agency partner.'],
      ['StoryWorth', 'https://welcome.storyworth.com', 'A service that sends a weekly question, collects the answers, and turns them into a printed keepsake book. A paid gift-style product with annual plans.'],
      ['Remento', 'https://www.remento.co', 'A service that records spoken answers to weekly prompts, adds the related photos, and prints a book. A paid product with an annual plan.'],
      ['Memory Murals', 'https://www.memorymurals.com', 'An app that displays family photos and memories on a screen for older adults. A paid subscription service.'],
      ['HereAfter AI', 'https://www.hereafter.ai', "A service that records a person's stories to create an interactive, voice-based life story for family members. A paid subscription."],
      ['StoryFile', 'https://www.storyfile.com', 'A platform for recording interactive video conversations, often used by museums and institutions as well as families. Pricing is project-based.'],
      ['Google Photos', 'https://photos.google.com', "Google's photo service can create automatic albums, movies, and highlight reels from your photos. Free with a Google account, with optional storage plans."],
      ['Apple Photos (Memories)', 'https://www.apple.com/ios/photos/', "Apple's photo app builds automatic memories and highlight reels from your library. Free with iCloud, with optional storage plans."],
      ['Amazon Photos', 'https://www.amazon.com/photos', 'Photo storage and album sharing from Amazon, included with a Prime membership and available with paid storage plans.'],
    ]
  },
  {
    id: 'possessions',
    eyebrow: 'Belongings',
    title: 'Possessions and heirlooms',
    blurb: 'Tools for cataloging belongings, recording the stories behind heirlooms, and organizing documents and end-of-life plans.',
    entries: [
      ['Artifcts', 'https://artifcts.com', 'An app and website for documenting belongings and heirlooms with written or spoken stories and photos. Free to start, with paid subscription options.'],
      ['Family Heirloom Archive', 'https://apps.apple.com/us/app/family-heirloom-archive/id6760870342', 'An iPhone app for capturing family heirlooms with photos and details. Free to start, with optional paid features.'],
      ['Sortly', 'https://www.sortly.com', 'A home inventory app that catalogs belongings with photos, notes, and values. Free to start, with paid plans for larger collections.'],
      ['Everplans', 'https://www.everplans.com', 'A digital vault and organizer for documents, accounts, and wishes so family members can find what they need. Free to start, with a paid premium tier.'],
      ['Trust & Will', 'https://trustandwill.com', 'An online service for creating wills and trusts. A paid legal-document product, with an optional ongoing membership.'],
      ['Airloom', 'https://www.airloom.co/', 'An online tool for creating a will, recording end-of-life wishes, and sharing them with the people you choose. Pricing is not widely published.'],
      ['Cake (now Altogether Funeral)', 'https://www.joincake.com', 'An online service for end-of-life planning, including checklists and document storage. Free to use, with optional paid features.'],
      ['Google Inactive Account Manager', 'https://support.google.com/accounts/answer/3036546', 'A free Google setting that lets you decide what happens to your account and data if you become inactive, including sharing it with someone you choose.'],
      ['Apple Digital Legacy', 'https://support.apple.com/en-us/102631', 'A free Apple feature that lets you name people who can access your account data after your death.'],
    ]
  },
  {
    id: 'authenticity',
    eyebrow: 'Authenticity',
    title: 'Document and photo authenticity',
    blurb: 'Standards and services that help confirm where a photo, video, or document came from and whether it has been changed.',
    entries: [
      ['C2PA', 'https://c2pa.org', 'An open technical standard for recording where a photo, video, or document came from and whether it has been changed. Free for anyone to use.'],
      ['Content Authenticity Initiative', 'https://contentauthenticity.org', 'An industry group that promotes the C2PA standard and tools that show the source and history of digital content.'],
      ['Truepic', 'https://www.truepic.com', 'A company that authenticates photos and videos at the moment they are captured, using the C2PA standard. Sold mainly to businesses such as insurers and lenders.'],
      ['Numbers Protocol', 'https://numbersprotocol.io', 'A service that records the origin and history of digital media on a blockchain. Offers free and paid developer plans.'],
      ['OriginStamp', 'https://originstamp.com', 'A service that creates a verifiable timestamp for documents and files, proving when they existed. Pay per use.'],
    ]
  }
];

function resourceDirectoryCards(entries) {
  return entries.map(([name, url, description]) => `<a class="card card-link" href="${url}" target="_blank" rel="noopener"><h3>${name}</h3><p>${description}</p><span class="text-link">Visit website</span></a>`).join('');
}

// Search box and topic buttons sit right under the hero. js/site.js wires them up
// and needs data-resource-search present, or the filter does not run at all.
const resourceHighlightGroups = [
  ['websites', 'Websites and reading'],
  ['ai-tools', 'AI assistants'],
  ['app-highlights', 'Apps for daily life']
];

function resourceFinder() {
  const buttons = [
    '<button type="button" class="filter-btn" data-filter-target="all" aria-pressed="true">Show all<span class="filter-num" data-filter-num></span></button>',
    ...resourceHighlightGroups.map(([id, label]) => `<button type="button" class="filter-btn" data-filter-target="${id}" aria-pressed="false">${label}<span class="filter-num" data-filter-num></span></button>`),
    ...resourceDirectory.map((section) => `<button type="button" class="filter-btn" data-filter-target="${section.id}" aria-pressed="false">${section.title}<span class="filter-num" data-filter-num></span></button>`)
  ].join('\n      ');
  return `<section class="section resources-tools" id="find-a-resource">
  <div class="wrap">
    <label class="resource-search-label" for="resource-search">Search the list</label>
    <div class="resource-search-row">
      <input id="resource-search" class="resource-search" type="search" placeholder="Type a name or a word, like photos" autocomplete="off" data-resource-search>
      <button type="button" class="resource-clear" data-resource-clear>Clear</button>
    </div>
    <div class="resource-filter" data-resource-filter role="group" aria-label="Choose a topic">
      ${buttons}
    </div>
    <p class="filter-count" aria-live="polite" data-filter-count>Showing all listings</p>
    <p class="no-results" data-no-results hidden>No listing matches that. Try a simpler word, or choose Show all.</p>
    <p class="small" style="margin-top:16px">Some listings are free, some are paid products or services, and some are made for organizations rather than for individuals. Each card says what we know. These listings are provided for information only, and a listing does not mean Spirantix endorses or recommends it.</p>
  </div>
</section>`;
}

const resourceDirectorySection = [
    ...resourceDirectory.map((section, index) => `<section class="section${index % 2 === 0 ? ' section-soft' : ' section-white'}" id="${section.id}" data-filter-group="${section.id}">
  <div class="wrap">
    <div class="section-heading">
      <p class="eyebrow">${section.eyebrow}</p>
      <h2>${section.title}</h2>
      <p>${section.blurb}</p>
    </div>
    <div class="grid-3">${resourceDirectoryCards(section.entries)}</div>
  </div>
</section>`)
].join('\n\n');

const resourcesBody = `<section class="page-hero media-page-hero resources-page-hero">
  <div class="wrap media-page-hero-grid">
    <div class="media-page-hero-copy">
      <p class="eyebrow">Resources</p>
      <h1>Useful resources for life online</h1>
      <p class="lede">Explore helpful websites, AI tools, apps, and services for older adults, grouped by topic, with plain-language guidance about what each one offers.</p>
    </div>
    <div class="media-page-hero-image resource-hero-image">
      <picture>
        <source srcset="assets/resources-hero-wide.webp" type="image/webp">
        <img src="assets/resources-hero-wide.jpg" width="960" height="720" alt="A caregiver helping an older woman use a tablet">
      </picture>
    </div>
  </div>
</section>

${resourceFinder()}

${seniorWebsitesSection}

<section class="section" id="ai-tools" data-filter-group="ai-tools">
  <div class="wrap">
    <div class="section-heading">
      <p class="eyebrow">AI tool highlights</p>
      <h2>Good places to begin with AI</h2>
      <p>These general-purpose assistants can explain ideas, help with writing, organize plans, work with images, and answer follow-up questions in a conversational way.</p>
    </div>
    <div class="grid-2">
      <a class="card card-link" href="https://chatgpt.com/overview/" target="_blank" rel="noopener"><h3>ChatGPT</h3><p>Use text or voice to ask questions, explore ideas, draft writing, compare options, and get everyday help.</p><span class="text-link">Explore ChatGPT</span></a>
      <a class="card card-link" href="https://claude.com/product/overview" target="_blank" rel="noopener"><h3>Claude</h3><p>Ask questions, work through ideas, simplify complex information, analyze documents, and create written material.</p><span class="text-link">Explore Claude</span></a>
      <a class="card card-link" href="https://gemini.google/overview/" target="_blank" rel="noopener"><h3>Gemini</h3><p>Google’s AI assistant can help with writing, learning, planning, images, and tasks connected to Google services.</p><span class="text-link">Explore Gemini</span></a>
      <a class="card card-link" href="https://www.microsoft.com/en-us/microsoft-365-copilot/personal" target="_blank" rel="noopener"><h3>Microsoft Copilot</h3><p>An AI assistant for questions, research, writing, and creating content, with additional features inside Microsoft 365 apps.</p><span class="text-link">Explore Copilot</span></a>
    </div>
    <div class="callout" style="margin-top:28px"><h3>Use AI as a helper, not a final authority</h3><p>AI tools can make mistakes. Verify important health, legal, financial, and safety information with a qualified professional or an authoritative source, and avoid sharing sensitive personal information.</p></div>
  </div>
</section>

<section class="section section-white" id="app-highlights" data-filter-group="app-highlights">
  <div class="wrap">
    <div class="section-heading">
      <p class="eyebrow">App highlights</p>
      <h2>Useful apps with practical benefits</h2>
      <p>Some use AI directly, while others make books, information, or everyday assistance easier to access.</p>
    </div>
    <div class="grid-2">
      <a class="card card-link" href="https://www.bemyeyes.com/" target="_blank" rel="noopener"><h3>Be My Eyes</h3><p>Connect with volunteers or AI-powered visual assistance for help describing objects, reading labels, and completing visual tasks.</p><span class="text-link">Learn about Be My Eyes</span></a>
      <a class="card card-link" href="https://www.seeingai.com/" target="_blank" rel="noopener"><h3>Seeing AI</h3><p>Microsoft’s visual-assistance app uses a phone camera and AI to describe text, people, products, currency, and surroundings.</p><span class="text-link">Learn about Seeing AI</span></a>
      <a class="card card-link" href="https://lens.google/" target="_blank" rel="noopener"><h3>Google Lens</h3><p>Use a phone camera or an existing image to identify objects, copy or translate text, and search for related information.</p><span class="text-link">Learn about Google Lens</span></a>
      <a class="card card-link" href="https://www.overdrive.com/apps/libby" target="_blank" rel="noopener"><h3>Libby</h3><p>Borrow ebooks, audiobooks, and magazines using a library card from a participating public library.</p><span class="text-link">Learn about Libby</span></a>
    </div>
  </div>
</section>

${resourceDirectorySection}

<section class="section">
  <div class="narrow">
    <p class="eyebrow">How we choose</p>
    <h2>Clear, useful, and worth your time</h2>
    <p>We favor websites, tools, and apps with clear everyday uses, approachable experiences, responsible practices, and genuine value for older adults. A listing is not a guarantee of every article, feature, answer, product, or service offered by an outside organization.</p>
    <p class="small"><strong>Last reviewed:</strong> October 8, 2026</p>
    <div class="button-row" style="margin-top:24px"><a class="btn btn-secondary" href="contact.html">Suggest a resource</a></div>
  </div>
</section>`;

const supportBody = `<section class="lesson-shell"><div class="wrap"><article class="lesson-body concierge-guide"><h1>Help with Spirantix Concierge</h1><p>For help with your account, sign-in, a connected calendar, photos, reminders, or another Concierge feature, contact Spirantix.</p><h2>Contact support</h2><p>Email <a href="mailto:hello@spirantix.ai">hello@spirantix.ai</a> or use the <a href="contact.html?type=support">support contact form</a>. Describe what you were trying to do and what happened. Include your account email if it helps us find your account. Do not include a password, account key, sign-in link, or private family records.</p><h2>Using the Concierge</h2><p><a href="guide.html">Read the Concierge guide</a> for example prompts and instructions for talking instead of typing.</p><h2>Privacy and account deletion</h2><p>To request correction or deletion of your Spirantix account information, contact support. We need to verify the account owner before making account changes. Read the <a href="privacy.html">privacy policy</a> for what we store and what account deletion removes.</p><h2>Before you send a request</h2><p>A brief description of the problem and the name of the device or browser you are using can help. You can send a screenshot with private information removed. Spirantix is not an emergency service.</p><p><a href="terms.html">Read the terms of use</a></p></article></div></section>`;

const productsBody = `<section class="page-hero media-page-hero">
  <div class="wrap media-page-hero-grid">
    <div class="media-page-hero-copy">
      <p class="eyebrow">The Spirantix Concierge App</p>
      <h1>A companion who remembers for you</h1>
      <p class="lede">Your people and the dates that matter, kept in one place. Reminders by email, text, or a daily phone call with your schedule. Albums for written and spoken memories, and videos made from them.</p>
        <ul class="hero-points">
          <li><strong>The app.</strong> Your people, photos, albums, reminders, and calendar in one place.</li>
          <li><strong>ChatGPT.</strong> Ask inside the chat you already use.</li>
          <li><strong>Claude.</strong> Coming soon.</li>
          <li><strong>A phone call.</strong> It calls with your day and reads it aloud.</li>
        </ul>
      <div class="button-row products-hero-actions"><a class="btn" href="https://api.spirantix.ai/app">Open the Concierge app</a><a class="btn btn-secondary" href="guide.html">Read the Concierge guide</a></div>
      <p class="hero-early"><a href="connect-chatgpt.html">Use the Concierge inside ChatGPT</a>, or <a href="support.html">get help</a>.</p>
    </div>
    <div class="media-page-hero-image">
      <img src="assets/woman.on.phone.png" alt="Older woman using a smartphone" width="1122" height="1402">
      <div class="hero-guides"><a class="btn btn-secondary" href="connect-chatgpt.html">Connect ChatGPT</a><span class="btn btn-secondary is-disabled" role="link" aria-disabled="true">Connect Claude</span></div>
    </div>
  </div>
</section>
<section class="section section-white" id="who-its-for">
  <div class="wrap">
    <div class="section-heading center"><p class="eyebrow">Who it is for</p><h2>One Concierge, three ways to use it</h2><p>The Concierge is the same in all three. Pick the one that sounds like you.</p></div>
    <div class="grid-3">
      <div class="card"><h3>Spirantix Concierge for Seniors</h3><p>A companion that keeps your people, your dates and your photos, and answers when you ask.</p><ul><li>Ask about anyone in your family and hear back what you saved.</li><li>Keep stories, photos, and albums, and ask for a picture by name.</li><li>Reminders by email, text, or a daily phone call.</li></ul><a class="text-link" style="display:inline-block;margin-top:12px" href="https://api.spirantix.ai/app">Open the Concierge app</a></div>
      <div class="card"><h3>Spirantix Concierge for Family and Caregivers</h3><p>Help the person you care for without taking over.</p><ul><li>Help with the calendar, only with the resident&rsquo;s permission.</li><li>Permission to add an event does not let you read their calendar.</li><li>The resident can remove it at any time, without asking you.</li></ul><a class="text-link" style="display:inline-block;margin-top:12px" href="guide.html">Read the Concierge guide</a></div>
      <div class="card"><h3>Spirantix Communities</h3><p>For community program managers and corporate teams: the same Concierge for every resident, plus the tools to run the community.</p><ul><li>A community, its staff, and its calendar as one account. <span class="ui-note">Being built</span></li><li>Sign-ups, attendance, and the reports that come from them. <span class="ui-note">Being built</span></li><li>Cross-community insight at the parent organization. <span class="ui-note">Being built</span></li></ul><a class="text-link" style="display:inline-block;margin-top:12px" href="sponsors.html">See our Sponsors page for additional details for Community and Corporate support</a><p style="margin:8px 0 0"><a href="contact.html?type=partner">Talk about a pilot</a></p></div>
    </div>
  </div>
</section>
<section class="section section-white" id="setup">
  <div class="wrap">
    <div class="section-heading center"><p class="eyebrow">Setup</p><h2>Three setup steps</h2><p>Step 1 is all you need to start. Steps 2 and 3 can wait.</p></div>
    <div class="grid-3">
        <div class="card step-card"><div class="step-head"><span class="step-num">1</span><h3>Create Account</h3></div><p>Type your email and we send you a link. Open it and you are in.</p><ul><li>No password to remember</li><li>Or sign in with Google</li></ul><a class="text-link" href="https://api.spirantix.ai/app">Create your account</a></div>
        <div class="card step-card"><div class="step-head"><span class="step-num">2</span><h3>Choose AI Agent</h3></div><p>Pick the one you are comfortable with. The same account and the same memories work in each.</p><ul class="ui-choices"><li><strong><a href="connect-chatgpt.html">ChatGPT</a></strong><span class="ui-note">Available now</span></li><li><strong>Claude</strong><span class="ui-note">Coming soon</span></li><li><strong>Spirantix app</strong><span class="ui-note">Chat coming soon</span></li></ul></div>
        <div class="card step-card"><div class="step-head"><span class="step-num">3</span><h3>Connect People and Apps</h3></div><p>All of this is optional. Add something only if you want it.</p><ul><li>Family and a caregiver</li><li>Your sponsor Senior Living Community</li><li>Email, calendar, and other apps</li></ul></div>
      </div>
      <div class="setup-guides"><p class="setup-guides-label">Not sure where to start?</p><div class="button-row" style="justify-content:center"><a class="btn btn-secondary" href="support.html">Questions and help</a></div></div>
  </div>
</section>
<section class="section section-soft">
  <div class="wrap">
    <div class="section-heading center"><p class="eyebrow">What it does for you today</p><h2>Six everyday things you can do</h2><p>No special words to learn. Ask the way you would ask a friend.</p></div>
    <div class="grid-3">
      <div class="card"><h3>People</h3><p>Names, birthdays, who someone is, how you know them. Ask &quot;Who is my granddaughter?&quot; and it answers from what you told it.</p></div>
      <div class="card"><h3>Calendar</h3><p>Appointments and a calendar you can ask about: today, this week, what is next.</p></div>
      <div class="card"><h3>Reminders</h3><p>Reminders for anything you have to do. They arrive by text or email. A phone call that reads your day is on the way.</p></div>
      <div class="card"><h3>Photos and memories</h3><p>Tell it about the lake, the old house, your first job, and it keeps your words. Ask who is in a picture and it answers from the name you saved. Organize photos into albums and give an album a voice story.</p></div>
      <div class="card"><h3>Valuables and keepsakes</h3><p>The watch, the rocking chair, the locket. Where it is kept and who it belonged to.</p></div>
      <div class="card"><h3>Safe, ad-free web search</h3><p>Ask it to look something up. No ads, no sponsored results, and it always names the site the answer came from.</p></div>
    </div>
<section class="section section-white" id="full-list">
  <div class="wrap">
    <div class="section-heading center"><p class="eyebrow">The full list</p><h2>Everything the Concierge does</h2><p>What works today, and what is still in build.</p></div>
    <div class="grid-2 feature-columns">
      <div>
        <h3>Working today</h3>
        <ul>
          <li>People: names, birthdays, who someone is, how you know them</li>
          <li>Keeps your stories in your own words and gives them back when you ask</li>
          <li>Photos with names saved, albums, and captions you can correct</li>
          <li>An album can carry a voice story, recorded on the spot</li>
          <li>A calendar you can ask about: today, this week, what is next</li>
          <li>Reminders for anything you have to do, with notifications by email, text, or phone call</li>
          <li>Sends email to your saved contacts for you</li>
          <li>Reads anything aloud, and takes speech instead of typing</li>
          <li>Belongings: what you own, who it belonged to, where it is kept</li>
          <li>Checks before answering: no invented names or dates, and it says when it does not know</li>
          <li>Safe, ad-free web search that names the site each answer came from</li>
          <li>Reached from the app, from ChatGPT, and soon Claude, with the same memories in all three</li>
        </ul>
      </div>
      <div>
        <h3>In build</h3>
        <ul>
          
          <li>A phone call that reads your day, incoming or outgoing</li>
          <li>Turning an album into a short film</li>
          <li>Sharing photos and memories with family, with the member deciding who sees what</li>
          <li>Face matching in Phase 3, against people you already saved</li>
          <li>Community tools: sign-ups, attendance, flyers, and family reports, in build with our first operators</li>
        </ul>
      </div>
    </div>
  </div>
</section>
  </div>
</section>
<section class="section section-soft">
  <div class="wrap">
    <div class="section-heading center"><p class="eyebrow">Three ways to reach it</p><h2>Where you can use the Concierge</h2><p>One account, one set of memories, wherever you use it.</p></div>
    <div class="grid-3">
      <div class="card"><span class="status beta">In use now</span><h3>1. The Concierge app</h3><p>Open it in a browser on a tablet, laptop, or phone. Built for older eyes and hands.</p><ul><li>No ChatGPT account needed</li><li>Bigger buttons and one step per screen</li><li>Photos and documents added inside the app</li></ul></div>
      <div class="card"><span class="status beta">Available now</span><h3>2. Inside ChatGPT</h3><p>Talk with it inside ChatGPT, in a normal chat. Same account, same memories.</p><ul><li>You need a ChatGPT account</li><li>Best if you already use ChatGPT</li><li>Connects in about two minutes</li></ul></div>
      <div class="card"><span class="status beta">Next</span><h3>3. Claude</h3><p>The same Concierge and the same memories, reached from Claude.</p><ul><li>You need a Claude account</li><li>Same sign-in as ChatGPT</li><li>Answers read aloud by Claude</li></ul></div>
    </div>
    <div class="button-row" style="margin-top:30px;justify-content:center"><a class="btn" href="https://api.spirantix.ai/app">Open the Concierge app</a><a class="btn btn-secondary" href="guide.html">Read the Concierge guide</a></div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="section-heading center"><p class="eyebrow">Plug-ins versus the app</p><h2>What is where</h2><p>The plug-ins and the app share one account. The app adds what a chat window cannot do.</p></div>
    <div class="grid-2">
      <div class="card"><h3>In the ChatGPT and Claude plug-ins</h3><ul>
        <li>Everything on the full list, inside the chat you already use</li>
        <li>One sign-in for both, one set of memories</li>
        <li>No separate app to open</li>
      </ul></div>
      <div class="card"><h3>In the Spirantix Concierge App</h3><ul>
        <li>Everything above, without ChatGPT or Claude</li>
        <li>Screens built for a tablet or phone</li>
        <li>Adding photos and documents inside the app</li>
        <li>Exporting or deleting your account in the app</li>
        <li>Choosing where reminders reach you</li>
      </ul></div>
    </div>
    <p style="margin-top:22px;max-width:820px;color:var(--ink-soft);font-size:1.05rem">Reminders go by text and by email, whichever the member turns on.</p>
  </div>
</section>

<section class="section section-white">
  <div class="wrap">
    <div class="section-heading begin-heading"><p class="eyebrow">Safety first</p><h2>What the Concierge will not do</h2></div>
    <div class="grid-2">
      <div><ul>
        <li>A reminder notifies the member when its time comes. An email is read back to you, recipient and words, before it goes out.</li>
        <li>It will not make up a photo. If there is none on record, it says so.</li>
        <li>It will not invent a name or a date. It answers from what you told it, and says when it does not know.</li>
      </ul></div>
      <div><ul>
        <li>It will not change anything without saying the exact item, day, and time back to you first.</li>
        <li>It is not a doctor and not an emergency service. Call 911 in an emergency.</li>
        <li>Your records stay in your account, and you can ask for them back or ask for them to be deleted.</li>
      </ul></div>
    </div>
    <div class="button-row" style="margin-top:26px"><a class="btn btn-secondary" href="safety.html">How we keep you safe</a><a class="btn btn-secondary" href="privacy.html">Read the privacy approach</a></div>
  </div>
</section>
<section class="section section-soft">
  <div class="wrap">
    <div class="section-heading center"><p class="eyebrow">Behind the one Concierge</p><h2>Specialists who help</h2><p>These specialist agents handle tasks for you, and the Concierge coordinates them.</p></div>
    <div class="agent-grid"><a class="card card-link agent-card" href="emery.html">
    <picture><source srcset="assets/emery-avatar.webp" type="image/webp"><img src="assets/emery-avatar.png" alt="Illustrated portrait of Emery, The Companion" loading="lazy"></picture>
    <span class="status beta">Beta</span>
    <h3>Emery</h3>
    <p><strong>The Companion</strong></p>
    <p>Memory support, daily planning, gentle reminders, and familiar moments for people living with memory loss.</p>
    <span class="text-link">Meet Emery</span>
  </a><a class="card card-link agent-card" href="capsa.html">
    <picture><source srcset="assets/capsa-avatar.webp" type="image/webp"><img src="assets/capsa-avatar.png" alt="Illustrated portrait of Capsa, The Storyteller" loading="lazy"></picture>
    <span class="status beta">Beta</span>
    <h3>Capsa</h3>
    <p><strong>The Storyteller</strong></p>
    <p>Helps families capture the stories, memories, and experiences that deserve to be carried forward.</p>
    <span class="text-link">Meet Capsa</span>
  </a><a class="card card-link agent-card" href="addie.html">
    <picture><source srcset="assets/addie-avatar.webp" type="image/webp"><img src="assets/addie-avatar.png" alt="Illustrated portrait of Addie, The Guardian" loading="lazy"></picture>
    <span class="status beta">Beta</span>
    <h3>Addie</h3>
    <p><strong>The Guardian</strong></p>
    <p>Certifies photos and documents with tamper-evident proof of their authenticity and provenance.</p>
    <span class="text-link">Meet Addie</span>
  </a><a class="card card-link agent-card" href="heri.html">
    <picture><img src="assets/heri-avatar.png" alt="Illustrated portrait of Heri, The Steward" loading="lazy"></picture>
    <span class="status beta">Beta</span>
    <h3>Heri</h3>
    <p><strong>The Steward</strong></p>
    <p>Catalogs, documents, and protects the possessions and history that make up a family legacy.</p>
    <span class="text-link">Meet Heri</span>
  </a></div>
  </div>
</section>`;

const originStoryBody = `<section class="section section-soft origin-story">
  <div class="wrap"><div class="origin-story-copy">
    <div class="section-heading">
      <p class="eyebrow">How it started</p>
      <h2>A book from Christmas, 2003</h2>
    </div>
    <p>When I was 25 years old, for Christmas in 2003, I gave my grandmother a book called <em>One of a Kind: The Story of My Life</em>, which I found at the Nordstrom's store. It wasn't a book of stories already written — it was full of questions meant to help her write her own, about growing up, her parents and family, and the family she created. She lived to the ripe age of 98, in a life that carried her from Peru, Illinois, to Queens, NY, to Wichita, KS, and finally to a senior living center in Phoenix, AZ.</p>
    <figure class="story-figure float-right">
      <button type="button" class="story-figure-trigger" data-lightbox data-full="assets/note.to.grandma.jpeg" aria-label="View larger image of Greg's handwritten note to his grandmother" title="Tap to enlarge">
        <picture><source srcset="assets/note.to.grandma.webp" type="image/webp"><img src="assets/note.to.grandma.jpeg" alt="Greg's handwritten note to his grandmother inside the front cover of her memory book, dated Christmas, December 25, 2003, Kansas City, Missouri" loading="lazy"></picture>
      </button>
      <figcaption class="figure-caption">The note Greg wrote inside the book, Christmas 2003</figcaption>
    </figure>
    <p>The book was over 145 pages long. She spent the better part of two years filling it in, dating her entries as she went, and made it through page 30 before her eyesight grew too poor to keep writing, leaving the ribbon marking her place. I often wondered how great it would be if I could have captured those stories in her own words and recorded them instead. A photo album usually just has a date, and maybe a place or a name written on the back of each picture, or on a slip of paper tucked in with it. What I wanted was to know the real story behind each photo — where she was, what she was doing, what she was thinking about. It would be amazing to have those photos and stories collected to pass along for generations to come.</p>
    <figure class="story-figure float-left">
      <button type="button" class="story-figure-trigger" data-lightbox data-full="assets/grandma.story.jpeg" aria-label="View larger image of a page from Greg's grandmother's memory book" title="Tap to enlarge">
        <picture><source srcset="assets/grandma.story.webp" type="image/webp"><img src="assets/grandma.story.jpeg" alt="A page from Greg's grandmother's memory book, in her own handwriting, describing where her parents lived and what they did for fun" loading="lazy"></picture>
      </button>
      <figcaption class="figure-caption">One of the pages his grandmother completed, in her own handwriting</figcaption>
    </figure>
    <p>I've also had close family members, some who have passed and some still with us, struggling with day-to-day life because of Alzheimer's, dementia, or early memory loss, along with parents of close friends who passed away unexpectedly and left behind heirlooms and possessions with no stories attached to them, in some cases with no known value. That leaves family members trying to figure out which pieces held real sentimental value, what war a medal was from, why a particular coin was kept, or which paintings and furniture are actually valuable and which aren't. Sometimes family members simply don't know what to do with these possessions, what to hold onto and what to sell.</p>
    <p>This is why I created Spirantix. There is so much today that AI can do to help pass along and record the stories and memories behind photos and possessions: truly living photo albums, and tools that can still help someone even when memory, handwriting, typing, or eyesight become difficult.</p>
    <p>My goal, and the goal of Spirantix, is to help the most important members of our communities: the seniors who have lived through so much, from wars to depressions to changing technology. In my grandmother's story about her parents, she talks about how her father delivered bread by horse and carriage in Peru, IL. That's just one way technology has changed, and it will continue to change.</p>
    <p>My hope is that through our online resources, AI tools, and in-person learning sessions, we can help many families to be able to learn from and cherish those memories for generations to come.</p>
    <p class="origin-story-signature">— Greg Loeffelholz, Founder of Spirantix</p>
  </div></div>
</section>`;

const aboutBody = `<section class="page-hero media-page-hero">
  <div class="wrap media-page-hero-grid">
    <div class="media-page-hero-copy">
      <p class="eyebrow">About</p>
      <h1>Spirantix connects AI learning, safety, and practical tools</h1>
      <p class="lede">We believe seniors should have clear explanations, respectful instruction, and meaningful choices about how artificial intelligence fits into their lives.</p>
      <div class="button-row" style="margin-top:28px"><a class="btn" href="contact.html">Contact Spirantix</a></div>
    </div>
    <div class="media-page-hero-image">
      <img src="assets/founder.family.webp" alt="Greg, founder of Spirantix, with his two children by the sea" width="864" height="1080">
    </div>
  </div>
</section>
<section class="section section-soft">
  <div class="wrap">
    <div class="section-heading center">
      <p class="eyebrow">Vision &amp; Mission</p>
      <p class="lede">Spirantix AI, Inc. is a registered non-profit organization.</p>
    </div>
    <div class="callout" style="max-width:940px;margin-inline:auto;text-align:center;padding:clamp(28px,7vw,48px) clamp(20px,6vw,40px)">
      <p style="color:#8fe0c6;font-family:'Poppins','Segoe UI',system-ui,sans-serif;font-size:0.95rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:16px">Vision Statement</p>
      <p style="color:#fff;font-size:clamp(1.15rem,4.2vw,2rem);line-height:1.35;font-weight:600;font-style:italic;margin-bottom:36px;text-wrap:balance">“To help every senior use AI to live more confidently, independently, and meaningfully.”</p>
      <p style="color:#2bae9e;font-family:'Poppins','Segoe UI',system-ui,sans-serif;font-size:0.95rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:16px">Mission Statement</p>
      <p style="font-size:clamp(1.05rem,2.8vw,1.35rem);line-height:1.45;font-style:italic;margin-bottom:0;text-wrap:balance">“Spirantix helps seniors understand and safely use AI through plain-language education, community learning, and purpose-built tools that enhance their lives and preserve their legacy.”</p>
    </div>
  </div>
</section>
${originStoryBody}
<section class="section"><div class="wrap"><div class="section-heading center"><p class="eyebrow">One mission, three forms of support</p><h2>Learn, practice, and use tools designed with care</h2></div><div class="grid-3"><div class="card"><h3>Plain-language education</h3><p>Free introductory lessons explain AI without assuming technical experience.</p></div><div class="card"><h3>Community learning</h3><p>In-person and video sessions make space for questions, practice, and discussion.</p></div><div class="card"><h3>Purpose-built products</h3><p>Developing agents focus on memory, stories, authenticity, and family possessions.</p></div></div></div></section>
<section class="section section-dark"><div class="narrow" style="text-align:center;width:min(880px, calc(100% - 40px))"><h2>Interested in a class, a product, or the mission?</h2><p>Use the single contact form and choose the kind of conversation you would like to start.</p><a class="btn" href="contact.html">Contact Spirantix</a></div></section>`;

const contactBody = `${pageHero('Contact', 'How can Spirantix help?', 'Choose the reason for your message. The form will show only the questions that apply to you.')}
<section class="section section-white"><div class="wrap form-shell">
  <form data-contact-form>
    <fieldset class="field" style="border:0;padding:0;margin:0 0 28px"><legend>What would you like help with?</legend>
      <div class="radio-grid">
        <div class="radio-card"><input id="type-support" type="radio" name="inquiryType" value="support" required><label for="type-support">I use a Spirantix product and need help</label></div>
        <div class="radio-card"><input id="type-product" type="radio" name="inquiryType" value="product" required><label for="type-product">I am interested in trying a product</label></div>
        <div class="radio-card"><input id="type-speaking" type="radio" name="inquiryType" value="speaking" required><label for="type-speaking">I want information about a class or speaking engagement</label></div>
        <div class="radio-card"><input id="type-donate" type="radio" name="inquiryType" value="donate" required><label for="type-donate">I would like to make a donation or contribution</label></div>
        <div class="radio-card"><input id="type-partner" type="radio" name="inquiryType" value="partner" required><label for="type-partner">I represent a company interested in a partnership or sponsorship</label></div>
        <div class="radio-card"><input id="type-general" type="radio" name="inquiryType" value="general" required><label for="type-general">I have another question</label></div>
      </div>
    </fieldset>
    <div class="form-grid">
      <div class="field"><label for="name">Name</label><input id="name" name="name" autocomplete="name" required></div>
      <div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email" required></div>
    </div>
    <div class="conditional-fields" data-inquiry-fields="support" hidden><div class="form-grid"><div class="field"><label for="support-product">Product</label><select id="support-product" name="product"><option value="">Select one</option><option>Emery</option><option>Capsa</option><option>Addie</option><option>Heri</option><option>Other or not sure</option></select></div><div class="field"><label for="support-reply">Preferred reply</label><select id="support-reply" name="preferredReply"><option>Email</option><option>Phone, include number in message</option></select></div></div></div>
    <div class="conditional-fields" data-inquiry-fields="product" hidden><div class="form-grid"><div class="field"><label for="product-interest">Product interest</label><select id="product-interest" name="productInterest"><option value="">Select one</option><option>Emery</option><option>Capsa</option><option>Addie</option><option>Heri</option><option>The concierge</option><option>Not sure</option></select></div><div class="field"><label for="relationship">I am a</label><select id="relationship" name="relationship"><option>Senior</option><option>Family member or caregiver</option><option>Professional</option><option>Other</option></select></div></div></div>
    <div class="conditional-fields" data-inquiry-fields="speaking" hidden><div class="form-grid"><div class="field"><label for="community">Community or organization</label><input id="community" name="community" autocomplete="organization"></div><div class="field"><label for="location">City and state</label><input id="location" name="location"></div><div class="field"><label for="role">Your role</label><input id="role" name="role" autocomplete="organization-title"></div><div class="field"><label for="group-size">Approximate group size</label><input id="group-size" name="groupSize" inputmode="numeric"></div><div class="field"><label for="format">Format interest</label><select id="format" name="formatInterest"><option>Not sure yet</option><option>Single talk</option><option>Hands-on workshop</option><option>Guest session</option><option>Multi-week course</option><option>Video session</option></select></div><div class="field"><label for="timing">Preferred timing</label><input id="timing" name="timing" placeholder="Month, date range, or flexible"></div></div></div>
    <div class="conditional-fields" data-inquiry-fields="donate" hidden><div class="form-grid"><div class="field"><label for="donor-type">I am a</label><select id="donor-type" name="donorType"><option value="">Select one</option><option>Individual</option><option>Family foundation or donor-advised fund</option><option>Corporate giving program</option><option>Not sure</option></select></div><div class="field"><label for="donor-org">Organization or fund name (if applicable)</label><input id="donor-org" name="donorOrg" autocomplete="organization"></div></div></div>
    <div class="conditional-fields" data-inquiry-fields="partner" hidden><div class="form-grid"><div class="field"><label for="partner-org">Company or organization name</label><input id="partner-org" name="partnerOrg" autocomplete="organization"></div><div class="field"><label for="partner-role">Your role</label><input id="partner-role" name="partnerRole" autocomplete="organization-title"></div><div class="field"><label for="partner-interest">Type of partnership</label><select id="partner-interest" name="partnerInterest"><option value="">Select one</option><option>Corporate sponsorship</option><option>Program partnership (bring Spirantix to our communities or employees)</option><option>Not sure yet</option></select></div></div></div>
    <div class="field" style="margin-top:24px"><label for="message">Message</label><textarea id="message" name="message" maxlength="4000" placeholder="Tell us what you would like to know."></textarea></div>
    <div class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label><label>Fax<input type="text" name="fax" tabindex="-1" autocomplete="off"></label></div>
    <div class="notice small" style="margin-bottom:24px"><strong>Please do not include sensitive information.</strong> Do not send passwords, verification codes, financial account numbers, medical records, Social Security numbers, or copies of identity documents.</div>
    <button class="btn" type="submit">Send message</button>
    <div class="form-status" role="status" aria-live="polite" data-form-status></div>
  </form>
</div></section>`;

const faqBody = `${pageHero('Questions', 'Common questions about learning and Spirantix products', 'Start here for quick answers. If your question is not covered, use the contact form.')}
<section class="section"><div class="wrap accordion">
  <details><summary>Do I need experience with AI?</summary><div><p>No. The learning section and community sessions begin with ordinary language and simple examples. You can start without a technical background.</p></div></details>
  <details><summary>Are the lessons free?</summary><div><p>The introductory lessons on this website are free to read and share.</p></div></details>
  <details><summary>Are community sessions free?</summary><div><p>Many sessions are offered at no cost. When travel is required, a minimum fee may be requested to help cover expenses.</p></div></details>
  <details><summary>Can anyone attend an event listed here?</summary><div><p>Each host manages its own attendance and registration. Spirantix provides the host’s public contact information so you can ask them directly.</p></div></details>
  <details><summary>Can AI tell me whether something is a scam?</summary><div><p>AI may help identify warning signs or questions to ask, but it can be wrong. Do not treat an AI response as a guarantee. Verify important information using a trusted person or contact information you found independently.</p></div></details>
  <details><summary>Who are Emery, Capsa, Addie, and Heri?</summary><div><p>They are four developing Spirantix specialist agents. Emery focuses on memory support, Capsa on personal stories, Addie on photo and document authenticity and provenance, and Heri on family possessions and their history.</p></div></details>
  <details><summary>What is the concierge?</summary><div><p>The Spirantix Concierge is the primary point of contact for Spirantix products. A user explains what they need once, and the concierge involves the right specialist.</p></div></details>
  <details><summary>Which products are available?</summary><div><p>The Spirantix Concierge is available in beta now through ChatGPT, with a second way to reach your concierge on the way. It covers memory support, personal stories, planning, and family possessions. You ask the concierge, and it takes it from there.</p></div></details>
  <details><summary>Where does my personal information go?</summary><div><p>Spirantix products are being designed around user-controlled accounts and storage. The website contact form sends the information you enter to the Spirantix inbox so the team can reply. Read the Privacy page for details.</p></div></details>
</div></section>`;

const privacyBody = `${pageHero('Privacy', 'Clear information about how Spirantix AI handles information', 'This policy applies to this website, its contact form, and Spirantix AI products unless a product provides a separate notice.')}
<section class="lesson-shell"><div class="wrap"><div class="lesson-body privacy-body">
  <p><strong>Effective date:</strong> September 9, 2026</p>
  <p><strong>Last updated:</strong> October 18, 2026</p>
  <h2>Who operates Spirantix</h2><p>Spirantix AI operates spirantix.ai, provides AI education, and develops Spirantix products focused on memory, stories, authenticity, and family possessions. In this policy, “Spirantix AI,” “we,” “us,” and “our” refer to the operator responsible for these services.</p>
  <h2>Information we collect</h2><p>When you contact Spirantix AI, the form collects your name, email address, inquiry type, message, and any optional details you choose to provide. Depending on your inquiry, those details may include a product name, organization, location, role, group size, format interest, or preferred timing.</p><p>The form sends this information to the Spirantix AI inbox through an email delivery provider. We use it to respond to your inquiry, provide support, discuss early access, or discuss a class or speaking engagement.</p>
  <h2>Information you should not send</h2><p>Do not submit passwords, verification codes, complete financial account numbers, medical records, Social Security numbers, or copies of identity documents through the contact form.</p>
  <h2>Technical information</h2><p>Our hosting and security providers may process standard technical information such as your IP address, browser type, requested page, referring page, device information, and timestamp in order to deliver the website, prevent abuse, and maintain reliable operational logs.</p>
  <h2>How we use information</h2><p>Spirantix AI uses information to operate and secure the website and products, answer requests, provide support, improve services, manage testing and early access, and comply with applicable obligations. We do not currently use contact-form information for unrelated marketing. If we add optional product updates or a mailing list, we will explain consent and removal choices when you subscribe.</p>
  <h2>Concierge account information</h2><p>When you use a Spirantix Concierge account, we store the information you add: your name and account email, people and their names and notes, events, reminders, memories, albums, photo previews and labels, voice stories, and information or documents about belongings. Photo uploads are indexed as small previews and metadata; the original photo upload is not kept by this service. Uploaded audio and item documents are stored so you can use them again.</p><p>If you connect Google Calendar, we store the connection credentials in encrypted form and cache calendar records used by the service. You choose which connected calendars to use. We use service providers to run these features. We do not sell your personal information.</p><h2>AI product information</h2><p>Spirantix AI products are designed around user-controlled accounts and storage. Specific behavior, storage, and data use may depend on the AI provider and account you select. Product pages, testing materials, and any product-specific notice will explain those details before you add personal information. Do not use a developing product for emergencies or as a substitute for professional medical, legal, financial, or safety advice.</p>
  <h2>Service providers and third parties</h2><p>We may share information with service providers that help us host the website, deliver email, secure services, and provide requested product functions. They may process information only for those purposes and subject to their own service terms. The website and products may also link to or operate through third-party services such as ChatGPT or Claude. Those services are operated by others, and their privacy policies govern information they process.</p>
  <h2>SMS and text messaging</h2><p>If you give Spirantix AI a mobile number to receive account notifications, sign-in or access confirmations, or service updates, we use that number and your messaging consent only to send those messages. We do not sell or rent mobile numbers. Mobile information and messaging consent are not shared with third parties or affiliates for marketing or promotional purposes. Message frequency varies, and message and data rates may apply. You can reply STOP at any time to stop receiving messages, or reply HELP for help. The <a href="terms.html#sms">SMS and text messaging terms</a> in our Terms of Use describe the program in more detail.</p>
  <h2>Retention and security</h2><p>We keep information only as long as reasonably needed for the purposes described here, including support, security, recordkeeping, and applicable legal obligations. We use reasonable safeguards, but no website, email system, or online service can guarantee complete security.</p>
  <h2>Your choices</h2><p>You may ask Spirantix AI to provide, correct, or delete personal information you submitted directly to us. Some information may need to be retained for security, recordkeeping, or legal reasons. Privacy rights vary by location, and we will respond as required by applicable law.</p>
  <h2>Delete a Concierge account</h2><p>To request account deletion, email <a href="mailto:hello@spirantix.ai">hello@spirantix.ai</a> or use the <a href="contact.html?type=support">support contact form</a>. Tell us you want to delete your Spirantix account. Do not send a password, sign-in link, or account key. We need to verify that the request comes from the account owner before acting.</p><p>The account deletion function removes the account and its stored records, linked uploaded files, account access credentials, sharing grants, and stored Google Calendar connection. Deleting a Spirantix account does not delete your Google account, your original photo library, or your ChatGPT conversation history. Ask support if you need help managing information held by another service.</p><h2>Children</h2><p>The website and products are not directed to children under 13, and Spirantix AI does not knowingly collect their personal information. If you believe a child has provided personal information, contact us so we can review and remove it where appropriate.</p>
  <h2>Changes to this policy</h2><p>We may update this policy as the website and products change. The effective date at the top will show when the latest version took effect.</p>
  <h2>Questions</h2><p>Spirantix AI is responsible for this policy. For privacy questions or requests, email <a href="mailto:hello@spirantix.ai">hello@spirantix.ai</a> or use the <a href="contact.html?type=general">contact form</a>.</p>
</div></div></section>`;

const termsBody = `${pageHero('Terms of Use', 'Terms for the Spirantix AI website and products', 'These terms explain the rules that apply when you access spirantix.ai, use its materials, or test or use a Spirantix AI product.')}
<section class="lesson-shell"><div class="wrap"><div class="lesson-body privacy-body">
  <p><strong>Effective date:</strong> September 9, 2026</p>
  <p><strong>Last updated:</strong> October 16, 2026</p>
  <h2>Operator and agreement</h2><p>Spirantix AI operates spirantix.ai and the Spirantix products described on this website. In these terms, “Spirantix AI,” “we,” “us,” and “our” refer to that operator. By accessing the website or using a Spirantix AI product, you agree to these terms. If you do not agree, do not use the website or product.</p>
  <h2>Website information and education</h2><p>The website provides general educational information. It is not medical, legal, financial, emergency, or other professional advice. AI systems can produce incomplete or incorrect results. Check important information with authoritative sources or qualified professionals before acting on it.</p>
  <h2>Acceptable use</h2><p>You may use the website and products only lawfully and in a way that does not harm others or interfere with their operation. You may not attempt unauthorized access, introduce malicious code, evade security measures, misuse another person’s information, impersonate others, or use the services to violate rights or applicable law.</p>
  <h2>Accounts and third-party services</h2><p>Some products may work through an account you maintain with a third-party AI, storage, or communications provider. You are responsible for that account, its security, and compliance with the provider’s terms. Spirantix AI does not control and is not responsible for third-party services, availability, outputs, or data practices.</p>
  <h2 id="product-terms">Product and beta terms</h2><p>Spirantix products may be experimental, offered in beta, or changed or withdrawn without notice. Features may be incomplete and outputs may be inaccurate. You remain responsible for reviewing outputs and deciding whether and how to use them. Do not rely on a product for emergencies, diagnosis, treatment, legal or financial decisions, identity verification, authenticity determinations, or other high-impact decisions.</p><p>Product instructions or a product-specific agreement may add to these terms. If a product-specific agreement directly conflicts with these general terms, the product-specific agreement controls for that product.</p>
  <h2>Concierge account support</h2><p>You may ask for help with your account, request corrections, or request account deletion through <a href="support.html">Spirantix support</a>. Account changes require verification of the account owner. The <a href="privacy.html">privacy policy</a> describes the information stored by the Concierge and the account deletion function.</p><h2>Your content and privacy</h2><p>You retain ownership of content you provide. You give Spirantix AI permission to process that content only as needed to provide, secure, support, and improve the service you request, subject to the <a href="privacy.html">Privacy Policy</a> and any product-specific notice. You represent that you have the rights and permissions needed to provide the content.</p>
  <h2>Spirantix AI materials</h2><p>The website, product names, designs, text, graphics, software, and other materials provided by Spirantix AI are owned by Spirantix AI or its licensors and are protected by applicable intellectual property laws. You may use public educational materials for personal, noncommercial learning unless a page states otherwise. No other rights are granted except as expressly stated.</p>
  <h2>Feedback</h2><p>If you voluntarily provide ideas or feedback, Spirantix AI may use them without restriction or compensation, provided we do not publicly identify you without permission.</p>
  <h2>Availability and changes</h2><p>We may update, suspend, limit, or discontinue any part of the website or a product. We may also update these terms. The effective date will identify the current version. Continued use after updated terms take effect means you accept the updated terms.</p>
  <h2 id="sms">SMS and text messaging terms</h2><p>These terms cover the text messages Spirantix AI, Inc. ("Spirantix AI," "we," "us," "our") sends about the Spirantix products.</p><p><strong>Program.</strong> Spirantix AI sends account notifications, sign-in or access confirmations, reminders, and service updates about the Spirantix products you use.</p><p><strong>How you consent.</strong> You agree to receive text messages at the mobile number you provide when you give us that number for notifications. Consent is not a condition of any purchase.</p><p><strong>Message frequency.</strong> Message frequency varies.</p><p><strong>Costs.</strong> Message and data rates may apply.</p><p><strong>Opt out.</strong> Reply STOP to any message to stop receiving texts. After you reply STOP, we may send one message to confirm that you have been unsubscribed, and then we will not send further messages.</p><p><strong>Help.</strong> Reply HELP for help, or email <a href="mailto:hello@spirantix.ai">hello@spirantix.ai</a>.</p><p><strong>Privacy.</strong> Mobile information and messaging consent are not shared with third parties or affiliates for marketing or promotional purposes. See our <a href="privacy.html">Privacy Policy</a>.</p><p><strong>Carriers.</strong> Carriers are not liable for delayed or undelivered messages.</p>
  <h2>Disclaimers</h2><p>To the fullest extent permitted by law, the website, products, and materials are provided “as is” and “as available.” Spirantix AI disclaims warranties of accuracy, reliability, availability, fitness for a particular purpose, merchantability, and noninfringement. Some laws do not allow certain disclaimers, so parts of this section may not apply to you.</p>
  <h2>Limitation of liability</h2><p>To the fullest extent permitted by law, Spirantix AI will not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost data, profits, opportunities, or goodwill arising from use of or inability to use the website or products. Nothing in these terms excludes liability that cannot legally be excluded.</p>
  <h2>Suspension and termination</h2><p>Spirantix AI may restrict or end access if you violate these terms, create risk or harm, or if a service is discontinued. Provisions that by their nature should continue after termination will remain in effect.</p>
  <h2>Questions</h2><p>For questions about these terms or Spirantix AI products, email <a href="mailto:hello@spirantix.ai">hello@spirantix.ai</a> or use the <a href="contact.html?type=general">contact form</a>.</p>
</div></div></section>`;

const notFoundBody = `<section class="page-hero"><div class="narrow" style="text-align:center"><p class="eyebrow">Page not found</p><h1>That page is not here</h1><p class="lede">The address may have changed, or the link may be incomplete.</p><div class="button-row" style="justify-content:center;margin-top:28px"><a class="btn" href="index.html">Go to the homepage</a><a class="btn btn-secondary" href="learn.html">Visit the learning hub</a></div></div></section>`;

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Spirantix AI',
  url: 'https://spirantix.ai/',
  logo: 'https://spirantix.ai/assets/og-image.png',
  description: 'AI education, safety guidance, community learning, and developing AI products for seniors.'
};

export const pages = [
  { path: 'index.html', title: 'Spirantix.ai | AI Learning and Tools for Seniors', description: 'Plain-language AI lessons, safety guidance, community classes, and developing products designed for seniors.', active: '', body: homeBody, jsonLd: organizationSchema },
  { path: 'learn.html', title: 'Learn AI in Plain Language | Spirantix.ai', description: 'Friendly, practical lessons that help seniors understand ChatGPT, Claude, prompts, AI safety, and everyday uses.', active: 'learn', body: learnBody },
  { path: 'classes.html', title: 'AI Classes and Talks for Senior Communities | Spirantix.ai', description: 'Approachable in-person and video AI learning sessions for senior living communities and lifelong-learning centers.', active: 'classes', body: classesBody },
  { path: 'safety.html', title: 'AI Safety and Scam Awareness for Seniors | Spirantix.ai', description: 'Practical steps for protecting personal information, recognizing scam warning signs, and using AI as a cautious second opinion.', active: 'safety', body: safetyBody },
  { path: 'resources.html', title: 'Helpful Websites, AI Tools, and Apps for Seniors | Spirantix.ai', description: 'A growing directory of helpful websites, AI tools, apps, and services for older adults, grouped by topic and explained in plain language.', active: 'resources', body: resourcesBody },
  { path: 'products.html', title: 'Spirantix Concierge | What It Does and Where to Use It', description: 'A friendly companion for memories, photos, reminders, and family history. What the Spirantix Concierge does today, what is in the ChatGPT and Claude plug-ins, and what comes in the Spirantix app.', active: 'products', bodyClass: 'page-products', body: productsBody },
  { path: 'support.html', title: 'Spirantix Concierge Guide | How to Use, Prompts, and Questions', description: 'How to start with the Spirantix Concierge, example prompts you can copy and paste, and answers to common questions about this first release.', active: '', body: supportBody },
  { path: 'about.html', title: 'About Spirantix | AI Learning and Products for Seniors', description: 'Learn why Spirantix brings together plain-language AI education, practical safety guidance, community instruction, and thoughtful products.', active: 'about', body: aboutBody },
  { path: 'contact.html', title: 'Contact Spirantix | Support, Products, and Classes', description: 'Contact Spirantix about product support, early access, AI classes for senior communities, or another question.', active: '', body: contactBody },
  { path: 'faq.html', title: 'Spirantix Questions | Learning, Safety, and Products', description: 'Answers about Spirantix AI lessons, community sessions, safety guidance, privacy, and developing products.', active: '', body: faqBody },
  { path: 'privacy.html', title: 'Privacy | Spirantix.ai', description: 'How the Spirantix website and contact form handle information, plus the privacy approach behind developing Spirantix products.', active: '', body: privacyBody },
  { path: 'terms.html', title: 'Terms of Use | Spirantix.ai', description: 'Terms for using the Spirantix AI website, educational materials, beta services, and products.', active: '', body: termsBody },
  { path: '404.html', title: 'Page Not Found | Spirantix.ai', description: 'The requested Spirantix page could not be found.', active: '', body: notFoundBody, noindex: true }
];

export function renderPages() {
  return pages.map(page => ({ path: page.path, html: renderPage(page) }));
}
