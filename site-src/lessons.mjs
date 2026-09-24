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

function sourceNote(text, date) {
  return `<div class="lesson-footer"><p><strong>Last reviewed:</strong> ${date || reviewed}</p><p>${text}</p><p>AI products change frequently. If a button or menu looks different, use the product’s Help area or official documentation for the newest instructions.</p></div>`;
}

function lessonNav(nextSlug, nextTitle) {
  return `<div class="button-row" style="margin-top:32px"><a class="btn" href="${nextSlug}.html">Next lesson: ${nextTitle}</a></div>`;
}

function lessonNavEnd() {
  return `<div class="button-row" style="margin-top:32px"><a class="btn" href="../learn.html">Back to the Learning hub</a><a class="btn btn-secondary" href="../learn.html">See what is coming next</a></div>`;
}

const whatIsAi = `${lessonHero(1, 'What AI is', 'A plain-language introduction to artificial intelligence, generative AI, and the limits that matter.', '7 minute read')}
<article class="lesson-shell"><div class="lesson-body">
  <p>Artificial intelligence is a broad name for computer systems that perform tasks we normally associate with human abilities. Those tasks can include recognizing speech, identifying objects in a photograph, recommending a route, translating a sentence, or finding patterns in a large collection of information.</p>
  <p>AI is not one machine or one kind of program. It is a collection of methods that has developed over many decades.</p>

  <figure class="lesson-figure lesson-figure-wide">
    <button class="lesson-image-trigger" type="button" data-lightbox aria-label="Enlarge the everyday AI diagram">
      <img src="../assets/lesson-what-ai-does.svg" alt="Diagram showing five everyday kinds of AI: recognizing speech, identifying objects, recommending a route, translating language, and finding patterns. It also shows that generative AI uses learned patterns to create new text, images, and audio." width="1400" height="820" loading="eager">
    </button>
    <figcaption>AI is a family of tools that work with patterns. Generative AI is the part of that family that creates new material.</figcaption>
  </figure>

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

  <div class="lesson-visual-grid" aria-label="A simple guide to common AI tasks">
    <div><span aria-hidden="true">💬</span><strong>Explain</strong><p>Turn a difficult idea into plain language.</p></div>
    <div><span aria-hidden="true">📝</span><strong>Draft</strong><p>Create a first version you can revise.</p></div>
    <div><span aria-hidden="true">🧩</span><strong>Organize</strong><p>Sort notes, choices, or steps into order.</p></div>
    <div><span aria-hidden="true">🔎</span><strong>Compare</strong><p>Lay out options using details you provide.</p></div>
  </div>

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

  <details class="lesson-check"><summary>Quick check: Which task is safest to give AI?</summary><div><p><strong>A good choice:</strong> asking for a first draft of a birthday invitation that you will review.</p><p><strong>Use extra care:</strong> asking AI to make a final medical, legal, or financial decision for you.</p></div></details>

  <div class="try-box"><h2>Try this today</h2><p>Open ChatGPT or Claude and ask:</p><p><strong>“Explain generative AI in five short sentences. Use one everyday example and avoid technical terms.”</strong></p><p>Then follow up with: <strong>“What is one important limitation I should remember?”</strong></p></div>

  ${lessonNav('history-of-generative-ai', 'How AI got here')}
  ${sourceNote('Part of the free Spirantix AI learning series.')}
</div></article>`;

const chatgptBasics = `${lessonHero(3, 'ChatGPT basics', 'Begin a conversation, ask a useful question, and improve the answer one step at a time.', '8 minute read')}
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

  ${lessonNav('claude-basics', 'Claude basics')}
  ${sourceNote('Instructions were checked against the <a href="https://learn.chatgpt.com/docs/use-chatgpt" target="_blank" rel="noopener">official ChatGPT getting-started guide</a> and <a href="https://learn.chatgpt.com/docs/prompting" target="_blank" rel="noopener">official prompting guidance</a>.')}
</div></article>`;

const claudeBasics = `${lessonHero(4, 'Claude basics', 'Learn the basic conversation flow and where Claude can be especially helpful.', '8 minute read')}
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

  ${lessonNav('better-prompts', 'Asking better questions')}
  ${sourceNote('Instructions were checked against Anthropic’s <a href="https://support.claude.com/en/articles/8114491-get-started-with-claude" target="_blank" rel="noopener">official guide to getting started with Claude</a> and <a href="https://support.claude.com/en/articles/9517075-what-are-projects" target="_blank" rel="noopener">official Projects explanation</a>.')}
</div></article>`;

