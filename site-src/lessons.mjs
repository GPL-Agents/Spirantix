import { renderPage } from './layout.mjs';

const reviewed = 'September 2, 2026';

function lessonHero(number, title, description, time) {
  return `<section class="page-hero"><div class="narrow">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../learn.html">Learning hub</a> / Lesson ${number}</nav>
    <p class="eyebrow">Lesson ${number} · ${time}</p>
    <h1>${title}</h1>
    <p class="lede">${description}</p>
  </div></section>`;
}

function sourceNote(text) {
  return `<div class="lesson-footer"><p><strong>Last reviewed:</strong> ${reviewed}</p><p>${text}</p><p>AI products change frequently. If a button or menu looks different, use the product’s Help area or official documentation for the newest instructions.</p></div>`;
}

const whatIsAi = `${lessonHero(1, 'What AI is, and what it is not', 'A plain-language introduction to artificial intelligence, generative AI, and the limits that matter.', '7 minute read')}
<article class="lesson-shell"><div class="lesson-body">
  <p>Artificial intelligence is a broad name for computer systems that perform tasks we normally associate with human abilities. Those tasks can include recognizing speech, identifying objects in a photograph, recommending a route, translating a sentence, or finding patterns in a large collection of information.</p>
  <p>AI is not one machine or one kind of program. It is a collection of methods that has developed over many decades.</p>

  <h2>What makes generative AI different?</h2>
  <p>Many familiar AI systems sort, predict, or recommend. Generative AI creates something new in response to a request. It can produce text, images, audio, computer code, summaries, and other material.</p>
  <p>ChatGPT and Claude are examples of generative AI assistants. You communicate with them by typing or speaking a <strong>prompt</strong>, which is simply your question or instruction.</p>

  <h2>How can it answer so many questions?</h2>
  <p>A large language model learns patterns from enormous amounts of text and other material. When it responds, it predicts a useful sequence of words based on your prompt and the patterns learned during training.</p>
  <p>That prediction can be remarkably helpful. It can also be wrong. The system does not automatically know whether every sentence it produces is true. It may misunderstand your request, rely on incomplete information, or create a detail that sounds convincing but is not supported.</p>
  <div class="notice"><strong>Important:</strong> A confident tone is not evidence that an AI answer is correct.</div>

  <h2>What AI does well</h2>
  <ul>
    <li>Explaining an unfamiliar idea in simpler language</li>
    <li>Creating a first draft of a letter or message</li>
    <li>Brainstorming options for a trip, meal, hobby, or project</li>
    <li>Organizing notes into a list or plan</li>
    <li>Comparing choices when you provide the important details</li>
    <li>Helping you think of questions to ask a professional</li>
  </ul>

  <h2>What needs extra care</h2>
  <ul>
    <li><strong>Current facts:</strong> schedules, prices, laws, product features, and public roles can change.</li>
    <li><strong>Health, legal, and financial decisions:</strong> AI can help you prepare questions, but qualified professionals and authoritative sources should guide important decisions.</li>
    <li><strong>Private information:</strong> a general AI assistant usually does not need passwords, account numbers, medical records, or identity documents.</li>
    <li><strong>Claims about people:</strong> names, quotations, and accusations should be checked carefully.</li>
  </ul>

  <h2>Think of it as a capable assistant</h2>
  <p>A useful way to approach AI is as a patient assistant that can help you explore, draft, and organize. Give it a clear task, review what it produces, and ask follow-up questions. When the answer matters, check it against a trustworthy source.</p>
  <p>You remain responsible for deciding what to believe, share, or act on.</p>

  <div class="try-box"><h2>Try this today</h2><p>Open ChatGPT or Claude and ask:</p><p><strong>“Explain generative AI in five short sentences. Use one everyday example and avoid technical terms.”</strong></p><p>Then follow up with: <strong>“What is one important limitation I should remember?”</strong></p></div>

  ${sourceNote('Adapted in part from <a href="https://www.futureinsites.com/ai-for-executives.html" target="_blank" rel="noopener">FutureInSites research on artificial intelligence</a>.')}
</div></article>`;

