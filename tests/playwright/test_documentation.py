import os
import unittest

from playwright.sync_api import sync_playwright

try:
    from .config import BASE_URL, HEADLESS_MODE
except ImportError:
    from config import BASE_URL, HEADLESS_MODE


class TestBrowseAPIDocumentation(unittest.TestCase):

    def test_browse_api_documentation(self):
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=HEADLESS_MODE)
            context = browser.new_context()
            page = context.new_page()
            page.goto(BASE_URL)
            page.get_by_role("heading", name="libCellML", exact=True).click()
            page.get_by_role("button", name="Documentation").click()
            page.get_by_role("link", name="API Documentation").click()
            page.get_by_role("link", name="libcellml::Generator", exact=True).click()
            page.locator(".mdi-menu-down").click()
            page.get_by_text("v0.4.0").click()
            page.get_by_role("link", name="model", exact=True).click()
            page.get_by_role("link", name="AnalyserModelPtr").first.click()
            page.get_by_role("button", name="Scroll to top").click()
            page.get_by_role("link", name="You are viewing an old").click()
            page.get_by_role("button", name="Scroll to top").click()
            page.get_by_role("link", name="libcellml::Logger").click()
            page.get_by_role("button", name="Home").click()

            context.close()
            browser.close()


if __name__ == '__main__':
    unittest.main()
