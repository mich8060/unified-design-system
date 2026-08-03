---
id: laws-of-ux
category: physics
type: index
priority: high
ai_priority: high
confidence_default: preferred
related:
  - design-physics-index
  - proximity-physics
  - consistency-load
  - cognitive-load
  - choice-complexity
  - target-acquisition
  - common-region
  - progressive-disclosure
  - visual-weight-physics
  - philosophy
components: []
patterns: []
tokens: []
depends_on:
  - philosophy
  - design-physics-index
influences:
  - hierarchy
  - density
  - grouping
  - page-composition
conflicts_with: []
alternatives: []
design_intent:
  - scanability
  - navigation
---

# Laws of UX → UDS

Self-contained cross-index of UX psychology concepts (adapted from Jon Yablonski’s *Laws of UX*) mapped to UDS design physics and semantics. **UDS rules remain normative** when they are stricter (e.g. 44px targets, one primary toolbar action, content blocks ≤720px).

Use this file for retrieval (“Fitts”, “Hick”, “Jakob”). Open the linked UDS docs for composition rules. Do not invent product behavior from deferred laws.

---

## Mapped laws

### Law of Proximity

Objects that are near, or proximate to each other, tend to be grouped together.

**Takeaways**

1. Proximity helps establish a relationship with nearby objects.
2. Elements in close proximity are perceived to share similar functionality or traits.
3. Proximity helps users understand and organize information faster and more efficiently.

**UDS:** [`proximity-physics`](./proximity.md), [`proximity`](../semantics/proximity.md), [`grouping`](../semantics/grouping.md) — related items closer; unrelated farther. Confidence: Preferred.

### Law of Common Region

Elements tend to be perceived into groups if they are sharing an area with a clearly defined boundary.

**Takeaways**

1. Common region creates clear structure and helps users understand relationships between elements and sections.
2. A border around an element or group is an easy way to create common region.
3. A shared background behind elements also creates common region.

**UDS:** [`common-region`](./common-region.md), [`grouping`](../semantics/grouping.md), [`cards`](../patterns/cards.md) — shared boundary groups; don’t Card every paragraph. Confidence: Preferred.

### Law of Similarity

The human eye tends to perceive similar elements as a complete picture, shape, or group, even if those elements are separated.

**UDS:** [`common-region`](./common-region.md), [`dominant-variant`](../semantics/dominant-variant.md) — same look → same meaning; keep prevalent variants. Confidence: Preferred.

### Law of Uniform Connectedness

Elements that are visually connected are perceived as more related than elements with no connection.

**UDS:** [`common-region`](./common-region.md), [`row-dividers`](../semantics/row-dividers.md) — shared lines/connectors signal relatedness. Confidence: Preferred.

### Law of Prägnanz

People will perceive and interpret ambiguous or complex images as the simplest form possible, because it is the interpretation that requires the least cognitive effort.

**UDS:** [`philosophy`](../philosophy.md), [`visual-noise`](../anti-patterns/visual-noise.md) — prefer simplest clear structure. Confidence: Preferred.

### Jakob’s Law

Users spend most of their time on other sites. This means that users prefer your site to work the same way as all the other sites they already know.

**Takeaways**

1. Users transfer expectations from one familiar product to another that appears similar.
2. Leveraging existing mental models lets users focus on tasks rather than learning new models.
3. When making changes, minimize discord by empowering users to continue a familiar version for a limited time when possible.

**UDS:** [`consistency-load`](./consistency-load.md), [`philosophy`](../philosophy.md) — match familiar CHG / product patterns. Confidence: Preferred.

### Cognitive Load

The amount of mental resources needed to understand and interact with an interface. Closely related to Miller’s Law.

**Takeaways**

1. When incoming information exceeds available capacity, tasks become harder, details are missed, and users feel overwhelmed.
2. **Intrinsic** load is effort to hold goal-relevant information, absorb new information, and track goals.
3. **Extraneous** load is processing that consumes resources without helping users understand the interface (e.g. distracting or unnecessary chrome).

