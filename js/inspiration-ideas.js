(function () {
  const select = document.getElementById('inspiration-category');
  const tabs = document.getElementById('inspiration-example-tabs');
  const container = document.getElementById('inspiration-examples');

  if (!select || !tabs || !container) return;

  let activeIndex = 0;

  const examples = {
    improv: [
      {
        title: '"Yes, and…" scene build',
        summary:
          'Someone opens an absurd scene — "I\'m an astronaut buying milk" — and each friend adds one "yes, and…" detail until you have a full sketch. Record the opening beat, tag the next person to build on it, and keep going for 4–6 takes. A video chain preserves the cause-and-effect that improv depends on; every response needs the clip before it.',
      },
      {
        title: 'Character handoff',
        summary:
          'One character, many actors — each person plays Karen (or whoever) in a new situation: the gym, dinner, customer service. The first actor establishes the character in 30 seconds and tags the next friend to carry her into a new scene. The joke is continuity across different people, which only lands when clips play in sequence.',
      },
      {
        title: '"Worst advice ever" round',
        summary:
          'Friends take turns giving increasingly terrible life advice on the same topic — dating, job interviews, moving house. The first person poses the topic and tags someone to one-up them, and you stop when someone "wins." Escalation comedy needs momentum, and Tag\'s turn-by-turn structure is the game.',
      },
    ],
    comedy: [
      {
        title: 'Pass the punchline',
        summary:
          'Person A sets up a joke without the punchline; B, C, and D each try to land it in 30 seconds. Record the setup, tag three friends, and viewers watch competing punchlines back-to-back in one chain. The setup belongs to the punchlines — chaining keeps that comedic contract intact.',
      },
      {
        title: 'Group roast chain',
        summary:
          'A roast of one friend or a shared topic — "our uni house", "Dave\'s cooking" — where each person adds one burn. The roastee opens the chain and tags the next roaster; async turns often land better when people have time to think. Everyone\'s clip is funnier when you see who came before, and one chain means the whole group\'s in on it.',
      },
      {
        title: '"Explain it badly"',
        summary:
          'Friends explain the same thing — crypto, their job, a film plot — as badly as possible, each worse than the last. Person 1 names the topic, tags the next to make it worse, and 4–5 takes become one unhinged explainer. The format is inherently sequential, and Tag enforces that order without anyone editing clips together.',
      },
    ],
    debate: [
      {
        title: 'Two-sided hot take',
        summary:
          'Structured pro vs con on a hot take — pineapple on pizza, remote work, whatever splits the group. Side A records their argument, tags Side B, and you alternate until 4–6 takes form one balanced debate. A chain feels like real back-and-forth, not two unrelated clips stitched in an editor.',
      },
      {
        title: '"Change my mind"',
        summary:
          'One person states a controversial opinion; friends each get one take to change their mind — or double down. The opinion-holder opens the chain, tags 3–4 friends, and can close with a final "still not convinced." Their face anchors every response, so viewers always know who\'s being argued with.',
      },
      {
        title: "Devil's advocate round",
        summary:
          'The group picks a popular opinion and each person must argue the opposite of what they actually believe. The host states the motion, each friend records their take and tags the next — no live scheduling needed. Async turns give people time to argue against their own views, and the chain collects every angle into one debate-night video.',
      },
    ],
    storytelling: [
      {
        title: 'Exquisite corpse story',
        summary:
          'A fiction story where each person writes the next 30 seconds — no planning, just "what happens next?" Person 1 opens with "She opened the door and…", tags Person 2 for the next beat, and you continue until someone lands an ending. Order is the entire game, and Tag is built for each clip continuing the last.',
      },
      {
        title: '"How we met" group story',
        summary:
          'Friends tell the same memory — a night out, a trip, a disaster — from different perspectives, each adding details the others "forgot." Friend 1 starts, tags someone who was there, and each take adds or contradicts the last. Multiple POVs only work in sequence; the tension between versions is the story.',
      },
      {
        title: 'Mystery in 5 takes',
        summary:
          'A mini whodunit where each take reveals one clue — a found object, an overheard line, suspicious behaviour — until the final person names the culprit. Friend 1 sets the scene ("Someone stole the last slice"), each tagged friend adds a clue, and the last take is the accusation. Mysteries need controlled reveals, and a chain guarantees clue → clue → reveal without an editor.',
      },
    ],
    campaigns: [
      {
        title: '"Why I care" community chain',
        summary:
          'Supporters each share why a cause matters to them — same mission, personal stories. The campaign lead records the ask and tags the next supporter, who tags another, building a chorus of authentic voices. A chain feels like a movement, not a single spokesperson, and volunteers contribute async on their own time.',
      },
      {
        title: 'Local issue, many residents',
        summary:
          '"Save our park" or "Fix the high street" — residents each record one 30-second reason the issue affects them. An organiser opens with the issue, tags a neighbour, who tags another; no meet-up, no film crew. Tag turns a WhatsApp group into a shareable campaign video without editing skills.',
      },
      {
        title: 'Product launch testimonial relay',
        summary:
          'Early users or team members each share one specific benefit of a product, building a collective pitch. The founder opens ("We built X for Y"), tags user 1, who tags user 2, and you share the finished chain as launch content. Testimonials hit harder as a chorus — the chain says this isn\'t one fan, it\'s a community.',
      },
    ],
    education: [
      {
        title: '"Explain like I\'m 5" relay',
        summary:
          'A complex topic — photosynthesis, inflation, APIs — explained in simple terms, each person adding an analogy or example. Student 1 gives the basics, tags a peer to simplify further, who tags another for a real-world example. Learning builds in steps, and each take assumes the viewer just watched the one before.',
      },
      {
        title: 'Multiple perspectives on one event',
        summary:
          'History or literature from different viewpoints — the French Revolution as peasant, noble, and soldier. Student 1 takes one POV, tags student 2 for another, student 3 for a third, and the teacher shares one chain instead of three presentations. Understanding requires seeing perspectives in relation to each other, and a chain makes A → B → C natural in one sitting.',
      },
      {
        title: 'Study group Q&A chain',
        summary:
          'One person asks an exam-style question; others each attempt an answer or add a missing part of the solution. Student A records the question, tags B for their attempt, B tags C to fill the gaps. Exam prep is collaborative but async, and the chain captures the group\'s collective understanding in one revisable video.',
      },
    ],
  };

  const tabActiveClass =
    'text-azure-blue-950 font-semibold border-b-2 border-azure-blue-500 pb-0.5 transition-colors';
  const tabInactiveClass =
    'text-azure-blue-600 font-medium hover:text-azure-blue-950 pb-0.5 border-b-2 border-transparent transition-colors';

  function renderContent(category, index) {
    const example = examples[category][index];
    if (!example) return;

    container.replaceChildren();
    const card = document.createElement('article');
    card.className = 'bg-white border border-azure-blue-200 rounded-3xl p-6 shadow-sm';

    const summary = document.createElement('p');
    summary.className = 'text-base text-azure-blue-700 leading-relaxed';
    summary.textContent = example.summary;

    card.appendChild(summary);
    container.appendChild(card);
  }

  function updateTabStyles() {
    tabs.querySelectorAll('[data-example-tab]').forEach((button, index) => {
      const isActive = index === activeIndex;
      button.className = isActive ? tabActiveClass : tabInactiveClass;
      button.setAttribute('aria-selected', String(isActive));
    });
  }

  function renderTabs(category) {
    const items = examples[category];
    if (!items) return;

    tabs.replaceChildren(
      ...items.map((example, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.exampleTab = String(index);
        button.textContent = example.title;
        button.setAttribute('role', 'tab');
        button.addEventListener('click', () => {
          activeIndex = index;
          updateTabStyles();
          renderContent(category, index);
        });
        return button;
      })
    );

    updateTabStyles();
    renderContent(category, activeIndex);
  }

  select.addEventListener('change', () => {
    activeIndex = 0;
    renderTabs(select.value);
  });

  renderTabs(select.value);
})();
