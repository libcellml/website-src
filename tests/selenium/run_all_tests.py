import os
import sys
import unittest


here = os.path.abspath(os.path.dirname(__file__))

loader = unittest.TestLoader()
tests = loader.discover(here)
testRunner = unittest.runner.TextTestRunner()
result = testRunner.run(tests)

if not result.wasSuccessful():
    sys.exit(1)

sys.exit(0)