**UDS:** [`cognitive-load`](./cognitive-load.md), [`hierarchy`](../semantics/hierarchy.md), [`page-composition`](../semantics/page-composition.md) — reduce competing signals; columns and ≤720px blocks. Confidence: Preferred.

### Hick’s Law

The time it takes to make a decision increases with the number and complexity of choices.

**Takeaways**

1. Minimize choices when response times are critical.
2. Break complex tasks into smaller steps to decrease cognitive load.
3. Avoid overwhelming users by highlighting recommended options.
4. Use progressive onboarding / disclosure to minimize load for new users.
5. Do not simplify to the point of abstraction.

**UDS:** [`choice-complexity`](./choice-complexity.md), [`toolbar-action-slots`](../semantics/toolbar-action-slots.md) — cap visible choices; overflow extras. Confidence: Preferred.

### Choice Overload

The tendency for people to get overwhelmed when they are presented with a large number of options (often used interchangeably with the paradox of choice).

**UDS:** Same as Hick’s — [`choice-complexity`](./choice-complexity.md), [`toolbar-action-slots`](../semantics/toolbar-action-slots.md). Confidence: Preferred.

### Miller’s Law

The average person can only keep 7 (plus or minus 2) items in their working memory.

**Takeaways**

1. Don’t use the “magical number seven” to justify unnecessary design limitations.
2. Organize content into smaller chunks to help users process, understand, and memorize.
3. Short-term memory capacity varies by individual, prior knowledge, and context.

**UDS:** [`grouping`](../semantics/grouping.md), [`progressive-disclosure`](./progressive-disclosure.md) — chunk into few groups; disclose detail later. Confidence: Preferred.

### Chunking

A process by which individual pieces of an information set are broken down and then grouped together into a meaningful whole.

**UDS:** [`grouping`](../semantics/grouping.md) — 2–5 groups per section; SectionHeader over Card-per-field. Confidence: Preferred.

### Working Memory

A cognitive system that temporarily holds and manipulates information needed to complete tasks.

**UDS:** Same as Miller / Chunking / Cognitive Load — keep concurrent choices and open threads few. Confidence: Preferred.

### Fitts’s Law

The time to acquire a target is a function of the distance to and size of the target.

**Takeaways**

1. Touch targets should be large enough for users to accurately select them.
2. Touch targets should have ample spacing between them.
3. Touch targets should be placed where they can be easily acquired.

**UDS:** [`target-acquisition`](./target-acquisition.md), [`touch-targets`](../accessibility/touch-targets.md), [`button-icon-size`](../semantics/button-icon-size.md) — large enough targets; icon buttons `size="icon"`. Confidence: Preferred.

### Von Restorff Effect (Isolation Effect)

When multiple similar objects are present, the one that differs from the rest is most likely to be remembered.

**Takeaways**

1. Make important information or key actions visually distinctive.
2. Use restraint so emphases don’t compete or get mistaken for ads.
3. Don’t rely exclusively on color for contrast (color vision / low vision).
4. Consider motion sensitivity when using motion for contrast.

**UDS:** [`visual-weight-physics`](./visual-weight.md), [`emphasis`](../semantics/emphasis.md) — one strong accent among peers. Confidence: Preferred.

### Selective Attention

The process of focusing attention on only a subset of stimuli in an environment — usually those related to our goals.

**UDS:** [`visual-weight-physics`](./visual-weight.md), [`page-composition`](../semantics/page-composition.md) — steer attention to the task; avoid equal weight everywhere. Confidence: Preferred.

### Mental Model

A compressed model based on what we think we know about a system and how it works.

**UDS:** [`information-architecture`](../semantics/information-architecture.md) — shell → page → section matches user expectations. Confidence: Preferred.

