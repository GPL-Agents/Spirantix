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
  return `<div class="grid-3">${lessons.map(lesson => {
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
        <p class="lede">Spirantix makes artificial intelligence easier to understand and more useful in everyday life, with plain-language lessons, practical safety guidance, community classes, and tools designed around you.</p>
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
        <p class="hero-note">No technical background needed. Start with one simple lesson or join us in person.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-white">
  <div class="wrap">
    <div class="section-heading center">
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
      <h2>Four friendly introductions to AI</h2>
      <p>Each lesson focuses on one idea, uses ordinary language, and ends with something you can try.</p>
    </div>
    ${lessonCards(false)}
    <div class="button-row" style="margin-top:30px"><a class="btn btn-secondary" href="learn.html">See the full learning plan</a></div>
  </div>
</section>

<section class="section section-white">
  <div class="wrap grid-2" style="align-items:center">
    <div>
      <p class="eyebrow">Stay safe</p>
      <h2>Pause, check, and protect your information</h2>
      <p class="lede">Scammers use urgency, secrecy, and familiar names to push people into acting before they have time to think. A few simple habits can make a real difference.</p>
      <a class="btn" href="safety.html">Learn the warning signs</a>
    </div>
    <div class="callout callout-light">
      <h3>The most useful first step</h3>
      <p>If a message asks for money, passwords, codes, account numbers, or immediate action, stop. Contact the person or organization using a number or website you already trust.</p>
    </div>
  </div>
</section>

<section class="section section-blue">
  <div class="wrap">
    <div class="section-heading center">
      <p class="eyebrow">Spirantix products</p>
      <h2>AI tools designed around real lives</h2>
      <p>Our developing product family helps with memory, stories, planning, and family possessions. The experience begins with one concierge, so you do not need to decide which specialist to ask.</p>
    </div>
    <div class="callout" style="max-width:840px;margin:0 auto 34px">
      <p class="eyebrow" style="color:var(--mint)">Your starting point</p>
      <h3>Your AI concierge</h3>
      <p>You explain what you need once. The concierge listens, guides the conversation, and brings in Emery, Capsa, Addie, or Heri when their specialty can help.</p>
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

const learnBody = `${pageHero('Learning hub', 'Learn AI one useful step at a time', 'You do not need a technical background. Begin with a short lesson, try one example, and return whenever you are ready for the next step.', '<a class="btn" href="learn/what-is-ai.html">Start with lesson one</a><a class="btn btn-secondary" href="classes.html">Learn in person</a>')}
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