const betterPrompts = `${lessonHero(5, 'Asking better questions', 'A simple four-part method for writing prompts that produce clearer, more useful answers.', '7 minute read')}
<article class="lesson-shell"><div class="lesson-body">
  <div class="notice"><strong>You can talk instead of type.</strong> Speaking your question is often easier than typing it. On a Windows computer, click where you type and press the Windows key and the H key together. On a Mac, press the Fn (function) key twice to start Dictation, or press the microphone key on the keyboard. On a phone or tablet, tap the microphone on the keyboard. Press the same keys or tap the microphone again to stop.</div>
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

  ${lessonNav('ai-danger-what-the-news-shows', 'Is AI actually dangerous?')}
  ${sourceNote('This lesson follows the <a href="https://learn.chatgpt.com/docs/prompting" target="_blank" rel="noopener">official ChatGPT prompting framework</a>, adapted into a practical exercise for Spirantix learners.')}
</div></article>`;

const historyOfAi = `${lessonHero(2, 'How AI got here', 'Follow the major steps that led from early AI systems to today’s tools.', '4 minute read')}
<article class="lesson-shell"><div class="lesson-body">
  <p>AI did not appear overnight. It grew slowly, over about sixty years. Today’s tools are built on old ideas that finally had enough information to work well.</p>
  <p>Here is the short story.</p>

  <h2>It started by counting words</h2>
  <p>The first programs treated words as simple counts. They did not know what the words meant.</p>

  <h2>Then they learned what words mean</h2>
  <p>A big step came in 2013. Computers learned to turn words into numbers. Words with similar meaning ended up close together. A word like “doctor” could sit near “nurse.”</p>

  <h2>Then they learned about context</h2>
  <p>In 2017 came another big step. A computer could read a word by the words around it. So “bank” could mean a place for money, or the side of a river, depending on the sentence.</p>

  <figure class="lesson-figure lesson-figure-wide">
    <button class="lesson-image-trigger" type="button" data-lightbox aria-label="Enlarge the detailed road to generative AI chart">
      <img src="../assets/lesson-road-to-generative-ai.png" alt="Detailed chart showing five stages on the road to generative AI, with examples and real-world applications" width="1183" height="1000" loading="lazy">
    </button>
    <figcaption>This chart shows the five connected stages and familiar examples from each one. Select it to enlarge and explore.</figcaption>
  </figure>

  <h2>Then they could create</h2>
  <p>That led to the tools we use today, such as ChatGPT, Gemini, and Claude. They guess the next word, then the next, and build an answer one piece at a time. They seem smart because they learned patterns from an enormous amount of writing.</p>

  <h2>What they are not</h2>
  <p>They are not alive and not aware. They build responses from learned patterns, so check anything that matters.</p>

  <details class="lesson-check"><summary>Try the “bank” test</summary><div><p>Which meaning of <strong>bank</strong> fits each sentence?</p><ol><li>“We sat on the bank and watched the river.”</li><li>“I called the bank about my account.”</li></ol><p>An AI system uses the surrounding words to choose between the riverbank and the financial institution. That ability to use context was a major step toward today’s assistants.</p></div></details>

  <h2>What comes next</h2>
  <p>The next step is tools that do more than answer. They can plan and take actions for you. That leaves a simple question for families: where is AI helpful, and where should a person stay in charge?</p>

  <div class="try-box"><h2>Try this today</h2><p>Ask ChatGPT or Claude:</p><p><strong>“Explain how computers learned to write, in five short sentences, with one simple example.”</strong></p><p>Then ask: <strong>“What is one thing I should not trust you to do?”</strong></p></div>

  ${lessonNav('chatgpt-basics', 'ChatGPT basics')}
  ${sourceNote('Adapted from the FutureInSites article <a href="https://www.futureinsites.com/history-of-generative-ai" target="_blank" rel="noopener">History of Generative AI</a>, rewritten in plainer language for Spirantix learners.', 'September 15, 2026')}
</div></article>`;

