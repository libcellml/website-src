import os
import re
import unittest

from playwright.sync_api import sync_playwright, expect

try:
    from .config import BASE_URL, HEADLESS_MODE
except ImportError:
    from config import BASE_URL, HEADLESS_MODE


class TestVersionInformation(unittest.TestCase):

    def test_version(self):
        sha = os.environ.get("LIBCELLML_WEBSITE_SHA", "stuvwxyz")

        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=HEADLESS_MODE)
            context = browser.new_context()
            page = context.new_page()
            page.goto(BASE_URL)
            page.get_by_role("button", name="About").click()
            expect(page.locator("#aboutContent")).to_match_aria_snapshot("- paragraph:\n  - text: The version of\n  - link \"libcellml.js\":\n    - /url: https://www.npmjs.com/package/libcellml.js\n  - text: \"that this website is using is: 0.6.3\"")
            page.get_by_role("button").filter(has_text=re.compile(r"^$")).click()
            page.get_by_role("link", name="About libCellML").click()
            expect(page.locator("#aboutContent")).to_match_aria_snapshot("- heading \"About libCellML\" [level=1]")
            page.get_by_role("button", name="Download").click()
            page.get_by_role("button", name="Documentation").click()
            page.get_by_role("link", name="API Documentation").click()
            page.get_by_role("link", name="documentation", exact=True).click()
            page.get_by_role("button", name="About").click()
            expect(page.locator("#pageMainContent")).to_match_aria_snapshot("- heading \"Website version information\" [level=3]")
            expect(page.locator("#pageMainContent")).to_match_aria_snapshot("- paragraph:\n  - text: The build identifier for the website is\n  - strong: /\\d+-\\d+-\\d+-\\d+-\\d+-\\d+/\n  - text: UTC.")
            if sha != "stuvwxyz":
              expect(page.locator("#pageMainContent")).to_match_aria_snapshot(f"- paragraph:\n  - text: The revision this website was created from is\n  - strong: {sha[:8]}\n  - text: .")
            else:
              expect(page.locator("#pageMainContent")).to_match_aria_snapshot("- paragraph:\n  - text: The revision this website was created from is\n  - strong: /[a-z0-9]{8,8}/\n  - text: .")
            page.get_by_role("button", name="Home").click()
            expect(page.locator("#introContent")).to_match_aria_snapshot("- heading \"libCellML is an easy-to-use library for developers of CellML applications.\" [level=3]")

            # ---------------------
            context.close()
            browser.close()


if __name__ == '__main__':
    unittest.main()
