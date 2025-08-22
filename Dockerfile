# LaTeX container

FROM ubuntu:24.04

RUN apt update
RUN apt install -y build-essential texlive texlive-pictures texlive-latex-extra
