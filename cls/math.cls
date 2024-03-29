\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{math}[Custom Math Notes]
\LoadClass[letterpaper, 12pt]{article}

\RequirePackage{amsmath}
\RequirePackage{amssymb}
\RequirePackage{array}
\RequirePackage{geometry}
\RequirePackage{hyperref}

\renewcommand*{\arcsin}{\sin^{-1}}
\renewcommand*{\arccos}{\cos^{-1}}
\renewcommand*{\arctan}{\tan^{-1}}
\renewcommand*{\i}{\hat{i}}
\renewcommand*{\j}{\hat{j}}
\renewcommand*{\k}{\hat{k}}
\newcommand*{\arccot}{\cot^{-1}}
\newcommand*{\arcsec}{\sec^{-1}}
\newcommand*{\arccsc}{\csc^{-1}}
\newcommand*{\diff}{~\text{d}}
\newcommand*{\ddiff}[2]{\frac{\diff{#1}}{\diff{#2}}}
\newcommand*{\pdiff}[2]{\frac{\partial{#1}}{\partial{#2}}}
\newcommand*{\gradientd}[1]{\overrightarrow{\triangledown #1}}
\newcommand*{\Diff}[1]{\mathrm{d^#1}}
\newcommand*{\e}{\mathrm{e}}
\newcommand*{\N}{\mathbb{N}}
\newcommand*{\Q}{\mathbb{Q}}
\newcommand*{\Qp}{\mathbb{Q'}}
\newcommand*{\R}{\mathbb{R}}
\newcommand*{\U}{\mathbb{U}}
\newcommand*{\Z}{\mathbb{Z}}
\newcommand*{\nPr}[2]{_{#1}P_{#2}}
\newcommand*{\nPrf}[2]{\frac{#1!}{(#1-#2)!}}
\newcommand*{\nCr}[2]{_{#1}C_{#2}}
\newcommand*{\nCrf}[2]{\frac{#1!}{(#1-#2)!#2!}}
\newcommand*{\laplace}[1]{\mathcal{L}\{#1\}}
\newcommand*{\ilaplace}[1]{\mathcal{L}^{-1}\{#1\}}
\newcommand*{\angstrom}{\text{\normalfont\AA}}
