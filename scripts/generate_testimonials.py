"""
generate_testimonials.py
Fetches active Testimonials records from Airtable for BUS01
and writes testimonials-data.json to the repo root.

GitHub Secrets required:
  AIRTABLE_TOKEN   — Personal Access Token
  AIRTABLE_BASE_ID — appMBjlfYyVd8I7ML

File path in repo: scripts/generate_testimonials.py
Output:            testimonials-data.json  (repo root)
"""

import os
import json
import requests

# ── Config ────────────────────────────────────────────────────────
BASE_ID    = os.environ['AIRTABLE_BASE_ID']
TOKEN      = os.environ['AIRTABLE_TOKEN']
TABLE_NAME = 'Testimonials'
BUS_ID     = 'BUS01'
OUTPUT     = 'testimonials-data.json'

# ── Helpers ───────────────────────────────────────────────────────
def safe_str(val):
    if not val:
        return ''
    if isinstance(val, list):
        return str(val[0]) if val else ''
    return str(val)

def safe_int(val, default=5):
    try:
        return int(val)
    except (TypeError, ValueError):
        return default

# ── Fetch all pages from Airtable ─────────────────────────────────
url     = f'https://api.airtable.com/v0/{BASE_ID}/{TABLE_NAME}'
headers = {'Authorization': f'Bearer {TOKEN}'}
params  = {
    'filterByFormula': f"AND({{active}}=TRUE(), {{web_published}}=TRUE(), {{bus_id}}='{BUS_ID}')",
    'sort[0][field]':     'display_order',
    'sort[0][direction]': 'asc',
}

records = []
while True:
    resp = requests.get(url, headers=headers, params=params)
    resp.raise_for_status()
    data = resp.json()
    records.extend(data.get('records', []))
    offset = data.get('offset')
    if not offset:
        break
    params['offset'] = offset

print(f'Fetched {len(records)} active Testimonial records from Airtable.')

# ── Build output list ─────────────────────────────────────────────
testimonials = []

for rec in records:
    f = rec.get('fields', {})

    name = safe_str(f.get('customer_name', ''))
    if not name:
        continue  # skip rows with no name

    rating = safe_int(f.get('rating', 5))
    rating = max(1, min(5, rating))  # clamp to 1–5

    testimonials.append({
        'customer_name':  name,
        'customer_title': safe_str(f.get('customer_title', '')),
        'quote':          safe_str(f.get('quote', '')),
        'quote_th':       safe_str(f.get('quote_th', '')),
        'photo_url':      safe_str(f.get('photo_url', '')),
        'rating':         rating,
    })

# ── Write JSON ────────────────────────────────────────────────────
with open(OUTPUT, 'w', encoding='utf-8') as fh:
    json.dump(testimonials, fh, ensure_ascii=False, indent=2)

print(f'Written {len(testimonials)} testimonials to {OUTPUT}')