### Tesler’s Law (Conservation of Complexity)

For any system there is a certain amount of complexity which cannot be reduced.

**Takeaways**

1. Processes have a core of complexity that must be assumed by either the system or the user.
2. Lift as much burden as possible from users during design and development.
3. Don’t design only for an idealized, rational user.
4. Make guidance accessible in context (e.g. helpful tooltips) for active new users.

**UDS:** [`progressive-disclosure`](./progressive-disclosure.md) — complexity moves (Sheet, steps); it doesn’t vanish. Confidence: Preferred.

### Occam’s Razor

Among competing hypotheses that predict equally well, the one with the fewest assumptions should be selected.

**UDS:** [`philosophy`](../philosophy.md), recipes — prefer fewer assumptions: existing recipes/components. Confidence: Preferred.

### Doherty Threshold

Productivity soars when a computer and its users interact at a pace (under 400ms) that ensures that neither has to wait on the other.

**Takeaways**

1. Provide system feedback within 400 ms to keep attention and productivity.
2. Use perceived performance to reduce the sense of waiting.
3. Animation can engage users while work continues in the background.
4. Progress bars help make wait times tolerable.
5. A purposeful short delay can sometimes increase perceived value/trust.

**UDS:** [`loading`](../interactions/loading.md) — feedback within ~400ms when waiting. Confidence: Preferred.

### Aesthetic-Usability Effect

Users often perceive aesthetically pleasing design as design that’s more usable.

**UDS:** [`affordance`](../semantics/affordance.md) — polish helps perceived usability; not an excuse for visual noise. Confidence: Preferred.

### Paradox of the Active User

Users never read manuals but start using the software immediately.

**UDS:** [`philosophy`](../philosophy.md), `ai/examples/` — teach via composed screens, not manuals. Confidence: Preferred.

### Pareto Principle

For many events, roughly 80% of the effects come from 20% of the causes.

**UDS:** [`choosing-patterns`](../decision-rules/choosing-patterns.md) — optimize primary tasks / KPIs first. Confidence: Preferred.

### Goal-Gradient Effect

The tendency to approach a goal increases with proximity to the goal.

**UDS:** Steps / progress patterns — show progress toward completion. Confidence: Preferred.

### Serial Position Effect

Users have a propensity to best remember the first and last items in a series.

**UDS:** Menu / toolbar ordering — put critical items first or last in a series. Confidence: Preferred.

---

## Deferred (not normative for UDS composition)

Definitions are included for retrieval. Do **not** invent Required product rules from these until UDS documents them.

### Peak-End Rule

People judge an experience largely based on how they felt at its peak and at its end, rather than the total sum or average of every moment.

**Takeaways (reference only):** Attend to intense and final moments of a journey; design peaks that delight; negative peaks are remembered vividly.

### Zeigarnik Effect

People remember uncompleted or interrupted tasks better than completed tasks.

### Parkinson’s Law

Any task will inflate until all of the available time is spent.

### Flow

The mental state in which a person performing some activity is fully immersed in energized focus, full involvement, and enjoyment of the process.

### Cognitive Bias

A systematic error of thinking or rationality in judgment that influences perception and decision-making. Too broad for a single UDS rule — use the specific laws above.

### Postel’s Law

Be liberal in what you accept, and conservative in what you send. (Input robustness — future form/validation link.)

---

## How AI should reason

1. Look up the law **in this file** (definition + takeaways).
2. Follow the **UDS** links for Required/Preferred composition rules.
3. Ignore deferred laws for layout generation unless a UDS doc later elevates them.

Confidence: Preferred — Self-contained retrieval bridge; UDS docs win on conflict.

## Attribution

Concept names, one-line definitions, and takeaways adapted from Jon Yablonski’s *Laws of UX*. UDS owns the mapping to components, tokens, and composition rules.

## See also

- [Design physics index](./README.md)
- [Philosophy](../philosophy.md)
