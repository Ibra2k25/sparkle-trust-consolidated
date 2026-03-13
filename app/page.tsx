'use client'

export default function Home() {
  return (
    <main>
      {/* The HTML-based dashboard will be served from the public folder */}
      <iframe
        src="/sparkle-trust-consolidated main.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
        }}
        title="Sparkle Trust Consolidated Dashboard"
      />
    </main>
  )
}
