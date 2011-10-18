// LessHub Main JavaScript file.

(function(undefined) {

	var root		= this,
		document	= root.document	|| {},
		$ 			= root.jQuery	|| {},
		// Create a variable shortcut to specify both single and double-clicks.
		// Use this when you don't want a double click to perform a click event twice on successive fast clicks.
		allclicks	= "click dblclick";

	if(typeof $ !== "function") {
		return false;
	}

	$(document).ready(function() {

		var overlay	= $("#overlay"),
			modal	= $("#modal");
		
		modal.bind(allclicks, function(event) {
			event.stopPropagation();
			event.preventDefault();
			return false;
		});

		/* *********************************************************************
		 * Body/Overlay Clicks - Closable Event Propagation.
		 * Instead of binding event after event to the body element, define all *closable* events in this single bind.
		 * If you do not want a click in a certain area to close any of these things, use event.stopPropagation();
		 */
		(function() {
			$("body, #overlay").bind(allclicks, function(event) {
				// First, hide the overlay.
				overlay.hide();
				// Drop-down topbar menu.
				$(".topbar li.dropdown.open").removeClass("open");
				modal.hide();
			});
			modal.find("a.close").bind(allclicks, function(event) {
				// Trigger the action of the overlay being clicked to remove all modals and overlays.
				overlay.trigger("click");
			});
		})();

		/* *********************************************************************
		 * Top navigation bar.
		 */
		(function() {
			// Prevent events from bubbling up to the body element if the click originated from with the menu area. This is to prevent a menu closing whilst interacting with it.
			var dropdownMenus = $(".topbar li.dropdown");
			dropdownMenus.bind(allclicks, function(event) {
				event.stopPropagation();
			});
			dropdownMenus.find("a.dropdown-toggle")
			// Toggle a menu when its handler is clicked on.
			$(".topbar li.dropdown a.dropdown-toggle").bind("click", function(event) {
				var li = $(this).parent(),
					hasMenu = !!li.find("ul li").length;
				// If the drop-down menu handler doesn't actually have a menu (or a menu with no menu items), don't bother with any of this, just let the browser use default behaviour.
				if(!hasMenu) {
					return true;
				}
				// If the menu is already open, close it, but let the user follow the link, should the handler have an associated URL.
				if(li.hasClass("open")) {
					li.removeClass("open");
					return true;
				}
				// If the menu isn't already open, open it and prevent any further action.
				else {
					// Close any menus that might already be open.
					overlay.trigger(allclicks);
					// Open the menu we want.
					li.addClass("open");
					event.preventDefault();
					return false;
				}
			});
		})();

	});

}).call(this);