const chatgptBasics = `${lessonHero(2, 'Getting started with ChatGPT', 'Begin a conversation, ask a useful question, and improve the answer one step at a time.', '8 minute read')}
<article class="lesson-shell"><div class="lesson-body">
  <p>ChatGPT is an AI assistant from OpenAI. You can use it for explanations, planning, writing, brainstorming, and many other tasks through an ordinary conversation.</p>
  <p>You do not need special commands. Begin in your own words.</p>

  <h2>1. Open ChatGPT</h2>
  <p>Visit <a href="https://chatgpt.com" target="_blank" rel="noopener">chatgpt.com</a> in a web browser, or open the official ChatGPT application. Depending on how you access it and which features you want, you may be asked to sign in or create an account.</p>
  <p>Make sure the address is spelled correctly before entering account information.</p>

  <h2>2. Start with one real task</h2>
  <p>Find the message box, describe what you want, and send the message. Your first request does not need to be perfect.</p>
  <p>For example:</p>
  <div class="notice"><strong>“Help me plan three easy dinners for this week. Each should serve two people and take less than 30 minutes.”</strong></div>
  <p style="margin-top:24px">This works because it names the goal and includes a few useful details. ChatGPT can now ask a question or offer a starting plan.</p>

  <h2>3. Continue the same conversation</h2>
  <p>You do not need to repeat everything. Use a follow-up message to improve the answer:</p>
  <ul>
    <li>“Replace the fish recipe with a vegetarian option.”</li>
    <li>“Make one shopping list for all three meals.”</li>
    <li>“Explain the second recipe one step at a time.”</li>
  </ul>
  <p>This back-and-forth process is one of the main differences between using an AI assistant and typing a few keywords into a search box.</p>

  <h2>4. Ask it to make the answer easier to use</h2>
  <p>If the response is too long, too technical, or organized poorly, say so. Try:</p>
  <ul>
    <li>“Use shorter sentences.”</li>
    <li>“Put this into a table.”</li>
    <li>“Give me only the three most important points.”</li>
    <li>“Explain this as if I am new to the subject.”</li>
  </ul>

  <h2>5. Check important or current information</h2>
  <p>ChatGPT may be able to search the web, depending on the version and tools available to you. Even when it provides sources, open the source and confirm that it supports the answer.</p>
  <p>For current schedules, prices, legal requirements, medical information, or financial decisions, use the relevant official organization or a qualified professional.</p>

  <h2>6. Protect private information</h2>
  <p>ChatGPT does not need your password, verification code, complete account number, Social Security number, or an unedited medical record to help with an ordinary question.</p>
  <p>Replace real names and numbers with general descriptions whenever possible. Review your account’s data and privacy settings so they match how you want to use the service.</p>

  <div class="try-box"><h2>Try this today</h2><p>Ask ChatGPT:</p><p><strong>“Give me five ideas for a new indoor hobby. I enjoy learning, I have a modest budget, and I would like something I can do for 30 minutes at a time.”</strong></p><p>Choose one idea and ask two follow-up questions about it.</p></div>

  ${sourceNote('Instructions were checked against the <a href="https://learn.chatgpt.com/docs/use-chatgpt" target="_blank" rel="noopener">official ChatGPT getting-started guide</a> and <a href="https://learn.chatgpt.com/docs/prompting" target="_blank" rel="noopener">official prompting guidance</a>.')}
</div></article>`;

