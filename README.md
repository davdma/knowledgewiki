# KnowledgeWiki

This repository is my personal **Knowledge Wiki**, a collection of notes and resources I’m curating to learn programming, tools, and AI-assisted workflows. It's fundamentally a LLM friendly markdown repository (for Claude Code to crawl) with a Docusaurus front end. If you wish to poke around, check out the deployed website which I update frequently [here](https://davidma.me/knowledgewiki/).

<p align="center">
<img width="90%" alt="image" src="https://github.com/user-attachments/assets/3ab8d637-84ce-4644-8352-7f55c48ccd45" />
</p>

It serves multiple purposes:

- **Terminal-first note-taking:** Notes are stored as Markdown files in the `docs/` folder, so I can edit them locally using Neovim, tmux, or any editor.  
- **AI-assisted learning:** I use AI tools (like Claude Code) to summarize notes, generate Q&A flashcards, and help quiz myself.  
- **Public-facing website:** Docusaurus builds this repo into a sleek, browsable website where all notes are structured with a sidebar for easy navigation. The website is automatically deployed via GitHub Pages on every commit.  

## Repo Structure

```
knowledgewiki/
├── README.md                 # This file
├── docs/                     # All Markdown notes and content
│   ├── intro.md
│   ├── rust/
│   │   ├── ownership.md
│   │   └── traits.md
│   ├── tools/
│   │   ├── tmux.md
│   │   ├── neovim.md
│   │   └── glow.md
│   └── ai/
│       └── claude_code.md
├── docusaurus.config.js      # Docusaurus configuration
├── sidebars.js               # Sidebar configuration
├── package.json              # Dependencies and scripts
├── static/                   # Static assets
├── src/                      # Custom components and pages
└── .github/workflows/        # CI/CD for auto-deploying the website
```

## How to Use

1. Edit or add notes in `docs/` as Markdown files.  
2. Run locally with:

```bash
npm install
npm run start
```
