# RIT Class Notes
[![Build Status](https://travis-ci.org/omgimanerd/rit-notes.svg?branch=master)](https://travis-ci.org/omgimanerd/rit-notes)

This repository contains notes and resources taken from my classes at RIT. Some
of these are intended for the NTID/hard-of-hearing students, for which I am a
designated notetaker. These notes are automatically hosted on my [personal
website](http://omgimanerd.tech/notes).

## Setup
If you wish to compile this repository yourself, you must have a standard TeX
distribution installed. Your TeX distribution must have the `pgfplots`
package and its libraries installed.
```
sudo apt install texlive texlive-latex-extra
```
To compile the notes, you will need `node >= 6.0.0`. The notes are
compiled and managed using a gulpfile.
```
npm install
npm install -g gulp
gulp latex-all
```

## Author
[![Libraries.io for GitHub](https://img.shields.io/badge/Alvin%20Lin-omgimanerd-blue.svg)](http://omgimanerd.tech)
[![Twitter Follow](https://img.shields.io/twitter/follow/omgimanerd.svg?style=social&label=Follow)](https://twitter.com/omgimanerd)
[![GitHub followers](https://img.shields.io/github/followers/omgimanerd.svg?style=social&label=Follow)](https://github.com/omgimanerd)

## License
[MIT](https://github.com/omgimanerd/rit-notes/blob/master/LICENSE)
