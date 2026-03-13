const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const DATA_FILE = path.join(__dirname, 'data.json');
function load(){ try { return JSON.parse(fs.readFileSync(DATA_FILE,'utf8')); } catch(e){ return { balances:{1:0,2:0}, transactions:[], tokens:[] }; } }
function save(d){ fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2)); }

const app = express();
app.use(cors());
app.use(express.json());

function makeToken(){ return 'stc-' + Date.now() + '-' + Math.random().toString(36).slice(2,10); }

// Login - checks environment variables for credentials
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  const validUsername = process.env.AUTH_USERNAME || 'user';
  const validPassword = process.env.AUTH_PASSWORD || 'password';
  if(username === validUsername && password === validPassword){
    const data = load();
    const token = makeToken();
    data.tokens = data.tokens || [];
    data.tokens.push(token);
    save(data);
    return res.json({ ok: true, token });
  }
  res.status(401).json({ ok:false, error:'invalid_credentials' });
});

// Public read endpoints
app.get('/api/state', (req, res) => {
  const d = load();
  res.json({ balances: d.balances || {}, transactions: d.transactions || [] });
});
app.get('/api/balances', (req, res) => res.json(load().balances || {}));
app.get('/api/transactions', (req, res) => res.json(load().transactions || []));

// Simple middleware to require token for writes
function requireToken(req, res, next){
  const auth = req.get('authorization') || '';
  const parts = auth.split(' ');
  const token = parts.length === 2 ? parts[1] : null;
  const d = load();
  if(token && Array.isArray(d.tokens) && d.tokens.includes(token)) { req.token = token; return next(); }
  return res.status(401).json({ ok:false, error:'unauthorized' });
}

// Add transaction (persistent) - updates balances
app.post('/api/transactions', requireToken, (req, res) => {
  const d = load();
  const tx = Object.assign({}, req.body);
  tx.id = Date.now();
  tx.date = tx.date || new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
  // account may be numeric index or string
  const accIndex = (tx.accountIndex && +tx.accountIndex) || (tx.account === '2' ? 2 : (tx.account === '1' ? 1 : (tx.accountIndex ? +tx.accountIndex : 1)));
  tx.account = accIndex === 2 ? 'Investment Portfolio (9304)' : 'Primary Savings (4821)';
  const amount = parseFloat(tx.amount) || 0;
  d.transactions = d.transactions || [];
  if(tx.debit){
    d.balances[accIndex] = Math.max(0, (parseFloat(d.balances[accIndex])||0) - amount);
  } else {
    d.balances[accIndex] = (parseFloat(d.balances[accIndex])||0) + amount;
  }
  d.transactions.unshift(tx);
  save(d);
  res.json({ balances: d.balances, transactions: d.transactions });
});

// Admin: update balances
app.put('/api/balances', requireToken, (req, res) => {
  const d = load();
  const b = req.body || {};
  if(typeof b['1'] !== 'undefined') d.balances[1] = parseFloat(b['1']) || 0;
  if(typeof b['2'] !== 'undefined') d.balances[2] = parseFloat(b['2']) || 0;
  save(d);
  res.json(d.balances);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('STC backend running on port', PORT));
