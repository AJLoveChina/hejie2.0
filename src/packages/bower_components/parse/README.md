bower-parse
===========

[Bower](http://bower.io) package for [Parse.com](http://parse.com) Javascript SDK

      bower install parse

Contributing
------------

This package has to be updated manually when new updates are released, and often I forget to check for new versions. [`download_latest.sh`](download_latest.sh) will check for a new version and update if neccessary. You can also manually check for updates [on Parse's website](https://parse.com/docs/downloads).

If you notice the package is out-of-date:

- fork this and create a new branch
- download the latest version (you can use `download_latest.sh` if you have `wget`)
- commit
- `bower version [version number from parse.js]`
- push with tags (`git push --tags`)
- send a PR
