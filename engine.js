/* ==========================================================================
   MIKE'S CAREERTECH TOOLKIT: BRANCHING SCENARIO ENGINE
   engine.js — Dialogue tree logic and rendering
   ========================================================================== */

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║  ACTIVITY DATA — EDIT THIS SECTION TO BUILD YOUR CONTENT                   ║
║                                                                              ║
║  STRUCTURE:                                                                  ║
║    scenarios    → The opening situation (Stage 1). One scenario object.     ║
║    decisions    → Four follow-on situations keyed by option index (Stage 2) ║
║                   "option_0" matches option index 0 from Stage 1, etc.      ║
║    conclusions  → 16 outcome objects (4 Stage-1 choices × 4 Stage-2 choices)║
║                   Keyed as "option_X_Y" (Stage-1 index _ Stage-2 index)     ║
║                                                                              ║
║  Each option object has:                                                     ║
║    label   → Short button text (keep under ~6 words)                        ║
║    text    → Full description shown on the card                             ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

const ACTIVITY_DATA = {

    /*
    ──────────────────────────────────────────────────────
    STAGE 1 — OPENING SCENARIO
    Edit "prompt" and each of the four option labels/texts.
    ──────────────────────────────────────────────────────
    */
    scenario: {
        prompt: "Stage 1 scenario text here. Set the scene — what situation is the learner walking into?",
        options: [
            {
                label: "Option A label here",
                text:  "Option A — brief description of this choice here."
            },
            {
                label: "Option B label here",
                text:  "Option B — brief description of this choice here."
            },
            {
                label: "Option C label here",
                text:  "Option C — brief description of this choice here."
            },
            {
                label: "Option D label here",
                text:  "Option D — brief description of this choice here."
            }
        ]
    },

    /*
    ──────────────────────────────────────────────────────
    STAGE 2 — FOLLOW-ON DECISIONS
    Each key ("option_0" through "option_3") corresponds to
    a Stage 1 choice by index (0 = A, 1 = B, 2 = C, 3 = D).
    Edit the prompt and four options for each branch.
    ──────────────────────────────────────────────────────
    */
    decisions: {
        option_0: {
            prompt: "Stage 2 (following choice A) — what happens next? Describe the new situation here.",
            options: [
                { label: "Option A label here", text: "Option A — brief description here." },
                { label: "Option B label here", text: "Option B — brief description here." },
                { label: "Option C label here", text: "Option C — brief description here." },
                { label: "Option D label here", text: "Option D — brief description here." }
            ]
        },
        option_1: {
            prompt: "Stage 2 (following choice B) — what happens next? Describe the new situation here.",
            options: [
                { label: "Option A label here", text: "Option A — brief description here." },
                { label: "Option B label here", text: "Option B — brief description here." },
                { label: "Option C label here", text: "Option C — brief description here." },
                { label: "Option D label here", text: "Option D — brief description here." }
            ]
        },
        option_2: {
            prompt: "Stage 2 (following choice C) — what happens next? Describe the new situation here.",
            options: [
                { label: "Option A label here", text: "Option A — brief description here." },
                { label: "Option B label here", text: "Option B — brief description here." },
                { label: "Option C label here", text: "Option C — brief description here." },
                { label: "Option D label here", text: "Option D — brief description here." }
            ]
        },
        option_3: {
            prompt: "Stage 2 (following choice D) — what happens next? Describe the new situation here.",
            options: [
                { label: "Option A label here", text: "Option A — brief description here." },
                { label: "Option B label here", text: "Option B — brief description here." },
                { label: "Option C label here", text: "Option C — brief description here." },
                { label: "Option D label here", text: "Option D — brief description here." }
            ]
        }
    },

    /*
    ──────────────────────────────────────────────────────
    STAGE 3 — CONCLUSIONS (16 total)
    Key format: "option_X_Y"
      X = Stage 1 choice index (0–3)
      Y = Stage 2 choice index (0–3)

    Each conclusion has:
      heading  → Short outcome headline (e.g. "A strong finish")
      summary  → One sentence describing what happened
      advice   → 2–3 sentences of learning/reflection for the student
    ──────────────────────────────────────────────────────
    */
    conclusions: {
        option_0_0: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_0_1: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_0_2: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_0_3: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_1_0: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_1_1: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_1_2: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_1_3: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_2_0: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_2_1: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_2_2: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_2_3: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_3_0: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_3_1: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_3_2: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        },
        option_3_3: {
            heading: "Conclusion heading here",
            summary: "One sentence summary of what happened on this path.",
            advice:  "Your advice or reflection text here. Explain what this outcome means and what the learner can take away from this path."
        }
    }
};


