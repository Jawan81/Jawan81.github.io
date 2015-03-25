## Website Performance Optimization portfolio project

This is the solution of the Udacity Front-End Nanodegree course on Website Performance Optimization.

###Installation
===========

This site is accessible (and testable by PageSpeed) using the URL http://jawan81.github.io.

To run the site locally you either need to
- clone [this repository](https://github.com/Jawan81/Jawan81.github.io/) with Git:
```
git clone https://github.com/Jawan81/Jawan81.github.io.git .
```
- or download and unzip the [repository's archive file](https://github.com/Jawan81/Jawan81.github.io/archive/master.zip)

To run the website locally follow the instructions from the [original Udacity repository](https://github.com/udacity/frontend-nanodegree-mobile-portfolio):


1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights!


###Optimizations in views/main.js
===============

NOTE: The changes made to main.js are also explained in comments directly in the code starting with '// CHANGE: '.

####Scrolling optizations

To improve the framerate when the user scrolls up or down the following changes were made:

In the original main.js file the loop in the `updatePositions()` function looked like this:
```
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }
```

Through profiling the code execution it turned out that it is a very costly operation to call `document.body.scrollTop` for every item. As its value does not change during function execution it could be pulled out of the loop including the division by 1250:

```
  var scrollTop = document.body.scrollTop / 1250;

  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin(scrollTop + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }
```

This small change resulted in a massive improvment on the site's framerate during scrolling.

####Change Pizza Size optimizations

The performance of the 'change pizza size' operation suffered of similar problems. Calls to the DOM were made for every item in a loop although they did could be stored or calculated beforehand.

What also made a big difference was to calculate the new width for a pizza item only once as every pizza has the same size. Before it was recalculated for every pizza item.

Let's look at the changes made.

The `determineDx()` method changed from
```
  function determineDx (elem, size) {
    var oldwidth = elem.offsetWidth;
    var windowwidth = document.querySelector("#randomPizzas").offsetWidth;
    var oldsize = oldwidth / windowwidth;
    ...
```
to
```
  function determineDx (size, windowwidth, oldwidth) {
    var oldsize = oldwidth / windowwidth;
```

to avoid the access to the element and to values that were already known when calling the function.
This is actually a minor optimization as it turned out that the `determineDx()` function need to be called only once.

A massive > 100 times speed improvement was made by calculating the new width before iterating through all pizza items in `changePizzaItems()` instead of repeating it in the loop. Befor optimization the function looked like this:
```
  function changePizzaSizes(size) {
    for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
      var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
      var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
      document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
    }
  }
```
and after pulling out the newwidth calculation like this:
```
  function changePizzaSizes(size) {
    var windowwidth = document.querySelector("#randomPizzas").offsetWidth;
    var randomPizzaContainer = document.querySelectorAll(".randomPizzaContainer");
    var pizzaOldWidth = randomPizzaContainer[0].offsetWidth;
    var dx = determineDx(size, windowwidth, pizzaOldWidth);
    var newwidth = (pizzaOldWidth + dx) + 'px';

    for (var i = 0; i < randomPizzaContainer.length; i++) {
      randomPizzaContainer[i].style.width = newwidth;
    }
  }
```

As one can see what is left to be done in the loop is now minimal: Only the width is set for each pizza element. No `querySelector` accesses, no calculations are no function calls repeatedly executed in the loop.
