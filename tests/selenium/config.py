import os

BASE_URL = os.environ.get("LIBCELLML_BASE_URL", "https://staging.libcellml.org/")
RESOURCE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "resources"))
