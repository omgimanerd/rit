TEX = $(wildcard *.tex)
PDF = $(addprefix output/,$(TEX:tex=pdf))
all: $(PDF)

output/%.pdf: %.tex
	mkdir -p output
	pdflatex -file-line-error -halt-on-error -output-directory output $<
	pdflatex -file-line-error -halt-on-error -output-directory output $<

clean:
	rm -r output

