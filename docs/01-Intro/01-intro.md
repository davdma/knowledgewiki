# The Knowledge Wiki

The knowledge wiki is a centralized notes repo for anything I have learnt and am currently learning. Each folder represents a topic of interest with markdown files serving as individual sections within that topic. The repo serves as an active "learning log" that will continually evolve and grow as I learn new tid bits and add them into the markdown pages. The goal is to capture, organize, and revisit these notes with the assistance of AI tools, to enable a powerful learning workflow.

An example structure:

```
docs/
├── intro.md                  # This introduction page
├── rust/                     # Rust programming language
│   ├── ownership.md          # Memory management and ownership
│   └── traits.md             # Trait system and generics
├── tools/                    # Development tools and utilities
│   ├── tmux.md               # Terminal multiplexer
│   ├── neovim.md             # Vim-based text editor
│   └── glow.md               # Markdown viewer for terminal
└── ai/                       # AI tools and workflows
    └── claude_code.md        # Claude Code usage and tips
```

A core feature of the knowledge wiki is the simplicity and ease of access for LLMs and AI tools like Claude Code. Besides allowing AI tools to crawl through my directory and notes to generate summaries or answer queries, the repo can also be exported through tools like [gitingest](https://gitingest.com/) for external LLMs input.

# Usage

* Modify or add markdown files in the github repo.
* For highlights, bubbles, images, among other features, follow the Docusaurus formatting instructions below.
* Initialize Claude Code in the directory. It's suggested to write a comprehensive `Claude.md` with instructions on how to be an optimal note-taking assistant in the repo that follows a systematic workflow + understands Docusaurus functionality.

# AI Notetaking

The big advantage of having AI-powered notes is having automated quiz generation, teaching assistance, and a dialogue partner for suggestion and feedback.

A suggested learning workflow that takes advantage of AI agents:
* Every time I learn something useful, I jot it down. Then I have Claude clarify, generate examples, and add summary to markdown. Keep concise overview of contents at the top of the file (let AI generate it) with raw notes below.
* For retention use LLMs to generate Q&A from markdown notes - active recall through quizzing is important. Can ask LLM to vary formats from multiple choice, open-ended, true/false to "explain like I'm 5". After a quiz it's also useful to prompt the LLM on the topics I seem most shaky on and to suggest next learning steps.

# Docusaurus

Docusaurus provides features that enhance the richness and interactivity of notes. It is recommended to instruct the LLM to use these features when suitable. For example, Docusaurus provides support for images. Just add the jpg or png file to the `static/img` folder and provide the absolute path in markdown:

```
![Docusaurus logo](/img/docusaurus.png)
```

Add admonitions or callouts with the syntax:

```md
:::tip[My tip]

Use this awesome feature option

:::
```

There are many types such as `:::tip`, `:::note`, `:::info`, `:::warning`, and `:::danger`. For a cohesive note taking style, stick to the following conventions:

:::info[Key Idea]

Use this to mark key insights and ideas that are important to revisit.

:::

:::tip[Trick]

Use this to highlight study strategies, memory aids, or shortcuts to help learn a difficult topic.

:::

:::note[Detail]

Use this to mention a useful detail that does not fit into the main text. Can bring up general context or background knowledge that helps with understanding a new concept.

:::

:::warning[Pitfall]

Use this to bring attention to common misunderstandings or pitfalls, e.g. `==` is very different from `===` in javascript (loose vs. strict equality).

:::

:::danger[Do Not Forget]

Use this to highlight a critical piece of information you must NOT forget, otherwise it will cause you a lot of headache.

:::

Another useful feature is collapsible text blocks:

<details>
<summary>Click to expand</summary>

Here’s the hidden content that will appear when the user clicks.  
You can include **Markdown formatting**, lists, code blocks, images, etc.

- Bullet points
- More text

```python
# Code block inside collapsible
print("Hello, collapsible!")
```
</details>

For code blocks, you can add titles to them and highlight specific lines of interest with comments with `highlight-next-line`, `highlight-start`, and `highlight-end`:

```jsx title="/src/components/HighlightCode.js"
function HighlightSomeText(highlight) {
  if (highlight) {
    // highlight-next-line
    return 'This text is highlighted!';
  }

  return 'Nothing highlighted';
}

function HighlightMoreText(highlight) {
  // highlight-start
  if (highlight) {
    return 'This range is highlighted!';
  }
  // highlight-end

  return 'Nothing highlighted';
}
```

Also for longer code blocks, you can enable line numbering with `showLineNumbers` after the language meta string:

```jsx showLineNumbers
import React from 'react';

export default function MyComponent(props) {
  return <div>Foo</div>;
}
```

For math equations, you can render with KaTeX. Wrap inline equations with `$` and equation blocks with `$$`:

Let $f\colon[a,b]\to\R$ be Riemann integrable. Let $F\colon[a,b]\to\R$ be
$F(x)=\int_{a}^{x} f(t)\,dt$. Then $F$ is continuous, and at all $x$ such that
$f$ is continuous at $x$, $F$ is differentiable at $x$ with $F'(x)=f(x)$.

$$
I = \int_0^{2\pi} \sin(x)\,dx
$$

## Sidebar Ordering

For simplicity, please use [number prefixes](https://docusaurus.io/docs/sidebar/autogenerated#using-number-prefixes) to help with the auto generated sidebar. The folders should be ordered by number and the markdown files nested in them should also be ordered. This prevents a chaotic ordering given the alphabetical order.
