import argparse

from datetime import datetime


def do_website_version_update(sha):
    _write_versions_file(sha)


def _write_versions_file(sha):
    dt = datetime.now()

    content = f"""// This file is generated do not edit!
// Changes made here will be overwritten when a staging or production build is run.
export const getWebsiteBuild = () => {{
  return "{dt.strftime('%Y-%m-%d-%H-%M-%S')}"
}}

export const getWebsiteRevision = () => {{
  return "{sha[:8]}"
}}
"""

    with open(f"src/js/websiteversions.js", "w") as f:
        f.write(content)


def _process_arguments():
    parser = argparse.ArgumentParser(
        description="Update the website version information of the libCellML website.")
    parser.add_argument("sha",
                        help="Current SHA of the website source.")

    return parser.parse_args()


def main():
    args = _process_arguments()
    do_website_version_update(args.sha)


if __name__ == "__main__":
    main()