const claudeBasics = `${lessonHero(3, 'Getting started with Claude', 'Learn the basic conversation flow and where Claude can be especially helpful.', '8 minute read')}
<article class="lesson-shell"><div class="lesson-body">
  <p>Claude is an AI assistant from Anthropic. Like ChatGPT, it can explain, draft, compare, organize, and work through a task with you in a conversation.</p>
  <p>Claude is available on the web and through official desktop and mobile applications. Features and limits can differ by account and plan.</p>

  <h2>1. Open Claude</h2>
  <p>Visit <a href="https://claude.ai" target="_blank" rel="noopener">claude.ai</a> in a browser, or use the official Claude application. Sign in or create an account if prompted.</p>
  <p>Check the spelling of the address before entering account information.</p>

  <h2>2. Write a natural first prompt</h2>
  <p>Claude’s official guidance recommends speaking naturally, much as you would to a helpful coworker or friend. A prompt can be a simple question or a detailed request.</p>
  <p>For example:</p>
  <div class="notice"><strong>“I want to understand my electric bill. Give me a short list of the terms I should look for and what each one usually means.”</strong></div>

  <h2>3. Add the context that matters</h2>
  <p>If Claude gives a general answer, add information that makes the task specific to you without revealing unnecessary private details.</p>
  <ul>
    <li>“I live in an apartment, so skip advice about replacing large equipment.”</li>
    <li>“I only want steps that do not require buying anything.”</li>
    <li>“Keep the explanation under 300 words.”</li>
  </ul>

  <h2>4. Refine the answer</h2>
  <p>Your next message can correct, narrow, or reorganize the response. Try asking Claude to:</p>
  <ul>
    <li>Use a checklist</li>
    <li>Explain one unfamiliar term</li>
    <li>Compare two options</li>
    <li>Identify assumptions it made</li>
    <li>List facts that should be verified</li>
  </ul>

  <h2>5. Work with documents carefully</h2>
  <p>Claude can work with documents and other uploaded material. Before uploading, consider whether the task requires the complete document. Remove account numbers, identity information, medical details, signatures, and other private material that is not needed.</p>
  <p>Ask for a summary, list of questions, or plain-language explanation. Do not rely on Claude alone for legal, medical, financial, or contractual decisions.</p>

  <h2>6. Use a Project for continuing work</h2>
  <p>Claude Projects can keep related conversations, instructions, and uploaded reference material together. Projects are useful when you will return to the same subject more than once.</p>
  <p>A later Spirantix lesson will walk through Projects in both Claude and ChatGPT. For now, an ordinary conversation is enough to practice the basics.</p>

  <div class="try-box"><h2>Try this today</h2><p>Ask Claude:</p><p><strong>“Help me create a simple checklist for preparing for a weekend visit from family. Organize it into the day before, the morning of the visit, and just before they arrive.”</strong></p><p>Then ask Claude to shorten the checklist to the items that matter most.</p></div>

  ${sourceNote('Instructions were checked against Anthropic’s <a href="https://support.claude.com/en/articles/8114491-get-started-with-claude" target="_blank" rel="noopener">official guide to getting started with Claude</a> and <a href="https://support.claude.com/en/articles/9517075-what-are-projects" target="_blank" rel="noopener">official Projects explanation</a>.')}
</div></article>`;

