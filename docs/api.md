---
title: API Docs
---
## Functions

<dl>
<dt><a href="#createMultipleMarkdownSection">createMultipleMarkdownSection(markdownFileSources, extras)</a> ⇒</dt>
<dd><p>Creates a section of a page from multiple markdown files, and adds the passed css selectors for inserting layout customization.</p>
<p>Example markdown source files:</p>
<pre class="prettyprint source lang-md"><code>// ./sourceDir/file1.md
# First Markdown Title Content
</code></pre>
<pre class="prettyprint source lang-md"><code>// ./sourceDir/file2.md
# Second Markdown Title Content
</code></pre>
<p>Example usage:</p>
<pre class="prettyprint source lang-typescript"><code>export const config: ScullyConfig = {
  // ...
  routes: {
    '/path': {
      type: MultiMarkdownPageBuilderPlugin,
      sectionBuilders: [
        createMultipleMarkdownSection(['./sourceDir/file1.md', './sourceDir/file2.md'], { containerDivId: 'gridContainer', elementsDivClass: 'grid-item' })
      ]
    }
  }
};
</code></pre>
<p>Example output:</p>
<pre class="prettyprint source lang-html"><code>&lt;div id=&quot;gridContainer&quot;>
 &lt;div id=&quot;element1&quot; class=&quot;grid-item&quot;>
     &lt;h1>First Markdown Title Content&lt;/h1>
 &lt;/div>
 &lt;div id=&quot;element2&quot; class=&quot;grid-item&quot;>
     &lt;h1>Second Markdown Title Content&lt;/h1>
 &lt;/div>
&lt;/div>
</code></pre></dd>
<dt><a href="#createSingleMarkdownSection">createSingleMarkdownSection(markdownFileSource, extras)</a> ⇒</dt>
<dd><p>Creates a section of a page from a single markdown file, and adds the passed css selectors for inserting layout customization.</p>
<p>Example markdown source file:</p>
<pre class="prettyprint source lang-md"><code># Markdown Title Content
</code></pre>
<p>Example usage:</p>
<pre class="prettyprint source lang-typescript"><code>export const config: ScullyConfig = {
  // ...
  routes: {
    '/path': {
      type: MultiMarkdownPageBuilderPlugin,
      sectionBuilders: [
        createSingleMarkdownSection('./homepage/installation.md', { containerDivId: 'installationContainer', elementDivId: 'installationItem' }),
      ]
    }
  }
};
</code></pre>
<p>Example output:</p>
<pre class="prettyprint source lang-html"><code>&lt;div id=&quot;installationContainer&quot;>
 &lt;div id=&quot;installationItem&quot;>
     &lt;h1>Markdown Title Content&lt;/h1>
 &lt;/div>
&lt;/div>
</code></pre></dd>
</dl>

<a name="createMultipleMarkdownSection"></a>

## createMultipleMarkdownSection(markdownFileSources, extras) ⇒
<p>Creates a section of a page from multiple markdown files, and adds the passed css selectors for inserting layout customization.</p>
<p>Example markdown source files:</p>
<pre class="prettyprint source lang-md"><code>// ./sourceDir/file1.md
# First Markdown Title Content
</code></pre>
<pre class="prettyprint source lang-md"><code>// ./sourceDir/file2.md
# Second Markdown Title Content
</code></pre>
<p>Example usage:</p>
<pre class="prettyprint source lang-typescript"><code>export const config: ScullyConfig = {
  // ...
  routes: {
    '/path': {
      type: MultiMarkdownPageBuilderPlugin,
      sectionBuilders: [
        createMultipleMarkdownSection(['./sourceDir/file1.md', './sourceDir/file2.md'], { containerDivId: 'gridContainer', elementsDivClass: 'grid-item' })
      ]
    }
  }
};
</code></pre>
<p>Example output:</p>
<pre class="prettyprint source lang-html"><code>&lt;div id=&quot;gridContainer&quot;>
 &lt;div id=&quot;element1&quot; class=&quot;grid-item&quot;>
     &lt;h1>First Markdown Title Content&lt;/h1>
 &lt;/div>
 &lt;div id=&quot;element2&quot; class=&quot;grid-item&quot;>
     &lt;h1>Second Markdown Title Content&lt;/h1>
 &lt;/div>
&lt;/div>
</code></pre>

**Kind**: global function  
**Returns**: <p>A <code>MarkdownSectionBuilder</code> that will be used by the plugin to create the single markdown section.</p>  

| Param | Type | Description |
| --- | --- | --- |
| markdownFileSources | <code>Array.&lt;string&gt;</code> | <p>source of the markdown files to be converted into HTML, then passed into the sectionBuilder</p> |
| extras | <code>SingleMarkdownSectionBuilderExtras</code> | <p>The <code>containerIdAttribute</code> will be attached as the <code>id</code> attribute value for the container div.  The <code>elementsDivClass</code> will be attached as the <code>class</code> attribute value for the interior element div.  Passing <code>null</code> for either will omit the selector.</p> |

<a name="createSingleMarkdownSection"></a>

## createSingleMarkdownSection(markdownFileSource, extras) ⇒
<p>Creates a section of a page from a single markdown file, and adds the passed css selectors for inserting layout customization.</p>
<p>Example markdown source file:</p>
<pre class="prettyprint source lang-md"><code># Markdown Title Content
</code></pre>
<p>Example usage:</p>
<pre class="prettyprint source lang-typescript"><code>export const config: ScullyConfig = {
  // ...
  routes: {
    '/path': {
      type: MultiMarkdownPageBuilderPlugin,
      sectionBuilders: [
        createSingleMarkdownSection('./homepage/installation.md', { containerDivId: 'installationContainer', elementDivId: 'installationItem' }),
      ]
    }
  }
};
</code></pre>
<p>Example output:</p>
<pre class="prettyprint source lang-html"><code>&lt;div id=&quot;installationContainer&quot;>
 &lt;div id=&quot;installationItem&quot;>
     &lt;h1>Markdown Title Content&lt;/h1>
 &lt;/div>
&lt;/div>
</code></pre>

**Kind**: global function  
**Returns**: <p>A <code>MarkdownSectionBuilder</code> that will be used by the plugin to create the single markdown section.</p>  

| Param | Type | Description |
| --- | --- | --- |
| markdownFileSource | <code>string</code> | <p>source of the markdown file to be converted into HTML, then passed into the sectionBuilder</p> |
| extras | <code>SingleMarkdownSectionBuilderExtras</code> | <p>The <code>containerIdAttribute</code> will be attached as the <code>id</code> attribute value for the container div.  The <code>elementIdAttribute</code> will be attached as the <code>id</code> attribute value for the interior element div.  Passing <code>null</code> for either will omit the selector.</p> |