const safetyBody = `${pageHero('Stay Safe', 'Use AI with curiosity and good judgment', 'AI can be helpful, but it can make mistakes. Scammers can also use convincing messages, familiar voices, and pressure. These habits help you protect your information and slow the situation down.', '<a class="btn" href="#warning-signs">See the warning signs</a>')}
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
  <div class="narrow">
    <p class="eyebrow">A safer response</p>
    <h2>Stop, leave, and check another way</h2>
    <ol>
      <li><strong>Stop the conversation.</strong> You do not need to explain or argue. Hang up, close the message, or leave the website.</li>
      <li><strong>Do not use the contact information they supplied.</strong> Use the number on the back of your card, an official statement, or a website you already know.</li>
      <li><strong>Speak with someone you trust.</strong> Pressure often feels less convincing once you say the story out loud.</li>
      <li><strong>Take action quickly if money or information was shared.</strong> Contact the bank, card issuer, payment service, or affected account directly.</li>
    </ol>
    <div class="notice" style="margin-top:30px"><strong>A familiar voice is not proof.</strong> Voice-cloning tools can imitate a family member from a short recording. Call that person back using a number you already know.</div>
  </div>
</section>
<section class="section section-blue">
  <div class="wrap grid-2">
    <div>
      <p class="eyebrow">Your information</p>
      <h2>Keep sensitive details out of AI chats</h2>
      <p>Do not paste passwords, verification codes, complete financial account numbers, Social Security numbers, medical records, or copies of identity documents into a general AI assistant.</p>
      <p>For personal tasks, remove names and identifying details whenever the task can be completed without them.</p>
    </div>
    <div class="callout">
      <h3>Before you share, ask</h3>
      <p>Would I be comfortable putting this information into an ordinary email? Does the AI really need this detail to help me? Can I replace the real information with a general description?</p>
    </div>
  </div>
</section>
<section class="section section-white">
  <div class="narrow">
    <p class="eyebrow">Using AI as a second opinion</p>
    <h2>Ask for warning signs, not a guarantee</h2>
    <p>You can remove private information from a suspicious message and ask an AI assistant questions such as:</p>
    <div class="try-box"><h2>Example prompt</h2><p>“I received this message. Identify any pressure tactics, unusual payment requests, or details I should verify. Do not tell me it is safe. Give me a checklist for confirming it through an independent source.”</p></div>
    <p style="margin-top:28px">AI can overlook a problem or confidently give the wrong answer. Confirm important decisions with the person, company, bank, or agency using contact information you found independently.</p>
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

const classesBody = `${pageHero('Classes & Talks', 'Bring practical AI learning to your community', 'Spirantix offers approachable sessions for seniors who want to understand today’s AI tools, use them in everyday life, and protect their important information.', '<a class="btn" href="contact.html?type=speaking">Request a session</a><a class="btn btn-secondary" href="#upcoming">See upcoming sessions</a>')}
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
<section class="section section-dark"><div class="narrow" style="text-align:center"><p class="eyebrow" style="color:var(--mint)">Start a conversation</p><h2>Tell us about your community</h2><p>Share your location, group size, preferred timing, and the kind of program you have in mind.</p><a class="btn" href="contact.html?type=speaking">Request information</a></div></section>`;

const productsBody = `${pageHero('Products', 'AI support that begins with one conversation', 'Spirantix is developing a family of agents for memory, stories, planning, and family possessions. You will not need to learn four different systems or decide where to begin.', '<a class="btn" href="contact.html?type=product">Ask about early access</a>')}
<section class="section section-white">
  <div class="wrap">
    <div class="callout agent-intro">
      <div class="icon" style="width:150px;height:150px;border-radius:50%;display:grid;place-items:center;background:var(--teal)" aria-hidden="true"><svg viewBox="0 0 100 100" width="86" height="86"><path d="M50 47 24 25M50 47 76 25M50 53 24 75M50 53 76 75" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="50" r="15" fill="#fff"/><circle cx="24" cy="25" r="9" fill="#8fe0c6"/><circle cx="76" cy="25" r="9" fill="#8fe0c6"/><circle cx="24" cy="75" r="9" fill="#8fe0c6"/><circle cx="76" cy="75" r="9" fill="#8fe0c6"/><circle cx="50" cy="50" r="6" fill="#2368a8"/></svg></div>
      <div><p class="eyebrow" style="color:var(--mint)">In development</p><h2>Your AI concierge</h2><p>The beta experience is being designed around one primary point of contact. Explain what you need in ordinary language. Your concierge guides the conversation and brings in the right specialist when needed.</p><p>The concierge’s public name and personality are still being developed. Spirantix remains the company name.</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="section-heading center"><p class="eyebrow">Specialists working together</p><h2>Meet the Spirantix agent team</h2><p>The existing roles remain distinct. The concierge makes them easier to reach.</p></div>
    ${agentCards()}
  </div>