const aiDanger = `${lessonHero(6, 'Is AI actually dangerous?', 'What the news is really reporting about AI risk, data centers, cyberattacks, and calls for regulation.', '11 minute read')}
<article class="lesson-shell"><div class="lesson-body">
  <p>Three questions come up often when AI is in the news. Can the companies building these systems actually control them? Is AI about to get out of hand? And can elected leaders do anything about it?</p>
  <p>No one, not the AI companies, not the researchers who study them, not the lawmakers who regulate them, has a settled answer. That is the honest starting point. This lesson looks at what has actually happened in the news, separates it from what might happen, and gives you the sources so you can check for yourself.</p>

  <h2>Why this has been in the news</h2>
  <p>On September 8, 2026, a researcher named Jacob Coxon <a href="https://www.pbs.org/newshour/science/anthropic-researchers-resignation-sends-warning-about-the-dangers-of-ai-development" target="_blank" rel="noopener">posted that he had resigned from Anthropic</a>, one of the companies that builds AI assistants. He said the leading AI companies were racing ahead faster than they could keep the technology safe.</p>
  <p>What made this a bigger story is who agreed with him publicly, under their own names. A researcher who monitors AI systems at OpenAI <a href="https://time.com/article/2026/09/15/ai-anthropic-researcher-quits-coxon-slowdown/" target="_blank" rel="noopener">put the odds of a very bad outcome, without stronger safety rules, at 70 percent</a>. A former senior safety researcher who worked at OpenAI, DeepMind, and the UK government's AI safety office <a href="https://time.com/article/2026/09/15/ai-anthropic-researcher-quits-coxon-slowdown/" target="_blank" rel="noopener">estimated a 50 percent chance of serious harm within the next decade</a>. <a href="https://time.com/article/2026/09/15/ai-anthropic-researcher-quits-coxon-slowdown/" target="_blank" rel="noopener">Anthropic's own alignment lead said he believes the risk is real</a>.</p>
  <p>These are not outside critics. They are, or were, people working inside the companies building the technology, which is why the story traveled the way it did. It does not prove any one number is correct. Estimates like these cannot be tested the way a weather forecast can. What is verifiable is that senior people inside the leading AI companies are now saying this in public.</p>
  <div class="notice"><strong>Worth knowing:</strong> Concern about advanced AI is not new. A nonprofit called the Machine Intelligence Research Institute <a href="https://intelligence.org/about/" target="_blank" rel="noopener">has argued for over a decade that AI poses a serious risk</a>, well before this news cycle.</div>

  <h2>The environmental question</h2>
  <p>You may have heard AI data centers compared to a desert city watering its lawns: using water a region cannot spare. The real picture is more mixed than that.</p>

  <h3>Why a data center needs water at all</h3>
  <p>Computer equipment generates heat, and heat has to go somewhere. Many data centers cool themselves the way your body cools itself when you sweat: water absorbs heat and evaporates, carrying the heat away. It works well, but it uses a lot of water. The International Energy Agency estimates that a large data center can use <a href="https://www.networkworld.com/article/4138052/why-do-data-centers-need-so-much-water.html" target="_blank" rel="noopener">roughly half a million gallons of water a day, about as much as 6,500 homes</a>. Not every data center uses this much. Newer designs use closed-loop or air cooling that recycles the same water instead of evaporating it, which some companies are now building specifically to avoid this problem.</p>

  <figure class="lesson-figure lesson-figure-wide">
    <button class="lesson-image-trigger" type="button" data-lightbox aria-label="Enlarge the chart showing who uses Arizona's Colorado River water">
      <img src="../assets/lesson-data-center-water.svg" alt="Bar chart showing agriculture uses about 72 percent of Arizona's Colorado River water, all other uses combined including cities and industry make up about 28 percent, and AI data centers use an estimated 1,841 of the 1.9 million acre-feet drawn each year, well under one tenth of one percent." width="1200" height="680" loading="lazy">
    </button>
    <figcaption><a href="https://cronkitenews.azpbs.org/2026/09/11/data-centers-water-colorado-river/" target="_blank" rel="noopener">Data centers are a small slice of Arizona's water use today</a>. That slice is growing fast and is not tracked well, which is the honest complication.</figcaption>
  </figure>

  <h3>Is this only an Arizona problem?</h3>
  <p>No. It shows up wherever a data center is built in a place that is already short on water. In Georgia, a drought and a fast-growing cluster of data centers around Atlanta <a href="https://news.bloomberglaw.com/environment-and-energy/drought-ravaged-georgia-asks-data-centers-to-cut-water-use" target="_blank" rel="noopener">led planners to ask developers to cut back</a>, with water requests for individual projects ranging from about 5,000 gallons a day for efficient closed-loop systems up to 9 million gallons a day for older designs. In central Iowa, a water use ban in 2025 led some people to blame Microsoft's local data centers, but <a href="https://www.axios.com/local/des-moines/2025/06/17/central-iowa-water-ban-data-centers-microsoft" target="_blank" rel="noopener">the utility that manages the water supply said the real cause was contamination in two rivers</a> that limited how much could be treated, and that <a href="https://www.iowapublicradio.org/ipr-news/2025-06-20/des-moines-lawn-watering-ban-central-iowa" target="_blank" rel="noopener">lawn watering used far more water than the data centers did</a> once the ban took effect.</p>
  <p>Outside the US, it has become a bigger flashpoint. <a href="https://news.yahoo.com/chile-puts-brakes-google-data-174703001.html" target="_blank" rel="noopener">A Chilean court ordered Google to redo its environmental review</a> for a data center project in Santiago after residents objected to a plan that would have used about 2 million gallons of drinking water a day during a drought; Google has since offered to switch to air cooling instead. Data center water use has also <a href="https://www.bloomberg.com/graphics/2025-ai-impacts-data-centers-water-data/" target="_blank" rel="noopener">drawn public protests in Uruguay and the Netherlands</a>, and both China and India are seeing a larger share of new data centers built in drier regions.</p>

  <h3>Is anyone making the case this is overblown?</h3>
  <p>Yes, and it is worth reading. <a href="https://itif.org/publications/2026/07/06/the-data-center-water-problem-is-soluble/" target="_blank" rel="noopener">A July 2026 report from the Information Technology and Innovation Foundation</a> argued that data centers use less than 1 percent of total water consumption in the United States, that there is no nationwide shortage, and that the real problems are local, in already-dry places like Arizona, rather than a general crisis. It also pointed to newer "zero water" cooling designs that some companies are already building. The Iowa case above is a real example of a local water problem that data centers were blamed for and, on closer look, mostly were not responsible for.</p>
  <p>Put together, the honest summary is: this is a real and growing issue in specific dry places, not evidence that data centers are draining water everywhere, and the industry has a clear technical path to using much less of it.</p>

  <p>On energy, the trend is genuinely improving. <a href="https://www.cam.ac.uk/research/news/new-computer-chip-material-inspired-by-the-human-brain-could-slash-ai-energy-use" target="_blank" rel="noopener">New chip designs and cooling methods published in 2026 could cut AI energy use</a> and improve efficiency significantly, though most of this is still moving from the lab toward real-world use. Total AI energy use is still rising as more data centers get built, but each individual task is getting less wasteful, not more.</p>

  <h2>What has actually caused damage</h2>
  <p>Set aside hypothetical future harms and look at what has actually hurt people and businesses. The honest answer: ordinary cybercrime, most of it not using AI at all.</p>
  <p>Clorox, the consumer products company, <a href="https://www.industryweek.com/technology-and-iiot/article/21274431/the-clorox-co-recovers-from-severe-cyberattack" target="_blank" rel="noopener">lost an estimated $356 million</a> after attackers <a href="https://www.bleepingcomputer.com/news/security/hackers-fooled-cognizant-help-desk-says-clorox-in-380m-cyberattack-lawsuit/" target="_blank" rel="noopener">tricked its IT help desk into resetting an employee's password</a> in 2023. <a href="https://www.tomshardware.com/tech-industry/cyber-security/158-year-old-company-forced-to-close-after-ransomware-attack-precipitated-by-a-single-guessed-password-700-jobs-lost-after-hackers-demand-unpayable-sum" target="_blank" rel="noopener">A UK transport company founded in 1865, employing 700 people, was forced to close in 2025</a> after a ransomware attack that started with one employee's weak, easily-guessed password.</p>
  <p>Neither of those required a misbehaving AI system. Both required one weak point in ordinary account security.</p>
  <div class="notice"><strong>Important:</strong> The single habit that would have stopped both of those attacks is one you already use in earlier lessons: strong, unique passwords and multi-factor authentication wherever it is offered.</div>

  <h2>What AI actually is</h2>
  <p>It helps to be precise about what a system like ChatGPT, Claude, or the Spirantix Concierge actually is. It is a predictive system, guided at every step by the instructions a person built into it. It does not want anything on its own, and it is not self-aware the way a person is.</p>
  <p>That does not mean it cannot be misused. It can, the same way any powerful tool can. But the tool is not what is responsible for the misuse, any more than a car is responsible when someone drives it recklessly. The line between a tool and the person using it is worth holding onto.</p>

  <h2>The regulation question, and who benefits</h2>
  <p><a href="https://www.theregister.com/ai-and-ml/2026/09/14/big-ai-sets-out-its-terms-for-regulatory-capture-and-calls-it-pace-the-frontier/5296067" target="_blank" rel="noopener">The leading AI labs have started asking government to set safety rules</a>: independent oversight, common safety standards, and coordination between companies. Several well-known industry leaders have backed this idea.</p>
  <p>Here is the part worth sitting with. A small number of companies, already far ahead of everyone else, are asking government to set rules that mainly companies at their scale can easily meet. Critics have pointed out this can work like a competitive shield: it can be sincerely meant as a safety measure, and it can also make it harder for a new competitor to catch up. Both things can be true about the same proposal.</p>

  <details class="lesson-check"><summary>Quick check: does a real safety worry rule out a business motive?</summary><div><p>No. A company can hold a sincere safety concern and a competitive interest in the same proposal at the same time. Reading one does not require dismissing the other. The useful habit is asking who benefits from a proposed rule, not just what the rule claims to do.</p></div></details>

  <h2>What this means for you</h2>
  <p>None of this is a reason to panic, and none of it is a reason to stop paying attention either. A few habits hold up regardless of how the bigger questions get resolved:</p>
  <ul>
    <li>Treat AI tools the way you would treat any powerful tool operated by a person: useful, worth understanding, and worth double-checking on anything that matters.</li>
    <li>Keep a human decision in the loop for anything involving money, health, or a legal matter.</li>
    <li>Practice the same account security habits covered in earlier lessons. That single habit stops nearly all the real-world damage described above.</li>
    <li>Stay skeptical of both extremes: the version that says AI will end the world tomorrow, and the version that says none of this is worth a second thought.</li>
  </ul>

  <div class="try-box"><h2>Try this today</h2><p>Ask ChatGPT or Claude:</p><p><strong>"Explain, in plain language, the difference between a real AI safety risk and a company's business interest in regulation. Give me one question I should ask when I read a news story about AI danger."</strong></p></div>

  <h2>Read the original reporting</h2>
  <p>Every claim above was checked against news reporting from September 2026 at the time this lesson was written. These are some of the original stories, so you can read further and judge for yourself:</p>
  <ul>
    <li><a href="https://time.com/article/2026/09/15/ai-anthropic-researcher-quits-coxon-slowdown/" target="_blank" rel="noopener">Time: OpenAI and Anthropic Researchers Are Warning About AI Risks</a> (September 15, 2026)</li>
    <li><a href="https://www.pbs.org/newshour/science/anthropic-researchers-resignation-sends-warning-about-the-dangers-of-ai-development" target="_blank" rel="noopener">PBS NewsHour: Anthropic researcher's resignation sends warning about the dangers of AI development</a> (September 9, 2026)</li>
    <li><a href="https://intelligence.org/about/" target="_blank" rel="noopener">Machine Intelligence Research Institute: About MIRI</a></li>
    <li><a href="https://cronkitenews.azpbs.org/2026/09/11/data-centers-water-colorado-river/" target="_blank" rel="noopener">Cronkite News: Don't blame data centers for Arizona's Colorado River cuts, water experts say</a> (September 11, 2026)</li>
    <li><a href="https://www.networkworld.com/article/4138052/why-do-data-centers-need-so-much-water.html" target="_blank" rel="noopener">Network World: Why do data centers need so much water?</a></li>
    <li><a href="https://news.bloomberglaw.com/environment-and-energy/drought-ravaged-georgia-asks-data-centers-to-cut-water-use" target="_blank" rel="noopener">Bloomberg Law: Drought-ravaged Georgia asks data centers to cut water use</a> (June 22, 2026)</li>
    <li><a href="https://www.axios.com/local/des-moines/2025/06/17/central-iowa-water-ban-data-centers-microsoft" target="_blank" rel="noopener">Axios: Data centers are not to blame for central Iowa's water crisis</a> (June 17, 2025)</li>
    <li><a href="https://www.iowapublicradio.org/ipr-news/2025-06-20/des-moines-lawn-watering-ban-central-iowa" target="_blank" rel="noopener">Iowa Public Radio: A lawn watering ban in the Des Moines area brings treatment capacity plans to the forefront</a> (June 20, 2025)</li>
    <li><a href="https://news.yahoo.com/chile-puts-brakes-google-data-174703001.html" target="_blank" rel="noopener">A Chilean court orders Google to redo its environmental review for a Santiago data center</a></li>
    <li><a href="https://www.bloomberg.com/graphics/2025-ai-impacts-data-centers-water-data/" target="_blank" rel="noopener">Bloomberg: The AI boom is draining water from the areas that need it most</a></li>
    <li><a href="https://itif.org/publications/2026/07/06/the-data-center-water-problem-is-soluble/" target="_blank" rel="noopener">ITIF: The data center water problem is soluble</a> (July 6, 2026)</li>
    <li><a href="https://www.cam.ac.uk/research/news/new-computer-chip-material-inspired-by-the-human-brain-could-slash-ai-energy-use" target="_blank" rel="noopener">University of Cambridge: a new chip material that could slash AI energy use</a> (March 20, 2026)</li>
    <li><a href="https://www.industryweek.com/technology-and-iiot/article/21274431/the-clorox-co-recovers-from-severe-cyberattack" target="_blank" rel="noopener">IndustryWeek: the Clorox cyberattack and its $356 million cost</a></li>
    <li><a href="https://www.bleepingcomputer.com/news/security/hackers-fooled-cognizant-help-desk-says-clorox-in-380m-cyberattack-lawsuit/" target="_blank" rel="noopener">BleepingComputer: Hackers fooled Cognizant help desk, says Clorox in $380M cyberattack lawsuit</a> (July 23, 2025)</li>
    <li><a href="https://www.tomshardware.com/tech-industry/cyber-security/158-year-old-company-forced-to-close-after-ransomware-attack-precipitated-by-a-single-guessed-password-700-jobs-lost-after-hackers-demand-unpayable-sum" target="_blank" rel="noopener">Tom's Hardware: a 158-year-old company forced to close after one guessed password</a></li>
    <li><a href="https://www.theregister.com/ai-and-ml/2026/09/14/big-ai-sets-out-its-terms-for-regulatory-capture-and-calls-it-pace-the-frontier/5296067" target="_blank" rel="noopener">The Register: Big AI sets out its terms for regulatory capture and calls it "Pace the frontier"</a> (September 14, 2026)</li>
  </ul>
  <p>A full numbered reference list with every source used for this lesson is available on request.</p>

  ${sourceNote('This lesson summarizes reporting from multiple news outlets, listed above, current as of September 17, 2026, including sources on both sides of the data center water debate. Two examples originally considered could not be verified and were replaced with confirmed cases; see the full reference list for details.', 'September 17, 2026')}
  ${lessonNavEnd()}
</div></article>`;

