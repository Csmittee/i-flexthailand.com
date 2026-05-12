"""
generate_gallery.py
Fetches active Gallery records from Airtable for BUS01
and writes gallery-data.json to the repo root.

GitHub Secrets required:
  AIRTABLE_TOKEN   — Personal Access Token
  AIRTABLE_BASE_ID — appMBjlfYyVd8I7ML

File path in repo: scripts/generate_gallery.py
Output:            gallery-data.json  (repo root)
"""

import os
import json
import requests

# ── Config ────────────────────────────────────────────────────────
BASE_ID    = os.environ['AIRTABLE_BASE_ID']
TOKEN      = os.environ['AIRTABLE_TOKEN']
TABLE_NAME = 'Gallery'
BUS_ID     = 'BUS01'
OUTPUT     = 'gallery-data.json'

# ── Helpers ───────────────────────────────────────────────────────
def safe_str(val):
    """Unwrap Airtable lookup arrays and stringify."""
    if not val:
        return ''
    if isinstance(val, list):
        return str(val[0]) if val else ''
    return str(val)

def safe_int(val, default=9999):
    """Safe integer conversion with fallback."""
    try:
        return int(val)
    except (TypeError, ValueError):
        return default

# ── Fetch all pages from Airtable ─────────────────────────────────
url     = f'https://api.airtable.com/v0/{BASE_ID}/{TABLE_NAME}'
headers = {'Authorization': f'Bearer {TOKEN}'}
params  = {
   'filterByFormula': f"{{bus_id}}='{BUS_ID}'",
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

print(f'Fetched {len(records)} active Gallery records from Airtable.')

# ── Build output list ─────────────────────────────────────────────
gallery = []
for rec in records:
    f = rec.get('fields', {})
    image_url = safe_str(f.get('image_url', ''))
    if not image_url:
        continue  # skip rows with no URL

    gallery.append({
        'image_url':     image_url,
        'alt_text':      safe_str(f.get('alt_text', '')) or 'Showroom image',
        'display_order': safe_int(f.get('display_order')),
    })

# Sort in Python as a safety net (Airtable sort already handles this)
gallery.sort(key=lambda x: x['display_order'])

# ── Write JSON ────────────────────────────────────────────────────
with open(OUTPUT, 'w', encoding='utf-8') as fh:
    json.dump(gallery, fh, ensure_ascii=False, indent=2)

print(f'Written {len(gallery)} images to {OUTPUT}')
