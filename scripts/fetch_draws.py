#!/usr/bin/env python3
"""동행복권 로또 6/45 당첨번호를 받아 draws.json을 갱신한다.

사용: python3 scripts/fetch_draws.py <draws.json 경로>
- 파일이 있으면 마지막 회차 다음부터, 없으면 1회부터 받는다.
- 존재하지 않는 회차(returnValue != success)를 만나면 멈춘다.
- 새 회차가 하나도 없고 기존 파일도 없으면 실패(exit 1)로 알린다.
"""
import json, sys, time, urllib.request, datetime

URL = "https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo={}"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    "Accept": "application/json,text/plain,*/*",
    "Referer": "https://www.dhlottery.co.kr/",
}

def fetch(no, tries=3):
    for t in range(tries):
        try:
            req = urllib.request.Request(URL.format(no), headers=HEADERS)
            with urllib.request.urlopen(req, timeout=20) as r:
                body = r.read().decode("utf-8", "replace")
            data = json.loads(body)
            if data.get("returnValue") != "success":
                return None
            return {
                "d": data["drwNoDate"],
                "n": [int(data[f"drwtNo{i}"]) for i in range(1, 7)],
                "b": int(data["bnusNo"]),
                "w": int(data.get("firstWinamnt") or 0),
                "c": int(data.get("firstPrzwnerCo") or 0),
            }
        except Exception as e:  # 네트워크 오류는 잠시 쉬고 재시도
            print(f"round {no}: {e} (try {t+1}/{tries})", file=sys.stderr)
            time.sleep(2 + 2 * t)
    raise SystemExit(f"round {no}: 응답을 받지 못했습니다")

def main(path):
    try:
        with open(path, encoding="utf-8") as f:
            store = json.load(f)
    except FileNotFoundError:
        store = {"latest": 0, "draws": {}}
    draws = store.get("draws", {})
    start = int(store.get("latest") or 0) + 1
    added = 0
    no = start
    while True:
        row = fetch(no)
        if row is None:
            break
        draws[str(no)] = row
        added += 1
        no += 1
        if added % 50 == 0:
            print(f"... {no-1}회까지 받음", file=sys.stderr)
        time.sleep(0.15)
    if not draws:
        raise SystemExit("회차를 하나도 받지 못했습니다 (동행복권 응답 형식이 바뀌었거나 차단됨)")
    latest = max(int(k) for k in draws)
    store = {
        "updated": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "latest": latest,
        "draws": {k: draws[k] for k in sorted(draws, key=int)},
    }
    with open(path, "w", encoding="utf-8") as f:
        json.dump(store, f, ensure_ascii=False, separators=(",", ":"))
    print(f"latest={latest} added={added}")
    return added

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "draws.json")
