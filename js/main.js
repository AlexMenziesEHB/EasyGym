;(function () {

	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};



	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);
			
			return false;
		});
	
	};


	// Page Nav
	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-nav-toggle').removeClass('active');
		    }
			
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	


	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top animated slideInDown slideOutUp');
					}, 100 );
				}
			} 
			
		});
	};

	var navbar = function (a) {
		"use strict";
	
		function b(b) {
			var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
			return a(d)
		}
	
		function c(b) {
			return this.each(function () {
				var c = a(this),
					e = c.data("bs.collapse"),
					f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
				!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
			})
		}
		var d = function (b, c) {
			this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
		};
		d.VERSION = "3.3.5", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
			toggle: !0
		}, d.prototype.dimension = function () {
			var a = this.$element.hasClass("width");
			return a ? "width" : "height"
		}, d.prototype.show = function () {
			if (!this.transitioning && !this.$element.hasClass("in")) {
				var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
				if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
					var f = a.Event("show.bs.collapse");
					if (this.$element.trigger(f), !f.isDefaultPrevented()) {
						e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
						var g = this.dimension();
						this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
						var h = function () {
							this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
						};
						if (!a.support.transition) return h.call(this);
						var i = a.camelCase(["scroll", g].join("-"));
						this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
					}
				}
			}
		}, d.prototype.hide = function () {
			if (!this.transitioning && this.$element.hasClass("in")) {
				var b = a.Event("hide.bs.collapse");
				if (this.$element.trigger(b), !b.isDefaultPrevented()) {
					var c = this.dimension();
					this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
					var e = function () {
						this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
					};
					return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
				}
			}
		}, d.prototype.toggle = function () {
			this[this.$element.hasClass("in") ? "hide" : "show"]()
		}, d.prototype.getParent = function () {
			return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
				var e = a(d);
				this.addAriaAndCollapsedClass(b(e), e)
			}, this)).end()
		}, d.prototype.addAriaAndCollapsedClass = function (a, b) {
			var c = a.hasClass("in");
			a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
		};
		var e = a.fn.collapse;
		a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
			return a.fn.collapse = e, this
		}, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
			var e = a(this);
			e.attr("data-target") || d.preventDefault();
			var f = b(e),
				g = f.data("bs.collapse"),
				h = g ? "toggle" : e.data();
			c.call(f, h)
		})
	}(jQuery)

	// Document on load.
	$(function(){

		parallax();

		burgerMenu();

		clickMenu();

		windowScroll();

		navigationSection();

		goToTop();
		
		navbar()

	});


}());