/* ==========================================================================
   ENGINE — Do not edit below this line unless you know what you're doing.
   ========================================================================== */

const state = {
    stage: 1,          // Current stage: 1, 2, or 3
    choice1: null,     // Index of Stage 1 choice (0–3)
    choice2: null      // Index of Stage 2 choice (0–3)
};

const display   = document.getElementById("ct-display-area");
const steps     = [null,
    document.getElementById("ct-step-1"),
    document.getElementById("ct-step-2"),
    document.getElementById("ct-step-3")
];
const lines     = [null,
    document.getElementById("ct-line-1"),
    document.getElementById("ct-line-2")
];

/* ── Progress bar helper ─────────────────────────────── */
function setProgress(activeStep) {
    for (let i = 1; i <= 3; i++) {
        steps[i].className = "ct-bs-progress-step";
        if (i < activeStep)       steps[i].classList.add("ct-bs-step--done");
        else if (i === activeStep) steps[i].classList.add("ct-bs-step--active");
        else                       steps[i].classList.add("ct-bs-step--upcoming");
    }
    for (let i = 1; i <= 2; i++) {
        lines[i].className = "ct-bs-progress-line";
        if (i < activeStep) lines[i].classList.add("ct-bs-line--done");
    }
}

/* ── Fade helper ─────────────────────────────────────── */
function fadeIn(el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            el.style.transition = "opacity 0.35s ease, transform 0.35s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        });
    });
}

/* ── Option card HTML builder ────────────────────────── */
function buildOptionCard(index, option, clickHandler) {
    const btn = document.createElement("button");
    btn.className = "ct-bs-option-card";
    btn.setAttribute("aria-label", option.label);
    btn.innerHTML = `
        <span class="ct-bs-option-letter">${String.fromCharCode(65 + index)}</span>
        <span class="ct-bs-option-content">
            <span class="ct-bs-option-label">${option.label}</span>
            <span class="ct-bs-option-text">${option.text}</span>
        </span>
        <span class="ct-bs-option-arrow" aria-hidden="true">→</span>
    `;
    btn.addEventListener("click", () => clickHandler(index));
    return btn;
}

/* ── STAGE 1 renderer ────────────────────────────────── */
function renderStage1() {
    state.stage   = 1;
    state.choice1 = null;
    state.choice2 = null;
    setProgress(1);

    const data = ACTIVITY_DATA.scenario;

    const wrap = document.createElement("div");
    wrap.className = "ct-bs-stage-wrap";
    wrap.innerHTML = `
        <div class="ct-bs-stage-card">
            <div class="ct-bs-stage-eyebrow">
                <span class="ct-bs-stage-pip"></span> Stage 1 of 3 — Choose your response
            </div>
            <p class="ct-bs-stage-prompt">${data.prompt}</p>
        </div>
        <div class="ct-bs-options-list" id="ct-options-list"></div>
    `;

    display.innerHTML = "";
    display.appendChild(wrap);

    const list = wrap.querySelector("#ct-options-list");
    data.options.forEach((opt, i) => {
        list.appendChild(buildOptionCard(i, opt, handleStage1Choice));
    });

    fadeIn(wrap);
}

