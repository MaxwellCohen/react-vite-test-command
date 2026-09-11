const logs = []
const seen = new Set()

function formatArg(arg) {
  if (arg instanceof Error) return arg.stack || arg.message
  if (typeof arg === 'string') return arg
  try {
    return JSON.stringify(arg, null, 2)
  } catch {
    return String(arg)
  }
}

function isHydrationMessage(text) {
  return (
    /hydrat/i.test(text) ||
    /did not match/i.test(text) ||
    /server rendered HTML/i.test(text) ||
    /https:\/\/react\.dev\/link\/hydration-mismatch/i.test(text)
  )
}

function renderPanel() {
  const mount = document.getElementById('hydration-report')
  if (!mount) return

  mount.hidden = logs.length === 0
  if (logs.length === 0) return

  mount.innerHTML = `
    <h2>React hydration mismatches (${logs.length})</h2>
    ${logs
      .map(
        (entry) => `
      <section>
        <h3>${entry.title}</h3>
        <pre>${entry.body.replace(/</g, '&lt;')}</pre>
      </section>
    `,
      )
      .join('')}
  `
}

function pushLog(title, body) {
  const key = `${title}\n${body}`
  if (seen.has(key)) return
  seen.add(key)
  logs.push({ title, body })
  renderPanel()
}

export function captureConsoleHydration(args) {
  const text = args.map(formatArg).join(' ')
  if (!isHydrationMessage(text)) return
  pushLog('React console.error', text)
}

export function captureRecoverableError(error, errorInfo) {
  const text = [formatArg(error), errorInfo?.componentStack ?? '']
    .filter(Boolean)
    .join('\n')
  if (!isHydrationMessage(text)) return
  pushLog('React onRecoverableError', text)
}
