import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data.json')

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
  } catch (e) {
    return { balances: { 1: 0, 2: 0 }, transactions: [], tokens: [] }
  }
}

function save(d: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2))
}

function makeToken() {
  return 'stc-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10)
}

export async function POST(request: NextRequest) {
  const pathname = new URL(request.url).pathname
  const segments = pathname.split('/').filter(Boolean)
  const endpoint = segments[segments.length - 1]

  if (endpoint === 'login') {
    const body = await request.json()
    const { username, password } = body || {}
    const validUsername = process.env.AUTH_USERNAME || 'user'
    const validPassword = process.env.AUTH_PASSWORD || 'password'

    if (username === validUsername && password === validPassword) {
      const data = load()
      const token = makeToken()
      data.tokens = data.tokens || []
      data.tokens.push(token)
      save(data)
      return NextResponse.json({ ok: true, token })
    }
    return NextResponse.json({ ok: false, error: 'invalid_credentials' }, { status: 401 })
  }

  if (endpoint === 'transactions') {
    const authHeader = request.headers.get('authorization') || ''
    const parts = authHeader.split(' ')
    const token = parts.length === 2 ? parts[1] : null
    const d = load()

    if (!token || !Array.isArray(d.tokens) || !d.tokens.includes(token)) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const tx = { ...body }
    tx.id = Date.now()
    tx.date = tx.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    const accIndex = (tx.accountIndex && +tx.accountIndex) || (tx.account === '2' ? 2 : (tx.account === '1' ? 1 : (tx.accountIndex ? +tx.accountIndex : 1)))
    tx.account = accIndex === 2 ? 'Investment Portfolio (9304)' : 'Primary Savings (4821)'
    const amount = parseFloat(tx.amount) || 0
    d.transactions = d.transactions || []

    if (tx.debit) {
      d.balances[accIndex] = Math.max(0, (parseFloat(d.balances[accIndex]) || 0) - amount)
    } else {
      d.balances[accIndex] = (parseFloat(d.balances[accIndex]) || 0) + amount
    }

    d.transactions.unshift(tx)
    save(d)
    return NextResponse.json({ balances: d.balances, transactions: d.transactions })
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function GET(request: NextRequest) {
  const pathname = new URL(request.url).pathname
  const segments = pathname.split('/').filter(Boolean)
  const endpoint = segments[segments.length - 1]

  if (endpoint === 'state') {
    const d = load()
    return NextResponse.json({ balances: d.balances || {}, transactions: d.transactions || [] })
  }

  if (endpoint === 'balances') {
    return NextResponse.json(load().balances || {})
  }

  if (endpoint === 'transactions') {
    return NextResponse.json(load().transactions || [])
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PUT(request: NextRequest) {
  const pathname = new URL(request.url).pathname
  const segments = pathname.split('/').filter(Boolean)
  const endpoint = segments[segments.length - 1]

  if (endpoint === 'balances') {
    const authHeader = request.headers.get('authorization') || ''
    const parts = authHeader.split(' ')
    const token = parts.length === 2 ? parts[1] : null
    const d = load()

    if (!token || !Array.isArray(d.tokens) || !d.tokens.includes(token)) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const b = body || {}
    if (typeof b['1'] !== 'undefined') d.balances[1] = parseFloat(b['1']) || 0
    if (typeof b['2'] !== 'undefined') d.balances[2] = parseFloat(b['2']) || 0
    save(d)
    return NextResponse.json(d.balances)
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
