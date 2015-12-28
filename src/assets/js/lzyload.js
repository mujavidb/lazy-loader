// ADD:
// - make more efficient with fewer calls to event handler
// - implement things like srcset and picture for responsive images
// - add support for a loading images in case the image file isn’t fully downloaded when it enters the viewport
// - add success and failure handlers for the loading process could complete
// - make into a plugin, allow offset, wrapper changing
// - Allow to manually turn all src in container to data-src

// Set offset as any positive value, 0.5 represents 50% offset etc.
var offset = 0.5;

// If offset is less than 1
if (offset < 0) {
	offset = 0.5;
}

var images = document.querySelectorAll("#main img[data-src]");

function isInRange(el) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight * (1 + offset) || document.documentElement.clientHeight * (1 + offset)) &&
        rect.right <= (window.innerWidth * (1 + offset)  || document.documentElement.clientWidth * (1 + offset))
    );
}

function lazyLoadImages() {
	var item;
	// load images that have entered the viewport
	Array.prototype.forEach.call(images, function (item) {
		if (isInRange(item)) {
			item.setAttribute("src",item.getAttribute("data-src"));
			item.removeAttribute("data-src");
			images = document.querySelectorAll("#main img[data-src]");
			console.log("Bottom: " + item.getBoundingClientRect().bottom);
		}
	})
	// if all the images are loaded, stop calling the handler
	if (images.length == 0) {
		window.removeEventListener("DOMContentLoaded", lazyLoadImages);
		window.removeEventListener("load", lazyLoadImages);
		window.removeEventListener("resize", lazyLoadImages);
		window.removeEventListener("scroll", lazyLoadImages);
	}
}

//these handlers will be removed once the images have loaded
window.addEventListener("DOMContentLoaded", lazyLoadImages);
window.addEventListener("load", lazyLoadImages);
window.addEventListener("resize", lazyLoadImages);
window.addEventListener("scroll", lazyLoadImages);