const lessons = [
  { slug: 'what-is-ai', title: 'What AI Is | Spirantix.ai', description: 'A plain-language introduction to artificial intelligence, generative AI, and important limits.', body: whatIsAi },
  { slug: 'history-of-generative-ai', title: 'How AI Got Here | Spirantix.ai', description: 'A short, plain-language story of how AI grew from counting words to writing and speaking, and what comes next.', datePublished: '2026-09-15', dateModified: '2026-09-16', body: historyOfAi },
  { slug: 'chatgpt-basics', title: 'ChatGPT Basics | Spirantix.ai', description: 'A beginner-friendly guide to starting a ChatGPT conversation, using follow-up questions, checking answers, and protecting private information.', body: chatgptBasics },
  { slug: 'claude-basics', title: 'Claude Basics | Spirantix.ai', description: 'A beginner-friendly guide to starting with Claude, refining answers, using documents carefully, and understanding Projects.', body: claudeBasics },
  { slug: 'better-prompts', title: 'Asking Better Questions | Spirantix.ai', description: 'Use a simple four-part method to ask clearer questions and get more useful answers from ChatGPT, Claude, and other AI assistants.', body: betterPrompts },
  { slug: 'ai-danger-what-the-news-shows', title: 'Is AI Actually Dangerous? | Spirantix.ai', description: 'What the news is really reporting about AI risk, data centers, cyberattacks, and calls for regulation, with sources you can check yourself.', datePublished: '2026-09-16', dateModified: '2026-09-16', body: aiDanger }
];

function articleSchema(lesson) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: lesson.title.replace(' | Spirantix.ai', ''),
    description: lesson.description,
    datePublished: lesson.datePublished || '2026-09-02',
    dateModified: lesson.dateModified || '2026-09-02',
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
