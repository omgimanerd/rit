DIRS = $(wildcard */)
OUTPUT_DIRS = $(wildcard **/*output)

all:
	for dir in $(DIRS); do \
		cp makefile.template $(addprefix $$dir,/makefile); \
		make -C $$dir; \
	done

clean:
	@rm -rf $(OUTPUT_DIRS)