</section>
<section class="section section-blue"><div class="wrap grid-2" style="align-items:center"><div><p class="eyebrow">Built around your control</p><h2>The Tessera Protocol</h2><p>Tessera is the open foundation behind Spirantix products. It is designed so personal stories, memories, documents, and other private knowledge stay in accounts and storage the user controls.</p></div><div class="callout callout-light"><h3>Why it matters</h3><p>AI can be more useful when it understands personal context. That should not require giving up control of the information that makes the experience personal.</p><a class="text-link" href="privacy.html">Read the privacy approach</a></div></div></section>`;

const aboutBody = `${pageHero('About', 'Spirantix connects AI learning, safety, and practical tools', 'We believe seniors should have clear explanations, respectful instruction, and meaningful choices about how artificial intelligence fits into their lives.')}
<section class="section section-white"><div class="wrap grid-2" style="align-items:center"><div><p class="eyebrow">Why Spirantix exists</p><h2>Technology should meet people where they are</h2><p>AI has moved quickly from research laboratories into search, writing, planning, health information, entertainment, and everyday communication. The pace can make useful tools feel harder to approach than they need to be.</p><p>Spirantix exists to make that transition clearer. Education comes first: understand what the tool is doing, practice with ordinary tasks, protect your information, and know when to verify an answer somewhere else.</p></div><picture><source srcset="assets/three-generations-story.webp" type="image/webp"><img src="assets/3generations.doll.png" width="1200" height="800" loading="lazy" alt="Three generations of a family sharing the story of a treasured doll" style="border-radius:var(--radius);box-shadow:var(--shadow)"></picture></div></section>
<section class="section"><div class="wrap"><div class="section-heading center"><p class="eyebrow">One mission, three forms of support</p><h2>Learn, practice, and use tools designed with care</h2></div><div class="grid-3"><div class="card"><h3>Plain-language education</h3><p>Free introductory lessons explain AI without assuming technical experience.</p></div><div class="card"><h3>Community learning</h3><p>In-person and video sessions make space for questions, practice, and discussion.</p></div><div class="card"><h3>Purpose-built products</h3><p>Developing agents focus on memory, stories, planning, and family possessions.</p></div></div></div></section>
<section class="section section-blue"><div class="narrow"><p class="eyebrow">Connected to FutureInSites</p><h2>Grounded in practical AI work</h2><p>Spirantix is a division of FutureInSites. Research and technical material developed for business audiences is adapted into shorter, clearer lessons for seniors, with practical activities and safety guidance.</p><p><a class="text-link" href="https://www.futureinsites.com" target="_blank" rel="noopener">Visit FutureInSites</a></p></div></section>
<section class="section section-dark"><div class="narrow" style="text-align:center"><h2>Interested in a class, a product, or the mission?</h2><p>Use the single contact form and choose the kind of conversation you would like to start.</p><a class="btn" href="contact.html">Contact Spirantix</a></div></section>`;

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
  <details><summary>Who are Emery, Capsa, Addie, and Heri?</summary><div><p>They are four developing Spirantix specialist agents. Emery focuses on memory support, Capsa on personal stories, Addie on planning, and Heri on family possessions and their history.</p></div></details>
  <details><summary>What is the concierge?</summary><div><p>The concierge is the planned primary point of contact for Spirantix products. A user explains what they need once, and the concierge involves the right specialist. Its public name is still being developed.</p></div></details>
  <details><summary>Which products are available?</summary><div><p>Emery is in beta. Capsa, Addie, and Heri are coming soon. Product status will be updated as testing progresses.</p></div></details>
  <details><summary>Where does my personal information go?</summary><div><p>Spirantix products are being designed around user-controlled accounts and storage. The website contact form sends the information you enter to the Spirantix inbox so the team can reply. Read the Privacy page for details.</p></div></details>
</div></section>`;

const privacyBody = `${pageHero('Privacy', 'Clear information about what this website collects', 'This page explains the Spirantix website and contact form. Individual products may provide additional privacy information as they enter testing and release.')}
<section class="lesson-shell"><div class="lesson-body">
  <p><strong>Effective date:</strong> September 2, 2026</p>
  <h2>The Spirantix approach</h2><p>Spirantix is a division of FutureInSites. We provide AI education for seniors and are developing AI products focused on memory, stories, planning, and family possessions. We believe personal information should remain under the user’s control.</p>
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
  { path: 'products.html', title: 'Spirantix AI Products | One Concierge, Four Specialists', description: 'Meet the developing Spirantix concierge and specialist agents for memory, stories, planning, and family possessions.', active: 'products', body: productsBody },
  { path: 'about.html', title: 'About Spirantix | AI Learning and Products for Seniors', description: 'Learn why Spirantix brings together plain-language AI education, practical safety guidance, community instruction, and thoughtful products.', active: 'about', body: aboutBody },
  { path: 'contact.html', title: 'Contact Spirantix | Support, Products, and Classes', description: 'Contact Spirantix about product support, early access, AI classes for senior communities, or another question.', active: '', body: contactBody },
  { path: 'faq.html', title: 'Spirantix Questions | Learning, Safety, and Products', description: 'Answers about Spirantix AI lessons, community sessions, safety guidance, privacy, and developing products.', active: '', body: faqBody },
  { path: 'privacy.html', title: 'Privacy | Spirantix.ai', description: 'How the Spirantix website and contact form handle information, plus the privacy approach behind developing Spirantix products.', active: '', body: privacyBody },
  { path: '404.html', title: 'Page Not Found | Spirantix.ai', description: 'The requested Spirantix page could not be found.', active: '', body: notFoundBody, noindex: true }
];

export function renderPages() {
  return pages.map(page => ({ path: page.path, html: renderPage(page) }));
}
