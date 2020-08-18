### Creator Functions

The library ships with two creator functions that return common `MarkdownSectionBuilder` configurations, without having to define your own `sectionBuilder`.  The two creator functions are `createSingleMarkdownSection` and `createMultipleMarkdownSection`.  The former is for creating a single section of the page using a single markdown file, and the latter is for creating a single section of the page using multiple markdown files.  The latter is useful for creating a grid appearance, with content from multiple markdown files side-by-side.  Both creator functions accept css property names to enable styling customization.  

**This page was built almost exclusively with these two creator functions.**

See more in the [API Documentation](docs/api).