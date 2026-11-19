import asyncio, sys
from playwright.async_api import async_playwright

BASE = "https://babrs.github.io/games"
ROUTES = [
    ("home", "/"),
    ("dobble", "/dobble/"),
    ("dobble-rules", "/dobble/rules/"),
    ("mafia", "/mafia/baikal/"),
    ("mafia-rules", "/mafia/baikal/rules/"),
    ("mafia-host", "/mafia/baikal/host/"),
]

async def main():
    errors = []
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for width, tag in [(390, "mobile"), (1280, "desktop")]:
            ctx = await browser.new_context(viewport={"width": width, "height": 900})
            page = await ctx.new_page()
            console_errs = []
            page.on("console", lambda m: console_errs.append(m.text) if m.type == "error" else None)
            page.on("pageerror", lambda e: console_errs.append(f"pageerror: {e}"))
            for name, route in ROUTES:
                del console_errs[:]
                resp = await page.goto(f"{BASE}{route}", wait_until="networkidle")
                status = resp.status if resp else "noresp"
                await page.screenshot(path=f"scripts/shot-{tag}-{name}.png", full_page=True)
                title = await page.title()
                if status != 200:
                    errors.append(f"{tag} {route} -> HTTP {status}")
                if console_errs:
                    errors.append(f"{tag} {route} console: {console_errs[:3]}")
                print(f"[{tag}] {route:22} HTTP {status} | {title[:50]} | console_errs={len(console_errs)}")
            # interaction test on dobble: open first symbol card -> gallery modal
            await page.goto(f"{BASE}/dobble/", wait_until="networkidle")
            cards = page.locator("[class*='card-grid'] button, .card-grid__item, button:has(img)")
            try:
                first = page.locator("button:has(img)").first
                await first.click(timeout=4000)
                await page.wait_for_timeout(600)
                dialog = page.locator("[role='dialog'], dialog, [class*='modal']")
                visible = await dialog.first.is_visible()
                await page.screenshot(path=f"scripts/shot-{tag}-dobble-modal.png")
                print(f"[{tag}] dobble modal opened: {visible}")
                if not visible:
                    errors.append(f"{tag} dobble modal did not open")
            except Exception as e:
                errors.append(f"{tag} dobble interaction: {e}")
                print(f"[{tag}] dobble interaction FAILED: {e}")
            await ctx.close()
        await browser.close()
    print("\n=== ERRORS ===" if errors else "\n=== NO ERRORS ===")
    for e in errors:
        print(" -", e)
    sys.exit(1 if errors else 0)

asyncio.run(main())
