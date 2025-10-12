# Makefile configuration for compiling this project.


# Match input .tex files for dependencies
TEX := $(shell find -type f -name '*.tex')

# generate_pdf_path($1)
# $1: path to the .tex file
#
# Builds the path to the output PDF file for a given .tex file
define generate_pdf_path
$(patsubst %/,%/output/,$(dir $1))$(patsubst %.tex,%.pdf,$(notdir $(1)))
endef

# Build the target PDF patterns, to be used as recipe prerequisites
PDF := $(foreach tex,$(TEX),$(call generate_pdf_path,$(tex)))


## Recipes
.PHONY: all clean _build build

all: build

# generate_pdf_rule($1)
# $1: path to the .tex file to generate a makefile recipe for
#
# Generates a makefile recipe for the given .tex file
define generate_pdf_rule
$(call generate_pdf_path,$1): $1
	@echo "Building: $$@ from $$<"
	@mkdir -p $$(@D)
	@TEXINPUTS=.//:: latexmk -f -pdf -outdir=$$(@D) $$< $(if $(VERBOSE),,> /dev/null)
	@find $$(@D) -type f ! -name "*.pdf" -delete
endef

# Run the rule template function to create 1:1 rules for every .tex file to its
# output.
$(foreach tex,$(TEX),$(eval $(call generate_pdf_rule,$(tex))))

# Invokes the build rules to build all the outputs for changed files.
# Generally shouldn't be called outside the docker container.
_build: $(PDF)

# Invokes the _build rule inside a docker container, mounting the contents of
# this repo into the docker container as a volume mount.
build: $(PDF)
	@docker run --rm -v $(PWD):/data -w /data blang/latex make _build

# File watcher
watch:
	inotifywait -e modify -e create -m -r --include '.*\.tex$$' ./ | \
	while read -r directory action file; do \
		echo "$$directory $$action $$file"; \
	  make build; \
	done

clean:
	@find . -type d -wholename "*/output" -exec rm -rf {} +
