"""
generate_news.py
Fetches active News records from Airtable for BUS01
and writes news-data.json to the repo root.

GitHub Secrets required:
  AIRTABLE_TOKEN   — Personal Access Token
  AIRTABLE_BASE_ID — appMBjlfYyVd8I7ML

File path in repo: scripts/generate_news.py
Output:            news-data.json  (repo root)
"""

import os
import json
import requests
from datetime import date, datetime

# ── Config ────────────────────────────────────────────────────────
BASE_ID    = os.environ['AIRTABLE_BASE_ID']
TOKEN      = os.environ['AIRTABLE_TOKEN']
TABLE_NAME = 'News'
BUS_ID     = 'BUS01'
OUTPUT     = 'news-data.json'
NEW_DAYS   = 14  # badge shows for this many days after post_date

# ── Helpers ───────────────────────────────────────────────────────
def safe_str(val):
    if not val:
        return ''
    if isinstance(val, list):
        return str(val[0]) if val else ''
    return str(val)

def safe_bool(val):
    if isinstance(val, bool):
        return val
    return bool(val)

# ── Fetch all pages from Airtable ─────────────────────────────────
url     = f'https://api.airtable.com/v0/{BASE_ID}/{TABLE_NAME}'
headers = {'Authorization': f'Bearer {TOKEN}'}
params  = {
    'filterByFormula': f"AND({{active}}=TRUE(), {{web_published}}=TRUE(), {{bus_id}}='{BUS_ID}')",
    'sort[0][field]':     'post_date',
    'sort[0][direction]': 'desc',
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

print(f'Fetched {len(records)} active News records from Airtable.')

# ── Build output list ─────────────────────────────────────────────
today = date.today()
news  = []

for rec in records:
    f = rec.get('fields', {})

    title    = safe_str(f.get('title', ''))
    title_th = safe_str(f.get('title_th', ''))
    if not title and not title_th:
        continue  # skip rows with no headline at all

    # Calculate is_new at build time — avoids client-side date math
    post_date_str = safe_str(f.get('post_date', ''))
    is_new = False
    if post_date_str:
        try:
            post_date = datetime.strptime(post_date_str[:10], '%Y-%m-%d').date()
            is_new = (today - post_date).days < NEW_DAYS
        except ValueError:
            pass

    # Parse gallery_images — comma-separated URLs
    raw_gallery = safe_str(f.get('gallery_images', ''))
    gallery_list = [u.strip() for u in raw_gallery.split(',') if u.strip()] if raw_gallery else []

    news.append({
        'title':          title,
        'title_th':       title_th,
        'body':           safe_str(f.get('body', '')),
        'body_th':        safe_str(f.get('body_th', '')),
        'gallery_images': gallery_list,
        'post_date':      post_date_str[:10] if post_date_str else '',
        'is_new':         is_new,
    })
# ── Write JSON ────────────────────────────────────────────────────
with open(OUTPUT, 'w', encoding='utf-8') as fh:
    json.dump(news, fh, ensure_ascii=False, indent=2)

print(f'Written {len(news)} news items to {OUTPUT}')
