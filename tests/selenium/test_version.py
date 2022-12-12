# Generated by Selenium IDE
import os
import unittest
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait

from config import BASE_URL


class TestWebsiteVersion(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.vars = {"base_url": BASE_URL}

    def tearDown(self):
        self.driver.quit()

    def test_websiteVersion(self):
        sha = os.environ.get("LIBCELLML_WEBSITE_SHA", "stuvwxyz")

        self.driver.get(self.vars["base_url"] + "about")
        self.driver.set_window_size(1627, 1025)
        el = WebDriverWait(self.driver, timeout=3).until(
            lambda d: d.find_element(By.ID, "about-website-build-identifier"))

        build_identifier = el.text.split("-")
        self.assertEqual(6, len(build_identifier))
        expected_sizes = [4, 2, 2, 2, 2, 2]
        for index, expected_size in enumerate(expected_sizes):
            actual_size = len(build_identifier[index])
            self.assertEqual(expected_size, actual_size)

        el = WebDriverWait(self.driver, timeout=3).until(
            lambda d: d.find_element(By.ID, "about-website-build-revision"))

        if sha != "stuvwxyz":
            self.assertEqual(sha[:8], el.text)
        sleep(1)


if __name__ == '__main__':
    unittest.main()
