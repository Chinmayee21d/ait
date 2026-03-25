import type { ReactNode } from 'react'

type LegalDocViewProps = {
  title: string
  content: string
}

function normalizeMd(content: string) {
  return content.replace(/\r\n/g, '\n')
}

export default function LegalDocView({ title, content }: LegalDocViewProps) {
  const lines = normalizeMd(content).split('\n')
  const blocks: ReactNode[] = []
  let listItems: string[] = []

  const flushList = () => {
    if (!listItems.length) return
    blocks.push(
      <ul key={`list-${blocks.length}`} className="legal-list">
        {listItems.map((item, i) => (
          <li key={`${item}-${i}`}>{item}</li>
        ))}
      </ul>
    )
    listItems = []
  }

  lines.forEach((raw, idx) => {
    const line = raw.trim()
    if (!line) {
      flushList()
      return
    }
    if (line === '---') {
      flushList()
      blocks.push(<hr key={`hr-${idx}`} className="legal-hr" />)
      return
    }
    if (line.startsWith('|') && line.endsWith('|')) {
      flushList()
      blocks.push(
        <pre key={`table-${idx}`} className="legal-table-row">
          {line}
        </pre>
      )
      return
    }
    if (line.startsWith('- ')) {
      listItems.push(line.slice(2))
      return
    }
    flushList()
    if (line.startsWith('### ')) {
      blocks.push(<h3 key={`h3-${idx}`}>{line.slice(4)}</h3>)
      return
    }
    if (line.startsWith('## ')) {
      blocks.push(<h2 key={`h2-${idx}`}>{line.slice(3)}</h2>)
      return
    }
    if (line.startsWith('# ')) {
      blocks.push(<h1 key={`h1-${idx}`}>{line.slice(2)}</h1>)
      return
    }
    if (line.startsWith('> ')) {
      blocks.push(
        <blockquote key={`quote-${idx}`} className="legal-quote">
          {line.slice(2)}
        </blockquote>
      )
      return
    }
    blocks.push(<p key={`p-${idx}`}>{line}</p>)
  })
  flushList()

  return (
    <main className="legal-page">
      <div className="section-wrap legal-wrap">
        <div className="section-tag" style={{ justifyContent: 'center' }}>Legal</div>
        <h1 className="legal-title">{title}</h1>
        <div className="legal-doc">{blocks}</div>
      </div>
    </main>
  )
}
