# Generated by Selenium IDE
import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
# from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

from config import BASE_URL


class TestBrowseAPIDocumentation(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.vars = {"base_url": BASE_URL}

    def tearDown(self):
        self.driver.quit()

    def test_browseAPIDocumentation(self):
        # Test name: BrowseAPIDocumentation
        # Step # | name | target | value
        # 1 | open | / |
        self.driver.get(self.vars["base_url"])
        # 2 | setWindowSize | 1627x1025 |
        self.driver.set_window_size(1627, 1025)
        # 3 | click | css=.router-link-active:nth-child(4) .v-btn__content |
        self.driver.find_element(By.CSS_SELECTOR, ".router-link-active:nth-child(4) .v-btn__content").click()
        # 4 | mouseOver | css=.router-link-active:nth-child(5) .v-btn__content |
        element = self.driver.find_element(By.CSS_SELECTOR, ".router-link-active:nth-child(5) .v-btn__content")
        actions = ActionChains(self.driver)
        actions.move_to_element(element).perform()
        # 5 | click | css=.router-link-active:nth-child(5) .v-btn__content |
        self.driver.find_element(By.CSS_SELECTOR, ".router-link-active:nth-child(5) .v-btn__content").click()
        # 6 | mouseOut | css=.router-link-active:nth-child(5) .v-btn__content |
        element = self.driver.find_element(By.CSS_SELECTOR, "body")
        actions = ActionChains(self.driver)
        actions.move_to_element_with_offset(element, 0, 0).perform()
        # 7 | click | css=#api .v-btn__content |
        self.driver.find_element(By.CSS_SELECTOR, "#api .v-btn__content").click()
        # 8 | click | linkText=libcellml::Parser |
        el = WebDriverWait(self.driver, timeout=3).until(lambda d: d.find_element(By.LINK_TEXT, "libcellml::Parser"))
        el.click()
        # 9 | click | css=.v-field__append-inner |
        el = WebDriverWait(self.driver, timeout=3).until(
            lambda d: d.find_element(By.CSS_SELECTOR, ".v-field__append-inner"))
        el.click()
        # 10 | click | css=.v-list-item:nth-child(2) .v-list-item-title |
        el = WebDriverWait(self.driver, timeout=3).until(
            lambda d: d.find_element(By.XPATH, "//div[contains(@class, '') and contains(text(), 'v0.2.0')]"))
        actions.move_to_element(el).perform()
        actions.click().perform()
        self.assertEqual(self.vars["base_url"] + "/documentation/v0.2.0/api/classlibcellml_1_1Parser",
                         self.driver.current_url)
        # el.click()
        # 11 | click | linkText=libcellml::Logger |
        el = WebDriverWait(self.driver, timeout=3).until(lambda d: d.find_element(By.LINK_TEXT, "libcellml::Logger"))
        el.click()
        # 12 | click | linkText=error |
        el = WebDriverWait(self.driver, timeout=3).until(lambda d: d.find_element(By.LINK_TEXT, "error"))
        el.click()
        # 13 | click | css=#classlibcellml_1_1Logger_1a610d4878881567899c6d47db5e625736 a |
        el = WebDriverWait(self.driver, timeout=3).until(
            lambda d: d.find_element(By.CSS_SELECTOR, "#classlibcellml_1_1Logger_1a610d4878881567899c6d47db5e625736 a"))
        actions.move_to_element(el).perform()
        actions.click().perform()
        # 14 | runScript | window.scrollTo(0,0) |
        self.driver.execute_script("window.scrollTo(0,0)")
        # 15 | click | linkText=AnyCellmlElement |
        el = WebDriverWait(self.driver, timeout=5).until(lambda d: d.find_element(By.LINK_TEXT, "AnyCellmlElement"))
        el.click()
        # 16 | runScript | window.scrollTo(0,0) |
        self.driver.execute_script("window.scrollTo(0,0)")
        # 17 | click | css=a:nth-child(3) .v-btn__content |
        self.driver.find_element(By.CSS_SELECTOR, "a:nth-child(3) .v-btn__content").click()
        # 18 | close |  |
        self.driver.close()


if __name__ == '__main__':
    unittest.main()