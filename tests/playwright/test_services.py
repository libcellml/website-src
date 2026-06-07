import os
import re
import unittest

from playwright.sync_api import sync_playwright, expect

try:
    from .config import BASE_URL, HEADLESS_MODE, RESOURCE_PATH
except ImportError:
    from config import BASE_URL, HEADLESS_MODE, RESOURCE_PATH


class ServicesTestCase(unittest.TestCase):
    
    def test_validation_service(self):
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=HEADLESS_MODE)
            context = browser.new_context()
            page = context.new_page()
            page.goto(BASE_URL)
            page.get_by_role("button", name="Services").click()
            page.get_by_role("link", name="Validate CellML").click()
            page.locator(".v-field.v-field--appended.v-field--center-affix.v-field--variant-filled > .v-field__field > .v-field__input").click()
            page.locator('input[type="file"]').set_input_files(os.path.join(RESOURCE_PATH, "test_basic_ode.cellml"))
            page.get_by_role("button", name="Validate CellML 2.0 syntax").click()
            page.get_by_text("Given model is a CellML 1.0").click()
            page.get_by_text("Parser errors were found!").click()
            page.get_by_text(re.compile(r"test_basic_ode\.cellml \(11\.9")).click()
            page.locator('input[type="file"]').set_input_files(os.path.join(RESOURCE_PATH, "test_basic_ode.cellml2"))
            page.get_by_role("button", name="Validate CellML 2.0 syntax").click()
            page.get_by_text(re.compile(r"test_basic_ode\.cellml2:")).click()
            page.get_by_text("The model is valid!").click()
            expect(page.locator("#pageMainContent")).to_match_aria_snapshot("- text: test_basic_ode.cellml2:The model is valid!")
            expect(page.locator("#pageMainContent")).to_match_aria_snapshot("- text: test_basic_ode.cellml2 (1.9 kB)")
            page.get_by_role("button", name="Home").click()
            expect(page.locator("#introContent")).to_match_aria_snapshot("- heading \"libCellML is an easy-to-use library for developers of CellML applications.\" [level=3]")

            # ---------------------
            context.close()
            browser.close()

    def test_translate_service(self):
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=HEADLESS_MODE)
            context = browser.new_context()
            page = context.new_page()
            page.goto(BASE_URL)
            page.get_by_role("button", name="Services").click()
            page.get_by_role("link", name="Translate CellML").click()
            page.locator(".v-field.v-field--appended.v-field--center-affix.v-field--variant-filled > .v-field__field > .v-field__input").click()
            page.locator('input[type="file"]').set_input_files(os.path.join(RESOURCE_PATH, "test_basic_ode.cellml"))
            expect(page.locator("#pageMainContent")).to_match_aria_snapshot("- text: /test_basic_ode\\.cellml \\(\\d+\\.\\d+ kB\\)/")
            expect(page.locator("#pageMainContent")).to_match_aria_snapshot("- text: Translated models\n- button \"clear\" [disabled]")
            page.get_by_role("button", name="Translate to CellML").click()
            expect(page.locator("#pageMainContent")).to_match_aria_snapshot("- text: /test_basic_ode\\.cellml \\(\\d+\\.\\d+ kB\\)/")
            page.get_by_role("button", name="Home").click()
            expect(page.locator("#introContent")).to_match_aria_snapshot("- heading \"libCellML is an easy-to-use library for developers of CellML applications.\" [level=3]")

            # ---------------------
            context.close()
            browser.close()

    def test_import_service(self):
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=HEADLESS_MODE)
            context = browser.new_context()
            page = context.new_page()
            page.goto(BASE_URL)
            page.get_by_role("button", name="Services").click()
            page.get_by_role("link", name="Import CellML").click()
            expect(page.locator("#pageMainContent")).to_match_aria_snapshot("- text: Imported models\n- button \"clear\" [disabled]")
            page.locator(".v-field.v-field--appended.v-field--center-affix.v-field--variant-filled > .v-field__field > .v-field__input").click()
            page.locator('input[type="file"]').set_input_files(os.path.join(RESOURCE_PATH, "test_basic_ode.cellml"))
            expect(page.locator("#pageMainContent")).to_match_aria_snapshot("- text: /test_basic_ode\\.cellml \\(\\d+\\.\\d+ kB\\)/")
            page.get_by_role("button", name="Import CellML 1.0/1.1 model").click()
            expect(page.locator("#pageMainContent")).to_match_aria_snapshot("- text: /test_basic_ode\\.cellml \\(\\d+\\.\\d+ kB\\)/")
            page.get_by_role("button", name="clear", exact=True).click()
            expect(page.locator("#pageMainContent")).to_match_aria_snapshot("- text: Imported models\n- button \"clear\" [disabled]")
            page.get_by_text("test_basic_ode.cellml (11.9").click()
            page.locator('input[type="file"]').set_input_files(os.path.join(RESOURCE_PATH, "test_basic_ode.cellml2"))
            page.get_by_role("button", name="Import CellML 1.0/1.1 model").click()
            page.get_by_role("button", name="Home").click()
            expect(page.locator("#introContent")).to_match_aria_snapshot("- heading \"libCellML is an easy-to-use library for developers of CellML applications.\" [level=3]")

            # ---------------------
            context.close()
            browser.close()


if __name__ == '__main__':
    unittest.main()
