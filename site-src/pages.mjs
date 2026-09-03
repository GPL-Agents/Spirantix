import { renderPage } from './layout.mjs';
import { agents, events, lessonIndex } from './data.mjs';

function pageHero(eyebrow, title, lede, actions = '') {
  return `<section class="page-hero">
    <div class="wrap">
      <p class="eyebrow">${eyebrow}</p>
      <h1>${title}</h1>
      <p class="lede">${lede}</p>
      ${actions ? `<div class="button-row" style="margin-top:28px">${actions}</div>` : ''}
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

function eventCards(limit = events.length) {
  return `<div class="event-list">${events.slice(0, limit).map(event => `<article class="event-card">
    <div class="event-date"><span class="day">${event.shortDate}</span><span>${event.time}</span></div>
    <div>
      <h3>${event.title}</h3>
      <p class="event-meta">${event.host} · ${event.location}</p>
      <p>${event.context}</p>
      ${event.phone ? `<p class="small"><strong>Host phone:</strong> ${event.phone}</p>` : ''}
      <a class="text-link" href="${event.hostUrl}" target="_blank" rel="noopener">${event.hostAction}</a>
    </div>
  </article>`).join('')}</div>`;
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
      <p class="lesson-meta">${published ? `${lesson.time} · <span class="text-link">Read the lesson</span>` : 'Planned for the learning library'}</p>`;
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
    ${eventCards(2)}
    <div class="button-row" style="margin-top:30px"><a class="btn btn-teal" href="classes.html">See classes and talks</a><a class="text-link" href="contact.html?type=speaking">Bring a session to your community</a></div>
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
    <div class="section-heading"><p class="eyebrow">Available now</p><h2>Begin with the basics</h2><p>These first four lessons give you a practical foundation for using ChatGPT, Claude, and other AI assistants.</p></div>
    ${lessonCards(false)}
  </div>
</section>
<section class="section section-white">
  <div class="wrap">
    <div class="section-heading"><p class="eyebrow">Coming next</p><h2>The complete introductory path</h2><p>Six more lessons will expand the library with search, Projects, agents, AI history, privacy, and scam awareness.</p></div>
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
  <div class="narrow">
    <p class="eyebrow">If something already happened</p>
    <h2>Act quickly and do not be embarrassed</h2>
    <p>Scams are designed to be convincing. Contact the company used to send the money, your bank, or the affected account provider immediately. Change exposed passwords and turn on two-factor authentication where available.</p>
    <p>For a step-by-step recovery guide, visit the <a href="https://consumer.ftc.gov/articles/what-do-if-you-were-scammed" target="_blank" rel="noopener">Federal Trade Commission’s consumer advice</a>. You can report fraud at <a href="https://reportfraud.ftc.gov/" target="_blank" rel="noopener">ReportFraud.ftc.gov</a>.</p>
  </div>
</section>`;

const classesBody = `<section class="page-hero media-page-hero">
  <div class="wrap media-page-hero-grid">
    <div class="media-page-hero-copy">
      <p class="eyebrow">Classes & Talks</p>
      <h1>Bring practical AI learning to your community</h1>
      <p class="lede">Spirantix offers approachable sessions for seniors who want to understand today’s AI tools, use them in everyday life, and protect their important information.</p>
      <div class="button-row" style="margin-top:28px"><a class="btn" href="contact.html?type=speaking">Request a session</a><a class="btn btn-secondary" href="#upcoming">See upcoming sessions</a></div>
    </div>
    <div class="media-page-hero-image">
      <img src="assets/senior.classes.png" alt="Older adults in a technology class taking notes with laptops and tablets" width="1122" height="1402">
    </div>
  </div>
</section>
<section class="section section-white" id="upcoming">
  <div class="wrap">
    <div class="section-heading"><p class="eyebrow">Upcoming</p><h2>In-person learning</h2><p>Contact the host directly for attendance requirements, availability, and other event details.</p></div>
    ${eventCards()}
  </div>
</section>
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

const productsBody = `<section class="page-hero media-page-hero">
  <div class="wrap media-page-hero-grid">
    <div class="media-page-hero-copy">
      <p class="eyebrow">Products</p>
      <h1>AI support that begins with one conversation</h1>
      <p class="lede">Spirantix is developing a family of agents for memory, stories, authenticity, and family possessions. You will not need to learn four different systems or decide where to begin.</p>
      <div class="button-row" style="margin-top:28px"><a class="btn" href="contact.html?type=product">Ask about early access</a></div>
    </div>
    <div class="media-page-hero-image">
      <img src="assets/woman.on.phone.png" alt="Older woman using a smartphone" width="1122" height="1402">
    </div>
  </div>
</section>
<section class="section section-white">
  <div class="wrap">
    <div class="callout agent-intro">
      <div class="icon" style="width:150px;height:150px;border-radius:50%;display:grid;place-items:center;background:var(--teal)" aria-hidden="true"><svg viewBox="0 0 100 100" width="86" height="86"><path d="M50 47 24 25M50 47 76 25M50 53 24 75M50 53 76 75" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="50" r="15" fill="#fff"/><circle cx="24" cy="25" r="9" fill="#8fe0c6"/><circle cx="76" cy="25" r="9" fill="#8fe0c6"/><circle cx="24" cy="75" r="9" fill="#8fe0c6"/><circle cx="76" cy="75" r="9" fill="#8fe0c6"/><circle cx="50" cy="50" r="6" fill="#2368a8"/></svg></div>
      <div><p class="eyebrow" style="color:var(--mint)">In development</p><h2>Spirantix Concierge</h2><p>Explain what you need in ordinary language. Your concierge guides the conversation and brings in the right specialist when needed.</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="section-heading center"><p class="eyebrow">Specialists working together</p><h2>Meet the Spirantix agent team</h2><p>The Spirantix Concierge listens to what you need and brings in the specialist whose focus fits.</p></div>
    ${agentCards()}
  </div>
</section>
<section class="section section-blue tessera-section"><div class="wrap grid-2" style="align-items:center"><div><p class="eyebrow">Built around your control</p><h2>The Tessera Protocol</h2><p>Tessera is the open foundation behind Spirantix products. It is designed so personal stories, memories, documents, and other private knowledge stay in accounts and storage the user controls.</p></div><div class="callout callout-light tessera-callout"><h3>Why it matters</h3><p>AI can be more useful when it understands personal context. That should not require giving up control of the information that makes the experience personal.</p><a class="text-link" href="privacy.html">Read the privacy approach</a></div></div></section>`;

const originStoryBody = `<section class="section section-soft origin-story">
  <div class="wrap"><div class="origin-story-copy">
    <div class="section-heading">
      <p class="eyebrow">How it started</p>
      <h2>A book from Christmas, 2003</h2>
    </div>
    <p>When I was 25 years old, for Christmas in 2003, I gave my grandmother a book called <em>One of a Kind: The Story of My Life</em>, which I found at the Nordstrom's store. It wasn't a book of stories already written — it was full of questions meant to help her write her own, about growing up, her parents and family, and the family she created. She lived to the ripe age of 98, in a life that carried her from Peru, Illinois, to Queens, NY, to Wichita, KS, and finally to a senior living center in Phoenix, AZ.</p>
    <figure class="story-figure float-right">
      <button type="button" class="story-figure-trigger" data-lightbox data-full="assets/note.to.grandma.jpeg" aria-label="View larger image of Greg's handwritten note to his grandmother">
        <picture><source srcset="assets/note.to.grandma.webp" type="image/webp"><img src="assets/note.to.grandma.jpeg" alt="Greg's handwritten note to his grandmother inside the front cover of her memory book, dated Christmas, December 25, 2003, Kansas City, Missouri" loading="lazy"></picture>
      </button>
      <figcaption class="figure-caption">The note Greg wrote inside the book, Christmas 2003 &mdash; tap to enlarge</figcaption>
    </figure>
    <p>The book was over 145 pages long. She spent the better part of two years filling it in, dating her entries as she went, and made it through page 30 before her eyesight grew too poor to keep writing, leaving the ribbon marking her place. I often wondered how great it would be if I could have captured those stories in her own words and recorded them instead. A photo album usually just has a date, and maybe a place or a name written on the back of each picture, or on a slip of paper tucked in with it. What I wanted was to know the real story behind each photo — where she was, what she was doing, what she was thinking about. It would be amazing to have those photos and stories collected to pass along for generations to come.</p>
    <figure class="story-figure float-left">
      <button type="button" class="story-figure-trigger" data-lightbox data-full="assets/grandma.story.jpeg" aria-label="View larger image of a page from Greg's grandmother's memory book">
        <picture><source srcset="assets/grandma.story.webp" type="image/webp"><img src="assets/grandma.story.jpeg" alt="A page from Greg's grandmother's memory book, in her own handwriting, describing where her parents lived and what they did for fun" loading="lazy"></picture>
      </button>
      <figcaption class="figure-caption">One of the pages his grandmother completed, in her own handwriting &mdash; tap to enlarge</figcaption>
    </figure>
    <p>I've also had close family members, some who have passed and some still with us, struggling with day-to-day life because of Alzheimer's, dementia, or early memory loss, along with parents of close friends who passed away unexpectedly and left behind heirlooms and possessions with no stories attached to them, in some cases with no known value. That leaves family members trying to figure out which pieces held real sentimental value, what war a medal was from, why a particular coin was kept, or which paintings and furniture are actually valuable and which aren't. Sometimes family members simply don't know what to do with these possessions, what to hold onto and what to sell.</p>
    <p>This is why I created Spirantix. There is so much today that AI can do to help pass along and record the stories and memories behind photos and possessions: truly living photo albums, and tools that can still help someone even when memory, handwriting, typing, or eyesight become difficult.</p>
    <p>My goal, and the goal of Spirantix, is to help the most important members of our communities: the seniors who have lived through so much, from wars to depressions to changing technology. In my grandmother's story about her parents, she talks about how her father delivered bread by horse and carriage in Peru, IL. That's just one way technology has changed, and it will continue to change.</p>
    <p>My hope is that through our online resources, AI tools, and in-person learning sessions, we can help many, many families to be able to learn from and cherish those memories for generations to come.</p>
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
    <div class="field" style="margin-top:24px"><label for="message">Message</label><textarea id="message" name="message" maxlength="4000" placeholder="Tell us what you would like to know."></textarea></div>
    <div class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label><label>Fax<input type="text" name="fax" tabindex="-1" autocomplete="off"></label></div>
    <div class="notice small" style="margin-bottom:24px"><strong>Please do not include sensitive information.</strong> Do not send passwords, verification codes, financial account numbers, medical records, Social Security numbers, or copies of identity documents.</div>
    <button class="btn" type="submit">Send message</button>
    <div class="form-status" role="status" aria-live="polite" data-form-status></div>
  </form>
</div></section>`;

const faqBody = `${pageHero('Questions', 'Common questions about learning and Spirantix products', 'Start here for quick answers. If your question is not covered, use the contact form.')}
<section class="section"><div class="narrow accordion">
  <details><summary>Do I need experience with AI?</summary><div><p>No. The learning section and community sessions begin with ordinary language and simple examples. You can start without a technical background.</p></div></details>
  <details><summary>Are the lessons free?</summary><div><p>The introductory lessons on this website are free to read and share.</p></div></details>
  <details><summary>Are community sessions free?</summary><div><p>Many sessions are offered at no cost. When travel is required, a minimum fee may be requested to help cover expenses.</p></div></details>
  <details><summary>Can anyone attend an event listed here?</summary><div><p>Each host manages its own attendance and registration. Spirantix provides the host’s public contact information so you can ask them directly.</p></div></details>
  <details><summary>Can AI tell me whether something is a scam?</summary><div><p>AI may help identify warning signs or questions to ask, but it can be wrong. Do not treat an AI response as a guarantee. Verify important information using a trusted person or contact information you found independently.</p></div></details>
  <details><summary>Who are Emery, Capsa, Addie, and Heri?</summary><div><p>They are four developing Spirantix specialist agents. Emery focuses on memory support, Capsa on personal stories, Addie on photo and document authenticity and provenance, and Heri on family possessions and their history.</p></div></details>
  <details><summary>What is the concierge?</summary><div><p>The Spirantix Concierge is the primary point of contact for Spirantix products. A user explains what they need once, and the concierge involves the right specialist.</p></div></details>
  <details><summary>Which products are available?</summary><div><p>The Spirantix Concierge is available in beta now, inside ChatGPT or Claude. It covers memory support, personal stories, planning, and family possessions. You ask the concierge, and it takes it from there.</p></div></details>
  <details><summary>Where does my personal information go?</summary><div><p>Spirantix products are being designed around user-controlled accounts and storage. The website contact form sends the information you enter to the Spirantix inbox so the team can reply. Read the Privacy page for details.</p></div></details>
</div></section>`;

const privacyBody = `${pageHero('Privacy', 'Clear information about what this website collects', 'This page explains the Spirantix website and contact form. Individual products may provide additional privacy information as they enter testing and release.')}
<section class="lesson-shell"><div class="lesson-body">
  <p><strong>Effective date:</strong> September 2, 2026</p>
  <h2>The Spirantix approach</h2><p>Spirantix is a division of FutureInSites. We provide AI education for seniors and are developing AI products focused on memory, stories, authenticity, and family possessions. We believe personal information should remain under the user’s control.</p>
  <h2>Information collected through the contact form</h2><p>When you contact Spirantix, the form collects your name, email address, inquiry type, message, and any optional details you choose to provide. Depending on your inquiry, those details may include a product name, organization, location, role, group size, format interest, or preferred timing.</p><p>The form sends this information to the Spirantix inbox through an email delivery provider. It is used to respond to your inquiry, provide support, discuss early access, or discuss a class or speaking engagement.</p>
  <h2>Information you should not send</h2><p>Do not submit passwords, verification codes, complete financial account numbers, medical records, Social Security numbers, or copies of identity documents through the contact form.</p>
  <h2>Website hosting information</h2><p>The hosting provider may process standard technical information such as an IP address, browser type, requested page, and timestamp for security, reliability, and operational logs.</p>
  <h2>AI product information</h2><p>Spirantix products are being designed so personal photos, stories, documents, and conversations remain in accounts and storage controlled by the user. Specific product behavior may depend on the AI provider and account selected by the user. Product pages and testing materials will describe those details before personal information is added.</p>
  <h2>Third-party services</h2><p>The website may link to ChatGPT, Claude, host organizations, FutureInSites, and government or educational resources. Their privacy practices are governed by their own policies.</p>
  <h2>Analytics and marketing</h2><p>Spirantix does not currently use contact-form information for unrelated marketing. If optional product updates or a mailing list are added, consent and removal choices will be explained at the point of collection.</p>
  <h2>Questions</h2><p>For privacy questions, email <a href="mailto:hello@spirantix.ai">hello@spirantix.ai</a> or use the <a href="contact.html?type=general">contact form</a>.</p>
</div></section>`;

const notFoundBody = `<section class="page-hero"><div class="narrow" style="text-align:center"><p class="eyebrow">Page not found</p><h1>That page is not here</h1><p class="lede">The address may have changed, or the link may be incomplete.</p><div class="button-row" style="justify-content:center;margin-top:28px"><a class="btn" href="index.html">Go to the homepage</a><a class="btn btn-secondary" href="learn.html">Visit the learning hub</a></div></div></section>`;

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Spirantix',
  url: 'https://spirantix.ai/',
  logo: 'https://spirantix.ai/assets/og-image.png',
  description: 'AI education, safety guidance, community learning, and developing AI products for seniors.',
  parentOrganization: { '@type': 'Organization', name: 'FutureInSites', url: 'https://www.futureinsites.com/' }
};