/* ── STAGE 2 renderer ────────────────────────────────── */
function renderStage2(choice1Index) {
    state.stage   = 2;
    state.choice1 = choice1Index;
    setProgress(2);

    const data = ACTIVITY_DATA.decisions[`option_${choice1Index}`];

    const wrap = document.createElement("div");
    wrap.className = "ct-bs-stage-wrap";
    wrap.innerHTML = `
        <div class="ct-bs-stage-card">
            <div class="ct-bs-stage-eyebrow">
                <span class="ct-bs-stage-pip"></span> Stage 2 of 3 — What do you do next?
            </div>
            <p class="ct-bs-stage-prompt">${data.prompt}</p>
        </div>
        <div class="ct-bs-options-list" id="ct-options-list"></div>
    `;

    display.innerHTML = "";
    display.appendChild(wrap);

    const list = wrap.querySelector("#ct-options-list");
    data.options.forEach((opt, i) => {
        list.appendChild(buildOptionCard(i, opt, handleStage2Choice));
    });

    fadeIn(wrap);
}

/* ── STAGE 3 (conclusion) renderer ──────────────────── */
function renderConclusion(choice1Index, choice2Index) {
    state.stage   = 3;
    state.choice2 = choice2Index;
    setProgress(3);

    const key  = `option_${choice1Index}_${choice2Index}`;
    const data = ACTIVITY_DATA.conclusions[key];

    // Summarise the path the learner took
    const s1opt = ACTIVITY_DATA.scenario.options[choice1Index];
    const s2opt = ACTIVITY_DATA.decisions[`option_${choice1Index}`].options[choice2Index];

    const wrap = document.createElement("div");
    wrap.className = "ct-bs-stage-wrap";
    wrap.innerHTML = `
        <div class="ct-bs-conclusion-card">
            <div class="ct-bs-stage-eyebrow">
                <span class="ct-bs-stage-pip"></span> Stage 3 of 3 — Your outcome
            </div>
            <h2 class="ct-bs-conclusion-heading">${data.heading}</h2>
            <p class="ct-bs-conclusion-summary">${data.summary}</p>

            <div class="ct-bs-path-recap">
                <p class="ct-bs-path-label">Your path</p>
                <div class="ct-bs-path-steps">
                    <div class="ct-bs-path-step">
                        <span class="ct-bs-path-step-num">1</span>
                        <span class="ct-bs-path-step-text">${s1opt.label}</span>
                    </div>
                    <span class="ct-bs-path-arrow" aria-hidden="true">→</span>
                    <div class="ct-bs-path-step">
                        <span class="ct-bs-path-step-num">2</span>
                        <span class="ct-bs-path-step-text">${s2opt.label}</span>
                    </div>
                </div>
            </div>

            <div class="ct-bs-advice-box">
                <p class="ct-bs-advice-label">Advice &amp; Reflection</p>
                <p class="ct-bs-advice-text">${data.advice}</p>
            </div>

            <button class="ct-bs-restart-btn" id="ct-restart-btn">
                ↺ Try a different path
            </button>
        </div>
    `;

    display.innerHTML = "";
    display.appendChild(wrap);
    fadeIn(wrap);

    document.getElementById("ct-restart-btn").addEventListener("click", renderStage1);
}

/* ── Click handlers ──────────────────────────────────── */
function handleStage1Choice(index) {
    // Brief visual feedback on the selected card before advancing
    const cards = display.querySelectorAll(".ct-bs-option-card");
    cards.forEach((c, i) => {
        if (i === index) c.classList.add("ct-bs-option-card--selected");
        else             c.classList.add("ct-bs-option-card--faded");
        c.disabled = true;
    });
    setTimeout(() => renderStage2(index), 420);
}

function handleStage2Choice(index) {
    const cards = display.querySelectorAll(".ct-bs-option-card");
    cards.forEach((c, i) => {
        if (i === index) c.classList.add("ct-bs-option-card--selected");
        else             c.classList.add("ct-bs-option-card--faded");
        c.disabled = true;
    });
    setTimeout(() => renderConclusion(state.choice1, index), 420);
}

/* ── Boot ────────────────────────────────────────────── */
renderStage1();
