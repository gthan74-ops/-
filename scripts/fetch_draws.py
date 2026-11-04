#!/usr/bin/env python3
"""로또 6/45 당첨번호를 받아 draws.json을 갱신한다.

사용: python3 scripts/fetch_draws.py <draws.json 경로>

1차: smok95/lotto 미러(GitHub Pages, 추첨 직후 갱신)에서 전체 회차 JSON
2차: 동행복권 공식 조회 (국내 IP에서만 응답하므로 GitHub 서버에서는 보통 실패)
둘 다 실패하면 기존 파일을 그대로 두고 exit 1.

출력 형식: {"updated": ISO, "latest": N, "draws": {"N": {"d": "YYYY-MM-DD", "n": [6], "b": 보너스, "w": 1등금액, "c": 1등인원}}}
"""
import json, sys, time, urllib.request, datetime

MIRROR = "https://smok95.github.io/lotto/results/all.json"
OFFICIAL = "https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo={}"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    "Accept": "application/json,text/plain,*/*",
}

def get_json(url, timeout=30):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode("utf-8", "replace"))

def load(path):
    try:
        with open(path, encoding="utf-8") as f:
            s = json.load(f)
            return s.get("draws", {}) or {}
    except FileNotFoundError:
        return {}

def save(path, draws):
    latest = max(int(k) for k in draws)
    store = {
        "updated": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "latest": latest,
        "draws": {k: draws[k] for k in sorted(draws, key=int)},
    }
    with open(path, "w", encoding="utf-8") as f:
        json.dump(store, f, ensure_ascii=False, separators=(",", ":"))
    return latest

def from_mirror(draws):
    rows = get_json(MIRROR)
    added = 0
    for r in rows:
        no = int(r["draw_no"]); nums = [int(x) for x in r["numbers"]]
        if len(nums) != 6 or not all(1 <= x <= 45 for x in nums):
            continue
        div1 = (r.get("divisions") or [{}])[0] or {}
        row = {"d": r["date"][:10], "n": nums, "b": int(r["bonus_no"]),
               "w": int(div1.get("prize") or 0), "c": int(div1.get("winners") or 0)}
        if draws.get(str(no)) != row:
            draws[str(no)] = row; added += 1
    return added

def from_official(draws):
    no = (max((int(k) for k in draws), default=0)) + 1
    added = 0
    while True:
        data = None
        for t in range(2):
            try:
                data = get_json(OFFICIAL.format(no), timeout=20); break
            except Exception as e:
                print(f"official {no}: {e}", file=sys.stderr); time.sleep(2)
        if not data or data.get("returnValue") != "success":
            break
        draws[str(no)] = {"d": data["drwNoDate"], "n": [int(data[f"drwtNo{i}"]) for i in range(1, 7)],
                          "b": int(data["bnusNo"]), "w": int(data.get("firstWinamnt") or 0),
                          "c": int(data.get("firstPrzwnerCo") or 0)}
        added += 1; no += 1; time.sleep(0.15)
    return added

def main(path):
    draws = load(path)
    before = max((int(k) for k in draws), default=0)
    added = 0; src = None
    try:
        added = from_mirror(draws); src = "mirror"
    except Exception as e:
        print(f"mirror failed: {e}", file=sys.stderr)
        try:
            added = from_official(draws); src = "official"
        except Exception as e2:
            print(f"official failed: {e2}", file=sys.stderr)
    if not draws:
        raise SystemExit("회차를 하나도 받지 못했습니다")
    latest = save(path, draws)
    print(f"source={src} latest={latest} (was {before}) changed={added}")
    if src is None:
        raise SystemExit(1)

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "draws.json")
