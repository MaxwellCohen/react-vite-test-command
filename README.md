# react-vite-test-command

Interactive demo for HTML **invoker commands**: buttons use `commandFor` to target an element by id and `command` to run a built-in or custom action. Built with React and Vite to exercise these APIs with React’s event model (`onClose`, `onCancel`, `onCommand`).

## Demos

| Section | Commands | What it shows |
| --- | --- | --- |
| **Popover** | `show-popover`, `hide-popover`, `toggle-popover` | Controls a `popover="auto"` element |
| **Dialog: show-modal** | `show-modal`, `close` | Opens a modal via `HTMLDialogElement.showModal()` |
| **Dialog: close** | `close` (with `value`) | Immediate close; button `value` becomes `dialog.returnValue` |
| **Dialog: request-close** | `request-close` | Fires `cancel` then `close`; `preventDefault()` on `cancel` can block closing |
| **Custom invoker** | `--highlight`, `--reset` | Author-defined commands (`--*`); target handles `command` events in `onCommand` |

## Prerequisites

This project uses a **local React build** (not npm’s published packages). Dependencies point at:

`/Users/maxcohen/code/react/build/node_modules`

`vite.config.js` aliases `react`, `react-dom`, and `scheduler` to that path and allows Vite to read files outside the project root. Build React in that repo before running this app.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project layout

- `src/App.jsx` — demo UI and React handlers for dialog/popover/custom commands
- `src/App.css` — demo styles
- `vite.config.js` — React aliases and `optimizeDeps` for the local CJS React build

## References

- [Invoker Commands (WHATWG)](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-button-command)
- [React: `onCommand`](https://react.dev/reference/react-dom/components/common#oncommand)