const betterPrompts = `${lessonHero(4, 'How to ask AI a useful question', 'A simple four-part method for writing prompts that produce clearer, more useful answers.', '7 minute read')}
<article class="lesson-shell"><div class="lesson-body">
  <p>A prompt is simply what you ask an AI assistant to do. It can be one sentence or several paragraphs. You do not need a secret vocabulary or a perfect formula.</p>
  <p>Start with your own words. When the task matters or the first answer is not useful enough, add four kinds of information.</p>

  <h2>1. Say what you want done</h2>
  <p>Begin with the goal. Use a direct verb such as explain, compare, draft, organize, summarize, or plan.</p>
  <p><strong>Vague:</strong> “Gardening”</p>
  <p><strong>Clearer:</strong> “Help me choose three vegetables for a small container garden.”</p>

  <h2>2. Add helpful background</h2>
  <p>Give the facts that would change the answer. You might include your location, experience level, budget, available time, preferences, or the audience for a message.</p>
  <p><strong>Example:</strong> “The containers will be on a sunny apartment balcony in New York. I am new to gardening.”</p>
  <p>Leave out private information the assistant does not need.</p>

  <h2>3. Describe the result you want</h2>
  <p>Tell the assistant how the answer should be organized or how detailed it should be.</p>
  <p><strong>Example:</strong> “Give me a table with the plant, container size, watering needs, and when to plant it.”</p>

  <h2>4. Add boundaries or checks</h2>
  <p>Name anything the assistant should avoid, preserve, or verify.</p>
  <p><strong>Example:</strong> “Keep the cost under $60. Tell me which advice depends on current local weather or planting dates.”</p>

  <h2>Put the four parts together</h2>
  <div class="notice"><strong>Complete prompt:</strong><br>“Help me choose three vegetables for a small container garden. The containers will be on a sunny apartment balcony in New York, and I am new to gardening. Give me a table with the plant, container size, watering needs, and when to plant it. Keep the cost under $60, and tell me which advice depends on current local weather or planting dates.”</div>
  <p style="margin-top:24px">This does not guarantee a perfect answer. It gives the assistant a much better chance of producing something relevant and easy to use.</p>

  <h2>Use follow-up questions</h2>
  <p>The first response is a starting point. Continue the conversation:</p>
  <ul>
    <li>“Which option is easiest for a beginner?”</li>
    <li>“What did you assume about my balcony?”</li>
    <li>“Make the table easier to print.”</li>
    <li>“Which facts should I confirm with a local gardening source?”</li>
  </ul>

  <h2>Ask for uncertainty</h2>
  <p>For an important subject, ask the assistant to separate what it knows from what it is assuming. You can also ask for sources, but you should open those sources and confirm they really support the answer.</p>
  <p>A useful phrase is: <strong>“If you are uncertain, say so. List anything I should verify before acting.”</strong></p>

  <div class="try-box"><h2>Try this today</h2><p>Choose one task you actually need to do. Write a prompt with:</p><ol><li>Your goal</li><li>Helpful background</li><li>The result format</li><li>One boundary or check</li></ol><p>After the answer, ask one follow-up question that makes it more useful.</p></div>

  ${sourceNote('This lesson follows the <a href="https://learn.chatgpt.com/docs/prompting" target="_blank" rel="noopener">official ChatGPT prompting framework</a>, adapted into a practical exercise for Spirantix learners.')}
</div></article>`;

const lessons = [
  { slug: 'what-is-ai', title: 'What AI Is, and What It Is Not | Spirantix.ai', description: 'A plain-language introduction to artificial intelligence, generative AI, and important limits.', body: whatIsAi },
  { slug: 'chatgpt-basics', title: 'Getting Started with ChatGPT | Spirantix.ai', description: 'A beginner-friendly guide to starting a ChatGPT conversation, using follow-up questions, checking answers, and protecting private information.', body: chatgptBasics },
  { slug: 'claude-basics', title: 'Getting Started with Claude | Spirantix.ai', description: 'A beginner-friendly guide to starting with Claude, refining answers, using documents carefully, and understanding Projects.', body: claudeBasics },
  { slug: 'better-prompts', title: 'How to Write a Useful AI Prompt | Spirantix.ai', description: 'Use a simple four-part method to ask clearer questions and get more useful answers from ChatGPT, Claude, and other AI assistants.', body: betterPrompts }
];

function articleSchema(lesson) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: lesson.title.replace(' | Spirantix.ai', ''),
    description: lesson.description,
    datePublished: '2026-09-02',
    dateModified: '2026-09-02',
    author: { '@type': 'Organization', name: 'Spirantix', url: 'https://spirantix.ai/' },
    publisher: { '@type': 'Organization', name: 'Spirantix', url: 'https://spirantix.ai/' },
    mainEntityOfPage: `https://spirantix.ai/learn/${lesson.slug}.html`
  };
}

export function renderLessons() {
  return lessons.map(lesson => ({
    path: `learn/${lesson.slug}.html`,
    html: renderPage({
      title: lesson.title,
      description: lesson.description,
      path: `learn/${lesson.slug}.html`,
      active: 'learn',
      depth: 1,
      body: lesson.body,
      jsonLd: articleSchema(lesson)
    })
  }));
}
