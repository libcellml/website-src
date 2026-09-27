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
            expect(page.locator("#aboutContent")).to_match_aria_snapshot("- paragraph:\n  - text: The version of\n  - link \"libcellml.js\":\n    - /url: https://www.npmjs.com/package/libcellml.js\n  - text: \"/^that this website is using is: [0-9]+[.][0-9]+[.][0-9]+$/\"")
            # page.pause()
            # page.get_by_role("button").filter(has_text=re.compile(r"^$")).click()
            # page.goto(BASE_URL + "about")
            # page.get_by_role("link", name="About libCellML").click()
            page.get_by_role("button", name="About").click()
            expect(page.locator("#aboutContent")).to_contain_text("About libCellML")
            expect(page.get_by_role("heading", name="About libCellML")).to_be_visible()
            expect(page.locator("#aboutContent")).to_contain_text("Citing libCellML")
            page.get_by_role("button", name="Documentation").click()
            page.get_by_role("link", name="Documentation page").click()
            page.get_by_role("button", name="About").click()
            expect(page.get_by_role("heading", name="Citing libCellML")).to_be_visible()
            # The revision is rendered in <strong data-testid="about-website-build-revision">.
            # Note: Locator.click() returns None, so keep the locator itself, and the
            # locator *is* the <strong> element, so don't look for a nested "strong".
            revision = page.get_by_test_id("about-website-build-revision")
            expect(revision).to_be_visible()
            if sha != "stuvwxyz":
                expect(revision).to_have_text(sha[:8])
            else:
                expect(revision).to_have_text(re.compile(r"^[0-9a-f]{8}$"))
            expect(revision.locator("xpath=..")).to_have_text(
                re.compile(r"^\s*The revision this website was created from is [0-9a-f]{8}\.\s*$"))
            page.get_by_role("button", name="Home").click()
            expect(page.locator("#introContent")).to_match_aria_snapshot("- heading \"libCellML is an easy-to-use library for developers of CellML applications.\" [level=3]")

            # ---------------------
            context.close()
            browser.close()


if __name__ == '__main__':
    unittest.main()
