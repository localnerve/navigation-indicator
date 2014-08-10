# Navigation Indicator
> A reusable, resizable navigation indicator

## Overview
**This is a work-in-progress**

This is a navigation indicator mixin development project used to develop a an off canvas navigation indictor. Inspired by the wonderful [Stidges](http://codepen.io/stidges/pen/lvHjr) pen, this mixin is reusable and resizable to any container.

## Development
The default `grunt` command will run a development server with watch so you can navigate to `localhost:9000` and play with the code.

### Control Variables
The control variables, located in [sass/index.scss](https://github.com/localnerve/navigation-indicator/blob/master/sass/index.scss), allow you to adjust the mixin parameters.

#### Mixin Parameters
* $size - The width and height of the navigation indicator area.
* $color - `default: #fff` The color of the Hamburger and Arrow icon lines, as well as the circle fade animation.
* $line-width-perc - `default: 0.8333` The percentage \(as a decimal\) of the navigation indicator area used for the icon lines.

## Development Environment Dependencies
+ Ruby
  + Sass, Compass \(for math\)
+ Node
  + grunt-cli

## License
+ MIT