export const pages = [
  { path: 'index.html', title: 'Spirantix.ai | AI Learning and Tools for Seniors', description: 'Plain-language AI lessons, safety guidance, community classes, and developing products designed for seniors.', active: '', body: homeBody, jsonLd: organizationSchema },
  { path: 'learn.html', title: 'Learn AI in Plain Language | Spirantix.ai', description: 'Friendly, practical lessons that help seniors understand ChatGPT, Claude, prompts, AI safety, and everyday uses.', active: 'learn', body: learnBody },
  { path: 'safety.html', title: 'AI Safety and Scam Awareness for Seniors | Spirantix.ai', description: 'Practical steps for protecting personal information, recognizing scam warning signs, and using AI as a cautious second opinion.', active: 'safety', body: safetyBody },
  { path: 'classes.html', title: 'AI Classes and Talks for Senior Communities | Spirantix.ai', description: 'Approachable in-person and video AI learning sessions for senior living communities and lifelong-learning centers.', active: 'classes', body: classesBody },
  { path: 'products.html', title: 'Spirantix AI Products | One Concierge, Four Specialists', description: 'Meet the developing Spirantix concierge and specialist agents for memory, stories, authenticity, and family possessions.', active: 'products', body: productsBody },
  { path: 'about.html', title: 'About Spirantix | AI Learning and Products for Seniors', description: 'Learn why Spirantix brings together plain-language AI education, practical safety guidance, community instruction, and thoughtful products.', active: 'about', body: aboutBody },
  { path: 'contact.html', title: 'Contact Spirantix | Support, Products, and Classes', description: 'Contact Spirantix about product support, early access, AI classes for senior communities, or another question.', active: '', body: contactBody },
  { path: 'faq.html', title: 'Spirantix Questions | Learning, Safety, and Products', description: 'Answers about Spirantix AI lessons, community sessions, safety guidance, privacy, and developing products.', active: '', body: faqBody },
  { path: 'privacy.html', title: 'Privacy | Spirantix.ai', description: 'How the Spirantix website and contact form handle information, plus the privacy approach behind developing Spirantix products.', active: '', body: privacyBody },
  { path: '404.html', title: 'Page Not Found | Spirantix.ai', description: 'The requested Spirantix page could not be found.', active: '', body: notFoundBody, noindex: true }
];

export function renderPages() {
  return pages.map(page => ({ path: page.path, html: renderPage(page) }));
}
