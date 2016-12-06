\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{custommath}[Custom Math Notes]
\LoadClass[letterpaper, 12pt]{article}

\renewcommand{\arcsin}{\sin^{-1}}
\renewcommand{\arccos}{\cos^{-1}}
\renewcommand{\arctan}{\tan^{-1}}
\newcommand{\arccot}{\cot^{-1}}
\newcommand{\arcsec}{\sec^{-1}}
\newcommand{\arccsc}{\csc^{-1}}
\newcommand{\diff}{\mathrm{d}}
\newcommand{\ddiff}[2]{\frac{\diff{#1}}{\diff{#2}}}
\newcommand{\Diff}[1]{\mathrm{d^#1}}
\newcommand{\e}{\mathrm{e}}
