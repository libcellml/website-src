from playwright.sync_api import expect


def expect_home_page(page):
    """Check the browser is showing the home page introduction."""
    expect(page.locator("#introContent")).to_match_aria_snapshot(
        '- heading "libCellML" [level=1]\n'
        "- strong: libCellML is an easy-to-use library for developers of CellML applications."
    )
