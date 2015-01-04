# Groot: A basic theme for hologram.

**The theme is still a work in progress.**

> Groot is a basic theme for Trulia's [Hologram](https://github.com/trulia/hologram), the ruby front-end doc generator, and inspired by Yoga's [Cortana](https://github.com/Yago/Cortana).

Check the [Demo](http://jaceju.github.io/groot-example)

## Usage

To install the last version of **Hologram** (required) :

````
$ gem install hologram
````

To install **Groot**, use Bower :

````
$ bower install --save-dev Groot
````

Your `hologram_config.yml` should look like :

````
# Directory to parse
source: ./your-code

# Directory to build the styleguide
destination: ./styleguide

# Hologram theme
documentation_assets: ./bower_components/Groot
custom_markdown: ./bower_components/Groot/GrootMarkdownRenderer.rb

# To have a custom index page build with your README.md
index: README

# List all css to include for the styleguide render examples (path from styleguide directory)
css_include:
  - '../assets/css/vendors.css'
  - '../assets/css/styles.css'

# List all js to include for the styleguide render examples (path from styleguide directory)
js_include:
  - 'http://code.jquery.com/jquery-1.10.2.min.js'
  - '../assets/js/main.js'

# String who is used to split the category name and create category wrapper
name_scope: ' - '
````

We recomand to place a `README.md` in the root of your source directory to build a custom styleguide index page.

To have add a **custom category wrapper** like in the example, just add it before your category name with `space-space` and before all the other categories in the same wrapper. This `name_scope` can be change in the `hologram_config.yml`. You will have something like this :

````
/*doc
---
title: My Title
name: myname
category: General - Button
---

Some Markdown comment and markup...

*/
````

## Edition
To edit **Groot** you will need [Bower](bower.io),  [npm](https://www.npmjs.org) and [NodeJS](http://nodejs.org/)

To setup the project :

````
$ npm install
$ bower install
$ gulp
````

##Dependencies
* [jQuery](https://github.com/jquery/jquery)
