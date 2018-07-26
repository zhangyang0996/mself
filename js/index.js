/**
 * Swiper 3.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: December 13, 2016
 */
! function() {
	"use strict";

	function e(e) {
		e.fn.swiper = function(a) {
			var s;
			return e(this).each(function() {
				var e = new t(this, a);
				s || (s = e)
			}), s
		}
	}
	var a, t = function(e, i) {
		function r(e) {
			return Math.floor(e)
		}

		function n() {
			var e = b.params.autoplay,
				a = b.slides.eq(b.activeIndex);
			a.attr("data-swiper-autoplay") && (e = a.attr("data-swiper-autoplay") || b.params.autoplay), b.autoplayTimeoutId = setTimeout(function() {
				b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? i.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b))
			}, e)
		}

		function o(e, t) {
			var s = a(e.target);
			if(!s.is(t))
				if("string" == typeof t) s = s.parents(t);
				else if(t.nodeType) {
				var i;
				return s.parents().each(function(e, a) {
					a === t && (i = t)
				}), i ? t : void 0
			}
			if(0 !== s.length) return s[0]
		}

		function l(e, a) {
			a = a || {};
			var t = window.MutationObserver || window.WebkitMutationObserver,
				s = new t(function(e) {
					e.forEach(function(e) {
						b.onResize(!0), b.emit("onObserverUpdate", b, e)
					})
				});
			s.observe(e, {
				attributes: "undefined" == typeof a.attributes || a.attributes,
				childList: "undefined" == typeof a.childList || a.childList,
				characterData: "undefined" == typeof a.characterData || a.characterData
			}), b.observers.push(s)
		}

		function p(e) {
			e.originalEvent && (e = e.originalEvent);
			var a = e.keyCode || e.charCode;
			if(!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === a || !b.isHorizontal() && 40 === a)) return !1;
			if(!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === a || !b.isHorizontal() && 38 === a)) return !1;
			if(!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
				if(37 === a || 39 === a || 38 === a || 40 === a) {
					var t = !1;
					if(b.container.parents("." + b.params.slideClass).length > 0 && 0 === b.container.parents("." + b.params.slideActiveClass).length) return;
					var s = {
							left: window.pageXOffset,
							top: window.pageYOffset
						},
						i = window.innerWidth,
						r = window.innerHeight,
						n = b.container.offset();
					b.rtl && (n.left = n.left - b.container[0].scrollLeft);
					for(var o = [
							[n.left, n.top],
							[n.left + b.width, n.top],
							[n.left, n.top + b.height],
							[n.left + b.width, n.top + b.height]
						], l = 0; l < o.length; l++) {
						var p = o[l];
						p[0] >= s.left && p[0] <= s.left + i && p[1] >= s.top && p[1] <= s.top + r && (t = !0)
					}
					if(!t) return
				}
				b.isHorizontal() ? (37 !== a && 39 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !b.rtl || 37 === a && b.rtl) && b.slideNext(), (37 === a && !b.rtl || 39 === a && b.rtl) && b.slidePrev()) : (38 !== a && 40 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && b.slideNext(), 38 === a && b.slidePrev())
			}
		}

		function d() {
			var e = "onwheel",
				a = e in document;
			if(!a) {
				var t = document.createElement("div");
				t.setAttribute(e, "return;"), a = "function" == typeof t[e]
			}
			return !a && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0 && (a = document.implementation.hasFeature("Events.wheel", "3.0")), a
		}

		function u(e) {
			e.originalEvent && (e = e.originalEvent);
			var a = 0,
				t = b.rtl ? -1 : 1,
				s = c(e);
			if(b.params.mousewheelForceToAxis)
				if(b.isHorizontal()) {
					if(!(Math.abs(s.pixelX) > Math.abs(s.pixelY))) return;
					a = s.pixelX * t
				} else {
					if(!(Math.abs(s.pixelY) > Math.abs(s.pixelX))) return;
					a = s.pixelY
				}
			else a = Math.abs(s.pixelX) > Math.abs(s.pixelY) ? -s.pixelX * t : -s.pixelY;
			if(0 !== a) {
				if(b.params.mousewheelInvert && (a = -a), b.params.freeMode) {
					var i = b.getWrapperTranslate() + a * b.params.mousewheelSensitivity,
						r = b.isBeginning,
						n = b.isEnd;
					if(i >= b.minTranslate() && (i = b.minTranslate()), i <= b.maxTranslate() && (i = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(i), b.updateProgress(), b.updateActiveIndex(), (!r && b.isBeginning || !n && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function() {
							b.slideReset()
						}, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), b.emit("onScroll", b, e), b.params.autoplay && b.params.autoplayDisableOnInteraction && b.stopAutoplay(), 0 === i || i === b.maxTranslate()) return
				} else {
					if((new window.Date).getTime() - b.mousewheel.lastScrollTime > 60)
						if(a < 0)
							if(b.isEnd && !b.params.loop || b.animating) {
								if(b.params.mousewheelReleaseOnEdges) return !0
							} else b.slideNext(), b.emit("onScroll", b, e);
					else if(b.isBeginning && !b.params.loop || b.animating) {
						if(b.params.mousewheelReleaseOnEdges) return !0
					} else b.slidePrev(), b.emit("onScroll", b, e);
					b.mousewheel.lastScrollTime = (new window.Date).getTime()
				}
				return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
			}
		}

		function c(e) {
			var a = 10,
				t = 40,
				s = 800,
				i = 0,
				r = 0,
				n = 0,
				o = 0;
			return "detail" in e && (r = e.detail), "wheelDelta" in e && (r = -e.wheelDelta / 120), "wheelDeltaY" in e && (r = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (i = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (i = r, r = 0), n = i * a, o = r * a, "deltaY" in e && (o = e.deltaY), "deltaX" in e && (n = e.deltaX), (n || o) && e.deltaMode && (1 === e.deltaMode ? (n *= t, o *= t) : (n *= s, o *= s)), n && !i && (i = n < 1 ? -1 : 1), o && !r && (r = o < 1 ? -1 : 1), {
				spinX: i,
				spinY: r,
				pixelX: n,
				pixelY: o
			}
		}

		function m(e, t) {
			e = a(e);
			var s, i, r, n = b.rtl ? -1 : 1;
			s = e.attr("data-swiper-parallax") || "0", i = e.attr("data-swiper-parallax-x"), r = e.attr("data-swiper-parallax-y"), i || r ? (i = i || "0", r = r || "0") : b.isHorizontal() ? (i = s, r = "0") : (r = s, i = "0"), i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t * n + "%" : i * t * n + "px", r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t + "%" : r * t + "px", e.transform("translate3d(" + i + ", " + r + ",0px)")
		}

		function h(e) {
			return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
		}
		if(!(this instanceof t)) return new t(e, i);
		var g = {
				direction: "horizontal",
				touchEventsTarget: "container",
				initialSlide: 0,
				speed: 300,
				autoplay: !1,
				autoplayDisableOnInteraction: !0,
				autoplayStopOnLast: !1,
				iOSEdgeSwipeDetection: !1,
				iOSEdgeSwipeThreshold: 20,
				freeMode: !1,
				freeModeMomentum: !0,
				freeModeMomentumRatio: 1,
				freeModeMomentumBounce: !0,
				freeModeMomentumBounceRatio: 1,
				freeModeMomentumVelocityRatio: 1,
				freeModeSticky: !1,
				freeModeMinimumVelocity: .02,
				autoHeight: !1,
				setWrapperSize: !1,
				virtualTranslate: !1,
				effect: "slide",
				coverflow: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: !0
				},
				flip: {
					slideShadows: !0,
					limitRotation: !0
				},
				cube: {
					slideShadows: !0,
					shadow: !0,
					shadowOffset: 20,
					shadowScale: .94
				},
				fade: {
					crossFade: !1
				},
				parallax: !1,
				zoom: !1,
				zoomMax: 3,
				zoomMin: 1,
				zoomToggle: !0,
				scrollbar: null,
				scrollbarHide: !0,
				scrollbarDraggable: !1,
				scrollbarSnapOnRelease: !1,
				keyboardControl: !1,
				mousewheelControl: !1,
				mousewheelReleaseOnEdges: !1,
				mousewheelInvert: !1,
				mousewheelForceToAxis: !1,
				mousewheelSensitivity: 1,
				mousewheelEventsTarged: "container",
				hashnav: !1,
				hashnavWatchState: !1,
				history: !1,
				replaceState: !1,
				breakpoints: void 0,
				spaceBetween: 0,
				slidesPerView: 1,
				slidesPerColumn: 1,
				slidesPerColumnFill: "column",
				slidesPerGroup: 1,
				centeredSlides: !1,
				slidesOffsetBefore: 0,
				slidesOffsetAfter: 0,
				roundLengths: !1,
				touchRatio: 1,
				touchAngle: 45,
				simulateTouch: !0,
				shortSwipes: !0,
				longSwipes: !0,
				longSwipesRatio: .5,
				longSwipesMs: 300,
				followFinger: !0,
				onlyExternal: !1,
				threshold: 0,
				touchMoveStopPropagation: !0,
				touchReleaseOnEdges: !1,
				uniqueNavElements: !0,
				pagination: null,
				paginationElement: "span",
				paginationClickable: !1,
				paginationHide: !1,
				paginationBulletRender: null,
				paginationProgressRender: null,
				paginationFractionRender: null,
				paginationCustomRender: null,
				paginationType: "bullets",
				resistance: !0,
				resistanceRatio: .85,
				nextButton: null,
				prevButton: null,
				watchSlidesProgress: !1,
				watchSlidesVisibility: !1,
				grabCursor: !1,
				preventClicks: !0,
				preventClicksPropagation: !0,
				slideToClickedSlide: !1,
				lazyLoading: !1,
				lazyLoadingInPrevNext: !1,
				lazyLoadingInPrevNextAmount: 1,
				lazyLoadingOnTransitionStart: !1,
				preloadImages: !0,
				updateOnImagesReady: !0,
				loop: !1,
				loopAdditionalSlides: 0,
				loopedSlides: null,
				control: void 0,
				controlInverse: !1,
				controlBy: "slide",
				normalizeSlideIndex: !0,
				allowSwipeToPrev: !0,
				allowSwipeToNext: !0,
				swipeHandler: null,
				noSwiping: !0,
				noSwipingClass: "swiper-no-swiping",
				passiveListeners: !0,
				containerModifierClass: "swiper-container-",
				slideClass: "swiper-slide",
				slideActiveClass: "swiper-slide-active",
				slideDuplicateActiveClass: "swiper-slide-duplicate-active",
				slideVisibleClass: "swiper-slide-visible",
				slideDuplicateClass: "swiper-slide-duplicate",
				slideNextClass: "swiper-slide-next",
				slideDuplicateNextClass: "swiper-slide-duplicate-next",
				slidePrevClass: "swiper-slide-prev",
				slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
				wrapperClass: "swiper-wrapper",
				bulletClass: "swiper-pagination-bullet",
				bulletActiveClass: "swiper-pagination-bullet-active",
				buttonDisabledClass: "swiper-button-disabled",
				paginationCurrentClass: "swiper-pagination-current",
				paginationTotalClass: "swiper-pagination-total",
				paginationHiddenClass: "swiper-pagination-hidden",
				paginationProgressbarClass: "swiper-pagination-progressbar",
				paginationClickableClass: "swiper-pagination-clickable",
				paginationModifierClass: "swiper-pagination-",
				lazyLoadingClass: "swiper-lazy",
				lazyStatusLoadingClass: "swiper-lazy-loading",
				lazyStatusLoadedClass: "swiper-lazy-loaded",
				lazyPreloaderClass: "swiper-lazy-preloader",
				notificationClass: "swiper-notification",
				preloaderClass: "preloader",
				zoomContainerClass: "swiper-zoom-container",
				observer: !1,
				observeParents: !1,
				a11y: !1,
				prevSlideMessage: "Previous slide",
				nextSlideMessage: "Next slide",
				firstSlideMessage: "This is the first slide",
				lastSlideMessage: "This is the last slide",
				paginationBulletMessage: "Go to slide {{index}}",
				runCallbacksOnInit: !0
			},
			f = i && i.virtualTranslate;
		i = i || {};
		var v = {};
		for(var w in i)
			if("object" != typeof i[w] || null === i[w] || (i[w].nodeType || i[w] === window || i[w] === document || "undefined" != typeof s && i[w] instanceof s || "undefined" != typeof jQuery && i[w] instanceof jQuery)) v[w] = i[w];
			else {
				v[w] = {};
				for(var y in i[w]) v[w][y] = i[w][y]
			}
		for(var x in g)
			if("undefined" == typeof i[x]) i[x] = g[x];
			else if("object" == typeof i[x])
			for(var T in g[x]) "undefined" == typeof i[x][T] && (i[x][T] = g[x][T]);
		var b = this;
		if(b.params = i, b.originalParams = v, b.classNames = [], "undefined" != typeof a && "undefined" != typeof s && (a = s), ("undefined" != typeof a || (a = "undefined" == typeof s ? window.Dom7 || window.Zepto || window.jQuery : s)) && (b.$ = a, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function() {
				if(!b.params.breakpoints) return !1;
				var e, a = !1,
					t = [];
				for(e in b.params.breakpoints) b.params.breakpoints.hasOwnProperty(e) && t.push(e);
				t.sort(function(e, a) {
					return parseInt(e, 10) > parseInt(a, 10)
				});
				for(var s = 0; s < t.length; s++) e = t[s], e >= window.innerWidth && !a && (a = e);
				return a || "max"
			}, b.setBreakpoint = function() {
				var e = b.getActiveBreakpoint();
				if(e && b.currentBreakpoint !== e) {
					var a = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
						t = b.params.loop && a.slidesPerView !== b.params.slidesPerView;
					for(var s in a) b.params[s] = a[s];
					b.currentBreakpoint = e, t && b.destroyLoop && b.reLoop(!0)
				}
			}, b.params.breakpoints && b.setBreakpoint(), b.container = a(e), 0 !== b.container.length)) {
			if(b.container.length > 1) {
				var S = [];
				return b.container.each(function() {
					S.push(new t(this, i))
				}), S
			}
			b.container[0].swiper = b, b.container.data("swiper", b), b.classNames.push(b.params.containerModifierClass + b.params.direction), b.params.freeMode && b.classNames.push(b.params.containerModifierClass + "free-mode"), b.support.flexbox || (b.classNames.push(b.params.containerModifierClass + "no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push(b.params.containerModifierClass + "autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), b.params.touchReleaseOnEdges && (b.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(b.params.effect) >= 0 && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push(b.params.containerModifierClass + "3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push(b.params.containerModifierClass + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1), "fade" !== b.params.effect && "flip" !== b.params.effect || (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, "undefined" == typeof f && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = a(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && b.paginationContainer.length > 1 && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass(b.params.paginationModifierClass + "clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass(b.params.paginationModifierClass + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = a(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && b.nextButton.length > 1 && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = a(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && b.prevButton.length > 1 && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function() {
				return "horizontal" === b.params.direction
			}, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push(b.params.containerModifierClass + "rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), b.params.slidesPerColumn > 1 && b.classNames.push(b.params.containerModifierClass + "multirow"), b.device.android && b.classNames.push(b.params.containerModifierClass + "android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function() {
				b.params.allowSwipeToNext = !1, b.params.allowSwipeToPrev === !1 && b.params.grabCursor && b.unsetGrabCursor()
			}, b.lockSwipeToPrev = function() {
				b.params.allowSwipeToPrev = !1, b.params.allowSwipeToNext === !1 && b.params.grabCursor && b.unsetGrabCursor()
			}, b.lockSwipes = function() {
				b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1, b.params.grabCursor && b.unsetGrabCursor()
			}, b.unlockSwipeToNext = function() {
				b.params.allowSwipeToNext = !0, b.params.allowSwipeToPrev === !0 && b.params.grabCursor && b.setGrabCursor()
			}, b.unlockSwipeToPrev = function() {
				b.params.allowSwipeToPrev = !0, b.params.allowSwipeToNext === !0 && b.params.grabCursor && b.setGrabCursor()
			}, b.unlockSwipes = function() {
				b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0, b.params.grabCursor && b.setGrabCursor()
			}, b.setGrabCursor = function(e) {
				b.container[0].style.cursor = "move", b.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", b.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", b.container[0].style.cursor = e ? "grabbing" : "grab"
			}, b.unsetGrabCursor = function() {
				b.container[0].style.cursor = ""
			}, b.params.grabCursor && b.setGrabCursor(), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function(e, a, t, s, i, r) {
				function n() {
					r && r()
				}
				var o;
				e.complete && i ? n() : a ? (o = new window.Image, o.onload = n, o.onerror = n, s && (o.sizes = s), t && (o.srcset = t), a && (o.src = a)) : n()
			}, b.preloadImages = function() {
				function e() {
					"undefined" != typeof b && null !== b && b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)))
				}
				b.imagesToLoad = b.container.find("img");
				for(var a = 0; a < b.imagesToLoad.length; a++) b.loadImage(b.imagesToLoad[a], b.imagesToLoad[a].currentSrc || b.imagesToLoad[a].getAttribute("src"), b.imagesToLoad[a].srcset || b.imagesToLoad[a].getAttribute("srcset"), b.imagesToLoad[a].sizes || b.imagesToLoad[a].getAttribute("sizes"), !0, e)
			}, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function() {
				return "undefined" == typeof b.autoplayTimeoutId && (!!b.params.autoplay && (!b.autoplaying && (b.autoplaying = !0, b.emit("onAutoplayStart", b), void n())))
			}, b.stopAutoplay = function(e) {
				b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b))
			}, b.pauseAutoplay = function(e) {
				b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, n()) : b.wrapper.transitionEnd(function() {
					b && (b.autoplayPaused = !1, b.autoplaying ? n() : b.stopAutoplay())
				}))
			}, b.minTranslate = function() {
				return -b.snapGrid[0]
			}, b.maxTranslate = function() {
				return -b.snapGrid[b.snapGrid.length - 1]
			}, b.updateAutoHeight = function() {
				var e, a = [],
					t = 0;
				if("auto" !== b.params.slidesPerView && b.params.slidesPerView > 1)
					for(e = 0; e < Math.ceil(b.params.slidesPerView); e++) {
						var s = b.activeIndex + e;
						if(s > b.slides.length) break;
						a.push(b.slides.eq(s)[0])
					} else a.push(b.slides.eq(b.activeIndex)[0]);
				for(e = 0; e < a.length; e++)
					if("undefined" != typeof a[e]) {
						var i = a[e].offsetHeight;
						t = i > t ? i : t
					}
				t && b.wrapper.css("height", t + "px")
			}, b.updateContainerSize = function() {
				var e, a;
				e = "undefined" != typeof b.params.width ? b.params.width : b.container[0].clientWidth, a = "undefined" != typeof b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === a && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), a = a - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = a, b.size = b.isHorizontal() ? b.width : b.height)
			}, b.updateSlidesSize = function() {
				b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];
				var e, a = b.params.spaceBetween,
					t = -b.params.slidesOffsetBefore,
					s = 0,
					i = 0;
				if("undefined" != typeof b.size) {
					"string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * b.size), b.virtualSize = -a, b.rtl ? b.slides.css({
						marginLeft: "",
						marginTop: ""
					}) : b.slides.css({
						marginRight: "",
						marginBottom: ""
					});
					var n;
					b.params.slidesPerColumn > 1 && (n = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (n = Math.max(n, b.params.slidesPerView * b.params.slidesPerColumn)));
					var o, l = b.params.slidesPerColumn,
						p = n / l,
						d = p - (b.params.slidesPerColumn * p - b.slides.length);
					for(e = 0; e < b.slides.length; e++) {
						o = 0;
						var u = b.slides.eq(e);
						if(b.params.slidesPerColumn > 1) {
							var c, m, h;
							"column" === b.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > d || m === d && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * n / l, u.css({
								"-webkit-box-ordinal-group": c,
								"-moz-box-ordinal-group": c,
								"-ms-flex-order": c,
								"-webkit-order": c,
								order: c
							})) : (h = Math.floor(e / p), m = e - h * p), u.css("margin-" + (b.isHorizontal() ? "top" : "left"), 0 !== h && b.params.spaceBetween && b.params.spaceBetween + "px").attr("data-swiper-column", m).attr("data-swiper-row", h)
						}
						"none" !== u.css("display") && ("auto" === b.params.slidesPerView ? (o = b.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), b.params.roundLengths && (o = r(o))) : (o = (b.size - (b.params.slidesPerView - 1) * a) / b.params.slidesPerView, b.params.roundLengths && (o = r(o)), b.isHorizontal() ? b.slides[e].style.width = o + "px" : b.slides[e].style.height = o + "px"), b.slides[e].swiperSlideSize = o, b.slidesSizesGrid.push(o), b.params.centeredSlides ? (t = t + o / 2 + s / 2 + a, 0 === e && (t = t - b.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t)) : (i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t), t = t + o + a), b.virtualSize += o + a, s = o, i++)
					}
					b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;
					var g;
					if(b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({
							width: b.virtualSize + b.params.spaceBetween + "px"
						}), b.support.flexbox && !b.params.setWrapperSize || (b.isHorizontal() ? b.wrapper.css({
							width: b.virtualSize + b.params.spaceBetween + "px"
						}) : b.wrapper.css({
							height: b.virtualSize + b.params.spaceBetween + "px"
						})), b.params.slidesPerColumn > 1 && (b.virtualSize = (o + b.params.spaceBetween) * n, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.isHorizontal() ? b.wrapper.css({
							width: b.virtualSize + b.params.spaceBetween + "px"
						}) : b.wrapper.css({
							height: b.virtualSize + b.params.spaceBetween + "px"
						}), b.params.centeredSlides)) {
						for(g = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && g.push(b.snapGrid[e]);
						b.snapGrid = g
					}
					if(!b.params.centeredSlides) {
						for(g = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] <= b.virtualSize - b.size && g.push(b.snapGrid[e]);
						b.snapGrid = g, Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) > 1 && b.snapGrid.push(b.virtualSize - b.size)
					}
					0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({
						marginLeft: a + "px"
					}) : b.slides.css({
						marginRight: a + "px"
					}) : b.slides.css({
						marginBottom: a + "px"
					})), b.params.watchSlidesProgress && b.updateSlidesOffset()
				}
			}, b.updateSlidesOffset = function() {
				for(var e = 0; e < b.slides.length; e++) b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop
			}, b.currentSlidesPerView = function() {
				var e, a, t = 1;
				if(b.params.centeredSlides) {
					var s, i = b.slides[b.activeIndex].swiperSlideSize;
					for(e = b.activeIndex + 1; e < b.slides.length; e++) b.slides[e] && !s && (i += b.slides[e].swiperSlideSize, t++, i > b.size && (s = !0));
					for(a = b.activeIndex - 1; a >= 0; a--) b.slides[a] && !s && (i += b.slides[a].swiperSlideSize, t++, i > b.size && (s = !0))
				} else
					for(e = b.activeIndex + 1; e < b.slides.length; e++) b.slidesGrid[e] - b.slidesGrid[b.activeIndex] < b.size && t++;
				return t
			}, b.updateSlidesProgress = function(e) {
				if("undefined" == typeof e && (e = b.translate || 0), 0 !== b.slides.length) {
					"undefined" == typeof b.slides[0].swiperSlideOffset && b.updateSlidesOffset();
					var a = -e;
					b.rtl && (a = e), b.slides.removeClass(b.params.slideVisibleClass);
					for(var t = 0; t < b.slides.length; t++) {
						var s = b.slides[t],
							i = (a + (b.params.centeredSlides ? b.minTranslate() : 0) - s.swiperSlideOffset) / (s.swiperSlideSize + b.params.spaceBetween);
						if(b.params.watchSlidesVisibility) {
							var r = -(a - s.swiperSlideOffset),
								n = r + b.slidesSizesGrid[t],
								o = r >= 0 && r < b.size || n > 0 && n <= b.size || r <= 0 && n >= b.size;
							o && b.slides.eq(t).addClass(b.params.slideVisibleClass)
						}
						s.progress = b.rtl ? -i : i
					}
				}
			}, b.updateProgress = function(e) {
				"undefined" == typeof e && (e = b.translate || 0);
				var a = b.maxTranslate() - b.minTranslate(),
					t = b.isBeginning,
					s = b.isEnd;
				0 === a ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / a, b.isBeginning = b.progress <= 0, b.isEnd = b.progress >= 1), b.isBeginning && !t && b.emit("onReachBeginning", b), b.isEnd && !s && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress)
			}, b.updateActiveIndex = function() {
				var e, a, t, s = b.rtl ? b.translate : -b.translate;
				for(a = 0; a < b.slidesGrid.length; a++) "undefined" != typeof b.slidesGrid[a + 1] ? s >= b.slidesGrid[a] && s < b.slidesGrid[a + 1] - (b.slidesGrid[a + 1] - b.slidesGrid[a]) / 2 ? e = a : s >= b.slidesGrid[a] && s < b.slidesGrid[a + 1] && (e = a + 1) : s >= b.slidesGrid[a] && (e = a);
				b.params.normalizeSlideIndex && (e < 0 || "undefined" == typeof e) && (e = 0), t = Math.floor(e / b.params.slidesPerGroup), t >= b.snapGrid.length && (t = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = t, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses(), b.updateRealIndex())
			}, b.updateRealIndex = function() {
				b.realIndex = parseInt(b.slides.eq(b.activeIndex).attr("data-swiper-slide-index") || b.activeIndex, 10)
			}, b.updateClasses = function() {
				b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass + " " + b.params.slideDuplicateActiveClass + " " + b.params.slideDuplicateNextClass + " " + b.params.slideDuplicatePrevClass);
				var e = b.slides.eq(b.activeIndex);
				e.addClass(b.params.slideActiveClass), i.loop && (e.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + b.realIndex + '"]').addClass(b.params.slideDuplicateActiveClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + b.realIndex + '"]').addClass(b.params.slideDuplicateActiveClass));
				var t = e.next("." + b.params.slideClass).addClass(b.params.slideNextClass);
				b.params.loop && 0 === t.length && (t = b.slides.eq(0), t.addClass(b.params.slideNextClass));
				var s = e.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);
				if(b.params.loop && 0 === s.length && (s = b.slides.eq(-1), s.addClass(b.params.slidePrevClass)), i.loop && (t.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicateNextClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicateNextClass), s.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicatePrevClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicatePrevClass)), b.paginationContainer && b.paginationContainer.length > 0) {
					var r, n = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;
					if(b.params.loop ? (r = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup), r > b.slides.length - 1 - 2 * b.loopedSlides && (r -= b.slides.length - 2 * b.loopedSlides), r > n - 1 && (r -= n), r < 0 && "bullets" !== b.params.paginationType && (r = n + r)) : r = "undefined" != typeof b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && b.bullets.length > 0 && (b.bullets.removeClass(b.params.bulletActiveClass), b.paginationContainer.length > 1 ? b.bullets.each(function() {
							a(this).index() === r && a(this).addClass(b.params.bulletActiveClass)
						}) : b.bullets.eq(r).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(r + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(n)), "progress" === b.params.paginationType) {
						var o = (r + 1) / n,
							l = o,
							p = 1;
						b.isHorizontal() || (p = o, l = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + p + ")").transition(b.params.speed)
					}
					"custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, r + 1, n)), b.emit("onPaginationRendered", b, b.paginationContainer[0]))
				}
				b.params.loop || (b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))))
			}, b.updatePagination = function() {
				if(b.params.pagination && b.paginationContainer && b.paginationContainer.length > 0) {
					var e = "";
					if("bullets" === b.params.paginationType) {
						for(var a = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, t = 0; t < a; t++) e += b.params.paginationBulletRender ? b.params.paginationBulletRender(b, t, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
						b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination()
					}
					"fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0])
				}
			}, b.update = function(e) {
				function a() {
					b.rtl ? -b.translate : b.translate;
					s = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(s), b.updateActiveIndex(), b.updateClasses()
				}
				if(b)
					if(b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e) {
						var t, s;
						b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (a(), b.params.autoHeight && b.updateAutoHeight()) : (t = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0), t || a())
					} else b.params.autoHeight && b.updateAutoHeight()
			}, b.onResize = function(e) {
				b.params.breakpoints && b.setBreakpoint();
				var a = b.params.allowSwipeToPrev,
					t = b.params.allowSwipeToNext;
				b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);
				var s = !1;
				if(b.params.freeMode) {
					var i = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
					b.setWrapperTranslate(i), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight()
				} else b.updateClasses(), s = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);
				b.params.lazyLoading && !s && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = a, b.params.allowSwipeToNext = t
			}, b.touchEventsDesktop = {
				start: "mousedown",
				move: "mousemove",
				end: "mouseup"
			}, window.navigator.pointerEnabled ? b.touchEventsDesktop = {
				start: "pointerdown",
				move: "pointermove",
				end: "pointerup"
			} : window.navigator.msPointerEnabled && (b.touchEventsDesktop = {
				start: "MSPointerDown",
				move: "MSPointerMove",
				end: "MSPointerUp"
			}), b.touchEvents = {
				start: b.support.touch || !b.params.simulateTouch ? "touchstart" : b.touchEventsDesktop.start,
				move: b.support.touch || !b.params.simulateTouch ? "touchmove" : b.touchEventsDesktop.move,
				end: b.support.touch || !b.params.simulateTouch ? "touchend" : b.touchEventsDesktop.end
			}, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function(e) {
				var a = e ? "off" : "on",
					t = e ? "removeEventListener" : "addEventListener",
					s = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
					r = b.support.touch ? s : document,
					n = !!b.params.nested;
				if(b.browser.ie) s[t](b.touchEvents.start, b.onTouchStart, !1), r[t](b.touchEvents.move, b.onTouchMove, n), r[t](b.touchEvents.end, b.onTouchEnd, !1);
				else {
					if(b.support.touch) {
						var o = !("touchstart" !== b.touchEvents.start || !b.support.passiveListener || !b.params.passiveListeners) && {
							passive: !0,
							capture: !1
						};
						s[t](b.touchEvents.start, b.onTouchStart, o), s[t](b.touchEvents.move, b.onTouchMove, n), s[t](b.touchEvents.end, b.onTouchEnd, o)
					}(i.simulateTouch && !b.device.ios && !b.device.android || i.simulateTouch && !b.support.touch && b.device.ios) && (s[t]("mousedown", b.onTouchStart, !1), document[t]("mousemove", b.onTouchMove, n), document[t]("mouseup", b.onTouchEnd, !1))
				}
				window[t]("resize", b.onResize), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.nextButton[a]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[a]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.prevButton[a]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[a]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[a]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[a]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && s[t]("click", b.preventClicks, !0);
			}, b.attachEvents = function() {
				b.initEvents()
			}, b.detachEvents = function() {
				b.initEvents(!0)
			}, b.allowClick = !0, b.preventClicks = function(e) {
				b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
			}, b.onClickNext = function(e) {
				e.preventDefault(), b.isEnd && !b.params.loop || b.slideNext()
			}, b.onClickPrev = function(e) {
				e.preventDefault(), b.isBeginning && !b.params.loop || b.slidePrev()
			}, b.onClickIndex = function(e) {
				e.preventDefault();
				var t = a(this).index() * b.params.slidesPerGroup;
				b.params.loop && (t += b.loopedSlides), b.slideTo(t)
			}, b.updateClickedSlide = function(e) {
				var t = o(e, "." + b.params.slideClass),
					s = !1;
				if(t)
					for(var i = 0; i < b.slides.length; i++) b.slides[i] === t && (s = !0);
				if(!t || !s) return b.clickedSlide = void 0, void(b.clickedIndex = void 0);
				if(b.clickedSlide = t, b.clickedIndex = a(t).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
					var r, n = b.clickedIndex,
						l = "auto" === b.params.slidesPerView ? b.currentSlidesPerView() : b.params.slidesPerView;
					if(b.params.loop) {
						if(b.animating) return;
						r = parseInt(a(b.clickedSlide).attr("data-swiper-slide-index"), 10), b.params.centeredSlides ? n < b.loopedSlides - l / 2 || n > b.slides.length - b.loopedSlides + l / 2 ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + r + '"]:not(.' + b.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
							b.slideTo(n)
						}, 0)) : b.slideTo(n) : n > b.slides.length - l ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + r + '"]:not(.' + b.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
							b.slideTo(n)
						}, 0)) : b.slideTo(n)
					} else b.slideTo(n)
				}
			};
			var C, z, M, E, P, I, k, L, D, B, H = "input, select, textarea, button, video",
				G = Date.now(),
				X = [];
			b.animating = !1, b.touches = {
				startX: 0,
				startY: 0,
				currentX: 0,
				currentY: 0,
				diff: 0
			};
			var Y, A;
			b.onTouchStart = function(e) {
				if(e.originalEvent && (e = e.originalEvent), Y = "touchstart" === e.type, Y || !("which" in e) || 3 !== e.which) {
					if(b.params.noSwiping && o(e, "." + b.params.noSwipingClass)) return void(b.allowClick = !0);
					if(!b.params.swipeHandler || o(e, b.params.swipeHandler)) {
						var t = b.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
							s = b.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
						if(!(b.device.ios && b.params.iOSEdgeSwipeDetection && t <= b.params.iOSEdgeSwipeThreshold)) {
							if(C = !0, z = !1, M = !0, P = void 0, A = void 0, b.touches.startX = t, b.touches.startY = s, E = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, b.params.threshold > 0 && (L = !1), "touchstart" !== e.type) {
								var i = !0;
								a(e.target).is(H) && (i = !1), document.activeElement && a(document.activeElement).is(H) && document.activeElement.blur(), i && e.preventDefault()
							}
							b.emit("onTouchStart", b, e)
						}
					}
				}
			}, b.onTouchMove = function(e) {
				if(e.originalEvent && (e = e.originalEvent), !Y || "mousemove" !== e.type) {
					if(e.preventedByNestedSwiper) return b.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(b.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
					if(b.params.onlyExternal) return b.allowClick = !1, void(C && (b.touches.startX = b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.startY = b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, E = Date.now()));
					if(Y && b.params.touchReleaseOnEdges && !b.params.loop)
						if(b.isHorizontal()) {
							if(b.touches.currentX < b.touches.startX && b.translate <= b.maxTranslate() || b.touches.currentX > b.touches.startX && b.translate >= b.minTranslate()) return
						} else if(b.touches.currentY < b.touches.startY && b.translate <= b.maxTranslate() || b.touches.currentY > b.touches.startY && b.translate >= b.minTranslate()) return;
					if(Y && document.activeElement && e.target === document.activeElement && a(e.target).is(H)) return z = !0, void(b.allowClick = !1);
					if(M && b.emit("onTouchMove", b, e), !(e.targetTouches && e.targetTouches.length > 1)) {
						if(b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof P) {
							var t;
							b.isHorizontal() && b.touches.currentY === b.touches.startY || !b.isHorizontal() && b.touches.currentX === b.touches.startX ? P = !1 : (t = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI, P = b.isHorizontal() ? t > b.params.touchAngle : 90 - t > b.params.touchAngle)
						}
						if(P && b.emit("onTouchMoveOpposite", b, e), "undefined" == typeof A && b.browser.ieTouch && (b.touches.currentX === b.touches.startX && b.touches.currentY === b.touches.startY || (A = !0)), C) {
							if(P) return void(C = !1);
							if(A || !b.browser.ieTouch) {
								b.allowClick = !1, b.emit("onSliderMove", b, e), e.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && e.stopPropagation(), z || (i.loop && b.fixLoop(), k = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), B = !1, !b.params.grabCursor || b.params.allowSwipeToNext !== !0 && b.params.allowSwipeToPrev !== !0 || b.setGrabCursor(!0)), z = !0;
								var s = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
								s *= b.params.touchRatio, b.rtl && (s = -s), b.swipeDirection = s > 0 ? "prev" : "next", I = s + k;
								var r = !0;
								if(s > 0 && I > b.minTranslate() ? (r = !1, b.params.resistance && (I = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + k + s, b.params.resistanceRatio))) : s < 0 && I < b.maxTranslate() && (r = !1, b.params.resistance && (I = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - k - s, b.params.resistanceRatio))), r && (e.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && I < k && (I = k), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && I > k && (I = k), b.params.threshold > 0) {
									if(!(Math.abs(s) > b.params.threshold || L)) return void(I = k);
									if(!L) return L = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, I = k, void(b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY)
								}
								b.params.followFinger && ((b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === X.length && X.push({
									position: b.touches[b.isHorizontal() ? "startX" : "startY"],
									time: E
								}), X.push({
									position: b.touches[b.isHorizontal() ? "currentX" : "currentY"],
									time: (new window.Date).getTime()
								})), b.updateProgress(I), b.setWrapperTranslate(I))
							}
						}
					}
				}
			}, b.onTouchEnd = function(e) {
				if(e.originalEvent && (e = e.originalEvent), M && b.emit("onTouchEnd", b, e), M = !1, C) {
					b.params.grabCursor && z && C && (b.params.allowSwipeToNext === !0 || b.params.allowSwipeToPrev === !0) && b.setGrabCursor(!1);
					var t = Date.now(),
						s = t - E;
					if(b.allowClick && (b.updateClickedSlide(e), b.emit("onTap", b, e), s < 300 && t - G > 300 && (D && clearTimeout(D), D = setTimeout(function() {
							b && (b.params.paginationHide && b.paginationContainer.length > 0 && !a(e.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, e))
						}, 300)), s < 300 && t - G < 300 && (D && clearTimeout(D), b.emit("onDoubleTap", b, e))), G = Date.now(), setTimeout(function() {
							b && (b.allowClick = !0)
						}, 0), !C || !z || !b.swipeDirection || 0 === b.touches.diff || I === k) return void(C = z = !1);
					C = z = !1;
					var i;
					if(i = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -I, b.params.freeMode) {
						if(i < -b.minTranslate()) return void b.slideTo(b.activeIndex);
						if(i > -b.maxTranslate()) return void(b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));
						if(b.params.freeModeMomentum) {
							if(X.length > 1) {
								var r = X.pop(),
									n = X.pop(),
									o = r.position - n.position,
									l = r.time - n.time;
								b.velocity = o / l, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (l > 150 || (new window.Date).getTime() - r.time > 300) && (b.velocity = 0)
							} else b.velocity = 0;
							b.velocity = b.velocity * b.params.freeModeMomentumVelocityRatio, X.length = 0;
							var p = 1e3 * b.params.freeModeMomentumRatio,
								d = b.velocity * p,
								u = b.translate + d;
							b.rtl && (u = -u);
							var c, m = !1,
								h = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;
							if(u < b.maxTranslate()) b.params.freeModeMomentumBounce ? (u + b.maxTranslate() < -h && (u = b.maxTranslate() - h), c = b.maxTranslate(), m = !0, B = !0) : u = b.maxTranslate();
							else if(u > b.minTranslate()) b.params.freeModeMomentumBounce ? (u - b.minTranslate() > h && (u = b.minTranslate() + h), c = b.minTranslate(), m = !0, B = !0) : u = b.minTranslate();
							else if(b.params.freeModeSticky) {
								var g, f = 0;
								for(f = 0; f < b.snapGrid.length; f += 1)
									if(b.snapGrid[f] > -u) {
										g = f;
										break
									}
								u = Math.abs(b.snapGrid[g] - u) < Math.abs(b.snapGrid[g - 1] - u) || "next" === b.swipeDirection ? b.snapGrid[g] : b.snapGrid[g - 1], b.rtl || (u = -u)
							}
							if(0 !== b.velocity) p = b.rtl ? Math.abs((-u - b.translate) / b.velocity) : Math.abs((u - b.translate) / b.velocity);
							else if(b.params.freeModeSticky) return void b.slideReset();
							b.params.freeModeMomentumBounce && m ? (b.updateProgress(c), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function() {
								b && B && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(c), b.wrapper.transitionEnd(function() {
									b && b.onTransitionEnd()
								}))
							})) : b.velocity ? (b.updateProgress(u), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function() {
								b && b.onTransitionEnd()
							}))) : b.updateProgress(u), b.updateActiveIndex()
						}
						return void((!b.params.freeModeMomentum || s >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()))
					}
					var v, w = 0,
						y = b.slidesSizesGrid[0];
					for(v = 0; v < b.slidesGrid.length; v += b.params.slidesPerGroup) "undefined" != typeof b.slidesGrid[v + b.params.slidesPerGroup] ? i >= b.slidesGrid[v] && i < b.slidesGrid[v + b.params.slidesPerGroup] && (w = v, y = b.slidesGrid[v + b.params.slidesPerGroup] - b.slidesGrid[v]) : i >= b.slidesGrid[v] && (w = v, y = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
					var x = (i - b.slidesGrid[w]) / y;
					if(s > b.params.longSwipesMs) {
						if(!b.params.longSwipes) return void b.slideTo(b.activeIndex);
						"next" === b.swipeDirection && (x >= b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w)), "prev" === b.swipeDirection && (x > 1 - b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w))
					} else {
						if(!b.params.shortSwipes) return void b.slideTo(b.activeIndex);
						"next" === b.swipeDirection && b.slideTo(w + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(w)
					}
				}
			}, b._slideTo = function(e, a) {
				return b.slideTo(e, a, !0, !0)
			}, b.slideTo = function(e, a, t, s) {
				"undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), e < 0 && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);
				var i = -b.snapGrid[b.snapIndex];
				if(b.params.autoplay && b.autoplaying && (s || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(a) : b.stopAutoplay()), b.updateProgress(i), b.params.normalizeSlideIndex)
					for(var r = 0; r < b.slidesGrid.length; r++) - Math.floor(100 * i) >= Math.floor(100 * b.slidesGrid[r]) && (e = r);
				return !(!b.params.allowSwipeToNext && i < b.translate && i < b.minTranslate()) && (!(!b.params.allowSwipeToPrev && i > b.translate && i > b.maxTranslate() && (b.activeIndex || 0) !== e) && ("undefined" == typeof a && (a = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.updateRealIndex(), b.rtl && -i === b.translate || !b.rtl && i === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(i), !1) : (b.updateClasses(), b.onTransitionStart(t), 0 === a || b.browser.lteIE9 ? (b.setWrapperTranslate(i), b.setWrapperTransition(0), b.onTransitionEnd(t)) : (b.setWrapperTranslate(i), b.setWrapperTransition(a), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function() {
					b && b.onTransitionEnd(t)
				}))), !0)))
			}, b.onTransitionStart = function(e) {
				"undefined" == typeof e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)))
			}, b.onTransitionEnd = function(e) {
				b.animating = !1, b.setWrapperTransition(0), "undefined" == typeof e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.history && b.history && b.history.setHistory(b.params.history, b.activeIndex), b.params.hashnav && b.hashnav && b.hashnav.setHash()
			}, b.slideNext = function(e, a, t) {
				if(b.params.loop) {
					if(b.animating) return !1;
					b.fixLoop();
					b.container[0].clientLeft;
					return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t)
				}
				return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t)
			}, b._slideNext = function(e) {
				return b.slideNext(!0, e, !0)
			}, b.slidePrev = function(e, a, t) {
				if(b.params.loop) {
					if(b.animating) return !1;
					b.fixLoop();
					b.container[0].clientLeft;
					return b.slideTo(b.activeIndex - 1, a, e, t)
				}
				return b.slideTo(b.activeIndex - 1, a, e, t)
			}, b._slidePrev = function(e) {
				return b.slidePrev(!0, e, !0)
			}, b.slideReset = function(e, a, t) {
				return b.slideTo(b.activeIndex, a, e)
			}, b.disableTouchControl = function() {
				return b.params.onlyExternal = !0, !0
			}, b.enableTouchControl = function() {
				return b.params.onlyExternal = !1, !0
			}, b.setWrapperTransition = function(e, a) {
				b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, a), b.emit("onSetTransition", b, e)
			}, b.setWrapperTranslate = function(e, a, t) {
				var s = 0,
					i = 0,
					n = 0;
				b.isHorizontal() ? s = b.rtl ? -e : e : i = e, b.params.roundLengths && (s = r(s), i = r(i)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + s + "px, " + i + "px, " + n + "px)") : b.wrapper.transform("translate(" + s + "px, " + i + "px)")), b.translate = b.isHorizontal() ? s : i;
				var o, l = b.maxTranslate() - b.minTranslate();
				o = 0 === l ? 0 : (e - b.minTranslate()) / l, o !== b.progress && b.updateProgress(e), a && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, t), b.emit("onSetTranslate", b, b.translate)
			}, b.getTranslate = function(e, a) {
				var t, s, i, r;
				return "undefined" == typeof a && (a = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (i = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (s = i.transform || i.webkitTransform, s.split(",").length > 6 && (s = s.split(", ").map(function(e) {
					return e.replace(",", ".")
				}).join(", ")), r = new window.WebKitCSSMatrix("none" === s ? "" : s)) : (r = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = r.toString().split(",")), "x" === a && (s = window.WebKitCSSMatrix ? r.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (s = window.WebKitCSSMatrix ? r.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), b.rtl && s && (s = -s), s || 0)
			}, b.getWrapperTranslate = function(e) {
				return "undefined" == typeof e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e)
			}, b.observers = [], b.initObservers = function() {
				if(b.params.observeParents)
					for(var e = b.container.parents(), a = 0; a < e.length; a++) l(e[a]);
				l(b.container[0], {
					childList: !1
				}), l(b.wrapper[0], {
					attributes: !1
				})
			}, b.disconnectObservers = function() {
				for(var e = 0; e < b.observers.length; e++) b.observers[e].disconnect();
				b.observers = []
			}, b.createLoop = function() {
				b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
				var e = b.wrapper.children("." + b.params.slideClass);
				"auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = e.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > e.length && (b.loopedSlides = e.length);
				var t, s = [],
					i = [];
				for(e.each(function(t, r) {
						var n = a(this);
						t < b.loopedSlides && i.push(r), t < e.length && t >= e.length - b.loopedSlides && s.push(r), n.attr("data-swiper-slide-index", t)
					}), t = 0; t < i.length; t++) b.wrapper.append(a(i[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
				for(t = s.length - 1; t >= 0; t--) b.wrapper.prepend(a(s[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass))
			}, b.destroyLoop = function() {
				b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index")
			}, b.reLoop = function(e) {
				var a = b.activeIndex - b.loopedSlides;
				b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(a + b.loopedSlides, 0, !1)
			}, b.fixLoop = function() {
				var e;
				b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0))
			}, b.appendSlide = function(e) {
				if(b.params.loop && b.destroyLoop(), "object" == typeof e && e.length)
					for(var a = 0; a < e.length; a++) e[a] && b.wrapper.append(e[a]);
				else b.wrapper.append(e);
				b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0)
			}, b.prependSlide = function(e) {
				b.params.loop && b.destroyLoop();
				var a = b.activeIndex + 1;
				if("object" == typeof e && e.length) {
					for(var t = 0; t < e.length; t++) e[t] && b.wrapper.prepend(e[t]);
					a = b.activeIndex + e.length
				} else b.wrapper.prepend(e);
				b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(a, 0, !1)
			}, b.removeSlide = function(e) {
				b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));
				var a, t = b.activeIndex;
				if("object" == typeof e && e.length) {
					for(var s = 0; s < e.length; s++) a = e[s], b.slides[a] && b.slides.eq(a).remove(), a < t && t--;
					t = Math.max(t, 0)
				} else a = e, b.slides[a] && b.slides.eq(a).remove(), a < t && t--, t = Math.max(t, 0);
				b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(t + b.loopedSlides, 0, !1) : b.slideTo(t, 0, !1)
			}, b.removeAllSlides = function() {
				for(var e = [], a = 0; a < b.slides.length; a++) e.push(a);
				b.removeSlide(e)
			}, b.effects = {
				fade: {
					setTranslate: function() {
						for(var e = 0; e < b.slides.length; e++) {
							var a = b.slides.eq(e),
								t = a[0].swiperSlideOffset,
								s = -t;
							b.params.virtualTranslate || (s -= b.translate);
							var i = 0;
							b.isHorizontal() || (i = s, s = 0);
							var r = b.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
							a.css({
								opacity: r
							}).transform("translate3d(" + s + "px, " + i + "px, 0px)")
						}
					},
					setTransition: function(e) {
						if(b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
							var a = !1;
							b.slides.transitionEnd(function() {
								if(!a && b) {
									a = !0, b.animating = !1;
									for(var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) b.wrapper.trigger(e[t])
								}
							})
						}
					}
				},
				flip: {
					setTranslate: function() {
						for(var e = 0; e < b.slides.length; e++) {
							var t = b.slides.eq(e),
								s = t[0].progress;
							b.params.flip.limitRotation && (s = Math.max(Math.min(t[0].progress, 1), -1));
							var i = t[0].swiperSlideOffset,
								r = -180 * s,
								n = r,
								o = 0,
								l = -i,
								p = 0;
							if(b.isHorizontal() ? b.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(s)) + b.slides.length, b.params.flip.slideShadows) {
								var d = b.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
									u = b.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
								0 === d.length && (d = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-s, 0)), u.length && (u[0].style.opacity = Math.max(s, 0))
							}
							t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
						}
					},
					setTransition: function(e) {
						if(b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.virtualTranslate && 0 !== e) {
							var t = !1;
							b.slides.eq(b.activeIndex).transitionEnd(function() {
								if(!t && b && a(this).hasClass(b.params.slideActiveClass)) {
									t = !0, b.animating = !1;
									for(var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], s = 0; s < e.length; s++) b.wrapper.trigger(e[s])
								}
							})
						}
					}
				},
				cube: {
					setTranslate: function() {
						var e, t = 0;
						b.params.cube.shadow && (b.isHorizontal() ? (e = b.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(e)), e.css({
							height: b.width + "px"
						})) : (e = b.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.container.append(e))));
						for(var s = 0; s < b.slides.length; s++) {
							var i = b.slides.eq(s),
								r = 90 * s,
								n = Math.floor(r / 360);
							b.rtl && (r = -r, n = Math.floor(-r / 360));
							var o = Math.max(Math.min(i[0].progress, 1), -1),
								l = 0,
								p = 0,
								d = 0;
							s % 4 === 0 ? (l = 4 * -n * b.size, d = 0) : (s - 1) % 4 === 0 ? (l = 0, d = 4 * -n * b.size) : (s - 2) % 4 === 0 ? (l = b.size + 4 * n * b.size, d = b.size) : (s - 3) % 4 === 0 && (l = -b.size, d = 3 * b.size + 4 * b.size * n), b.rtl && (l = -l), b.isHorizontal() || (p = l, l = 0);
							var u = "rotateX(" + (b.isHorizontal() ? 0 : -r) + "deg) rotateY(" + (b.isHorizontal() ? r : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
							if(o <= 1 && o > -1 && (t = 90 * s + 90 * o, b.rtl && (t = 90 * -s - 90 * o)), i.transform(u), b.params.cube.slideShadows) {
								var c = b.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
									m = b.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
								0 === c.length && (c = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), i.append(c)), 0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0))
							}
						}
						if(b.wrapper.css({
								"-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px",
								"-moz-transform-origin": "50% 50% -" + b.size / 2 + "px",
								"-ms-transform-origin": "50% 50% -" + b.size / 2 + "px",
								"transform-origin": "50% 50% -" + b.size / 2 + "px"
							}), b.params.cube.shadow)
							if(b.isHorizontal()) e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")");
							else {
								var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
									g = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
									f = b.params.cube.shadowScale,
									v = b.params.cube.shadowScale / g,
									w = b.params.cube.shadowOffset;
								e.transform("scale3d(" + f + ", 1, " + v + ") translate3d(0px, " + (b.height / 2 + w) + "px, " + -b.height / 2 / v + "px) rotateX(-90deg)")
							}
						var y = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;
						b.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (b.isHorizontal() ? 0 : t) + "deg) rotateY(" + (b.isHorizontal() ? -t : 0) + "deg)")
					},
					setTransition: function(e) {
						b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e)
					}
				},
				coverflow: {
					setTranslate: function() {
						for(var e = b.translate, t = b.isHorizontal() ? -e + b.width / 2 : -e + b.height / 2, s = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, i = b.params.coverflow.depth, r = 0, n = b.slides.length; r < n; r++) {
							var o = b.slides.eq(r),
								l = b.slidesSizesGrid[r],
								p = o[0].swiperSlideOffset,
								d = (t - p - l / 2) / l * b.params.coverflow.modifier,
								u = b.isHorizontal() ? s * d : 0,
								c = b.isHorizontal() ? 0 : s * d,
								m = -i * Math.abs(d),
								h = b.isHorizontal() ? 0 : b.params.coverflow.stretch * d,
								g = b.isHorizontal() ? b.params.coverflow.stretch * d : 0;
							Math.abs(g) < .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);
							var f = "translate3d(" + g + "px," + h + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";
							if(o.transform(f), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, b.params.coverflow.slideShadows) {
								var v = b.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
									w = b.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
								0 === v.length && (v = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0)
							}
						}
						if(b.browser.ie) {
							var y = b.wrapper[0].style;
							y.perspectiveOrigin = t + "px 50%"
						}
					},
					setTransition: function(e) {
						b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
					}
				}
			}, b.lazy = {
				initialImageLoaded: !1,
				loadImageInSlide: function(e, t) {
					if("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== b.slides.length)) {
						var s = b.slides.eq(e),
							i = s.find("." + b.params.lazyLoadingClass + ":not(." + b.params.lazyStatusLoadedClass + "):not(." + b.params.lazyStatusLoadingClass + ")");
						!s.hasClass(b.params.lazyLoadingClass) || s.hasClass(b.params.lazyStatusLoadedClass) || s.hasClass(b.params.lazyStatusLoadingClass) || (i = i.add(s[0])), 0 !== i.length && i.each(function() {
							var e = a(this);
							e.addClass(b.params.lazyStatusLoadingClass);
							var i = e.attr("data-background"),
								r = e.attr("data-src"),
								n = e.attr("data-srcset"),
								o = e.attr("data-sizes");
							b.loadImage(e[0], r || i, n, o, !1, function() {
								if(i ? (e.css("background-image", 'url("' + i + '")'), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")), o && (e.attr("sizes", o), e.removeAttr("data-sizes")), r && (e.attr("src", r), e.removeAttr("data-src"))), e.addClass(b.params.lazyStatusLoadedClass).removeClass(b.params.lazyStatusLoadingClass), s.find("." + b.params.lazyPreloaderClass + ", ." + b.params.preloaderClass).remove(), b.params.loop && t) {
									var a = s.attr("data-swiper-slide-index");
									if(s.hasClass(b.params.slideDuplicateClass)) {
										var l = b.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + b.params.slideDuplicateClass + ")");
										b.lazy.loadImageInSlide(l.index(), !1)
									} else {
										var p = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');
										b.lazy.loadImageInSlide(p.index(), !1)
									}
								}
								b.emit("onLazyImageReady", b, s[0], e[0])
							}), b.emit("onLazyImageLoad", b, s[0], e[0])
						})
					}
				},
				load: function() {
					var e, t = b.params.slidesPerView;
					if("auto" === t && (t = 0), b.lazy.initialImageLoaded || (b.lazy.initialImageLoaded = !0), b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function() {
						b.lazy.loadImageInSlide(a(this).index())
					});
					else if(t > 1)
						for(e = b.activeIndex; e < b.activeIndex + t; e++) b.slides[e] && b.lazy.loadImageInSlide(e);
					else b.lazy.loadImageInSlide(b.activeIndex);
					if(b.params.lazyLoadingInPrevNext)
						if(t > 1 || b.params.lazyLoadingInPrevNextAmount && b.params.lazyLoadingInPrevNextAmount > 1) {
							var s = b.params.lazyLoadingInPrevNextAmount,
								i = t,
								r = Math.min(b.activeIndex + i + Math.max(s, i), b.slides.length),
								n = Math.max(b.activeIndex - Math.max(i, s), 0);
							for(e = b.activeIndex + t; e < r; e++) b.slides[e] && b.lazy.loadImageInSlide(e);
							for(e = n; e < b.activeIndex; e++) b.slides[e] && b.lazy.loadImageInSlide(e)
						} else {
							var o = b.wrapper.children("." + b.params.slideNextClass);
							o.length > 0 && b.lazy.loadImageInSlide(o.index());
							var l = b.wrapper.children("." + b.params.slidePrevClass);
							l.length > 0 && b.lazy.loadImageInSlide(l.index())
						}
				},
				onTransitionStart: function() {
					b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load()
				},
				onTransitionEnd: function() {
					b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load()
				}
			}, b.scrollbar = {
				isTouched: !1,
				setDragPosition: function(e) {
					var a = b.scrollbar,
						t = b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
						s = t - a.track.offset()[b.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
						i = -b.minTranslate() * a.moveDivider,
						r = -b.maxTranslate() * a.moveDivider;
					s < i ? s = i : s > r && (s = r), s = -s / a.moveDivider, b.updateProgress(s), b.setWrapperTranslate(s, !0)
				},
				dragStart: function(e) {
					var a = b.scrollbar;
					a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), b.params.scrollbarHide && a.track.css("opacity", 1), b.wrapper.transition(100), a.drag.transition(100), b.emit("onScrollbarDragStart", b)
				},
				dragMove: function(e) {
					var a = b.scrollbar;
					a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), b.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), b.emit("onScrollbarDragMove", b))
				},
				dragEnd: function(e) {
					var a = b.scrollbar;
					a.isTouched && (a.isTouched = !1, b.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function() {
						a.track.css("opacity", 0), a.track.transition(400)
					}, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset())
				},
				draggableEvents: function() {
					return b.params.simulateTouch !== !1 || b.support.touch ? b.touchEvents : b.touchEventsDesktop
				}(),
				enableDraggable: function() {
					var e = b.scrollbar,
						t = b.support.touch ? e.track : document;
					a(e.track).on(e.draggableEvents.start, e.dragStart), a(t).on(e.draggableEvents.move, e.dragMove), a(t).on(e.draggableEvents.end, e.dragEnd)
				},
				disableDraggable: function() {
					var e = b.scrollbar,
						t = b.support.touch ? e.track : document;
					a(e.track).off(e.draggableEvents.start, e.dragStart), a(t).off(e.draggableEvents.move, e.dragMove), a(t).off(e.draggableEvents.end, e.dragEnd)
				},
				set: function() {
					if(b.params.scrollbar) {
						var e = b.scrollbar;
						e.track = a(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && e.track.length > 1 && 1 === b.container.find(b.params.scrollbar).length && (e.track = b.container.find(b.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = b.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = b.size / b.virtualSize, e.moveDivider = e.divider * (e.trackSize / b.size), e.dragSize = e.trackSize * e.divider, b.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", b.params.scrollbarHide && (e.track[0].style.opacity = 0)
					}
				},
				setTranslate: function() {
					if(b.params.scrollbar) {
						var e, a = b.scrollbar,
							t = (b.translate || 0, a.dragSize);
						e = (a.trackSize - a.dragSize) * b.progress, b.rtl && b.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : e < 0 ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (b.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), b.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function() {
							a.track[0].style.opacity = 0, a.track.transition(400)
						}, 1e3))
					}
				},
				setTransition: function(e) {
					b.params.scrollbar && b.scrollbar.drag.transition(e)
				}
			}, b.controller = {
				LinearSpline: function(e, a) {
					this.x = e, this.y = a, this.lastIndex = e.length - 1;
					var t, s;
					this.x.length;
					this.interpolate = function(e) {
						return e ? (s = i(this.x, e), t = s - 1, (e - this.x[t]) * (this.y[s] - this.y[t]) / (this.x[s] - this.x[t]) + this.y[t]) : 0
					};
					var i = function() {
						var e, a, t;
						return function(s, i) {
							for(a = -1, e = s.length; e - a > 1;) s[t = e + a >> 1] <= i ? a = t : e = t;
							return e
						}
					}()
				},
				getInterpolateFunction: function(e) {
					b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid))
				},
				setTranslate: function(e, a) {
					function s(a) {
						e = a.rtl && "horizontal" === a.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(a), r = -b.controller.spline.interpolate(-e)), r && "container" !== b.params.controlBy || (i = (a.maxTranslate() - a.minTranslate()) / (b.maxTranslate() - b.minTranslate()), r = (e - b.minTranslate()) * i + a.minTranslate()), b.params.controlInverse && (r = a.maxTranslate() - r), a.updateProgress(r), a.setWrapperTranslate(r, !1, b), a.updateActiveIndex()
					}
					var i, r, n = b.params.control;
					if(b.isArray(n))
						for(var o = 0; o < n.length; o++) n[o] !== a && n[o] instanceof t && s(n[o]);
					else n instanceof t && a !== n && s(n)
				},
				setTransition: function(e, a) {
					function s(a) {
						a.setWrapperTransition(e, b), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() {
							r && (a.params.loop && "slide" === b.params.controlBy && a.fixLoop(), a.onTransitionEnd())
						}))
					}
					var i, r = b.params.control;
					if(b.isArray(r))
						for(i = 0; i < r.length; i++) r[i] !== a && r[i] instanceof t && s(r[i]);
					else r instanceof t && a !== r && s(r)
				}
			}, b.hashnav = {
				onHashCange: function(e, a) {
					var t = document.location.hash.replace("#", ""),
						s = b.slides.eq(b.activeIndex).attr("data-hash");
					t !== s && b.slideTo(b.wrapper.children("." + b.params.slideClass + '[data-hash="' + t + '"]').index())
				},
				attachEvents: function(e) {
					var t = e ? "off" : "on";
					a(window)[t]("hashchange", b.hashnav.onHashCange)
				},
				setHash: function() {
					if(b.hashnav.initialized && b.params.hashnav)
						if(b.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + b.slides.eq(b.activeIndex).attr("data-hash") || "");
						else {
							var e = b.slides.eq(b.activeIndex),
								a = e.attr("data-hash") || e.attr("data-history");
							document.location.hash = a || ""
						}
				},
				init: function() {
					if(b.params.hashnav && !b.params.history) {
						b.hashnav.initialized = !0;
						var e = document.location.hash.replace("#", "");
						if(e)
							for(var a = 0, t = 0, s = b.slides.length; t < s; t++) {
								var i = b.slides.eq(t),
									r = i.attr("data-hash") || i.attr("data-history");
								if(r === e && !i.hasClass(b.params.slideDuplicateClass)) {
									var n = i.index();
									b.slideTo(n, a, b.params.runCallbacksOnInit, !0)
								}
							}
						b.params.hashnavWatchState && b.hashnav.attachEvents()
					}
				},
				destroy: function() {
					b.params.hashnavWatchState && b.hashnav.attachEvents(!0)
				}
			}, b.history = {
				init: function() {
					if(b.params.history) {
						if(!window.history || !window.history.pushState) return b.params.history = !1, void(b.params.hashnav = !0);
						b.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, b.params.runCallbacksOnInit), b.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
					}
				},
				setHistoryPopState: function() {
					b.history.paths = b.history.getPathValues(), b.history.scrollToSlide(b.params.speed, b.history.paths.value, !1)
				},
				getPathValues: function() {
					var e = window.location.pathname.slice(1).split("/"),
						a = e.length,
						t = e[a - 2],
						s = e[a - 1];
					return {
						key: t,
						value: s
					}
				},
				setHistory: function(e, a) {
					if(b.history.initialized && b.params.history) {
						var t = b.slides.eq(a),
							s = this.slugify(t.attr("data-history"));
						window.location.pathname.includes(e) || (s = e + "/" + s), b.params.replaceState ? window.history.replaceState(null, null, s) : window.history.pushState(null, null, s)
					}
				},
				slugify: function(e) {
					return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
				},
				scrollToSlide: function(e, a, t) {
					if(a)
						for(var s = 0, i = b.slides.length; s < i; s++) {
							var r = b.slides.eq(s),
								n = this.slugify(r.attr("data-history"));
							if(n === a && !r.hasClass(b.params.slideDuplicateClass)) {
								var o = r.index();
								b.slideTo(o, e, t)
							}
						} else b.slideTo(0, e, t)
				}
			}, b.disableKeyboardControl = function() {
				b.params.keyboardControl = !1, a(document).off("keydown", p)
			}, b.enableKeyboardControl = function() {
				b.params.keyboardControl = !0, a(document).on("keydown", p)
			}, b.mousewheel = {
				event: !1,
				lastScrollTime: (new window.Date).getTime()
			}, b.params.mousewheelControl && (b.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : d() ? "wheel" : "mousewheel"), b.disableMousewheelControl = function() {
				if(!b.mousewheel.event) return !1;
				var e = b.container;
				return "container" !== b.params.mousewheelEventsTarged && (e = a(b.params.mousewheelEventsTarged)), e.off(b.mousewheel.event, u), !0
			}, b.enableMousewheelControl = function() {
				if(!b.mousewheel.event) return !1;
				var e = b.container;
				return "container" !== b.params.mousewheelEventsTarged && (e = a(b.params.mousewheelEventsTarged)), e.on(b.mousewheel.event, u), !0
			}, b.parallax = {
				setTranslate: function() {
					b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
						m(this, b.progress)
					}), b.slides.each(function() {
						var e = a(this);
						e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
							var a = Math.min(Math.max(e[0].progress, -1), 1);
							m(this, a)
						})
					})
				},
				setTransition: function(e) {
					"undefined" == typeof e && (e = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
						var t = a(this),
							s = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
						0 === e && (s = 0), t.transition(s)
					})
				}
			}, b.zoom = {
				scale: 1,
				currentScale: 1,
				isScaling: !1,
				gesture: {
					slide: void 0,
					slideWidth: void 0,
					slideHeight: void 0,
					image: void 0,
					imageWrap: void 0,
					zoomMax: b.params.zoomMax
				},
				image: {
					isTouched: void 0,
					isMoved: void 0,
					currentX: void 0,
					currentY: void 0,
					minX: void 0,
					minY: void 0,
					maxX: void 0,
					maxY: void 0,
					width: void 0,
					height: void 0,
					startX: void 0,
					startY: void 0,
					touchesStart: {},
					touchesCurrent: {}
				},
				velocity: {
					x: void 0,
					y: void 0,
					prevPositionX: void 0,
					prevPositionY: void 0,
					prevTime: void 0
				},
				getDistanceBetweenTouches: function(e) {
					if(e.targetTouches.length < 2) return 1;
					var a = e.targetTouches[0].pageX,
						t = e.targetTouches[0].pageY,
						s = e.targetTouches[1].pageX,
						i = e.targetTouches[1].pageY,
						r = Math.sqrt(Math.pow(s - a, 2) + Math.pow(i - t, 2));
					return r
				},
				onGestureStart: function(e) {
					var t = b.zoom;
					if(!b.support.gestures) {
						if("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
						t.gesture.scaleStart = t.getDistanceBetweenTouches(e)
					}
					return t.gesture.slide && t.gesture.slide.length || (t.gesture.slide = a(this), 0 === t.gesture.slide.length && (t.gesture.slide = b.slides.eq(b.activeIndex)), t.gesture.image = t.gesture.slide.find("img, svg, canvas"), t.gesture.imageWrap = t.gesture.image.parent("." + b.params.zoomContainerClass), t.gesture.zoomMax = t.gesture.imageWrap.attr("data-swiper-zoom") || b.params.zoomMax, 0 !== t.gesture.imageWrap.length) ? (t.gesture.image.transition(0), void(t.isScaling = !0)) : void(t.gesture.image = void 0)
				},
				onGestureChange: function(e) {
					var a = b.zoom;
					if(!b.support.gestures) {
						if("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
						a.gesture.scaleMove = a.getDistanceBetweenTouches(e)
					}
					a.gesture.image && 0 !== a.gesture.image.length && (b.support.gestures ? a.scale = e.scale * a.currentScale : a.scale = a.gesture.scaleMove / a.gesture.scaleStart * a.currentScale, a.scale > a.gesture.zoomMax && (a.scale = a.gesture.zoomMax - 1 + Math.pow(a.scale - a.gesture.zoomMax + 1, .5)), a.scale < b.params.zoomMin && (a.scale = b.params.zoomMin + 1 - Math.pow(b.params.zoomMin - a.scale + 1, .5)), a.gesture.image.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
				},
				onGestureEnd: function(e) {
					var a = b.zoom;
					!b.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || a.gesture.image && 0 !== a.gesture.image.length && (a.scale = Math.max(Math.min(a.scale, a.gesture.zoomMax), b.params.zoomMin), a.gesture.image.transition(b.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (a.gesture.slide = void 0))
				},
				onTouchStart: function(e, a) {
					var t = e.zoom;
					t.gesture.image && 0 !== t.gesture.image.length && (t.image.isTouched || ("android" === e.device.os && a.preventDefault(), t.image.isTouched = !0, t.image.touchesStart.x = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX, t.image.touchesStart.y = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY))
				},
				onTouchMove: function(e) {
					var a = b.zoom;
					if(a.gesture.image && 0 !== a.gesture.image.length && (b.allowClick = !1, a.image.isTouched && a.gesture.slide)) {
						a.image.isMoved || (a.image.width = a.gesture.image[0].offsetWidth, a.image.height = a.gesture.image[0].offsetHeight, a.image.startX = b.getTranslate(a.gesture.imageWrap[0], "x") || 0, a.image.startY = b.getTranslate(a.gesture.imageWrap[0], "y") || 0, a.gesture.slideWidth = a.gesture.slide[0].offsetWidth, a.gesture.slideHeight = a.gesture.slide[0].offsetHeight, a.gesture.imageWrap.transition(0), b.rtl && (a.image.startX = -a.image.startX), b.rtl && (a.image.startY = -a.image.startY));
						var t = a.image.width * a.scale,
							s = a.image.height * a.scale;
						if(!(t < a.gesture.slideWidth && s < a.gesture.slideHeight)) {
							if(a.image.minX = Math.min(a.gesture.slideWidth / 2 - t / 2, 0), a.image.maxX = -a.image.minX, a.image.minY = Math.min(a.gesture.slideHeight / 2 - s / 2, 0), a.image.maxY = -a.image.minY, a.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, a.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !a.image.isMoved && !a.isScaling) {
								if(b.isHorizontal() && Math.floor(a.image.minX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x < a.image.touchesStart.x || Math.floor(a.image.maxX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x > a.image.touchesStart.x) return void(a.image.isTouched = !1);
								if(!b.isHorizontal() && Math.floor(a.image.minY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y < a.image.touchesStart.y || Math.floor(a.image.maxY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y > a.image.touchesStart.y) return void(a.image.isTouched = !1)
							}
							e.preventDefault(), e.stopPropagation(), a.image.isMoved = !0, a.image.currentX = a.image.touchesCurrent.x - a.image.touchesStart.x + a.image.startX, a.image.currentY = a.image.touchesCurrent.y - a.image.touchesStart.y + a.image.startY, a.image.currentX < a.image.minX && (a.image.currentX = a.image.minX + 1 - Math.pow(a.image.minX - a.image.currentX + 1, .8)), a.image.currentX > a.image.maxX && (a.image.currentX = a.image.maxX - 1 + Math.pow(a.image.currentX - a.image.maxX + 1, .8)), a.image.currentY < a.image.minY && (a.image.currentY = a.image.minY + 1 - Math.pow(a.image.minY - a.image.currentY + 1, .8)), a.image.currentY > a.image.maxY && (a.image.currentY = a.image.maxY - 1 + Math.pow(a.image.currentY - a.image.maxY + 1, .8)), a.velocity.prevPositionX || (a.velocity.prevPositionX = a.image.touchesCurrent.x), a.velocity.prevPositionY || (a.velocity.prevPositionY = a.image.touchesCurrent.y), a.velocity.prevTime || (a.velocity.prevTime = Date.now()), a.velocity.x = (a.image.touchesCurrent.x - a.velocity.prevPositionX) / (Date.now() - a.velocity.prevTime) / 2, a.velocity.y = (a.image.touchesCurrent.y - a.velocity.prevPositionY) / (Date.now() - a.velocity.prevTime) / 2, Math.abs(a.image.touchesCurrent.x - a.velocity.prevPositionX) < 2 && (a.velocity.x = 0), Math.abs(a.image.touchesCurrent.y - a.velocity.prevPositionY) < 2 && (a.velocity.y = 0), a.velocity.prevPositionX = a.image.touchesCurrent.x, a.velocity.prevPositionY = a.image.touchesCurrent.y, a.velocity.prevTime = Date.now(), a.gesture.imageWrap.transform("translate3d(" + a.image.currentX + "px, " + a.image.currentY + "px,0)")
						}
					}
				},
				onTouchEnd: function(e, a) {
					var t = e.zoom;
					if(t.gesture.image && 0 !== t.gesture.image.length) {
						if(!t.image.isTouched || !t.image.isMoved) return t.image.isTouched = !1, void(t.image.isMoved = !1);
						t.image.isTouched = !1, t.image.isMoved = !1;
						var s = 300,
							i = 300,
							r = t.velocity.x * s,
							n = t.image.currentX + r,
							o = t.velocity.y * i,
							l = t.image.currentY + o;
						0 !== t.velocity.x && (s = Math.abs((n - t.image.currentX) / t.velocity.x)), 0 !== t.velocity.y && (i = Math.abs((l - t.image.currentY) / t.velocity.y));
						var p = Math.max(s, i);
						t.image.currentX = n, t.image.currentY = l;
						var d = t.image.width * t.scale,
							u = t.image.height * t.scale;
						t.image.minX = Math.min(t.gesture.slideWidth / 2 - d / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - u / 2, 0), t.image.maxY = -t.image.minY, t.image.currentX = Math.max(Math.min(t.image.currentX, t.image.maxX), t.image.minX), t.image.currentY = Math.max(Math.min(t.image.currentY, t.image.maxY), t.image.minY), t.gesture.imageWrap.transition(p).transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
					}
				},
				onTransitionEnd: function(e) {
					var a = e.zoom;
					a.gesture.slide && e.previousIndex !== e.activeIndex && (a.gesture.image.transform("translate3d(0,0,0) scale(1)"), a.gesture.imageWrap.transform("translate3d(0,0,0)"), a.gesture.slide = a.gesture.image = a.gesture.imageWrap = void 0, a.scale = a.currentScale = 1)
				},
				toggleZoom: function(e, t) {
					var s = e.zoom;
					if(s.gesture.slide || (s.gesture.slide = e.clickedSlide ? a(e.clickedSlide) : e.slides.eq(e.activeIndex), s.gesture.image = s.gesture.slide.find("img, svg, canvas"), s.gesture.imageWrap = s.gesture.image.parent("." + e.params.zoomContainerClass)), s.gesture.image && 0 !== s.gesture.image.length) {
						var i, r, n, o, l, p, d, u, c, m, h, g, f, v, w, y, x, T;
						"undefined" == typeof s.image.touchesStart.x && t ? (i = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, r = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (i = s.image.touchesStart.x, r = s.image.touchesStart.y), s.scale && 1 !== s.scale ? (s.scale = s.currentScale = 1, s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), s.gesture.slide = void 0) : (s.scale = s.currentScale = s.gesture.imageWrap.attr("data-swiper-zoom") || e.params.zoomMax, t ? (x = s.gesture.slide[0].offsetWidth, T = s.gesture.slide[0].offsetHeight, n = s.gesture.slide.offset().left, o = s.gesture.slide.offset().top, l = n + x / 2 - i, p = o + T / 2 - r, c = s.gesture.image[0].offsetWidth, m = s.gesture.image[0].offsetHeight, h = c * s.scale, g = m * s.scale, f = Math.min(x / 2 - h / 2, 0), v = Math.min(T / 2 - g / 2, 0), w = -f, y = -v, d = l * s.scale, u = p * s.scale, d < f && (d = f), d > w && (d = w), u < v && (u = v), u > y && (u = y)) : (d = 0, u = 0), s.gesture.imageWrap.transition(300).transform("translate3d(" + d + "px, " + u + "px,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + s.scale + ")"))
					}
				},
				attachEvents: function(e) {
					var t = e ? "off" : "on";
					if(b.params.zoom) {
						var s = (b.slides, !("touchstart" !== b.touchEvents.start || !b.support.passiveListener || !b.params.passiveListeners) && {
							passive: !0,
							capture: !1
						});
						b.support.gestures ? (b.slides[t]("gesturestart", b.zoom.onGestureStart, s), b.slides[t]("gesturechange", b.zoom.onGestureChange, s), b.slides[t]("gestureend", b.zoom.onGestureEnd, s)) : "touchstart" === b.touchEvents.start && (b.slides[t](b.touchEvents.start, b.zoom.onGestureStart, s), b.slides[t](b.touchEvents.move, b.zoom.onGestureChange, s), b.slides[t](b.touchEvents.end, b.zoom.onGestureEnd, s)), b[t]("touchStart", b.zoom.onTouchStart), b.slides.each(function(e, s) {
							a(s).find("." + b.params.zoomContainerClass).length > 0 && a(s)[t](b.touchEvents.move, b.zoom.onTouchMove)
						}), b[t]("touchEnd", b.zoom.onTouchEnd), b[t]("transitionEnd", b.zoom.onTransitionEnd), b.params.zoomToggle && b.on("doubleTap", b.zoom.toggleZoom)
					}
				},
				init: function() {
					b.zoom.attachEvents()
				},
				destroy: function() {
					b.zoom.attachEvents(!0)
				}
			}, b._plugins = [];
			for(var O in b.plugins) {
				var N = b.plugins[O](b, b.params[O]);
				N && b._plugins.push(N)
			}
			return b.callPlugins = function(e) {
				for(var a = 0; a < b._plugins.length; a++) e in b._plugins[a] && b._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
			}, b.emitterEventListeners = {}, b.emit = function(e) {
				b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
				var a;
				if(b.emitterEventListeners[e])
					for(a = 0; a < b.emitterEventListeners[e].length; a++) b.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
				b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
			}, b.on = function(e, a) {
				return e = h(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(a), b
			}, b.off = function(e, a) {
				var t;
				if(e = h(e), "undefined" == typeof a) return b.emitterEventListeners[e] = [], b;
				if(b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
					for(t = 0; t < b.emitterEventListeners[e].length; t++) b.emitterEventListeners[e][t] === a && b.emitterEventListeners[e].splice(t, 1);
					return b
				}
			}, b.once = function(e, a) {
				e = h(e);
				var t = function() {
					a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, t)
				};
				return b.on(e, t), b
			}, b.a11y = {
				makeFocusable: function(e) {
					return e.attr("tabIndex", "0"), e
				},
				addRole: function(e, a) {
					return e.attr("role", a), e
				},
				addLabel: function(e, a) {
					return e.attr("aria-label", a), e
				},
				disable: function(e) {
					return e.attr("aria-disabled", !0), e
				},
				enable: function(e) {
					return e.attr("aria-disabled", !1), e
				},
				onEnterKey: function(e) {
					13 === e.keyCode && (a(e.target).is(b.params.nextButton) ? (b.onClickNext(e), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : a(e.target).is(b.params.prevButton) && (b.onClickPrev(e), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), a(e.target).is("." + b.params.bulletClass) && a(e.target)[0].click())
				},
				liveRegion: a('<span class="' + b.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
				notify: function(e) {
					var a = b.a11y.liveRegion;
					0 !== a.length && (a.html(""), a.html(e))
				},
				init: function() {
					b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), a(b.container).append(b.a11y.liveRegion)
				},
				initPagination: function() {
					b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function() {
						var e = a(this);
						b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
					})
				},
				destroy: function() {
					b.a11y.liveRegion && b.a11y.liveRegion.length > 0 && b.a11y.liveRegion.remove()
				}
			}, b.init = function() {
				b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.zoom && b.zoom && b.zoom.init(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(), b.params.hashnavReplaceState && (b.params.replaceState = b.params.hashnavReplaceState), b.params.history && b.history && b.history.init(), b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b)
			}, b.cleanupStyles = function() {
				b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && a(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && a(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"))
			}, b.destroy = function(e, a) {
				b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), a && b.cleanupStyles(), b.disconnectObservers(), b.params.zoom && b.zoom && b.zoom.destroy(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.params.history && !b.params.replaceState && window.removeEventListener("popstate", b.history.setHistoryPopState), b.params.hashnav && b.hashnav && b.hashnav.destroy(), b.emit("onDestroy"), e !== !1 && (b = null)
			}, b.init(), b
		}
	};
	t.prototype = {
		isSafari: function() {
			var e = window.navigator.userAgent.toLowerCase();
			return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
		}(),
		isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
		isArray: function(e) {
			return "[object Array]" === Object.prototype.toString.apply(e)
		},
		browser: {
			ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
			ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
			lteIE9: function() {
				var e = document.createElement("div");
				return e.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length
			}()
		},
		device: function() {
			var e = window.navigator.userAgent,
				a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
				t = e.match(/(iPad).*OS\s([\d_]+)/),
				s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
				i = !t && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
			return {
				ios: t || i || s,
				android: a
			}
		}(),
		support: {
			touch: window.Modernizr && Modernizr.touch === !0 || function() {
				return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
			}(),
			transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
				var e = document.createElement("div").style;
				return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
			}(),
			flexbox: function() {
				for(var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)
					if(a[t] in e) return !0
			}(),
			observer: function() {
				return "MutationObserver" in window || "WebkitMutationObserver" in window
			}(),
			passiveListener: function() {
				var e = !1;
				try {
					var a = Object.defineProperty({}, "passive", {
						get: function() {
							e = !0
						}
					});
					window.addEventListener("testPassiveListener", null, a)
				} catch(e) {}
				return e
			}(),
			gestures: function() {
				return "ongesturestart" in window
			}()
		},
		plugins: {}
	};
	for(var s = (function() {
			var e = function(e) {
					var a = this,
						t = 0;
					for(t = 0; t < e.length; t++) a[t] = e[t];
					return a.length = e.length, this
				},
				a = function(a, t) {
					var s = [],
						i = 0;
					if(a && !t && a instanceof e) return a;
					if(a)
						if("string" == typeof a) {
							var r, n, o = a.trim();
							if(o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
								var l = "div";
								for(0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), 0 !== o.indexOf("<td") && 0 !== o.indexOf("<th") || (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = a, i = 0; i < n.childNodes.length; i++) s.push(n.childNodes[i])
							} else
								for(r = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [document.getElementById(a.split("#")[1])], i = 0; i < r.length; i++) r[i] && s.push(r[i])
						} else if(a.nodeType || a === window || a === document) s.push(a);
					else if(a.length > 0 && a[0].nodeType)
						for(i = 0; i < a.length; i++) s.push(a[i]);
					return new e(s)
				};
			return e.prototype = {
				addClass: function(e) {
					if("undefined" == typeof e) return this;
					for(var a = e.split(" "), t = 0; t < a.length; t++)
						for(var s = 0; s < this.length; s++) this[s].classList.add(a[t]);
					return this
				},
				removeClass: function(e) {
					for(var a = e.split(" "), t = 0; t < a.length; t++)
						for(var s = 0; s < this.length; s++) this[s].classList.remove(a[t]);
					return this
				},
				hasClass: function(e) {
					return !!this[0] && this[0].classList.contains(e)
				},
				toggleClass: function(e) {
					for(var a = e.split(" "), t = 0; t < a.length; t++)
						for(var s = 0; s < this.length; s++) this[s].classList.toggle(a[t]);
					return this
				},
				attr: function(e, a) {
					if(1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
					for(var t = 0; t < this.length; t++)
						if(2 === arguments.length) this[t].setAttribute(e, a);
						else
							for(var s in e) this[t][s] = e[s], this[t].setAttribute(s, e[s]);
					return this
				},
				removeAttr: function(e) {
					for(var a = 0; a < this.length; a++) this[a].removeAttribute(e);
					return this
				},
				data: function(e, a) {
					if("undefined" != typeof a) {
						for(var t = 0; t < this.length; t++) {
							var s = this[t];
							s.dom7ElementDataStorage || (s.dom7ElementDataStorage = {}), s.dom7ElementDataStorage[e] = a
						}
						return this
					}
					if(this[0]) {
						var i = this[0].getAttribute("data-" + e);
						return i ? i : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
					}
				},
				transform: function(e) {
					for(var a = 0; a < this.length; a++) {
						var t = this[a].style;
						t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
					}
					return this
				},
				transition: function(e) {
					"string" != typeof e && (e += "ms");
					for(var a = 0; a < this.length; a++) {
						var t = this[a].style;
						t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
					}
					return this
				},
				on: function(e, t, s, i) {
					function r(e) {
						var i = e.target;
						if(a(i).is(t)) s.call(i, e);
						else
							for(var r = a(i).parents(), n = 0; n < r.length; n++) a(r[n]).is(t) && s.call(r[n], e)
					}
					var n, o, l = e.split(" ");
					for(n = 0; n < this.length; n++)
						if("function" == typeof t || t === !1)
							for("function" == typeof t && (s = arguments[1], i = arguments[2] || !1), o = 0; o < l.length; o++) this[n].addEventListener(l[o], s, i);
						else
							for(o = 0; o < l.length; o++) this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({
								listener: s,
								liveListener: r
							}), this[n].addEventListener(l[o], r, i);
					return this
				},
				off: function(e, a, t, s) {
					for(var i = e.split(" "), r = 0; r < i.length; r++)
						for(var n = 0; n < this.length; n++)
							if("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], s = arguments[2] || !1), this[n].removeEventListener(i[r], t, s);
							else if(this[n].dom7LiveListeners)
						for(var o = 0; o < this[n].dom7LiveListeners.length; o++) this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(i[r], this[n].dom7LiveListeners[o].liveListener, s);
					return this
				},
				once: function(e, a, t, s) {
					function i(n) {
						t(n), r.off(e, a, i, s)
					}
					var r = this;
					"function" == typeof a && (a = !1, t = arguments[1], s = arguments[2]), r.on(e, a, i, s)
				},
				trigger: function(e, a) {
					for(var t = 0; t < this.length; t++) {
						var s;
						try {
							s = new window.CustomEvent(e, {
								detail: a,
								bubbles: !0,
								cancelable: !0
							})
						} catch(t) {
							s = document.createEvent("Event"), s.initEvent(e, !0, !0), s.detail = a
						}
						this[t].dispatchEvent(s)
					}
					return this
				},
				transitionEnd: function(e) {
					function a(r) {
						if(r.target === this)
							for(e.call(this, r), t = 0; t < s.length; t++) i.off(s[t], a)
					}
					var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
						i = this;
					if(e)
						for(t = 0; t < s.length; t++) i.on(s[t], a);
					return this
				},
				width: function() {
					return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
				},
				outerWidth: function(e) {
					return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
				},
				height: function() {
					return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
				},
				outerHeight: function(e) {
					return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
				},
				offset: function() {
					if(this.length > 0) {
						var e = this[0],
							a = e.getBoundingClientRect(),
							t = document.body,
							s = e.clientTop || t.clientTop || 0,
							i = e.clientLeft || t.clientLeft || 0,
							r = window.pageYOffset || e.scrollTop,
							n = window.pageXOffset || e.scrollLeft;
						return {
							top: a.top + r - s,
							left: a.left + n - i
						}
					}
					return null
				},
				css: function(e, a) {
					var t;
					if(1 === arguments.length) {
						if("string" != typeof e) {
							for(t = 0; t < this.length; t++)
								for(var s in e) this[t].style[s] = e[s];
							return this
						}
						if(this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
					}
					if(2 === arguments.length && "string" == typeof e) {
						for(t = 0; t < this.length; t++) this[t].style[e] = a;
						return this
					}
					return this
				},
				each: function(e) {
					for(var a = 0; a < this.length; a++) e.call(this[a], a, this[a]);
					return this
				},
				html: function(e) {
					if("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;
					for(var a = 0; a < this.length; a++) this[a].innerHTML = e;
					return this
				},
				text: function(e) {
					if("undefined" == typeof e) return this[0] ? this[0].textContent.trim() : null;
					for(var a = 0; a < this.length; a++) this[a].textContent = e;
					return this
				},
				is: function(t) {
					if(!this[0]) return !1;
					var s, i;
					if("string" == typeof t) {
						var r = this[0];
						if(r === document) return t === document;
						if(r === window) return t === window;
						if(r.matches) return r.matches(t);
						if(r.webkitMatchesSelector) return r.webkitMatchesSelector(t);
						if(r.mozMatchesSelector) return r.mozMatchesSelector(t);
						if(r.msMatchesSelector) return r.msMatchesSelector(t);
						for(s = a(t), i = 0; i < s.length; i++)
							if(s[i] === this[0]) return !0;
						return !1
					}
					if(t === document) return this[0] === document;
					if(t === window) return this[0] === window;
					if(t.nodeType || t instanceof e) {
						for(s = t.nodeType ? [t] : t, i = 0; i < s.length; i++)
							if(s[i] === this[0]) return !0;
						return !1
					}
					return !1
				},
				index: function() {
					if(this[0]) {
						for(var e = this[0], a = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && a++;
						return a
					}
				},
				eq: function(a) {
					if("undefined" == typeof a) return this;
					var t, s = this.length;
					return a > s - 1 ? new e([]) : a < 0 ? (t = s + a, new e(t < 0 ? [] : [this[t]])) : new e([this[a]])
				},
				append: function(a) {
					var t, s;
					for(t = 0; t < this.length; t++)
						if("string" == typeof a) {
							var i = document.createElement("div");
							for(i.innerHTML = a; i.firstChild;) this[t].appendChild(i.firstChild)
						} else if(a instanceof e)
						for(s = 0; s < a.length; s++) this[t].appendChild(a[s]);
					else this[t].appendChild(a);
					return this
				},
				prepend: function(a) {
					var t, s;
					for(t = 0; t < this.length; t++)
						if("string" == typeof a) {
							var i = document.createElement("div");
							for(i.innerHTML = a, s = i.childNodes.length - 1; s >= 0; s--) this[t].insertBefore(i.childNodes[s], this[t].childNodes[0])
						} else if(a instanceof e)
						for(s = 0; s < a.length; s++) this[t].insertBefore(a[s], this[t].childNodes[0]);
					else this[t].insertBefore(a, this[t].childNodes[0]);
					return this
				},
				insertBefore: function(e) {
					for(var t = a(e), s = 0; s < this.length; s++)
						if(1 === t.length) t[0].parentNode.insertBefore(this[s], t[0]);
						else if(t.length > 1)
						for(var i = 0; i < t.length; i++) t[i].parentNode.insertBefore(this[s].cloneNode(!0), t[i])
				},
				insertAfter: function(e) {
					for(var t = a(e), s = 0; s < this.length; s++)
						if(1 === t.length) t[0].parentNode.insertBefore(this[s], t[0].nextSibling);
						else if(t.length > 1)
						for(var i = 0; i < t.length; i++) t[i].parentNode.insertBefore(this[s].cloneNode(!0), t[i].nextSibling)
				},
				next: function(t) {
					return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
				},
				nextAll: function(t) {
					var s = [],
						i = this[0];
					if(!i) return new e([]);
					for(; i.nextElementSibling;) {
						var r = i.nextElementSibling;
						t ? a(r).is(t) && s.push(r) : s.push(r), i = r
					}
					return new e(s)
				},
				prev: function(t) {
					return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
				},
				prevAll: function(t) {
					var s = [],
						i = this[0];
					if(!i) return new e([]);
					for(; i.previousElementSibling;) {
						var r = i.previousElementSibling;
						t ? a(r).is(t) && s.push(r) : s.push(r), i = r
					}
					return new e(s)
				},
				parent: function(e) {
					for(var t = [], s = 0; s < this.length; s++) e ? a(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode);
					return a(a.unique(t))
				},
				parents: function(e) {
					for(var t = [], s = 0; s < this.length; s++)
						for(var i = this[s].parentNode; i;) e ? a(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
					return a(a.unique(t))
				},
				find: function(a) {
					for(var t = [], s = 0; s < this.length; s++)
						for(var i = this[s].querySelectorAll(a), r = 0; r < i.length; r++) t.push(i[r]);
					return new e(t)
				},
				children: function(t) {
					for(var s = [], i = 0; i < this.length; i++)
						for(var r = this[i].childNodes, n = 0; n < r.length; n++) t ? 1 === r[n].nodeType && a(r[n]).is(t) && s.push(r[n]) : 1 === r[n].nodeType && s.push(r[n]);
					return new e(a.unique(s))
				},
				remove: function() {
					for(var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
					return this
				},
				add: function() {
					var e, t, s = this;
					for(e = 0; e < arguments.length; e++) {
						var i = a(arguments[e]);
						for(t = 0; t < i.length; t++) s[s.length] = i[t], s.length++
					}
					return s
				}
			}, a.fn = e.prototype, a.unique = function(e) {
				for(var a = [], t = 0; t < e.length; t++) a.indexOf(e[t]) === -1 && a.push(e[t]);
				return a
			}, a
		}()), i = ["jQuery", "Zepto", "Dom7"], r = 0; r < i.length; r++) window[i[r]] && e(window[i[r]]);
	var n;
	n = "undefined" == typeof s ? window.Dom7 || window.Zepto || window.jQuery : s, n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function(e) {
		function a(r) {
			if(r.target === this)
				for(e.call(this, r), t = 0; t < s.length; t++) i.off(s[t], a)
		}
		var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
			i = this;
		if(e)
			for(t = 0; t < s.length; t++) i.on(s[t], a);
		return this
	}), "transform" in n.fn || (n.fn.transform = function(e) {
		for(var a = 0; a < this.length; a++) {
			var t = this[a].style;
			t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
		}
		return this
	}), "transition" in n.fn || (n.fn.transition = function(e) {
		"string" != typeof e && (e += "ms");
		for(var a = 0; a < this.length; a++) {
			var t = this[a].style;
			t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
		}
		return this
	}), "outerWidth" in n.fn || (n.fn.outerWidth = function(e) {
		return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
	})), window.Swiper = t
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
	"use strict";
	return window.Swiper
});
//# sourceMappingURL=maps/swiper.min.js.map

// -----------------------------------------------------------------------------------
// http://wowslider.com/
// JavaScript Wow Slider is a free software that helps you easily generate delicious 
// slideshows with gorgeous transition effects, in a few clicks without writing a single line of code.
// Generated by WOW Slider 6.1
//
//***********************************************
// Obfuscated by Javascript Obfuscator
// http://javascript-source.com
//***********************************************
jQuery.fn.wowSlider = function(t) {
		function e(t) {
			return V.css({
				left: -t + "00%"
			})
		}

		function n(t) {
			return((t || 0) + R) % R
		}

		function i(t, e) {
			ue.pause(t.curIndex, e)
		}

		function a(t, e) {
			ue.play(t, 0, e)
		}

		function o(t, e, i) {
			ae || (isNaN(t) && (t = Y(ee, R)), t = n(t), ee != t && (D ? D.load(t, function() {
				r(t, e, i)
			}) : r(t, e, i)))
		}

		function s(t) {
			for(var e = "", n = 0; n < t.length; n++) e += String.fromCharCode(t.charCodeAt(n) ^ 1 + (t.length - n) % 32);
			return e
		}

		function r(n, i, a) {
			if(!ae) {
				if(i || a) e(n);
				else {
					if(ae) return;
					oe = !1,
						function(e, n) {
							se = se >= K.length - 1 ? 0 : se + 1;
							var i = K[se] || new window.ws_blinds(t, G, N);
							z(i).trigger("effectStart", {
								curIndex: e,
								nextIndex: n,
								cont: z(".ws_effect", q),
								start: function() {
									ie = !!((n - e + 1) % G.length) ^ t.revers ? 0 : 1, i.go(n, e, ie)
								}
							})
						}(ee, n), q.trigger(z.Event("go", {
							index: n
						}))
				}
				ee = n, ee != t.stopOn || --t.loop || (t.autoPlay = 0), t.onStep && t.onStep(n)
			}
		}

		function l() {
			q.find(".ws_effect").fadeOut(200), e(ee).fadeIn(200).find("img").css({
				visibility: "visible"
			})
		}

		function u(t, e, n, i, a, o) {
			new c(t, e, n, i, a, o)
		}

		function c(e, n, i, a, o, s) {
			var r, l, u, c, d = 0,
				f = 0,
				p = 0;
			e[0] || (e = z(e)), e.on((n ? "mousedown " : "") + "touchstart", function(e) {
				var n = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
				t.gestures && q.addClass("ws_grabbing"), d = 0, n ? (r = n.pageX, l = n.pageY, f = p = 1, a && (f = p = a(e))) : f = p = 0, e.originalEvent.touches || (e.preventDefault(), e.stopPropagation())
			}), z(window).on((n ? "mousemove " : "") + "touchmove", e, function(t) {
				if(f) {
					var e = t.originalEvent.touches ? t.originalEvent.touches[0] : t;
					d = 1, u = e.pageX - r, c = e.pageY - l, i && i(t, u, c), t.preventDefault(), t.stopPropagation()
				}
			}), z(window).on((n ? "mouseup " : "") + "touchend", e, function(e) {
				t.gestures && q.removeClass("ws_grabbing"), f && (d && o && o(e, u, c), !d && s && s(e), d && (e.preventDefault(), e.stopPropagation()), d = 0, f = 0)
			}), e.on("click", function(t) {
				p && (t.preventDefault(), t.stopPropagation()), p = 0
			})
		}

		function d(t) {
			var e = t.css("transform"),
				n = {
					top: 0,
					left: 0
				};
			return e && (e = e.match(/(-?[0-9\.]+)/g), e ? "3d" == e[1] ? (n.left = parseFloat(e[2]) || 0, n.top = parseFloat(e[3]) || 0) : (n.left = parseFloat(e[4]) || 0, n.top = parseFloat(e[5]) || 0) : (n.left = 0, n.top = 0)), n
		}

		function f(e, n) {
			if(we.length && x(e), ye.length && b(e), t.caption && C(e, n), U) {
				var i = z("A", j.get(e)).get(0);
				i ? (U.setAttribute("href", i.href), U.setAttribute("target", i.target), U.style.display = "block") : U.style.display = "none"
			}
			t.responsive && O()
		}

		function p() {
			be && (be = 0, setTimeout(function() {
				q.trigger(z.Event("stop", {}))
			}, t.duration))
		}

		function h() {
			!be && t.autoPlay && (be = 1, q.trigger(z.Event("start", {})))
		}

		function m() {
			g(), p()
		}

		function v() {
			g(), t.autoPlay ? (ge = setTimeout(function() {
				xe || o()
			}, t.delay), h()) : p()
		}

		function g() {
			ge && clearTimeout(ge), ge = null
		}

		function w(t, e, n, i) {
			g(), t.preventDefault(), o(e, n, i), v(), qe && ze && ze.play()
		}

		function y() {
			function e(t) {
				0 > t && (t = 0), D && D.loadTtip(t), z(f.get(v)).removeClass("ws_overbull"), z(f.get(t)).addClass("ws_overbull"), h.show();
				var e = {
						left: f.get(t).offsetLeft - h.width() / 2,
						"margin-top": f.get(t).offsetTop - f.get(0).offsetTop + "px",
						"margin-bottom": -f.get(t).offsetTop + f.get(f.length - 1).offsetTop + "px"
					},
					n = p.get(t),
					i = {
						left: -n.offsetLeft + (z(n).outerWidth(!0) - z(n).outerWidth()) / 2
					};
				0 > v ? (h.css(e), m.css(i)) : (document.all || (e.opacity = 1), h.stop().animate(e, "fast"), m.stop().animate(i, "fast")), v = t
			}
			if(q.find(".ws_bullets a,.ws_thumbs a").click(function(t) {
					w(t, z(this).index())
				}), ye.length) {
				ye.hover(function() {
					Te = 1
				}, function() {
					Te = 0
				});
				var n = ye.find(">div");
				ye.css({
					overflow: "hidden"
				});
				var i, a, o, s = q.find(".ws_thumbs");
				s.bind("mousemove mouseover", function(e) {
					if(!o) {
						clearTimeout(a);
						for(var s = .2, r = 0; 2 > r; r++) {
							var l = ye[r ? "width" : "height"](),
								u = n[r ? "width" : "height"](),
								c = l - u;
							if(0 > c) {
								var f, p, h = (e[r ? "pageX" : "pageY"] - ye.offset()[r ? "left" : "top"]) / l;
								if(i == h) return;
								i = h;
								var m = t.support.transform && t.support.transition ? d(n)[r ? "left" : "top"] : n.position()[r ? "left" : "top"];
								if(n.css({
										transition: "0ms linear",
										transform: "translate3d(" + m.left + "px," + m.top + "px,0)"
									}), n.stop(!0), Ee > 0) {
									if(h > s && 1 - s > h) return;
									f = .5 > h ? 0 : c - 1, p = Ee * Math.abs(m - f) / (Math.abs(h - .5) - s)
								} else f = c * Math.min(Math.max((h - s) / (1 - 2 * s), 0), 1), p = -Ee * u / 2;
								t.support.transform && t.support.transition ? n.css({
									transition: p + "ms " + (Ee > 0 ? "linear" : "ease"),
									transform: "translate3d(" + (r ? f : 0) + "px," + (r ? 0 : f) + "px,0)"
								}) : n.animate(r ? {
									left: f
								} : {
									top: f
								}, p, Ee > 0 ? "linear" : "easeOutCubic")
							} else t.support.transform && t.support.transition || n.css(r ? "left" : "top", r ? c / 2 : 0)
						}
					}
				}), s.mouseout(function() {
					a = setTimeout(function() {
						if(n.stop(), t.support.transform && t.support.transition) {
							var e = d(n);
							n.css({
								transition: "0ms linear",
								transform: "translate3d(" + e.left + "px," + e.top + "px,0)"
							})
						}
					}, 100)
				}), ye.trigger("mousemove");
				var r, l;
				t.gestures && u(q, 1, function(e, i, a) {
					var o = Math.min(Math.max(r + i, ye.width() - n.width()), 0),
						s = Math.min(Math.max(l + a, ye.height() - n.height()), 0);
					t.support.transform && t.support.transition ? n.css({
						transition: "0ms linear",
						transform: "translate3d(" + o + "px, " + s + "px,0)"
					}) : (n.css("left", o), n.css("top", s))
				}, function(e) {
					if(!z(e.target).parents(".ws_thumbs").get(0)) return !1;
					if(o = 1, t.support.transform && t.support.transition) {
						var i = d(n);
						r = i.left, l = i.top
					} else r = parseFloat(n.css("left")) || 0, l = parseFloat(n.css("top")) || 0;
					return !0
				}, function() {
					o = 0
				}, function() {
					o = 0
				}), q.find(".ws_thumbs a").each(function(t, e) {
					u(e, 0, 0, function(t) {
						return !!z(t.target).parents(".ws_thumbs").get(0)
					}, function() {
						o = 1
					}, function(t) {
						w(t, z(e).index())
					})
				})
			}
			if(we.length) {
				var c = we.find(">div"),
					f = z("a", we),
					p = f.find("IMG");
				if(p.length) {
					var h = z('<div class="ws_bulframe"/>').appendTo(c),
						m = z("<div/>").css({
							width: p.length + 1 + "00%"
						}).appendTo(z("<div/>").appendTo(h));
					p.appendTo(m), z("<span/>").appendTo(h);
					var v = -1;
					f.hover(function() {
						e(z(this).index())
					});
					var g;
					c.hover(function() {
						g && (clearTimeout(g), g = 0), e(v)
					}, function() {
						f.removeClass("ws_overbull"), document.all ? g || (g = setTimeout(function() {
							h.hide(), g = 0
						}, 400)) : h.stop().animate({
							opacity: 0
						}, {
							duration: "fast",
							complete: function() {
								h.hide()
							}
						})
					}), c.click(function(t) {
						w(t, z(t.target).index())
					})
				}
			}
		}

		function b(e) {
			z("A", ye).each(function(n) {
				if(n == e) {
					var i = z(this);
					if(i.addClass("ws_selthumb"), !Te) {
						var a, o = ye.find(">div"),
							s = i.position() || {};
						if(t.support.transform && t.support.transition) {
							a = d(o);
							var r = -Math.max(Math.min(s.left, -a.left), s.left + i.width() - ye.width()),
								l = -Math.max(Math.min(s.top, 0), s.top + i.height() - ye.height());
							o.css({
								transition: "300ms ease",
								transform: "translate3d(" + r + "px," + l + "px,0)"
							})
						} else a = o.position() || {}, o.stop(!0).animate({
							left: -Math.max(Math.min(s.left, -a.left), s.left + i.width() - ye.width()),
							top: -Math.max(Math.min(s.top, 0), s.top + i.height() - ye.height())
						})
					}
				} else z(this).removeClass("ws_selthumb")
			})
		}

		function x(t) {
			z("A", we).each(function(e) {
				e == t ? z(this).addClass("ws_selbull") : z(this).removeClass("ws_selbull")
			})
		}

		function _(t) {
			var e = j[t],
				n = z("img", e).attr("title"),
				i = z(e).data("descr");
			return n.replace(/\s+/g, "") || (n = ""), (n ? "<span>" + n + "</span>" : "") + (i ? "<br><div>" + i + "</div>" : "")
		}

		function C(e, n) {
			var i = _(e),
				a = _(n),
				o = t.captionEffect;
			(Oe[z.type(o)] || Oe[o] || Oe.none)(o, Pe, ke, t.captionDuration, i, a)
		}

		function M(t, e) {
			var n, i = document.defaultView;
			if(i && i.getComputedStyle) {
				var a = i.getComputedStyle(t, "");
				a && (n = a.getPropertyValue(e))
			} else {
				var o = e.replace(/\-\w/g, function(t) {
					return t.charAt(1).toUpperCase()
				});
				n = t.currentStyle ? t.currentStyle[o] : t.style[o]
			}
			return n
		}

		function F(t, e, n) {
			for(var i = "padding-left|padding-right|border-left-width|border-right-width".split("|"), a = 0, o = 0; o < i.length; o++) a += parseFloat(M(t, i[o])) || 0;
			var s = parseFloat(M(t, "width")) || (t.offsetWidth || 0) - a;
			return e && (s += a), n && (s += (parseFloat(M(t, "margin-left")) || 0) + (parseFloat(M(t, "margin-right")) || 0)), s
		}

		function S(t, e, n) {
			for(var i = "padding-top|padding-bottom|border-top-width|border-bottom-width".split("|"), a = 0, o = 0; o < i.length; o++) a += parseFloat(M(t, i[o])) || 0;
			var s = parseFloat(M(t, "height")) || (t.offsetHeight || 0) - a;
			return e && (s += a), n && (s += (parseFloat(M(t, "margin-top")) || 0) + (parseFloat(M(t, "margin-bottom")) || 0)), s
		}

		function T(t, e, n, i, a) {
			function o(t) {
				var n = z(s[t]).css("opacity");
				z(s[t]).css({
					visibility: "visible"
				}).css({
					opacity: 0
				}).animate({
					opacity: n
				}, a, "easeOutCirc").animate({
					top: 0,
					left: 0
				}, {
					duration: a,
					easing: e.easing || i,
					queue: !1
				})
			}
			var s = t.find(">span,>div").get();
			z(s).css({
				position: "relative",
				visibility: "hidden"
			}), t.show();
			for(var r in e)
				if(/\%/.test(e[r])) {
					e[r] = parseInt(e[r]) / 100;
					var l = t.offset()[/left/.test(r) ? "left" : "top"],
						u = /left/.test(r) ? "width" : "height";
					e[r] *= e[r] < 0 ? l : q[u]() - t[u]() - l
				}
			z(s[0]).css({
				left: (e.left1 || 0) + "px",
				top: (e.top1 || 0) + "px"
			}), z(s[1]).css({
				left: (e.left2 || 0) + "px",
				top: (e.top2 || 0) + "px"
			});
			var a = e.duration || a;
			o(0), setTimeout(function() {
				o(1)
			}, a * (e.distance || n))
		}

		function E(t, e) {
			var n = {
				position: 0,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0
			};
			for(var i in n) n[i] = t.get(0).style[i];
			t.show();
			var a = {
				width: F(t.get(0), 1, 1),
				height: S(t.get(0), 1, 1),
				"float": t.css("float"),
				overflow: "hidden",
				opacity: 0
			};
			for(var i in n) a[i] = n[i] || M(t.get(0), i);
			var o = z("<div></div>").css({
				fontSize: "100%",
				background: "transparent",
				border: "none",
				margin: 0,
				padding: 0
			});
			t.wrap(o), o = t.parent(), "static" == t.css("position") ? (o.css({
				position: "relative"
			}), t.css({
				position: "relative"
			})) : (z.extend(a, {
				position: t.css("position"),
				zIndex: t.css("z-index")
			}), t.css({
				position: "absolute",
				top: 0,
				left: 0,
				right: "auto",
				bottom: "auto"
			})), o.css(a).show();
			var s = e.direction || "left",
				r = "up" == s || "down" == s ? "top" : "left",
				l = "up" == s || "left" == s,
				u = e.distance || ("top" == r ? t.outerHeight(!0) : t.outerWidth(!0));
			t.css(r, l ? isNaN(u) ? "-" + u : -u : u);
			var c = {};
			c[r] = (l ? "+=" : "-=") + u, o.animate({
				opacity: 1
			}, {
				duration: e.duration,
				easing: e.easing
			}), t.animate(c, {
				queue: !1,
				duration: e.duration,
				easing: e.easing,
				complete: function() {
					t.css(n), t.parent().replaceWith(t), e.complete && e.complete()
				}
			})
		}

		function P(t, e, n) {
			var i = 1 * new Date,
				a = function() {
					var o = (1 * new Date - i) / e;
					o >= 1 ? (t(1), cancelAnimationFrame(a), n && n()) : (t(o), requestAnimationFrame(a))
				};
			a()
		}

		function k(e, n, i, a, o, s) {
			function r(e, n) {
				return e.css(t.support.transform ? {
					transform: "translate3d(" + n + "px,0px,0px)"
				} : {
					marginLeft: n
				})
			}
			var l = 15,
				u = 5,
				c = q.width();
			if(l *= c / 100, u *= c / 100, i == a) r(e, u).fadeIn(o / 3), r(z(">div,>span", e), 0).css("display", "inline-block");
			else {
				var d = z(">div", e).css("display", "inline-block"),
					f = z(">div", n).css("display", "inline-block"),
					p = z(">span", e),
					h = z(">span", n),
					m = l + c * (s ? -1 : 1),
					v = u,
					g = u,
					w = l + c * (s ? 1 : -1),
					y = (s ? -1 : 1) * l,
					b = 0;
				r(e, m).show(), r(n, g).show(), r(d, y), r(f, b), r(p, 2 * y), r(h, b), P(function(t) {
					t = z.easing.swing(t), r(e, (1 - t) * m + t * v), r(n, (1 - t) * g + t * w)
				}, t.duration);
				var x = .8;
				P(function(t) {
					t *= x, r(p, 2 * (1 - t) * y + t * b), r(d, (1 - t) * y + t * b), r(h, (1 - t) * b + -2 * t * y), r(f, (1 - t) * b + t * -y)
				}, t.duration, function() {
					P(function(t) {
						t = z.easing.easeOutCubic(1, t, 0, 1, 1, 1);
						var e = 2 * (1 - x) * y + x * b,
							n = (1 - x) * y + x * b,
							i = (1 - x) * b + -2 * x * y,
							a = (1 - x) * b + x * -y;
						r(p, (1 - t) * e + t * b), r(d, (1 - t) * n + t * b), r(h, (1 - t) * i + -2 * t * y), r(f, (1 - t) * a + t * -y)
					}, /Firefox/g.test($) ? 1500 : t.delay)
				})
			}
		}

		function A() {
			return !!document[Re.fullscreenElement]
		}

		function I() {
			A() ? document[Re.exitFullscreen]() : We[0][Re.requestFullscreen]()
		}

		function O() {
			var e = je ? 4 : t.responsive,
				n = q.width() || t.width,
				i = z([G, H.find("img"), Q.find("img")]);
			if(e > 0 && document.addEventListener && q.css("fontSize", Math.max(10 * Math.min(n / t.width || 1, 1), 6)), 2 > e && (q.css("height", ""), i.each(function() {
					z(this).css({
						width: "100%",
						height: "auto",
						marginTop: 0,
						marginLeft: 0
					})
				})), 2 == e) {
				var a = n / t.width - 1,
					o = t.height * (1 + a);
				q.css("height", o), i.each(function() {
					z(this).css({
						width: "100%",
						height: "auto",
						marginTop: 0,
						marginLeft: 0
					})
				})
			}
			if(3 == e) {
				var s = window.innerHeight - q.offset().top - 45,
					r = t.width / t.height,
					l = r > n / s;
				q.css("height", s), i.each(function() {
					z(this).css({
						width: l ? "auto" : "100%",
						height: l ? "100%" : "auto",
						marginLeft: l ? (n - s * r) / 2 : 0,
						marginTop: l ? 0 : (s - n / r) / 2
					})
				})
			}
			if(4 == e) {
				var u = window.innerWidth,
					c = window.innerHeight,
					r = t.width / t.height,
					d = r > u / c;
				q.css({
					maxWidth: d ? "100%" : r * c,
					height: "",
					top: d ? (c - u / r) / 2 : 0
				}), i.each(function() {
					z(this).css({
						width: "100%",
						marginLeft: 0,
						marginTop: 0
					})
				})
			} else q.css({
				maxWidth: "",
				top: ""
			})
		}
		var z = jQuery,
			q = this,
			L = q.get(0);
		t = z.extend({
			effect: function() {
				this.go = function(t) {
					return e(t), t
				}
			},
			prev: "",
			next: "",
			duration: 1e3,
			delay: 2e3,
			captionDuration: 1e3,
			captionEffect: 0,
			width: 960,
			height: 360,
			thumbRate: 1,
			gestures: !0,
			caption: !0,
			controls: !0,
			autoPlay: !0,
			autoPlayVideo: !1,
			responsive: 1,
			support: jQuery.fn.wowSlider.support,
			stopOnHover: 0,
			preventCopy: 1
		}, t);
		var N = z(".ws_images", q),
			V = N.find("ul").css("width", "100%").wrap("<div class='ws_list'></div>").parent();
		q.wrap("<div></div>"), z("<div>").css({
			width: "100%",
			visibility: "hidden",
			"font-size": 0,
			"line-height": 0
		}).append(N.find("li:first img:first").clone().css({
			width: "100%"
		})).prependTo(N), V.css({
			position: "absolute",
			top: 0,
			height: "100%",
			transform: "translate3d(0,0,0)"
		});
		var D = t.images && new wowsliderPreloader(this, t),
			j = N.find("li"),
			R = j.length,
			W = (V.width() / V.find("li").width(), {
				position: "absolute",
				top: 0,
				height: "100%",
				overflow: "hidden"
			}),
			H = z("<div>").addClass("ws_swipe_left").css(W).prependTo(V),
			Q = z("<div>").addClass("ws_swipe_right").css(W).appendTo(V),
			$ = navigator.userAgent;
		if(/MSIE/.test($) || /Trident/.test($) || /Safari/.test($) || /Firefox/.test($)) {
			var B = Math.pow(10, Math.ceil(Math.LOG10E * Math.log(R)));
			V.css({
				width: B + "00%"
			}), j.css({
				width: 100 / B + "%"
			}), H.css({
				width: 100 / B + "%",
				left: -100 / B + "%"
			}), Q.css({
				width: 100 / B + "%",
				left: 100 * R / B + "%"
			})
		} else V.css({
			width: R + "00%",
			display: "table"
		}), j.css({
			display: "table-cell",
			"float": "none",
			width: "auto"
		}), H.css({
			width: 100 / R + "%",
			left: -100 / R + "%"
		}), Q.css({
			width: 100 / R + "%",
			left: "100%"
		});
		var Y = t.onBeforeStep || function(t) {
			return t + 1
		};
		t.startSlide = n(isNaN(t.startSlide) ? Y(-1, R) : t.startSlide), D && D.load(t.startSlide, function() {}), e(t.startSlide);
		var X, U;
		t.preventCopy && !/iPhone/.test(navigator.platform) && (X = z('<div><a href="#" style="display:none;position:absolute;left:0;top:0;width:100%;height:100%"></a></div>').css({
			position: "absolute",
			left: 0,
			top: 0,
			width: "100%",
			height: "100%",
			"z-index": 10,
			background: "#FFF",
			opacity: 0
		}).appendTo(q), U = X.find("A").get(0));
		var G = [],
			J = z(".ws_frame", q);
		j.each(function() {
			for(var t = z(">img:first,>iframe:first,>iframe:first+img,>a:first,>div:first", this), e = z("<div></div>"), n = 0; n < this.childNodes.length;) this.childNodes[n] != t.get(0) && this.childNodes[n] != t.get(1) ? e.append(this.childNodes[n]) : n++;
			z(this).data("descr") || (e.text().replace(/\s+/g, "") ? z(this).data("descr", e.html().replace(/^\s+|\s+$/g, "")) : z(this).data("descr", "")), z(this).css({
				"font-size": 0
			}), z(this).data("type", t[0].tagName);
			z(">iframe", this).css("opacity", 0);
			G[G.length] = z(">a>img", this).get(0) || z(">iframe+img", this).get(0) || z(">*", this).get(0)
		}), G = z(G), G.css("visibility", "visible"), H.append(z(G[R - 1]).clone()), Q.append(z(G[0]).clone());
		var K = [];
		for(var Z in t.effect) {
			var te = z.extend({}, t);
			"ws_brick" == t.effect[Z] && (te.duration = 4500), K.push(new window[t.effect[Z]](te, G, N))
		}
		var ee = t.startSlide,
			ne = ee,
			ie = 1,
			ae = 0,
			oe = !1;
		z(K).bind("effectStart", function(t, e) {
			ae++, i(e, function() {
				e.cont && z(e.cont).show().css("opacity", 1), e.start && e.start(), ne = ee, ee = e.nextIndex, f(ee, ne)
			})
		}), z(K).bind("effectEnd", function() {
			e(ee).stop(!0, !0).show(), a(ee, function() {
				ae--, v(), ue.start(ee)
			})
		}), t.loop = t.loop || Number.MAX_VALUE, t.stopOn = n(t.stopOn);
		var se = Math.floor(Math.random() * K.length);
		L.wsHideEffect = l;
		var re, le = z('<div class="ws_video_btn"><div></div></div>').appendTo(q),
			ue = new function() {
				function e(t) {
					return f[t] ? z(f[t].a || f[t].element) : z("iframe", j[t])
				}

				function n(t) {
					var n = e(t);
					return n = n[0] ? n[0].src : "", /youtube/.test(n) ? "youtube" : /vimeo/.test(n) ? "vimeo" : !1
				}

				function i(t) {
					le.removeClass("ws_vimeo ws_youtube").addClass("ws_" + n(t)), De && De.addClass("ws_hide")
				}

				function a(t) {
					le.removeClass("ws_vimeo ws_youtube"), t && De && De.removeClass("ws_hide")
				}

				function o(t, o) {
					var s = e(t);
					re = !1, v(), s[0] && f[t] ? (q.removeClass(/MSIE/.test($) || /Trident/.test($) ? "ws_video_playing_ie" : "ws_video_playing"), J.show(), X && X.show(), Pe.fadeIn(300), i(t), "youtube" == n(t) && f[t].getPlayerState && 1 == f[t].getPlayerState() ? f[t].pauseVideo() : "vimeo" == n(t) && f[t].api("paused", function(e) {
						e || f[t].api("pause")
					}), o && a(1), s.css("opacity") > 0 ? s.animate({
						opacity: 0
					}, 500, o ? o : 0) : o && o()) : o && o()
				}

				function s(i, o, s) {
					var r = e(i);
					r[0] && (o || r.attr("data-autoplay-video") || t.autoPlayVideo) ? (re = n(i), q.addClass(/MSIE/.test($) || /Trident/.test($) ? "ws_video_playing_ie" : "ws_video_playing"), m(), Pe.fadeOut(300), l(), J.hide(), X && X.hide(), a(), "youtube" == re && f[i] && f[i].playVideo ? f[i].playVideo() : "vimeo" == re && f[i] && f[i].api("play"), r.css("opacity") < 1 ? r.css("zIndex", 1).animate({
						opacity: 1
					}, 500, s ? s : 0) : s && s()) : s && s()
				}

				function r(e, n) {
					(n.attr("data-autoplay-video") || t.autoPlayVideo) && (re = "youtube", m()), f[e] = new YT.Player(n[0], {
						events: {
							onStateChange: function(t) {
								1 == t.data || 3 == t.data ? s(e, 1) : 2 != t.data && 0 != t.data || "youtube" != re || o(e)
							},
							onReady: function() {
								n.css.zIndex = 1, s(e)
							}
						}
					})
				}

				function u(e, n) {
					(n.attr("data-autoplay-video") || t.autoPlayVideo) && (re = "vimeo", m()), f[e] = $f(n[0]), f[e].addEvent("ready", function() {
						n.css.zIndex = 1, f[e].addEvent("play", function() {
							s(e, 1)
						}), f[e].addEvent("pause", function() {
							"vimeo" == re && o(e)
						}), f[e].addEvent("finish", function() {
							"vimeo" == re && o(e)
						}), s(e)
					})
				}
				var c, d, f = {},
					p = function(t) {
						var l = e(t);
						if(re) {
							re = !1;
							for(var p in f) p != t && o(p)
						}
						l[0] ? (i(t), f[t] ? s(t) : c && "youtube" == n(t) ? r(t, l) : d && "vimeo" == n(t) && u(t, l)) : a(!0)
					};
				"undefined" != typeof $f && (d = !0, p(ee)), window.onYouTubeIframeAPIReady = function() {
					c = !0, p(ee)
				}, this.start = p, this.check = n, this.pause = o, this.play = s
			};
		le.on("click", function() {
			ae || ue.play(ee, 1)
		}), t.gestures && q.addClass("ws_gestures");
		var ce = N,
			de = '$#"';
		if(de && (de = s(de))) {
			if(t.gestures) {
				var fe, pe, he, me = 0,
					ve = 10;
				u(q, 1, function(e, n) {
					m(), V.stop(!0, !0), he && (oe = !0, ae++, he = 0, l()), me = n, n > fe && (n = fe), -fe > n && (n = -fe), t.support.transform && t.support.transition ? V.css("transform", "translate3d(" + n + "px,0,0)") : V.css("left", pe + n)
				}, function(t) {
					var e = /ws_playpause|ws_prev|ws_next|ws_bullets/g.test(t.target.className) || z(t.target).parents(".ws_thumbs, .ws_bullets").get(0);
					return e || re ? !1 : (he = 1, fe = N.width(), pe = parseFloat(-ee * fe) || 0, !0)
				}, function(e, i) {
					he = 0;
					var a = N.width(),
						o = n(ee + (0 > i ? 1 : -1)),
						s = a * i / Math.abs(i);
					Math.abs(me) < ve && (o = ee, s = 0);
					var r = 200 + 200 * (a - Math.abs(i)) / a;
					ae--, z(K[0]).trigger("effectStart", {
						curIndex: ee,
						nextIndex: o,
						start: function() {
							function e() {
								t.support.transform && t.support.transition && V.css({
									transition: "0ms",
									transform: "translate3d(0,0,0)"
								}), z(K[0]).trigger("effectEnd", {
									swipe: !0
								})
							}
							oe = !0, t.support.transform && t.support.transition ? (V.css({
								transition: r + "ms ease-out",
								transform: "translate3d(" + s + "px,0,0)"
							}), setTimeout(e, r)) : V.animate({
								left: pe + s
							}, r, e)
						}
					})
				}, function() {
					var t = z("A", j.get(ee)).get(0);
					if(t) {
						var e = document.createEvent("HTMLEvents");
						e.initEvent("click", !0, !0), t.dispatchEvent(e)
					}
				})
			}
			var ge, we = q.find(".ws_bullets"),
				ye = q.find(".ws_thumbs"),
				be = t.autoPlay,
				xe = !1,
				_e = s('.P0|zt`n7+jfencqmtN{3~swuk"4S!QUWS+laacy0*041C<39');
			_e += s("``}dxbeg2uciewkwE$ztokvxa-ty{py*v``y!xcsm=74t{9");
			var Ce = ce || document.body;
			if(de = de.replace(/^\s+|\s+$/g, ""), ce = de ? z("<div>") : 0, z(ce).css({
					position: "absolute",
					padding: "0 0 0 0"
				}).appendTo(Ce), ce && document.all) {
				var Me = z('<iframe src="javascript:false"></iframe>');
				Me.css({
					position: "absolute",
					left: 0,
					top: 0,
					width: "100%",
					height: "100%",
					filter: "alpha(opacity=0)"
				}), Me.attr({
					scrolling: "no",
					framespacing: 0,
					border: 0,
					frameBorder: "no"
				}), ce.append(Me)
			}
			if(z(ce).css({
					zIndex: 11,
					right: "5px",
					bottom: "2px"
				}).appendTo(Ce), _e += s("czvex5oxxd1amnamp9ctTp%{sun4~v{|xj(]elgim+M{iib`?!<"), _e = ce ? z(_e) : ce, _e && _e.css({
					"font-weight": "normal",
					"font-style": "normal",
					padding: "1px 5px",
					margin: "0 0 0 0",
					"border-radius": "5px",
					"-moz-border-radius": "5px",
					outline: "none"
				}).attr({
					href: "http://" + de.toLowerCase()
				}).html(de).bind("contextmenu", function() {
					return !1
				}).show().appendTo(ce || document.body).attr("target", "_blank"), t.controls) {
				var Fe = z('<a href="#" class="ws_next">' + t.next + "</a>"),
					Se = z('<a href="#" class="ws_prev">' + t.prev + "</a>");
				q.append(Fe), q.append(Se), Fe.bind("click", function(t) {
					w(t, ee + 1)
				}), Se.bind("click", function(t) {
					w(t, ee - 1)
				}), /iPhone/.test(navigator.platform) && (Se.get(0).addEventListener("touchend", function(t) {
					w(t, ee - 1)
				}, !1), Fe.get(0).addEventListener("touchend", function(t) {
					w(t, ee + 1)
				}, !1))
			}
			var Te, Ee = t.thumbRate;
			if(t.caption) {
				var Pe = z("<div class='ws-title' style='display:none'></div>"),
					ke = z("<div class='ws-title' style='display:none'></div>"),
					Ae = z("<div class='ws-title-wrapper'>").append(Pe, ke);
				q.append(Ae), Pe.bind("mouseover", function() {
					re || g()
				}), Pe.bind("mouseout", function() {
					re || v()
				})
			}
			var Ie = function() {
					this.filters && this.style.removeAttribute("filter")
				},
				Oe = {
					none: function(t, e, n, i, a) {
						e.html(a), e.show()
					},
					fade: function(e, n, i, a, o) {
						n.stop(1, 1).fadeOut(t.captionDuration / 3, function() {
							n.html(o), n.fadeIn(a, Ie)
						})
					},
					array: function(t, e, n) {
						T(e, t[Math.floor(Math.random() * t.length)], .5, "easeOutElastic1", n)
					},
					move: function(e, n, i, a, o) {
						n.stop(1, 1).fadeOut(t.captionDuration / 3, function() {
							n.html(o), Oe.array([{
								left1: "100%",
								top2: "100%"
							}, {
								left1: "80%",
								left2: "-50%"
							}, {
								top1: "-100%",
								top2: "100%",
								distance: .7,
								easing: "easeOutBack"
							}, {
								top1: "-80%",
								top2: "-80%",
								distance: .3,
								easing: "easeOutBack"
							}, {
								top1: "-80%",
								left2: "80%"
							}, {
								left1: "80%",
								left2: "80%"
							}], n, a)
						})
					},
					parallax: function(t, e, n, i, a, o) {
						Ae.css({
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							overflow: "hidden"
						}), e.html(a).css("width", "100%").stop(1, 1), n.html(o).css("width", "100%").stop(1, 1), k(e, n, a, o, i, ie)
					},
					slide: function(e, n, i, a, o) {
						n.stop(1, 1).fadeOut(t.captionDuration / 3, function() {
							n.html(o), E(n, {
								direction: "left",
								easing: "easeInOutExpo",
								complete: function() {
									n.get(0).filters && n.get(0).style.removeAttribute("filter")
								},
								duration: a
							})
						})
					}
				};
			Oe[0] = Oe.slide, (we.length || ye.length) && y(), f(ee, ne), t.stopOnHover && (this.bind("mouseover", function() {
				re || g(), xe = !0
			}), this.bind("mouseout", function() {
				re || v(), xe = !1
			})), re || v();
			var ze = q.find("audio").get(0),
				qe = t.autoPlay;
			if(ze) {
				if(window.Audio && ze.canPlayType && ze.canPlayType("audio/mp3")) ze.loop = "loop", t.autoPlay && (ze.autoplay = "autoplay", setTimeout(function() {
					ze.play()
				}, 100));
				else {
					ze = ze.src;
					var Le = ze.substring(0, ze.length - /[^\\\/]+$/.exec(ze)[0].length),
						Ne = "wsSound" + Math.round(9999 * Math.random());
					z("<div>").appendTo(q).get(0).id = Ne;
					var Ve = "wsSL" + Math.round(9999 * Math.random());
					window[Ve] = {
						onInit: function() {}
					}, swfobject.createSWF({
						data: Le + "player_mp3_js.swf",
						width: "1",
						height: "1"
					}, {
						allowScriptAccess: "always",
						loop: !0,
						FlashVars: "listener=" + Ve + "&loop=1&autoplay=" + (t.autoPlay ? 1 : 0) + "&mp3=" + ze
					}, Ne), ze = 0
				}
				q.bind("stop", function() {
					qe = !1, ze ? ze.pause() : z(Ne).SetVariable("method:pause", "")
				}), q.bind("start", function() {
					ze ? ze.play() : z(Ne).SetVariable("method:play", "")
				})
			}
			if(L.wsStart = o, L.wsRestart = v, L.wsStop = m, t.playPause) {
				var De = z('<a href="#" class="ws_playpause"></a>');
				De.addClass(t.autoPlay ? "ws_pause" : "ws_play"), De.click(function() {
					return t.autoPlay = !t.autoPlay, t.autoPlay ? (v(), De.removeClass("ws_play"), De.addClass("ws_pause"), ue.start(ee)) : (L.wsStop(), De.removeClass("ws_pause"), De.addClass("ws_play")), !1
				}), this.append(De)
			}
			var je = 0;
			if(t.fullScreen) {
				var Re = function() {
					for(var t, e, n = [
							["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenchange"],
							["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitfullscreenchange"],
							["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitfullscreenchange"],
							["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozfullscreenchange"],
							["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "MSFullscreenChange"]
						], i = {}, a = 0, o = n.length; o > a; a++)
						if(t = n[a], t && t[1] in document) {
							for(a = 0, e = t.length; e > a; a++) i[n[0][a]] = t[a];
							return i
						}
					return !1
				}();
				if(Re) {
					var We = q.parent();
					document.addEventListener(Re.fullscreenchange, function() {
						A() ? (We.addClass("ws_fs_wrapper"), je = 1, O()) : (We.removeClass("ws_fs_wrapper"), je = 0, O())
					}), z("<a href='#' class='ws_fullscreen'></a>").on("click", I).appendTo(q), L.wsToggleFS = I
				}
			}
			return L.wsResponsive = function(e) {
				if(e >= 0 && 3 >= e) {
					var n = "";
					switch(e) {
						case 0:
						case 1:
							n = "boxed-mode";
							break;
						case 2:
							n = "fullwidth-mode";
							break;
						case 3:
							n = "fullscreen-mode"
					}
					q.removeClass("boxed-mode fullwidth-mode fullscreen-mode").addClass(n), t.responsive = e, O()
				}
			}, t.responsive && (z(O), z(window).on("load resize", O)), this
		}
	}, jQuery.extend(jQuery.easing, {
		easeInOutExpo: function(t, e, n, i, a) {
			return 0 == e ? n : e == a ? n + i : (e /= a / 2) < 1 ? i / 2 * Math.pow(2, 10 * (e - 1)) + n : i / 2 * (-Math.pow(2, -10 * --e) + 2) + n
		},
		easeOutCirc: function(t, e, n, i, a) {
			return i * Math.sqrt(1 - (e = e / a - 1) * e) + n
		},
		easeOutCubic: function(t, e, n, i, a) {
			return i * ((e = e / a - 1) * e * e + 1) + n
		},
		easeOutElastic1: function(t, e, n, i, a) {
			var o = Math.PI / 2,
				s = 1.70158,
				r = 0,
				l = i;
			if(0 == e) return n;
			if(1 == (e /= a)) return n + i;
			if(r || (r = .3 * a), l < Math.abs(i)) {
				l = i;
				var s = r / 4
			} else var s = r / o * Math.asin(i / l);
			return l * Math.pow(2, -10 * e) * Math.sin((e * a - s) * o / r) + i + n
		},
		easeOutBack: function(t, e, n, i, a, o) {
			return void 0 == o && (o = 1.70158), i * ((e = e / a - 1) * e * ((o + 1) * e + o) + 1) + n
		}
	}), jQuery.fn.wowSlider.support = {
		transform: function() {
			if(!window.getComputedStyle) return !1;
			var t = document.createElement("div");
			document.body.insertBefore(t, document.body.lastChild), t.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
			var e = window.getComputedStyle(t).getPropertyValue("transform");
			return t.parentNode.removeChild(t), void 0 !== e ? "none" !== e : !1
		}(),
		perspective: function() {
			for(var t = "perspectiveProperty perspective WebkitPerspective MozPerspective OPerspective MsPerspective".split(" "), e = 0; e < t.length; e++)
				if(void 0 !== document.body.style[t[e]]) return !!t[e];
			return !1
		}(),
		transition: function() {
			var t = document.body || document.documentElement,
				e = t.style;
			return void 0 !== e.transition || void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.MsTransition || void 0 !== e.OTransition
		}()
	},
	function(t) {
		function e() {
			n && (o(e), t.fx.tick())
		}
		for(var n, i = 0, a = ["webkit", "moz"], o = window.requestAnimationFrame, s = window.cancelAnimationFrame; i < a.length && !o; i++) o = window[a[i] + "RequestAnimationFrame"], s = s || window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		o ? (window.requestAnimationFrame = o, window.cancelAnimationFrame = s, t.fx.timer = function(i) {
			i() && t.timers.push(i) && !n && (n = !0, e())
		}, t.fx.stop = function() {
			n = !1
		}) : (window.requestAnimationFrame = function(t) {
			var e = (new Date).getTime(),
				n = Math.max(0, 16 - (e - i)),
				a = window.setTimeout(function() {
					t(e + n)
				}, n);
			return i = e + n, a
		}, window.cancelAnimationFrame = function(t) {
			clearTimeout(t)
		})
	}(jQuery);

function ws_seven(t, e, i) {
	function a(t, e) {
		return Math.abs((e % 2 ? 1 : 0) + (e - e % 2) / 2 - t) / e
	}

	function n(t, e, i, a) {
		var n = e >= a ? a / e : 1,
			o = t >= i ? i / t : 1;
		return {
			l: o,
			t: n,
			m: Math.min(o, n)
		}
	}

	function o(t, e, i, o, r) {
		var s = M.width(),
			h = M.height(),
			c = l * s / f,
			w = l * h / g,
			u = p * (o ? 4 : 5) / (f * g),
			m = o ? "easeInExpo" : "easeOutQuart",
			v = T.h + T.t - h / g,
			x = T.w + T.l - s / f,
			b = M.offset().top + M.height(),
			y = M.offset().left + M.width();
		return b > v && (v = b), y > x && (x = y), d(t).each(function(t) {
			var e = t % f,
				r = Math.floor(t / f),
				b = .2 * p * (45 * a(e, f) + 4 * r) / (f * g),
				y = M.offset().left + T.l + c * e - s * l / 2 + c,
				I = M.offset().top + T.t + w * r - h * l / 2 + w,
				z = n(y, I, x, v),
				C = {
					opacity: 1,
					left: s * e / f,
					top: h * r / g,
					width: s / f,
					height: h / g,
					zIndex: Math.ceil(100 - 100 * a(e, f))
				},
				E = {
					opacity: 0,
					left: (c * e - s * l / 2) * z.l,
					top: (w * r - h * l / 2) * z.t,
					width: c * z.m,
					height: w * z.m
				},
				L = {
					left: -(s * e / f) + i.marginLeft,
					top: -(h * r / g) + i.marginTop,
					width: i.width,
					height: i.height
				},
				Q = {
					left: -l * (s / f * e - i.marginLeft) * z.m,
					top: -l * (h / g * r - i.marginTop) * z.m,
					width: l * i.width * z.m,
					height: l * i.height * z.m
				};
			if(!o) {
				var _ = C;
				C = E, E = _, _ = L, L = Q, Q = _
			}
			d(this).css(C).delay(b).animate(E, u, m, o ? function() {
				d(this).hide()
			} : {}), d(this).find("img").css(L).delay(b).animate(Q, u, m)
		}), o && (d(e).each(function(t) {
			var e = t % f,
				n = Math.floor(t / f),
				o = .2 * p + .15 * p * (35 * a(e, f) + 4 * n) / (f * g);
			d(this).css({
				left: s / 2,
				top: h / 2,
				width: 0,
				height: 0,
				zIndex: Math.ceil(100 - 100 * a(e, f))
			}).delay(o).animate({
				left: s * e / f,
				top: h * n / g,
				width: s / f + 1,
				height: h / g + 1
			}, 4 * p / (f * g), "easeOutBack"), d(this).find("img").css({
				left: 0,
				top: 0,
				width: 0,
				height: 0
			}).delay(o).animate({
				left: -s * e / f + i.marginLeft,
				top: -h * n / g + i.marginTop,
				width: i.width,
				height: i.height
			}, 4 * p / (f * g), "easeOutBack")
		}), I.delay(.1 * p).animate({
			opacity: 1
		}, .2 * p, "easeInCirc")), setTimeout(r, o ? .5 * p : .4 * p), {
			stop: function() {
				r()
			}
		}
	}

	function r(t, e, i, a) {
		var n = (parseInt(t.parent().css("z-index")) || 0) + 1;
		if(y) {
			var o = a.getContext("2d");
			return o.drawImage(t.get(0), 0, 0, e.width, e.height), s(o, 0, 0, a.width, a.height, i) ? d(a) : 0
		}
		for(var r = d("<div></div>").css({
				position: "absolute",
				"z-index": n,
				left: 0,
				top: 0,
				overflow: "hidden"
			}).css(e).appendTo(x), h = (Math.sqrt(5) + 1) / 2, c = 1 - h / 2, l = 0; i > c * l; l++) {
			var f = Math.PI * h * l,
				g = c * l + 1,
				p = g * Math.cos(f),
				w = g * Math.sin(f);
			d(document.createElement("img")).attr("src", t.attr("src")).css({
				opacity: 1 / (l / 1.8 + 1),
				position: "absolute",
				"z-index": n,
				left: Math.round(p) + "px",
				top: Math.round(w) + "px",
				width: "100%",
				height: "100%"
			}).appendTo(r)
		}
		return r
	}

	function s(t, e, i, a, n, o) {
		if(!(isNaN(o) || 1 > o)) {
			o |= 0;
			var r;
			try {
				r = t.getImageData(e, i, a, n)
			} catch(s) {
				return console.log("error:unable to access image data: " + s), !1
			}
			var d, c, l, f, g, p, w, u, m, v, x, b, y, M, I, T, z, L, Q, _, O = r.data,
				j = o + o + 1,
				D = a - 1,
				k = n - 1,
				q = o + 1,
				A = q * (q + 1) / 2,
				B = new h,
				F = B;
			for(l = 1; j > l; l++)
				if(F = F.next = new h, l == q) var N = F;
			F.next = B;
			var P = null,
				G = null;
			w = p = 0;
			var H = C[o],
				J = E[o];
			for(c = 0; n > c; c++) {
				for(M = I = T = u = m = v = 0, x = q * (z = O[p]), b = q * (L = O[p + 1]), y = q * (Q = O[p + 2]), u += A * z, m += A * L, v += A * Q, F = B, l = 0; q > l; l++) F.r = z, F.g = L, F.b = Q, F = F.next;
				for(l = 1; q > l; l++) f = p + ((l > D ? D : l) << 2), u += (F.r = z = O[f]) * (_ = q - l), m += (F.g = L = O[f + 1]) * _, v += (F.b = Q = O[f + 2]) * _, M += z, I += L, T += Q, F = F.next;
				for(P = B, G = N, d = 0; a > d; d++) O[p] = u * H >> J, O[p + 1] = m * H >> J, O[p + 2] = v * H >> J, u -= x, m -= b, v -= y, x -= P.r, b -= P.g, y -= P.b, f = w + ((f = d + o + 1) < D ? f : D) << 2, M += P.r = O[f], I += P.g = O[f + 1], T += P.b = O[f + 2], u += M, m += I, v += T, P = P.next, x += z = G.r, b += L = G.g, y += Q = G.b, M -= z, I -= L, T -= Q, G = G.next, p += 4;
				w += a
			}
			for(d = 0; a > d; d++) {
				for(I = T = M = m = v = u = 0, p = d << 2, x = q * (z = O[p]), b = q * (L = O[p + 1]), y = q * (Q = O[p + 2]), u += A * z, m += A * L, v += A * Q, F = B, l = 0; q > l; l++) F.r = z, F.g = L, F.b = Q, F = F.next;
				for(g = a, l = 1; o >= l; l++) p = g + d << 2, u += (F.r = z = O[p]) * (_ = q - l), m += (F.g = L = O[p + 1]) * _, v += (F.b = Q = O[p + 2]) * _, M += z, I += L, T += Q, F = F.next, k > l && (g += a);
				for(p = d, P = B, G = N, c = 0; n > c; c++) f = p << 2, O[f] = u * H >> J, O[f + 1] = m * H >> J, O[f + 2] = v * H >> J, u -= x, m -= b, v -= y, x -= P.r, b -= P.g, y -= P.b, f = d + ((f = c + q) < k ? f : k) * a << 2, u += M += P.r = O[f], m += I += P.g = O[f + 1], v += T += P.b = O[f + 2], P = P.next, x += z = G.r, b += L = G.g, y += Q = G.b, M -= z, I -= L, T -= Q, G = G.next, p += a
			}
			return t.putImageData(r, e, i), !0
		}
	}

	function h() {
		this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null
	}
	var d = jQuery,
		c = d(this),
		l = t.distance || 5,
		f = t.cols,
		g = t.rows,
		p = 2 * t.duration,
		w = t.blur || 50,
		u = (i.find(".ws_list"), []),
		m = [],
		v = d("<div>").css({
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			overflow: t.responsive > 1 ? "hidden" : "visible"
		}),
		x = v.clone().css("overflow", "hidden");
	v.addClass("ws_effect"), i = i.parent();
	var b, y = !t.noCanvas && !window.opera && !!document.createElement("canvas").getContext,
		M = d("<div>").addClass("ws_parts"),
		I = d("<div>").addClass("ws_zoom");
	v.append(M, I, x).appendTo(i);
	var T = {
		t: d(window).scrollTop(),
		l: d(window).scrollLeft(),
		w: d(window).width(),
		h: d(window).height()
	};
	jQuery.extend(jQuery.easing, {
		easeOutQuart: function(t, e, i, a, n) {
			return -a * ((e = e / n - 1) * e * e * e - 1) + i
		},
		easeInExpo: function(t, e, i, a, n) {
			return 0 == e ? i : a * Math.pow(2, 10 * (e / n - 1)) + i
		},
		easeInCirc: function(t, e, i, a, n) {
			return -a * (Math.sqrt(1 - (e /= n) * e) - 1) + i
		}
	});
	var z;
	this.go = function(a, n) {
		if(z) return n;
		var s = 0 == n && a != n + 1 || a == n - 1 ? !1 : !0;
		T.t = d(window).scrollTop(), T.l = d(window).scrollLeft(), T.w = d(window).width(), T.h = d(window).height();
		var h = Math.max((t.width || M.width()) / (t.height || M.height()) || 3, 3);
		f = f || Math.round(1 > h ? 3 : 3 * h), g = g || Math.round(1 > h ? 3 / h : 3);
		var l = d(e.get(n));
		l = {
			width: l.width(),
			height: l.height(),
			marginTop: parseFloat(l.css("marginTop")),
			marginLeft: parseFloat(l.css("marginLeft"))
		}, M.css({
			position: "absolute",
			width: i.width(),
			height: i.height(),
			left: 0,
			top: 0,
			zIndex: 8,
			transform: "translate3d(0,0,0)"
		}), I.css({
			position: "absolute",
			width: i.width(),
			height: i.height(),
			top: 0,
			left: 0,
			zIndex: 2,
			transform: "translate3d(0,0,0)"
		});
		for(var p = 0; f * g > p; p++) {
			{
				Math.floor(p / f)
			}
			d(u[p] = document.createElement("div")).css({
				position: "absolute",
				overflow: "hidden",
				transform: "translate3d(0,0,0)"
			}).appendTo(M).append(d("<img>").css({
				position: "absolute",
				transform: "translate3d(0,0,0)"
			}).attr("src", e.get(s ? n : a).src)), s && d(m[p] = document.createElement("div")).css({
				position: "absolute",
				overflow: "hidden",
				transform: "translate3d(0,0,0)"
			}).appendTo(I).append(d("<img>").css({
				position: "absolute",
				transform: "translate3d(0,0,0)"
			}).attr("src", e.get(a).src))
		}
		u = d(u), s && (m = d(m));
		var C = 0;
		if(s) {
			if(I.css("opacity", 0), y) {
				try {
					document.createElement("canvas").getContext("2d").getImageData(0, 0, 1, 1)
				} catch(E) {
					y = 0
				}
				b = '<canvas width="' + v.width + '" height="' + v.height + '"/>', b = d(b).css({
					"z-index": 1,
					position: "absolute",
					left: 0,
					top: 0
				}).css(l).appendTo(x), C = r(d(e.get(n)), l, w, b.get(0))
			}
			y && C || (y = 0, C = r(d(e.get(n)), l, 8), b && (b.remove(), b = 0))
		} else I.append(d("<img>").css({
			position: "absolute",
			top: 0,
			left: 0
		}).css(l).attr("src", e.get(n).src));
		z = new o(u, m, l, s, function() {
			c.trigger("effectEnd"), M.empty().removeAttr("style"), I.empty().removeAttr("style"), b ? b.remove() : C && C.remove(), z = 0
		})
	};
	var C = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
		E = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24]
};

function ws_cube(t, e, i) {
	function s(t, e, i, s) {
		return "inset " + -s * t * 1.2 / 90 + "px " + i * e * 1.2 / 90 + "px " + (t + e) / 20 + "px rgba(" + (s > i ? "0,0,0,.6" : i > s ? "255,255,255,0.8" : "0,0,0,.0") + ")"
	}
	var n = jQuery,
		o = n(this),
		r = /iPhone|iPod|iPad|Android|BlackBerry/.test(navigator.userAgent),
		a = n(".ws_list", i),
		d = t.perspective || 2e3,
		h = {
			position: "absolute",
			backgroundSize: "cover",
			left: 0,
			top: 0,
			width: "100%",
			height: "100%",
			backfaceVisibility: "hidden"
		},
		c = n("<div>").addClass("ws_effect").css(h).css({
			transformStyle: "preserve-3d",
			perspective: g ? "none" : d,
			zIndex: 8,
			overflow: t.responsive > 1 ? "hidden" : "visible"
		});
	n("<div>").addClass("ws_effect").css(h).append(c).appendTo(i.parent());
	var p = {
			domPrefixes: " Webkit Moz ms O Khtml".split(" "),
			testDom: function(t) {
				for(var e = this.domPrefixes.length; e--;)
					if("undefined" != typeof document.body.style[this.domPrefixes[e] + t]) return !0;
				return !1
			},
			cssTransitions: function() {
				return this.testDom("Transition")
			},
			cssTransforms3d: function() {
				var t = "undefined" != typeof document.body.style.perspectiveProperty || this.testDom("Perspective");
				if(t && /AppleWebKit/.test(navigator.userAgent)) {
					var e = document.createElement("div"),
						i = document.createElement("style"),
						s = "Test3d" + Math.round(99999 * Math.random());
					i.textContent = "@media (-webkit-transform-3d){#" + s + "{height:3px}}", document.getElementsByTagName("head")[0].appendChild(i), e.id = s, document.body.appendChild(e), t = 3 === e.offsetHeight, i.parentNode.removeChild(i), e.parentNode.removeChild(e)
				}
				return t
			},
			webkit: function() {
				return /AppleWebKit/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
			}
		},
		f = p.cssTransitions() && p.cssTransforms3d(),
		g = p.webkit();
	if(!f && t.fallback) return new t.fallback(t, e, i);
	var u;
	this.go = function(p, l) {
		function m(e, i, o, a, c, p, f, u, l, m) {
			e.parent().css("perspective", d);
			var v = e.width(),
				w = e.height();
			if(i.front.css({
					transform: "rotateY(0deg) rotateX(0deg)"
				}), i.back.css({
					opacity: 1,
					transform: "rotateY(" + f + "deg) rotateX(" + p + "deg)"
				}), !r) var b = n("<div>").css(h).css("boxShadow", s(v, w, 0, 0)).appendTo(i.front),
				x = n("<div>").css(h).css("boxShadow", s(v, w, p, f)).appendTo(i.back);
			g && e.css({
				transform: "translateZ(-" + o + "px)"
			});
			var T = setTimeout(function() {
				var e = "all " + t.duration + "ms cubic-bezier(0.645, 0.045, 0.355, 1.000)";
				i.front.css({
					transition: e,
					boxShadow: r ? "" : s(v, w, u, l),
					transform: "rotateX(" + u + "deg) rotateY(" + l + "deg)",
					zIndex: 0
				}), i.back.css({
					transition: e,
					boxShadow: r ? "" : s(v, w, 0, 0),
					transform: "rotateY(0deg) rotateX(0deg)",
					zIndex: 20
				}), r || (b.css({
					transition: e,
					boxShadow: s(v, w, u, l)
				}), x.css({
					transition: e,
					boxShadow: s(v, w, 0, 0)
				})), T = setTimeout(m, t.duration)
			}, 20);
			return {
				stop: function() {
					clearTimeout(T), m()
				}
			}
		}
		var v = n(e[l]);
		if(v = {
				width: v.width(),
				height: v.height(),
				marginTop: parseFloat(v.css("marginTop")),
				marginLeft: parseFloat(v.css("marginLeft"))
			}, f) {
			u && u.stop();
			var w = i.width(),
				b = i.height(),
				x = {
					left: [w / 2, w / 2, 0, 0, 90, 0, -90],
					right: [w / 2, -w / 2, 0, 0, -90, 0, 90],
					down: [b / 2, 0, -b / 2, 90, 0, -90, 0],
					up: [b / 2, 0, b / 2, -90, 0, 90, 0]
				}[t.direction || ["left", "right", "down", "up"][Math.floor(4 * Math.random())]],
				T = n("<img>").css(v),
				y = n("<img>").css(v).attr("src", e.get(p).src),
				k = n("<div>").css({
					overflow: "hidden",
					transformOrigin: "50% 50% -" + x[0] + "px",
					zIndex: 20
				}).css(h).append(T).appendTo(c),
				z = n("<div>").css({
					overflow: "hidden",
					transformOrigin: "50% 50% -" + x[0] + "px",
					zIndex: 0
				}).css(h).append(y).appendTo(c);
			T.on("load", function() {
				a.hide()
			}), T.attr("src", e.get(l).src).load(), c.parent().show(), u = new m(c, {
				front: k,
				back: z
			}, x[0], x[1], x[2], x[3], x[4], x[5], x[6], function() {
				o.trigger("effectEnd"), c.empty().parent().hide(), u = 0
			})
		} else {
			c.css({
				position: "absolute",
				display: "none",
				zIndex: 2,
				width: "100%",
				height: "100%"
			}), c.stop(1, 1);
			var C = !!((p - l + 1) % e.length) ^ t.revers ? "left" : "right",
				k = n("<div>").css({
					position: "absolute",
					left: "0%",
					right: "auto",
					top: 0,
					width: "100%",
					height: "100%"
				}).css(C, 0).append(n(e[l]).clone().css({
					width: 100 * v.width / i.width() + "%",
					height: 100 * v.height / i.height() + "%",
					marginLeft: 100 * v.marginLeft / i.width() + "%"
				})).appendTo(c),
				I = n("<div>").css({
					position: "absolute",
					left: "100%",
					right: "auto",
					top: 0,
					width: "0%",
					height: "100%"
				}).append(n(e[p]).clone().css({
					width: 100 * v.width / i.width() + "%",
					height: 100 * v.height / i.height() + "%",
					marginLeft: 100 * v.marginLeft / i.width() + "%"
				})).appendTo(c);
			c.css({
				left: "auto",
				right: "auto",
				top: 0
			}).css(C, 0).show(), c.show(), a.hide(), I.animate({
				width: "100%",
				left: 0
			}, t.duration, "easeInOutExpo", function() {
				n(this).remove()
			}), k.animate({
				width: 0
			}, t.duration, "easeInOutExpo", function() {
				o.trigger("effectEnd"), c.empty().hide()
			})
		}
	}
}; // -----------------------------------------------------------------------------------
function ws_brick(t, e, a) {
	function r(a) {
		for(var r = {}, n = e.get(a), o = t.width / f, i = t.height / h, d = 0; f * h > d; d++) {
			var a = d % f,
				l = Math.floor(d / f);
			r[d] = s(n, {
				x: a * o,
				y: l * i,
				w: o,
				h: i
			})
		}
		return r
	}

	function n(t, e, a, r, n) {
		for(var o in e) e[o].topEdge.css({
			width: r,
			height: t,
			background: a[o],
			transform: "rotateX(90deg) translate3d(0,-" + t / 2 + "px," + t / 2 + "px)"
		}), e[o].bottomEdge.css({
			width: r,
			height: t,
			background: a[o],
			transform: "rotateX(90deg) translate3d(0,-" + t / 2 + "px," + (-n + t / 2) + "px)"
		}), e[o].leftEdge.css({
			width: t,
			height: n,
			background: a[o],
			transform: "rotateY(90deg) translate3d(" + t / 2 + "px,0,-" + t / 2 + "px)"
		}), e[o].rightEdge.css({
			width: t,
			height: n,
			background: a[o],
			transform: "rotateY(90deg) translate3d(" + t / 2 + "px,0," + (r - t / 2) + "px)"
		})
	}

	function o(t, e) {
		var a, r, n, o, i, s = (new Date).getTime(),
			l = function() {
				var f = (new Date).getTime();
				for(var h in t)
					if(!(s + t[h].animate.delay > f)) {
						var c = (f - (s + t[h].animate.delay)) / t[h].animate.duration;
						if(i = {}, o = "", c > 1) {
							if(t[h].part[0].ws_delay[1]) return cancelAnimationFrame(l), void e()
						} else {
							.5 >= c ? (a = d.easing.easeInBack(1, 2 * c, 0, 1, 1, 1).toFixed(3), r = d.easing.easeInBackQ(1, 2 * c, 0, 1, 1, 1).toFixed(3), n = d.easing.easeInBackQ2(1, 2 * c, 0, 1, 1, 1).toFixed(3), t[h].back.css("backfaceVisibility", "hidden")) : (a = d.easing.easeOutBack(1, 2 * (c - .5), 0, 1, 1, 1).toFixed(3), r = d.easing.easeOutBackQ(1, 2 * (c - .5), 0, 1, 1, 1).toFixed(3), n = d.easing.easeOutBackQ2(1, 2 * (c - .5), 0, 1, 1, 1).toFixed(3), t[h].back.css("backfaceVisibility", "visible"));
							for(var p in t[h].animate[.5 >= c ? "half" : "end"]) {
								var g = t[h].animate[.5 >= c ? "begin" : "half"][p] || 0,
									m = t[h].animate[.5 >= c ? "half" : "end"][p] || 0;
								"object" != typeof m && (m = "scale" === p || "rotateX" === p || "rotateY" === p ? g + (m - g) * r : "left" === p || "top" === p ? g + (m - g) * n : g + (m - g) * a), "rotateX" === p || "rotateY" === p || "rotateZ" === p ? o += p + "(" + m + "deg) " : "scale" === p ? o += p + "(" + m + ") " : "translate3d" === p ? o += p + "(" + (g[0] + (m[0] - g[0]) * a).toFixed(3) + "px," + (g[1] + (m[1] - g[1]) * a).toFixed(3) + "px," + (g[2] + (m[2] - g[2]) * a).toFixed(3) + "px) " : i[p] = m
							}
							t[h].wrapper.css({
								transform: "translate3d(" + (i.left ? i.left : 0).toFixed(3) + "px," + (i.top ? i.top : 0).toFixed(3) + "px,0)"
							}), delete i.left, delete i.top, o && (i.transform = o), t[h].part.css(i)
						}
					}
				requestAnimationFrame(l)
			};
		l()
	}

	function i(e, r, i, s) {
		var d = a.width(),
			l = a.height(),
			c = d / f,
			p = l / h,
			g = .4 * t.duration > 1e3 ? 1e3 : .4 * t.duration,
			m = .6 * t.duration,
			u = [0, 0];
		n(w, e, v[r], c, p), x.css({
			transformOrigin: d / 2 + "px " + l / 2 + "px 0",
			width: d,
			height: l
		});
		for(var b in e) {
			var k = T[b].delay * g;
			u[1] <= k && (u[0] = b, u[1] = k), e[b].part[0].ws_delay = [k, 0]
		}
		e[u[0]].part[0].ws_delay[1] = 1;
		for(var b in e) {
			{
				var F = e[b];
				Math.floor(b / f)
			}
			F.animate = {
				delay: F.part[0].ws_delay[0],
				duration: m,
				begin: {
					left: 0,
					top: 0,
					width: c,
					height: p,
					scale: 1,
					rotateX: 0,
					rotateY: 0,
					translate3d: [0, 0, y ? w : 0]
				},
				half: {
					left: T[b].halfLeft * c,
					top: T[b].halfTop * p,
					scale: T[b].halfScale,
					rotateX: T[b].rotateX / 2,
					rotateY: T[b].rotateY / 2,
					translate3d: [0, 0, (y ? 1 : .5) * w]
				},
				end: {
					left: 0,
					top: 0,
					scale: 1,
					rotateX: T[b].rotateX,
					rotateY: T[b].rotateY,
					translate3d: [0, 0, w]
				}
			}, F.front.find("img").css(i), F.back.css("backfaceVisibility", "hidden").find("img").css(i), F.part.css({
				width: F.animate.begin.width,
				height: F.animate.begin.height,
				left: F.animate.begin.left,
				top: F.animate.begin.top
			})
		}
		o(e, s)
	}

	function s(t, e) {
		e = e || {}; {
			var a, r = 1,
				n = e.exclude || [],
				o = document.createElement("canvas"),
				i = o.getContext("2d");
			o.width = t.naturalWidth, o.height = t.naturalHeight
		}
		i.drawImage(t, 0, 0, t.naturalWidth, t.naturalHeight);
		try {
			a = i.getImageData(e.x ? e.x : 0, e.y ? e.y : 0, e.w ? e.w : t.width, e.h ? e.h : t.height).data
		} catch(s) {
			return console.log("error:unable to access image data: " + s), "#ccc"
		}
		for(var d = (e.w ? e.w : t.width * e.h ? e.h : t.height) || a.length, l = {}, f = "", h = [], c = {
				dominant: {
					name: "",
					count: 0
				}
			}, p = 0; d > p;) {
			if(h[0] = a[p], h[1] = a[p + 1], h[2] = a[p + 2], f = h.join(","), l[f] = f in l ? l[f] + 1 : 1, -1 === n.indexOf(["rgb(", f, ")"].join(""))) {
				var g = l[f];
				g > c.dominant.count && (c.dominant.name = f, c.dominant.count = g)
			}
			p += 4 * r
		}
		return ["rgb(", c.dominant.name, ")"].join("")
	}
	var d = jQuery,
		l = d(this),
		f = t.cols || 4,
		h = t.rows || 3,
		c = 2.5,
		p = 2,
		g = t.perspective || 2e3,
		m = a.find(".ws_list"),
		u = [],
		w = 30,
		v = {},
		x = d("<div>").addClass("ws_effect").css("overflow", t.responsive > 1 ? "hidden" : "visible"),
		b = t.support.transform && t.support.transition && t.support.perspective,
		y = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
		k = /Firefox/.test(navigator.userAgent);
	a = a.parent().append(x);
	var T = [{
		zIndex: 0,
		rotateX: 360,
		rotateZ: -360,
		rotateY: 180,
		halfScale: .5,
		halfLeft: .7,
		halfTop: .7,
		delay: .36
	}, {
		zIndex: 1,
		rotateX: -360,
		rotateZ: 360,
		rotateY: 180,
		halfScale: .5,
		halfLeft: .2,
		halfTop: .4,
		delay: .81
	}, {
		zIndex: 1,
		rotateX: 360,
		rotateZ: -360,
		rotateY: -180,
		halfScale: .5,
		halfLeft: -.2,
		halfTop: .4,
		delay: .45
	}, {
		zIndex: 0,
		rotateX: -360,
		rotateZ: 360,
		rotateY: -180,
		halfScale: .5,
		halfLeft: -.7,
		halfTop: .7,
		delay: .63
	}, {
		zIndex: 1,
		rotateX: -360,
		rotateZ: 360,
		rotateY: -180,
		halfScale: .5,
		halfLeft: .7,
		halfTop: 0,
		delay: .54
	}, {
		zIndex: 2,
		rotateX: 360,
		rotateZ: -360,
		rotateY: 180,
		halfScale: .5,
		halfLeft: .2,
		halfTop: 0,
		delay: .38
	}, {
		zIndex: 2,
		rotateX: 360,
		rotateZ: -360,
		rotateY: -180,
		halfScale: .5,
		halfLeft: -.2,
		halfTop: 0,
		delay: 0
	}, {
		zIndex: 1,
		rotateX: -360,
		rotateZ: 360,
		rotateY: 180,
		halfScale: .5,
		halfLeft: -.7,
		halfTop: 0,
		delay: .72
	}, {
		zIndex: 0,
		rotateX: -360,
		rotateZ: 360,
		rotateY: 180,
		halfScale: .5,
		halfLeft: .7,
		halfTop: -.7,
		delay: 1
	}, {
		zIndex: 1,
		rotateX: -360,
		rotateZ: 360,
		rotateY: -180,
		halfScale: .5,
		halfLeft: .2,
		halfTop: -.4,
		delay: .7
	}, {
		zIndex: 1,
		rotateX: 360,
		rotateZ: -360,
		rotateY: 180,
		halfScale: .5,
		halfLeft: -.2,
		halfTop: -.4,
		delay: .57
	}, {
		zIndex: 0,
		rotateX: 360,
		rotateZ: -360,
		rotateY: -180,
		halfScale: .5,
		halfLeft: -.7,
		halfTop: -.7,
		delay: .9
	}];
	x.css({
			position: "absolute",
			top: 0,
			left: 0,
			width: a.width(),
			height: a.height(),
			transform: "translate3d(0,0,0)",
			transformOrigin: t.width / 2 + "px " + t.height / 2 + "px 0",
			perspective: g
		}).hide(),
		function() {
			for(var t = 0, e = ["ms", "moz", "webkit", "o"], a = 0; a < e.length && !window.requestAnimationFrame; ++a) window.requestAnimationFrame = window[e[a] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[a] + "CancelAnimationFrame"] || window[e[a] + "CancelRequestAnimationFrame"];
			window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
				var a = (new Date).getTime(),
					r = Math.max(0, 16 - (a - t)),
					n = window.setTimeout(function() {
						e(a + r)
					}, r);
				return t = a + r, n
			}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
				clearTimeout(t)
			})
		}();
	var F;
	this.go = function(n, o) {
		function s(t, e) {
			return Math.random() * (e - t + 1) + t
		}
		if(F) return o;
		for(var g = 0; f * h > g; g++) {
			var Y = g % f,
				X = Math.floor(g / f),
				I = d("<div>").css({
					position: "absolute",
					left: 100 * Y / f + "%",
					top: 100 * X / h + "%",
					outline: "1px solid transparent",
					transformStyle: y || k ? "flat" : "preserve-3d",
					zIndex: T[g].zIndex,
					overflow: b ? "visible" : "hidden"
				}).appendTo(x),
				_ = d("<div>").css({
					transform: "scale(1) rotateX(0) rotateY(0) translate3d(0,0,0)",
					outline: "1px solid transparent",
					transformStyle: "preserve-3d"
				}).appendTo(I),
				S = d("<div>").addClass("ws_front_image").appendTo(_),
				z = b ? d("<div>").addClass("ws_back_image").appendTo(_) : 0;
			S.css({
				position: "absolute",
				width: "100%",
				height: "100%",
				overflow: "hidden",
				backfaceVisibility: "hidden",
				transform: "translate3d(0,0,0)"
			}).append(d("<img>").css({
				left: 100 * -Y + "%",
				top: 100 * -X + "%",
				position: "absolute",
				outline: "1px solid transparent"
			})), b && z.css({
				position: "absolute",
				width: "100%",
				height: "100%",
				overflow: "hidden",
				backfaceVisibility: "hidden",
				transform: "rotateY(180deg) translate3d(0,0," + w + "px)"
			}).append(d("<img>").css({
				left: 100 * -Y + "%",
				top: 100 * -X + "%",
				position: "absolute",
				outline: "1px solid transparent"
			}));
			var A = {
				position: "absolute",
				outline: "1px solid transparent"
			};
			u[g] = {
				part: _,
				front: S,
				back: z,
				wrapper: I,
				leftEdge: b ? d("<div>").addClass("ws_left_edge").css(A).appendTo(_) : 0,
				rightEdge: b ? d("<div>").addClass("ws_right_edge").css(A).appendTo(_) : 0,
				topEdge: b ? d("<div>").addClass("ws_top_edge").css(A).appendTo(_) : 0,
				bottomEdge: b ? d("<div>").addClass("ws_bottom_edge").css(A).appendTo(_) : 0
			}
		}
		x.show();
		var L = d(e.get(o));
		if(L = {
				width: L.width(),
				height: L.height(),
				marginTop: parseFloat(L.css("marginTop")),
				marginLeft: parseFloat(L.css("marginLeft"))
			}, b) {
			u[0].front.find("img").on("load", function() {
				m.hide()
			});
			for(var Z in u) u[Z].front.find("img").attr("src", e.get(o).src), u[Z].back.find("img").attr("src", e.get(n).src);
			v[o] || (v[o] = r(o)), F = new i(u, o, L, function() {
				m.show(), l.trigger("effectEnd"), x.hide().empty();
				for(var t in u) u[t].part.css({
					transition: "",
					transform: "rotateX(0) rotateY(0) translate3d(0,0,0)"
				});
				F = 0
			})
		} else {
			F = !0;
			var B = a.width(),
				C = a.height(),
				E = B / f,
				Q = C / h;
			x.css({
				width: B,
				height: C
			});
			var O = 0;
			for(var Z in u) {
				var Y = Z % f,
					X = Math.floor(Z / f);
				u[Z].front.find("img").attr("src", e.get(n).src).css(L);
				var j = t.duration * (1 - Math.abs((p * c - Y * X) / (2 * h * f))),
					q = s(-1, 1) > 0 ? 1 : -1,
					M = s(-1, 1) > 0 ? 1 : -1;
				u[Z].wrapper.css({
					width: E,
					height: Q
				}), u[Z].part.css({
					position: "absolute",
					top: q * Q,
					left: M * E,
					opacity: 0,
					width: E,
					height: Q
				}).animate({
					top: 0,
					left: 0,
					opacity: 1
				}, j, function() {
					O++, O == h * f && (m.stop(1, 1), F = !1, l.trigger("effectEnd"), x.empty())
				})
			}
		}
	}
}
jQuery.extend(jQuery.easing, {
	easeInBack: function(t, e, a, r, n, o) {
		return void 0 == o && (o = 1.70158), r * (e /= n) * e * ((o + 1) * e - o) + a
	},
	easeOutBack: function(t, e, a, r, n, o) {
		return void 0 == o && (o = 1.70158), r * ((e = e / n - 1) * e * ((o + 1) * e + o) + 1) + a
	},
	easeInBackQ: function(t, e, a, r, n) {
		var o = (e /= n) * e;
		return a + r * o * (4 * e * o - 8 * o + 8 * e - 3)
	},
	easeOutBackQ: function(t, e, a, r, n) {
		var o = (e /= n) * e;
		return a + r * (4 * o * e * o - 12 * o * o + 16 * o * e - 13 * o + 6 * e)
	},
	easeInBackQ2: function(t, e, a, r, n) {
		var o = (e /= n) * e;
		return a + r * o * (1.5 * e * o - 2.5 * o + 5 * e - 3)
	},
	easeOutBackQ2: function(t, e, a, r, n) {
		var o = (e /= n) * e;
		return a + r * (1.5 * o * e * o - 5 * o * o + 10 * o * e - 12 * o + 6.5 * e)
	}
});

function ws_blinds(t, i, e) {
	function n(i, e, n, o, s) {
		t.support.transform && t.support.transition ? (e.transform || (e.transform = ""), e.left && (e.transform += " translate3d(" + (e.left ? e.left : 0) + "px,0,0)"), delete e.left, (n || o) && (e.transition = n + "ms all " + o + "ms ease-in-out"), i.css(e), s && i.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", s)) : n ? i.animate(e, n, "swing", s) : i.css(e)
	}
	for(var o = jQuery, s = o(this), d = t.parts || 3, r = o("<div>").addClass("ws_effect").css({
			position: "absolute",
			width: "100%",
			height: "100%",
			left: 0,
			top: 0,
			"z-index": 8
		}).hide().appendTo(e.parent()), a = o("<div>").css({
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			overflow: "hidden"
		}).appendTo(r), f = [], l = 0; d > l; l++) f[l] = o("<div>").css({
		position: "absolute",
		height: "100%",
		width: (100 / d).toFixed(3) + "%",
		border: "none",
		margin: 0,
		overflow: "hidden",
		top: 0,
		left: (100 * l / d).toFixed(3) + "%"
	}).appendTo(r);
	this.go = function(l, h, p) {
		var g = h > l ? 1 : 0;
		if(p)
			if(-1 >= p) l = (h + 1) % i.length, g = 0;
			else {
				if(!(p >= 1)) return -1;
				l = (h - 1 + i.length) % i.length, g = 1
			}
		r.find("img").stop(!0, !0), r.show();
		var u = o(".ws_list", e);
		t.fadeOut && u.fadeOut((1 - 1 / d) * t.duration);
		var w = o(i[h]),
			c = {
				width: w.width() || t.width,
				height: w.height() || t.height
			},
			v = w.clone().css(c).appendTo(a);
		n(v, {
			left: 0
		}), n(v, {
			left: (g ? -1 : 1) * v.width() * .5
		}, t.duration, .1 * t.duration);
		for(var m = 0; m < f.length; m++) {
			var T = f[m],
				b = o(i[l]).clone().css({
					position: "absolute",
					top: 0
				}).css(c).appendTo(T);
			n(b, {
				left: g ? b.width() - T.position().left : -b.width()
			}), n(b, {
				left: -T.position().left
			}, t.duration / (f.length + 1) * (g ? f.length - m + 1 : m + 2), 0, !g && m == f.length - 1 || g && !m ? function() {
				s.trigger("effectEnd"), r.hide().find("img").remove(), v.remove()
			} : !1)
		}
	}
};

// extend wowslider for effect support
(function($) {

	var effects = ['ws_seven', 'ws_cube', 'ws_brick', 'ws_blinds'];
	var duration = 3500,
		delay = 6000;
	var cSlide, bkpCont, wowInstance, timeout;
	var wowSlider = $("#wowslider-container").wowSlider({
		effect: effects || "blinds",
		prev: "",
		next: "",
		fallback: ws_blinds,
		duration: duration,
		delay: delay,
		width: '100%',
		//	height:$(window).height()-500,
		fullScreen: false,
		autoPlay: true,
		autoPlayVideo: false,
		stopOnHover: false,
		loop: false,
		bullets: true,
		caption: true,
		captionEffect: "move",
		controls: true
	});

	// change slider size
	var sliderCont = $('.slideshow > .holder'),
		curResponsive = 1;

	function resizeWnd() {
		// apply after transition
		if(curResponsive > 1)
			sliderCont.css('width', '100%');

		$(window).resize();
	}
	$('#devices').on('click', 'a', function(e) {
		var thisClass = this.className;
		e.preventDefault();

		if(/laptop|tablet|mobile/g.test(thisClass)) {
			$('#devices').find('.laptop, .tablet, .mobile').removeClass('checked');

			if(curResponsive > 1) {
				wowSlider[0].wsResponsive(1);
				curResponsive = 1;
				$('#devices').find('.boxed, .fullwidth, .fullscreen').removeClass('checked');
				$('#devices .boxed').addClass('checked');
			}

			wowSlider[0].wsHideEffect();
			wowSlider[0].wsRestart();
			if(/laptop/g.test(thisClass)) {
				sliderCont.css('maxWidth', sliderCont.width()).animate({
					maxWidth: curResponsive > 1 ? $(window).width() : 960
				}, resizeWnd);
			} else if(/tablet/g.test(thisClass)) {
				sliderCont.css('maxWidth', sliderCont.width()).animate({
					maxWidth: 700
				}, resizeWnd);
			} else if(/mobile/g.test(thisClass)) {
				sliderCont.css('maxWidth', sliderCont.width()).animate({
					maxWidth: 500
				}, resizeWnd);
			}
			$(this).addClass('checked');
		} else {
			wowSlider[0].wsHideEffect();
			wowSlider[0].wsRestart();
			if(/boxed/g.test(thisClass)) {
				wowSlider[0].wsResponsive(1);
				curResponsive = 1;
			} else if(/fullwidth/g.test(thisClass)) {
				sliderCont.css('maxWidth', 'none');
				wowSlider[0].wsResponsive(2);
				curResponsive = 2;
			} else if(/fullscreen/g.test(thisClass)) {

				wowSlider[0].wsResponsive(3);
				curResponsive = 3;

				sliderCont.css('maxWidth', 'none');
				if(wowSlider[0].wsToggleFS)
					wowSlider[0].wsToggleFS();
				return;
			}
			$('#devices').find('.boxed, .fullwidth, .fullscreen').removeClass('checked');

			if(curResponsive > 1) {
				$('#devices').find('.tablet, .mobile').removeClass('checked');
				$('#devices .laptop').addClass('checked');
				resizeWnd();
			}

			$(this).addClass('checked');
		}
	});
})(jQuery);
/*
 * Raphael 1.5.2 - JavaScript Vector Library
 *
 * Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://raphaeljs.com/license.html) license.
 */
(function() {
	function a() {
		if(a.is(arguments[0], G)) {
			var b = arguments[0],
				d = bV[m](a, b.splice(0, 3 + a.is(b[0], E))),
				e = d.set();
			for(var g = 0, h = b[w]; g < h; g++) {
				var i = b[g] || {};
				c[f](i.type) && e[L](d[i.type]().attr(i))
			}
			return e
		}
		return bV[m](a, arguments)
	}
	a.version = "1.5.2";
	var b = /[, ]+/,
		c = {
			circle: 1,
			rect: 1,
			path: 1,
			ellipse: 1,
			text: 1,
			image: 1
		},
		d = /\{(\d+)\}/g,
		e = "prototype",
		f = "hasOwnProperty",
		g = document,
		h = window,
		i = {
			was: Object[e][f].call(h, "Raphael"),
			is: h.Raphael
		},
		j = function() {
			this.customAttributes = {}
		},
		k, l = "appendChild",
		m = "apply",
		n = "concat",
		o = "createTouch" in g,
		p = "",
		q = " ",
		r = String,
		s = "split",
		t = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend" [s](q),
		u = {
			mousedown: "touchstart",
			mousemove: "touchmove",
			mouseup: "touchend"
		},
		v = "join",
		w = "length",
		x = r[e].toLowerCase,
		y = Math,
		z = y.max,
		A = y.min,
		B = y.abs,
		C = y.pow,
		D = y.PI,
		E = "number",
		F = "string",
		G = "array",
		H = "toString",
		I = "fill",
		J = Object[e][H],
		K = {},
		L = "push",
		M = /^url\(['"]?([^\)]+?)['"]?\)$/i,
		N = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
		O = {
			"NaN": 1,
			Infinity: 1,
			"-Infinity": 1
		},
		P = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
		Q = y.round,
		R = "setAttribute",
		S = parseFloat,
		T = parseInt,
		U = " progid:DXImageTransform.Microsoft",
		V = r[e].toUpperCase,
		W = {
			blur: 0,
			"clip-rect": "0 0 1e9 1e9",
			cursor: "default",
			cx: 0,
			cy: 0,
			fill: "#fff",
			"fill-opacity": 1,
			font: "10px \"Arial\"",
			"font-family": "\"Arial\"",
			"font-size": "10",
			"font-style": "normal",
			"font-weight": 400,
			gradient: 0,
			height: 0,
			href: "http://raphaeljs.com/",
			opacity: 1,
			path: "M0,0",
			r: 0,
			rotation: 0,
			rx: 0,
			ry: 0,
			scale: "1 1",
			src: "",
			stroke: "#000",
			"stroke-dasharray": "",
			"stroke-linecap": "butt",
			"stroke-linejoin": "butt",
			"stroke-miterlimit": 0,
			"stroke-opacity": 1,
			"stroke-width": 1,
			target: "_blank",
			"text-anchor": "middle",
			title: "Raphael",
			translation: "0 0",
			width: 0,
			x: 0,
			y: 0
		},
		X = {
			along: "along",
			blur: E,
			"clip-rect": "csv",
			cx: E,
			cy: E,
			fill: "colour",
			"fill-opacity": E,
			"font-size": E,
			height: E,
			opacity: E,
			path: "path",
			r: E,
			rotation: "csv",
			rx: E,
			ry: E,
			scale: "csv",
			stroke: "colour",
			"stroke-opacity": E,
			"stroke-width": E,
			translation: "csv",
			width: E,
			x: E,
			y: E
		},
		Y = "replace",
		Z = /^(from|to|\d+%?)$/,
		$ = /\s*,\s*/,
		_ = {
			hs: 1,
			rg: 1
		},
		ba = /,?([achlmqrstvxz]),?/gi,
		bb = /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,
		bc = /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,
		bd = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,
		be = function(a, b) {
			return a.key - b.key
		};
	a.type = h.SVGAngle || g.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
	if(a.type == "VML") {
		var bf = g.createElement("div"),
			bg;
		bf.innerHTML = "<v:shape adj=\"1\"/>";
		bg = bf.firstChild;
		bg.style.behavior = "url(#default#VML)";
		if(!(bg && typeof bg.adj == "object")) return a.type = null;
		bf = null
	}
	a.svg = !(a.vml = a.type == "VML");
	j[e] = a[e];
	k = j[e];
	a._id = 0;
	a._oid = 0;
	a.fn = {};
	a.is = function(a, b) {
		b = x.call(b);
		if(b == "finite") return !O[f](+a);
		return b == "null" && a === null || b == typeof a || b == "object" && a === Object(a) || b == "array" && Array.isArray && Array.isArray(a) || J.call(a).slice(8, -1).toLowerCase() == b
	};
	a.angle = function(b, c, d, e, f, g) {
		{
			if(f == null) {
				var h = b - d,
					i = c - e;
				if(!h && !i) return 0;
				return((h < 0) * 180 + y.atan(-i / -h) * 180 / D + 360) % 360
			}
			return a.angle(b, c, f, g) - a.angle(d, e, f, g)
		}
	};
	a.rad = function(a) {
		return a % 360 * D / 180
	};
	a.deg = function(a) {
		return a * 180 / D % 360
	};
	a.snapTo = function(b, c, d) {
		d = a.is(d, "finite") ? d : 10;
		if(a.is(b, G)) {
			var e = b.length;
			while(e--)
				if(B(b[e] - c) <= d) return b[e]
		} else {
			b = +b;
			var f = c % b;
			if(f < d) return c - f;
			if(f > b - d) return c - f + b
		}
		return c
	};

	function bh() {
		var a = [],
			b = 0;
		for(; b < 32; b++) a[b] = (~(~(y.random() * 16)))[H](16);
		a[12] = 4;
		a[16] = (a[16] & 3 | 8)[H](16);
		return "r-" + a[v]("")
	}
	a.setWindow = function(a) {
		h = a;
		g = h.document
	};
	var bi = function(b) {
			if(a.vml) {
				var c = /^\s+|\s+$/g,
					d;
				try {
					var e = new ActiveXObject("htmlfile");
					e.write("<body>");
					e.close();
					d = e.body
				} catch(a) {
					d = createPopup().document.body
				}
				var f = d.createTextRange();
				bi = bm(function(a) {
					try {
						d.style.color = r(a)[Y](c, p);
						var b = f.queryCommandValue("ForeColor");
						b = (b & 255) << 16 | b & 65280 | (b & 16711680) >>> 16;
						return "#" + ("000000" + b[H](16)).slice(-6)
					} catch(a) {
						return "none"
					}
				})
			} else {
				var h = g.createElement("i");
				h.title = "Raphaël Colour Picker";
				h.style.display = "none";
				g.body[l](h);
				bi = bm(function(a) {
					h.style.color = a;
					return g.defaultView.getComputedStyle(h, p).getPropertyValue("color")
				})
			}
			return bi(b)
		},
		bj = function() {
			return "hsb(" + [this.h, this.s, this.b] + ")"
		},
		bk = function() {
			return "hsl(" + [this.h, this.s, this.l] + ")"
		},
		bl = function() {
			return this.hex
		};
	a.hsb2rgb = function(b, c, d, e) {
		if(a.is(b, "object") && "h" in b && "s" in b && "b" in b) {
			d = b.b;
			c = b.s;
			b = b.h;
			e = b.o
		}
		return a.hsl2rgb(b, c, d / 2, e)
	};
	a.hsl2rgb = function(b, c, d, e) {
		if(a.is(b, "object") && "h" in b && "s" in b && "l" in b) {
			d = b.l;
			c = b.s;
			b = b.h
		}
		if(b > 1 || c > 1 || d > 1) {
			b /= 360;
			c /= 100;
			d /= 100
		}
		var f = {},
			g = ["r", "g", "b"],
			h, i, j, k, l, m;
		if(c) {
			d < 0.5 ? h = d * (1 + c) : h = d + c - d * c;
			i = 2 * d - h;
			for(var n = 0; n < 3; n++) {
				j = b + 1 / 3 * -(n - 1);
				j < 0 && j++;
				j > 1 && j--;
				j * 6 < 1 ? f[g[n]] = i + (h - i) * 6 * j : j * 2 < 1 ? f[g[n]] = h : j * 3 < 2 ? f[g[n]] = i + (h - i) * (2 / 3 - j) * 6 : f[g[n]] = i
			}
		} else f = {
			r: d,
			g: d,
			b: d
		};
		f.r *= 255;
		f.g *= 255;
		f.b *= 255;
		f.hex = "#" + (16777216 | f.b | f.g << 8 | f.r << 16).toString(16).slice(1);
		a.is(e, "finite") && (f.opacity = e);
		f.toString = bl;
		return f
	};
	a.rgb2hsb = function(b, c, d) {
		if(c == null && a.is(b, "object") && "r" in b && "g" in b && "b" in b) {
			d = b.b;
			c = b.g;
			b = b.r
		}
		if(c == null && a.is(b, F)) {
			var e = a.getRGB(b);
			b = e.r;
			c = e.g;
			d = e.b
		}
		if(b > 1 || c > 1 || d > 1) {
			b /= 255;
			c /= 255;
			d /= 255
		}
		var f = z(b, c, d),
			g = A(b, c, d),
			h, i, j = f; {
			if(g == f) return {
				h: 0,
				s: 0,
				b: f,
				toString: bj
			};
			var k = f - g;
			i = k / f;
			b == f ? h = (c - d) / k : c == f ? h = 2 + (d - b) / k : h = 4 + (b - c) / k;
			h /= 6;
			h < 0 && h++;
			h > 1 && h--
		}
		return {
			h: h,
			s: i,
			b: j,
			toString: bj
		}
	};
	a.rgb2hsl = function(b, c, d) {
		if(c == null && a.is(b, "object") && "r" in b && "g" in b && "b" in b) {
			d = b.b;
			c = b.g;
			b = b.r
		}
		if(c == null && a.is(b, F)) {
			var e = a.getRGB(b);
			b = e.r;
			c = e.g;
			d = e.b
		}
		if(b > 1 || c > 1 || d > 1) {
			b /= 255;
			c /= 255;
			d /= 255
		}
		var f = z(b, c, d),
			g = A(b, c, d),
			h, i, j = (f + g) / 2,
			k;
		if(g == f) k = {
			h: 0,
			s: 0,
			l: j
		};
		else {
			var l = f - g;
			i = j < 0.5 ? l / (f + g) : l / (2 - f - g);
			b == f ? h = (c - d) / l : c == f ? h = 2 + (d - b) / l : h = 4 + (b - c) / l;
			h /= 6;
			h < 0 && h++;
			h > 1 && h--;
			k = {
				h: h,
				s: i,
				l: j
			}
		}
		k.toString = bk;
		return k
	};
	a._path2string = function() {
		return this.join(",")[Y](ba, "$1")
	};

	function bm(a, b, c) {
		function d() {
			var g = Array[e].slice.call(arguments, 0),
				h = g[v]("►"),
				i = d.cache = d.cache || {},
				j = d.count = d.count || [];
			if(i[f](h)) return c ? c(i[h]) : i[h];
			j[w] >= 1000 && delete i[j.shift()];
			j[L](h);
			i[h] = a[m](b, g);
			return c ? c(i[h]) : i[h]
		}
		return d
	}
	a.getRGB = bm(function(b) {
		if(!b || !(!((b = r(b)).indexOf("-") + 1))) return {
			r: -1,
			g: -1,
			b: -1,
			hex: "none",
			error: 1
		};
		if(b == "none") return {
			r: -1,
			g: -1,
			b: -1,
			hex: "none"
		};
		!(_[f](b.toLowerCase().substring(0, 2)) || b.charAt() == "#") && (b = bi(b));
		var c, d, e, g, h, i, j, k = b.match(N);
		if(k) {
			if(k[2]) {
				g = T(k[2].substring(5), 16);
				e = T(k[2].substring(3, 5), 16);
				d = T(k[2].substring(1, 3), 16)
			}
			if(k[3]) {
				g = T((i = k[3].charAt(3)) + i, 16);
				e = T((i = k[3].charAt(2)) + i, 16);
				d = T((i = k[3].charAt(1)) + i, 16)
			}
			if(k[4]) {
				j = k[4][s]($);
				d = S(j[0]);
				j[0].slice(-1) == "%" && (d *= 2.55);
				e = S(j[1]);
				j[1].slice(-1) == "%" && (e *= 2.55);
				g = S(j[2]);
				j[2].slice(-1) == "%" && (g *= 2.55);
				k[1].toLowerCase().slice(0, 4) == "rgba" && (h = S(j[3]));
				j[3] && j[3].slice(-1) == "%" && (h /= 100)
			}
			if(k[5]) {
				j = k[5][s]($);
				d = S(j[0]);
				j[0].slice(-1) == "%" && (d *= 2.55);
				e = S(j[1]);
				j[1].slice(-1) == "%" && (e *= 2.55);
				g = S(j[2]);
				j[2].slice(-1) == "%" && (g *= 2.55);
				(j[0].slice(-3) == "deg" || j[0].slice(-1) == "°") && (d /= 360);
				k[1].toLowerCase().slice(0, 4) == "hsba" && (h = S(j[3]));
				j[3] && j[3].slice(-1) == "%" && (h /= 100);
				return a.hsb2rgb(d, e, g, h)
			}
			if(k[6]) {
				j = k[6][s]($);
				d = S(j[0]);
				j[0].slice(-1) == "%" && (d *= 2.55);
				e = S(j[1]);
				j[1].slice(-1) == "%" && (e *= 2.55);
				g = S(j[2]);
				j[2].slice(-1) == "%" && (g *= 2.55);
				(j[0].slice(-3) == "deg" || j[0].slice(-1) == "°") && (d /= 360);
				k[1].toLowerCase().slice(0, 4) == "hsla" && (h = S(j[3]));
				j[3] && j[3].slice(-1) == "%" && (h /= 100);
				return a.hsl2rgb(d, e, g, h)
			}
			k = {
				r: d,
				g: e,
				b: g
			};
			k.hex = "#" + (16777216 | g | e << 8 | d << 16).toString(16).slice(1);
			a.is(h, "finite") && (k.opacity = h);
			return k
		}
		return {
			r: -1,
			g: -1,
			b: -1,
			hex: "none",
			error: 1
		}
	}, a);
	a.getColor = function(a) {
		var b = this.getColor.start = this.getColor.start || {
				h: 0,
				s: 1,
				b: a || 0.75
			},
			c = this.hsb2rgb(b.h, b.s, b.b);
		b.h += 0.075;
		if(b.h > 1) {
			b.h = 0;
			b.s -= 0.2;
			b.s <= 0 && (this.getColor.start = {
				h: 0,
				s: 1,
				b: b.b
			})
		}
		return c.hex
	};
	a.getColor.reset = function() {
		delete this.start
	};
	a.parsePathString = bm(function(b) {
		if(!b) return null;
		var c = {
				a: 7,
				c: 6,
				h: 1,
				l: 2,
				m: 2,
				q: 4,
				s: 4,
				t: 2,
				v: 1,
				z: 0
			},
			d = [];
		a.is(b, G) && a.is(b[0], G) && (d = bo(b));
		d[w] || r(b)[Y](bb, function(a, b, e) {
			var f = [],
				g = x.call(b);
			e[Y](bc, function(a, b) {
				b && f[L](+b)
			});
			if(g == "m" && f[w] > 2) {
				d[L]([b][n](f.splice(0, 2)));
				g = "l";
				b = b == "m" ? "l" : "L"
			}
			while(f[w] >= c[g]) {
				d[L]([b][n](f.splice(0, c[g])));
				if(!c[g]) break
			}
		});
		d[H] = a._path2string;
		return d
	});
	a.findDotsAtSegment = function(a, b, c, d, e, f, g, h, i) {
		var j = 1 - i,
			k = C(j, 3) * a + C(j, 2) * 3 * i * c + j * 3 * i * i * e + C(i, 3) * g,
			l = C(j, 3) * b + C(j, 2) * 3 * i * d + j * 3 * i * i * f + C(i, 3) * h,
			m = a + 2 * i * (c - a) + i * i * (e - 2 * c + a),
			n = b + 2 * i * (d - b) + i * i * (f - 2 * d + b),
			o = c + 2 * i * (e - c) + i * i * (g - 2 * e + c),
			p = d + 2 * i * (f - d) + i * i * (h - 2 * f + d),
			q = (1 - i) * a + i * c,
			r = (1 - i) * b + i * d,
			s = (1 - i) * e + i * g,
			t = (1 - i) * f + i * h,
			u = 90 - y.atan((m - o) / (n - p)) * 180 / D;
		(m > o || n < p) && (u += 180);
		return {
			x: k,
			y: l,
			m: {
				x: m,
				y: n
			},
			n: {
				x: o,
				y: p
			},
			start: {
				x: q,
				y: r
			},
			end: {
				x: s,
				y: t
			},
			alpha: u
		}
	};
	var bn = bm(function(a) {
			if(!a) return {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			a = bw(a);
			var b = 0,
				c = 0,
				d = [],
				e = [],
				f;
			for(var g = 0, h = a[w]; g < h; g++) {
				f = a[g];
				if(f[0] == "M") {
					b = f[1];
					c = f[2];
					d[L](b);
					e[L](c)
				} else {
					var i = bv(b, c, f[1], f[2], f[3], f[4], f[5], f[6]);
					d = d[n](i.min.x, i.max.x);
					e = e[n](i.min.y, i.max.y);
					b = f[5];
					c = f[6]
				}
			}
			var j = A[m](0, d),
				k = A[m](0, e);
			return {
				x: j,
				y: k,
				width: z[m](0, d) - j,
				height: z[m](0, e) - k
			}
		}),
		bo = function(b) {
			var c = [];
			if(!a.is(b, G) || !a.is(b && b[0], G)) b = a.parsePathString(b);
			for(var d = 0, e = b[w]; d < e; d++) {
				c[d] = [];
				for(var f = 0, g = b[d][w]; f < g; f++) c[d][f] = b[d][f]
			}
			c[H] = a._path2string;
			return c
		},
		bp = bm(function(b) {
			if(!a.is(b, G) || !a.is(b && b[0], G)) b = a.parsePathString(b);
			var c = [],
				d = 0,
				e = 0,
				f = 0,
				g = 0,
				h = 0;
			if(b[0][0] == "M") {
				d = b[0][1];
				e = b[0][2];
				f = d;
				g = e;
				h++;
				c[L](["M", d, e])
			}
			for(var i = h, j = b[w]; i < j; i++) {
				var k = c[i] = [],
					l = b[i];
				if(l[0] != x.call(l[0])) {
					k[0] = x.call(l[0]);
					switch(k[0]) {
						case "a":
							k[1] = l[1];
							k[2] = l[2];
							k[3] = l[3];
							k[4] = l[4];
							k[5] = l[5];
							k[6] = +(l[6] - d).toFixed(3);
							k[7] = +(l[7] - e).toFixed(3);
							break;
						case "v":
							k[1] = +(l[1] - e).toFixed(3);
							break;
						case "m":
							f = l[1];
							g = l[2];
						default:
							for(var m = 1, n = l[w]; m < n; m++) k[m] = +(l[m] - (m % 2 ? d : e)).toFixed(3)
					}
				} else {
					k = c[i] = [];
					if(l[0] == "m") {
						f = l[1] + d;
						g = l[2] + e
					}
					for(var o = 0, p = l[w]; o < p; o++) c[i][o] = l[o]
				}
				var q = c[i][w];
				switch(c[i][0]) {
					case "z":
						d = f;
						e = g;
						break;
					case "h":
						d += +c[i][q - 1];
						break;
					case "v":
						e += +c[i][q - 1];
						break;
					default:
						d += +c[i][q - 2];
						e += +c[i][q - 1]
				}
			}
			c[H] = a._path2string;
			return c
		}, 0, bo),
		bq = bm(function(b) {
			if(!a.is(b, G) || !a.is(b && b[0], G)) b = a.parsePathString(b);
			var c = [],
				d = 0,
				e = 0,
				f = 0,
				g = 0,
				h = 0;
			if(b[0][0] == "M") {
				d = +b[0][1];
				e = +b[0][2];
				f = d;
				g = e;
				h++;
				c[0] = ["M", d, e]
			}
			for(var i = h, j = b[w]; i < j; i++) {
				var k = c[i] = [],
					l = b[i];
				if(l[0] != V.call(l[0])) {
					k[0] = V.call(l[0]);
					switch(k[0]) {
						case "A":
							k[1] = l[1];
							k[2] = l[2];
							k[3] = l[3];
							k[4] = l[4];
							k[5] = l[5];
							k[6] = +(l[6] + d);
							k[7] = +(l[7] + e);
							break;
						case "V":
							k[1] = +l[1] + e;
							break;
						case "H":
							k[1] = +l[1] + d;
							break;
						case "M":
							f = +l[1] + d;
							g = +l[2] + e;
						default:
							for(var m = 1, n = l[w]; m < n; m++) k[m] = +l[m] + (m % 2 ? d : e)
					}
				} else
					for(var o = 0, p = l[w]; o < p; o++) c[i][o] = l[o];
				switch(k[0]) {
					case "Z":
						d = f;
						e = g;
						break;
					case "H":
						d = k[1];
						break;
					case "V":
						e = k[1];
						break;
					case "M":
						f = c[i][c[i][w] - 2];
						g = c[i][c[i][w] - 1];
					default:
						d = c[i][c[i][w] - 2];
						e = c[i][c[i][w] - 1]
				}
			}
			c[H] = a._path2string;
			return c
		}, null, bo),
		br = function(a, b, c, d) {
			return [a, b, c, d, c, d]
		},
		bs = function(a, b, c, d, e, f) {
			var g = 1 / 3,
				h = 2 / 3;
			return [g * a + h * c, g * b + h * d, g * e + h * c, g * f + h * d, e, f]
		},
		bt = function(a, b, c, d, e, f, g, h, i, j) {
			var k = D * 120 / 180,
				l = D / 180 * (+e || 0),
				m = [],
				o, p = bm(function(a, b, c) {
					var d = a * y.cos(c) - b * y.sin(c),
						e = a * y.sin(c) + b * y.cos(c);
					return {
						x: d,
						y: e
					}
				});
			if(j) {
				G = j[0];
				H = j[1];
				E = j[2];
				F = j[3]
			} else {
				o = p(a, b, -l);
				a = o.x;
				b = o.y;
				o = p(h, i, -l);
				h = o.x;
				i = o.y;
				var q = y.cos(D / 180 * e),
					r = y.sin(D / 180 * e),
					t = (a - h) / 2,
					u = (b - i) / 2,
					x = t * t / (c * c) + u * u / (d * d);
				if(x > 1) {
					x = y.sqrt(x);
					c = x * c;
					d = x * d
				}
				var z = c * c,
					A = d * d,
					C = (f == g ? -1 : 1) * y.sqrt(B((z * A - z * u * u - A * t * t) / (z * u * u + A * t * t))),
					E = C * c * u / d + (a + h) / 2,
					F = C * -d * t / c + (b + i) / 2,
					G = y.asin(((b - F) / d).toFixed(9)),
					H = y.asin(((i - F) / d).toFixed(9));
				G = a < E ? D - G : G;
				H = h < E ? D - H : H;
				G < 0 && (G = D * 2 + G);
				H < 0 && (H = D * 2 + H);
				g && G > H && (G = G - D * 2);
				!g && H > G && (H = H - D * 2)
			}
			var I = H - G;
			if(B(I) > k) {
				var J = H,
					K = h,
					L = i;
				H = G + k * (g && H > G ? 1 : -1);
				h = E + c * y.cos(H);
				i = F + d * y.sin(H);
				m = bt(h, i, c, d, e, 0, g, K, L, [H, J, E, F])
			}
			I = H - G;
			var M = y.cos(G),
				N = y.sin(G),
				O = y.cos(H),
				P = y.sin(H),
				Q = y.tan(I / 4),
				R = 4 / 3 * c * Q,
				S = 4 / 3 * d * Q,
				T = [a, b],
				U = [a + R * N, b - S * M],
				V = [h + R * P, i - S * O],
				W = [h, i];
			U[0] = 2 * T[0] - U[0];
			U[1] = 2 * T[1] - U[1]; {
				if(j) return [U, V, W][n](m);
				m = [U, V, W][n](m)[v]()[s](",");
				var X = [];
				for(var Y = 0, Z = m[w]; Y < Z; Y++) X[Y] = Y % 2 ? p(m[Y - 1], m[Y], l).y : p(m[Y], m[Y + 1], l).x;
				return X
			}
		},
		bu = function(a, b, c, d, e, f, g, h, i) {
			var j = 1 - i;
			return {
				x: C(j, 3) * a + C(j, 2) * 3 * i * c + j * 3 * i * i * e + C(i, 3) * g,
				y: C(j, 3) * b + C(j, 2) * 3 * i * d + j * 3 * i * i * f + C(i, 3) * h
			}
		},
		bv = bm(function(a, b, c, d, e, f, g, h) {
			var i = e - 2 * c + a - (g - 2 * e + c),
				j = 2 * (c - a) - 2 * (e - c),
				k = a - c,
				l = (-j + y.sqrt(j * j - 4 * i * k)) / 2 / i,
				n = (-j - y.sqrt(j * j - 4 * i * k)) / 2 / i,
				o = [b, h],
				p = [a, g],
				q;
			B(l) > "1e12" && (l = 0.5);
			B(n) > "1e12" && (n = 0.5);
			if(l > 0 && l < 1) {
				q = bu(a, b, c, d, e, f, g, h, l);
				p[L](q.x);
				o[L](q.y)
			}
			if(n > 0 && n < 1) {
				q = bu(a, b, c, d, e, f, g, h, n);
				p[L](q.x);
				o[L](q.y)
			}
			i = f - 2 * d + b - (h - 2 * f + d);
			j = 2 * (d - b) - 2 * (f - d);
			k = b - d;
			l = (-j + y.sqrt(j * j - 4 * i * k)) / 2 / i;
			n = (-j - y.sqrt(j * j - 4 * i * k)) / 2 / i;
			B(l) > "1e12" && (l = 0.5);
			B(n) > "1e12" && (n = 0.5);
			if(l > 0 && l < 1) {
				q = bu(a, b, c, d, e, f, g, h, l);
				p[L](q.x);
				o[L](q.y)
			}
			if(n > 0 && n < 1) {
				q = bu(a, b, c, d, e, f, g, h, n);
				p[L](q.x);
				o[L](q.y)
			}
			return {
				min: {
					x: A[m](0, p),
					y: A[m](0, o)
				},
				max: {
					x: z[m](0, p),
					y: z[m](0, o)
				}
			}
		}),
		bw = bm(function(a, b) {
			var c = bq(a),
				d = b && bq(b),
				e = {
					x: 0,
					y: 0,
					bx: 0,
					by: 0,
					X: 0,
					Y: 0,
					qx: null,
					qy: null
				},
				f = {
					x: 0,
					y: 0,
					bx: 0,
					by: 0,
					X: 0,
					Y: 0,
					qx: null,
					qy: null
				},
				g = function(a, b) {
					var c, d;
					if(!a) return ["C", b.x, b.y, b.x, b.y, b.x, b.y];
					!(a[0] in {
						T: 1,
						Q: 1
					}) && (b.qx = b.qy = null);
					switch(a[0]) {
						case "M":
							b.X = a[1];
							b.Y = a[2];
							break;
						case "A":
							a = ["C"][n](bt[m](0, [b.x, b.y][n](a.slice(1))));
							break;
						case "S":
							c = b.x + (b.x - (b.bx || b.x));
							d = b.y + (b.y - (b.by || b.y));
							a = ["C", c, d][n](a.slice(1));
							break;
						case "T":
							b.qx = b.x + (b.x - (b.qx || b.x));
							b.qy = b.y + (b.y - (b.qy || b.y));
							a = ["C"][n](bs(b.x, b.y, b.qx, b.qy, a[1], a[2]));
							break;
						case "Q":
							b.qx = a[1];
							b.qy = a[2];
							a = ["C"][n](bs(b.x, b.y, a[1], a[2], a[3], a[4]));
							break;
						case "L":
							a = ["C"][n](br(b.x, b.y, a[1], a[2]));
							break;
						case "H":
							a = ["C"][n](br(b.x, b.y, a[1], b.y));
							break;
						case "V":
							a = ["C"][n](br(b.x, b.y, b.x, a[1]));
							break;
						case "Z":
							a = ["C"][n](br(b.x, b.y, b.X, b.Y));
							break
					}
					return a
				},
				h = function(a, b) {
					if(a[b][w] > 7) {
						a[b].shift();
						var e = a[b];
						while(e[w]) a.splice(b++, 0, ["C"][n](e.splice(0, 6)));
						a.splice(b, 1);
						k = z(c[w], d && d[w] || 0)
					}
				},
				i = function(a, b, e, f, g) {
					if(a && b && a[g][0] == "M" && b[g][0] != "M") {
						b.splice(g, 0, ["M", f.x, f.y]);
						e.bx = 0;
						e.by = 0;
						e.x = a[g][1];
						e.y = a[g][2];
						k = z(c[w], d && d[w] || 0)
					}
				};
			for(var j = 0, k = z(c[w], d && d[w] || 0); j < k; j++) {
				c[j] = g(c[j], e);
				h(c, j);
				d && (d[j] = g(d[j], f));
				d && h(d, j);
				i(c, d, e, f, j);
				i(d, c, f, e, j);
				var l = c[j],
					o = d && d[j],
					p = l[w],
					q = d && o[w];
				e.x = l[p - 2];
				e.y = l[p - 1];
				e.bx = S(l[p - 4]) || e.x;
				e.by = S(l[p - 3]) || e.y;
				f.bx = d && (S(o[q - 4]) || f.x);
				f.by = d && (S(o[q - 3]) || f.y);
				f.x = d && o[q - 2];
				f.y = d && o[q - 1]
			}
			return d ? [c, d] : c
		}, null, bo),
		bx = bm(function(b) {
			var c = [];
			for(var d = 0, e = b[w]; d < e; d++) {
				var f = {},
					g = b[d].match(/^([^:]*):?([\d\.]*)/);
				f.color = a.getRGB(g[1]);
				if(f.color.error) return null;
				f.color = f.color.hex;
				g[2] && (f.offset = g[2] + "%");
				c[L](f)
			}
			for(d = 1, e = c[w] - 1; d < e; d++) {
				if(!c[d].offset) {
					var h = S(c[d - 1].offset || 0),
						i = 0;
					for(var j = d + 1; j < e; j++) {
						if(c[j].offset) {
							i = c[j].offset;
							break
						}
					}
					if(!i) {
						i = 100;
						j = e
					}
					i = S(i);
					var k = (i - h) / (j - d + 1);
					for(; d < j; d++) {
						h += k;
						c[d].offset = h + "%"
					}
				}
			}
			return c
		}),
		by = function(b, c, d, e) {
			var f;
			if(a.is(b, F) || a.is(b, "object")) {
				f = a.is(b, F) ? g.getElementById(b) : b;
				if(f.tagName) return c == null ? {
					container: f,
					width: f.style.pixelWidth || f.offsetWidth,
					height: f.style.pixelHeight || f.offsetHeight
				} : {
					container: f,
					width: c,
					height: d
				}
			} else return {
				container: 1,
				x: b,
				y: c,
				width: d,
				height: e
			}
		},
		bz = function(a, b) {
			var c = this;
			for(var d in b) {
				if(b[f](d) && !(d in a)) switch(typeof b[d]) {
					case "function":
						(function(b) {
							a[d] = a === c ? b : function() {
								return b[m](c, arguments)
							}
						})(b[d]);
						break;
					case "object":
						a[d] = a[d] || {};
						bz.call(this, a[d], b[d]);
						break;
					default:
						a[d] = b[d];
						break
				}
			}
		},
		bA = function(a, b) {
			a == b.top && (b.top = a.prev);
			a == b.bottom && (b.bottom = a.next);
			a.next && (a.next.prev = a.prev);
			a.prev && (a.prev.next = a.next)
		},
		bB = function(a, b) {
			if(b.top === a) return;
			bA(a, b);
			a.next = null;
			a.prev = b.top;
			b.top.next = a;
			b.top = a
		},
		bC = function(a, b) {
			if(b.bottom === a) return;
			bA(a, b);
			a.next = b.bottom;
			a.prev = null;
			b.bottom.prev = a;
			b.bottom = a
		},
		bD = function(a, b, c) {
			bA(a, c);
			b == c.top && (c.top = a);
			b.next && (b.next.prev = a);
			a.next = b.next;
			a.prev = b;
			b.next = a
		},
		bE = function(a, b, c) {
			bA(a, c);
			b == c.bottom && (c.bottom = a);
			b.prev && (b.prev.next = a);
			a.prev = b.prev;
			b.prev = a;
			a.next = b
		},
		bF = function(a) {
			return function() {
				throw new Error("Raphaël: you are calling to method “" + a + "” of removed object")
			}
		};
	a.pathToRelative = bp;
	if(a.svg) {
		k.svgns = "http://www.w3.org/2000/svg";
		k.xlink = "http://www.w3.org/1999/xlink";
		Q = function(a) {
			return +a + (~(~a) === a) * 0.5
		};
		var bG = function(a, b) {
			if(b)
				for(var c in b) b[f](c) && a[R](c, r(b[c]));
			else {
				a = g.createElementNS(k.svgns, a);
				a.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
				return a
			}
		};
		a[H] = function() {
			return "Your browser supports SVG.\nYou are running Raphaël " + this.version
		};
		var bH = function(a, b) {
				var c = bG("path");
				b.canvas && b.canvas[l](c);
				var d = new bN(c, b);
				d.type = "path";
				bK(d, {
					fill: "none",
					stroke: "#000",
					path: a
				});
				return d
			},
			bI = function(a, b, c) {
				var d = "linear",
					e = 0.5,
					f = 0.5,
					h = a.style;
				b = r(b)[Y](bd, function(a, b, c) {
					d = "radial";
					if(b && c) {
						e = S(b);
						f = S(c);
						var g = (f > 0.5) * 2 - 1;
						C(e - 0.5, 2) + C(f - 0.5, 2) > 0.25 && (f = y.sqrt(0.25 - C(e - 0.5, 2)) * g + 0.5) && f != 0.5 && (f = f.toFixed(5) - 0.00001 * g)
					}
					return p
				});
				b = b[s](/\s*\-\s*/);
				if(d == "linear") {
					var i = b.shift();
					i = -S(i);
					if(isNaN(i)) return null;
					var j = [0, 0, y.cos(i * D / 180), y.sin(i * D / 180)],
						k = 1 / (z(B(j[2]), B(j[3])) || 1);
					j[2] *= k;
					j[3] *= k;
					if(j[2] < 0) {
						j[0] = -j[2];
						j[2] = 0
					}
					if(j[3] < 0) {
						j[1] = -j[3];
						j[3] = 0
					}
				}
				var m = bx(b);
				if(!m) return null;
				var n = a.getAttribute(I);
				n = n.match(/^url\(#(.*)\)$/);
				n && c.defs.removeChild(g.getElementById(n[1]));
				var o = bG(d + "Gradient");
				o.id = bh();
				bG(o, d == "radial" ? {
					fx: e,
					fy: f
				} : {
					x1: j[0],
					y1: j[1],
					x2: j[2],
					y2: j[3]
				});
				c.defs[l](o);
				for(var q = 0, t = m[w]; q < t; q++) {
					var u = bG("stop");
					bG(u, {
						offset: m[q].offset ? m[q].offset : q ? "100%" : "0%",
						"stop-color": m[q].color || "#fff"
					});
					o[l](u)
				}
				bG(a, {
					fill: "url(#" + o.id + ")",
					opacity: 1,
					"fill-opacity": 1
				});
				h.fill = p;
				h.opacity = 1;
				h.fillOpacity = 1;
				return 1
			},
			bJ = function(b) {
				var c = b.getBBox();
				bG(b.pattern, {
					patternTransform: a.format("translate({0},{1})", c.x, c.y)
				})
			},
			bK = function(c, d) {
				var e = {
						"": [0],
						none: [0],
						"-": [3, 1],
						".": [1, 1],
						"-.": [3, 1, 1, 1],
						"-..": [3, 1, 1, 1, 1, 1],
						". ": [1, 3],
						"- ": [4, 3],
						"--": [8, 3],
						"- .": [4, 3, 1, 3],
						"--.": [8, 3, 1, 3],
						"--..": [8, 3, 1, 3, 1, 3]
					},
					h = c.node,
					i = c.attrs,
					j = c.rotate(),
					k = function(a, b) {
						b = e[x.call(b)];
						if(b) {
							var c = a.attrs["stroke-width"] || "1",
								f = ({
									round: c,
									square: c,
									butt: 0
								})[a.attrs["stroke-linecap"] || d["stroke-linecap"]] || 0,
								g = [],
								i = b[w];
							while(i--) g[i] = b[i] * c + (i % 2 ? 1 : -1) * f;
							bG(h, {
								"stroke-dasharray": g[v](",")
							})
						}
					};
				d[f]("rotation") && (j = d.rotation);
				var m = r(j)[s](b);
				if(m.length - 1) {
					m[1] = +m[1];
					m[2] = +m[2]
				} else m = null;
				S(j) && c.rotate(0, true);
				for(var n in d) {
					if(d[f](n)) {
						if(!W[f](n)) continue;
						var o = d[n];
						i[n] = o;
						switch(n) {
							case "blur":
								c.blur(o);
								break;
							case "rotation":
								c.rotate(o, true);
								break;
							case "href":
							case "title":
							case "target":
								var t = h.parentNode;
								if(x.call(t.tagName) != "a") {
									var u = bG("a");
									t.insertBefore(u, h);
									u[l](h);
									t = u
								}
								n == "target" && o == "blank" ? t.setAttributeNS(c.paper.xlink, "show", "new") : t.setAttributeNS(c.paper.xlink, n, o);
								break;
							case "cursor":
								h.style.cursor = o;
								break;
							case "clip-rect":
								var y = r(o)[s](b);
								if(y[w] == 4) {
									c.clip && c.clip.parentNode.parentNode.removeChild(c.clip.parentNode);
									var z = bG("clipPath"),
										A = bG("rect");
									z.id = bh();
									bG(A, {
										x: y[0],
										y: y[1],
										width: y[2],
										height: y[3]
									});
									z[l](A);
									c.paper.defs[l](z);
									bG(h, {
										"clip-path": "url(#" + z.id + ")"
									});
									c.clip = A
								}
								if(!o) {
									var B = g.getElementById(h.getAttribute("clip-path")[Y](/(^url\(#|\)$)/g, p));
									B && B.parentNode.removeChild(B);
									bG(h, {
										"clip-path": p
									});
									delete c.clip
								}
								break;
							case "path":
								c.type == "path" && bG(h, {
									d: o ? i.path = bq(o) : "M0,0"
								});
								break;
							case "width":
								h[R](n, o);
								if(i.fx) {
									n = "x";
									o = i.x
								} else break;
							case "x":
								i.fx && (o = -i.x - (i.width || 0));
							case "rx":
								if(n == "rx" && c.type == "rect") break;
							case "cx":
								m && (n == "x" || n == "cx") && (m[1] += o - i[n]);
								h[R](n, o);
								c.pattern && bJ(c);
								break;
							case "height":
								h[R](n, o);
								if(i.fy) {
									n = "y";
									o = i.y
								} else break;
							case "y":
								i.fy && (o = -i.y - (i.height || 0));
							case "ry":
								if(n == "ry" && c.type == "rect") break;
							case "cy":
								m && (n == "y" || n == "cy") && (m[2] += o - i[n]);
								h[R](n, o);
								c.pattern && bJ(c);
								break;
							case "r":
								c.type == "rect" ? bG(h, {
									rx: o,
									ry: o
								}) : h[R](n, o);
								break;
							case "src":
								c.type == "image" && h.setAttributeNS(c.paper.xlink, "href", o);
								break;
							case "stroke-width":
								h.style.strokeWidth = o;
								h[R](n, o);
								i["stroke-dasharray"] && k(c, i["stroke-dasharray"]);
								break;
							case "stroke-dasharray":
								k(c, o);
								break;
							case "translation":
								var C = r(o)[s](b);
								C[0] = +C[0] || 0;
								C[1] = +C[1] || 0;
								if(m) {
									m[1] += C[0];
									m[2] += C[1]
								}
								cz.call(c, C[0], C[1]);
								break;
							case "scale":
								C = r(o)[s](b);
								c.scale(+C[0] || 1, +C[1] || +C[0] || 1, isNaN(S(C[2])) ? null : +C[2], isNaN(S(C[3])) ? null : +C[3]);
								break;
							case I:
								var D = r(o).match(M);
								if(D) {
									z = bG("pattern");
									var E = bG("image");
									z.id = bh();
									bG(z, {
										x: 0,
										y: 0,
										patternUnits: "userSpaceOnUse",
										height: 1,
										width: 1
									});
									bG(E, {
										x: 0,
										y: 0
									});
									E.setAttributeNS(c.paper.xlink, "href", D[1]);
									z[l](E);
									var F = g.createElement("img");
									F.style.cssText = "position:absolute;left:-9999em;top-9999em";
									F.onload = function() {
										bG(z, {
											width: this.offsetWidth,
											height: this.offsetHeight
										});
										bG(E, {
											width: this.offsetWidth,
											height: this.offsetHeight
										});
										g.body.removeChild(this);
										c.paper.safari()
									};
									g.body[l](F);
									F.src = D[1];
									c.paper.defs[l](z);
									h.style.fill = "url(#" + z.id + ")";
									bG(h, {
										fill: "url(#" + z.id + ")"
									});
									c.pattern = z;
									c.pattern && bJ(c);
									break
								}
								var G = a.getRGB(o);
								if(G.error)
									if((({
											circle: 1,
											ellipse: 1
										})[f](c.type) || r(o).charAt() != "r") && bI(h, o, c.paper)) {
										i.gradient = o;
										i.fill = "none";
										break
									} else {
										delete d.gradient;
										delete i.gradient;
										!a.is(i.opacity, "undefined") && a.is(d.opacity, "undefined") && bG(h, {
											opacity: i.opacity
										});
										!a.is(i["fill-opacity"], "undefined") && a.is(d["fill-opacity"], "undefined") && bG(h, {
											"fill-opacity": i["fill-opacity"]
										})
									}
								G[f]("opacity") && bG(h, {
									"fill-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity
								});
							case "stroke":
								G = a.getRGB(o);
								h[R](n, G.hex);
								n == "stroke" && G[f]("opacity") && bG(h, {
									"stroke-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity
								});
								break;
							case "gradient":
								(({
									circle: 1,
									ellipse: 1
								})[f](c.type) || r(o).charAt() != "r") && bI(h, o, c.paper);
								break;
							case "opacity":
								i.gradient && !i[f]("stroke-opacity") && bG(h, {
									"stroke-opacity": o > 1 ? o / 100 : o
								});
							case "fill-opacity":
								if(i.gradient) {
									var H = g.getElementById(h.getAttribute(I)[Y](/^url\(#|\)$/g, p));
									if(H) {
										var J = H.getElementsByTagName("stop");
										J[J[w] - 1][R]("stop-opacity", o)
									}
									break
								}
							default:
								n == "font-size" && (o = T(o, 10) + "px");
								var K = n[Y](/(\-.)/g, function(a) {
									return V.call(a.substring(1))
								});
								h.style[K] = o;
								h[R](n, o);
								break
						}
					}
				}
				bM(c, d);
				m ? c.rotate(m.join(q)) : S(j) && c.rotate(j, true)
			},
			bL = 1.2,
			bM = function(b, c) {
				if(b.type != "text" || !(c[f]("text") || c[f]("font") || c[f]("font-size") || c[f]("x") || c[f]("y"))) return;
				var d = b.attrs,
					e = b.node,
					h = e.firstChild ? T(g.defaultView.getComputedStyle(e.firstChild, p).getPropertyValue("font-size"), 10) : 10;
				if(c[f]("text")) {
					d.text = c.text;
					while(e.firstChild) e.removeChild(e.firstChild);
					var i = r(c.text)[s]("\n");
					for(var j = 0, k = i[w]; j < k; j++)
						if(i[j]) {
							var m = bG("tspan");
							j && bG(m, {
								dy: h * bL,
								x: d.x
							});
							m[l](g.createTextNode(i[j]));
							e[l](m)
						}
				} else {
					i = e.getElementsByTagName("tspan");
					for(j = 0, k = i[w]; j < k; j++) j && bG(i[j], {
						dy: h * bL,
						x: d.x
					})
				}
				bG(e, {
					y: d.y
				});
				var n = b.getBBox(),
					o = d.y - (n.y + n.height / 2);
				o && a.is(o, "finite") && bG(e, {
					y: d.y + o
				})
			},
			bN = function(b, c) {
				var d = 0,
					e = 0;
				this[0] = b;
				this.id = a._oid++;
				this.node = b;
				b.raphael = this;
				this.paper = c;
				this.attrs = this.attrs || {};
				this.transformations = [];
				this._ = {
					tx: 0,
					ty: 0,
					rt: {
						deg: 0,
						cx: 0,
						cy: 0
					},
					sx: 1,
					sy: 1
				};
				!c.bottom && (c.bottom = this);
				this.prev = c.top;
				c.top && (c.top.next = this);
				c.top = this;
				this.next = null
			},
			bO = bN[e];
		bN[e].rotate = function(c, d, e) {
			if(this.removed) return this;
			if(c == null) {
				if(this._.rt.cx) return [this._.rt.deg, this._.rt.cx, this._.rt.cy][v](q);
				return this._.rt.deg
			}
			var f = this.getBBox();
			c = r(c)[s](b);
			if(c[w] - 1) {
				d = S(c[1]);
				e = S(c[2])
			}
			c = S(c[0]);
			d != null && d !== false ? this._.rt.deg = c : this._.rt.deg += c;
			e == null && (d = null);
			this._.rt.cx = d;
			this._.rt.cy = e;
			d = d == null ? f.x + f.width / 2 : d;
			e = e == null ? f.y + f.height / 2 : e;
			if(this._.rt.deg) {
				this.transformations[0] = a.format("rotate({0} {1} {2})", this._.rt.deg, d, e);
				this.clip && bG(this.clip, {
					transform: a.format("rotate({0} {1} {2})", -this._.rt.deg, d, e)
				})
			} else {
				this.transformations[0] = p;
				this.clip && bG(this.clip, {
					transform: p
				})
			}
			bG(this.node, {
				transform: this.transformations[v](q)
			});
			return this
		};
		bN[e].hide = function() {
			!this.removed && (this.node.style.display = "none");
			return this
		};
		bN[e].show = function() {
			!this.removed && (this.node.style.display = "");
			return this
		};
		bN[e].remove = function() {
			if(this.removed) return;
			bA(this, this.paper);
			this.node.parentNode.removeChild(this.node);
			for(var a in this) delete this[a];
			this.removed = true
		};
		bN[e].getBBox = function() {
			if(this.removed) return this;
			if(this.type == "path") return bn(this.attrs.path);
			if(this.node.style.display == "none") {
				this.show();
				var a = true
			}
			var b = {};
			try {
				b = this.node.getBBox()
			} catch(a) {} finally {
				b = b || {}
			}
			if(this.type == "text") {
				b = {
					x: b.x,
					y: Infinity,
					width: 0,
					height: 0
				};
				for(var c = 0, d = this.node.getNumberOfChars(); c < d; c++) {
					var e = this.node.getExtentOfChar(c);
					e.y < b.y && (b.y = e.y);
					e.y + e.height - b.y > b.height && (b.height = e.y + e.height - b.y);
					e.x + e.width - b.x > b.width && (b.width = e.x + e.width - b.x)
				}
			}
			a && this.hide();
			return b
		};
		bN[e].attr = function(b, c) {
			if(this.removed) return this;
			if(b == null) {
				var d = {};
				for(var e in this.attrs) this.attrs[f](e) && (d[e] = this.attrs[e]);
				this._.rt.deg && (d.rotation = this.rotate());
				(this._.sx != 1 || this._.sy != 1) && (d.scale = this.scale());
				d.gradient && d.fill == "none" && (d.fill = d.gradient) && delete d.gradient;
				return d
			}
			if(c == null && a.is(b, F)) {
				if(b == "translation") return cz.call(this);
				if(b == "rotation") return this.rotate();
				if(b == "scale") return this.scale();
				if(b == I && this.attrs.fill == "none" && this.attrs.gradient) return this.attrs.gradient;
				return this.attrs[b]
			}
			if(c == null && a.is(b, G)) {
				var g = {};
				for(var h = 0, i = b.length; h < i; h++) g[b[h]] = this.attr(b[h]);
				return g
			}
			if(c != null) {
				var j = {};
				j[b] = c
			} else b != null && a.is(b, "object") && (j = b);
			for(var k in this.paper.customAttributes)
				if(this.paper.customAttributes[f](k) && j[f](k) && a.is(this.paper.customAttributes[k], "function")) {
					var l = this.paper.customAttributes[k].apply(this, [][n](j[k]));
					this.attrs[k] = j[k];
					for(var m in l) l[f](m) && (j[m] = l[m])
				}
			bK(this, j);
			return this
		};
		bN[e].toFront = function() {
			if(this.removed) return this;
			this.node.parentNode[l](this.node);
			var a = this.paper;
			a.top != this && bB(this, a);
			return this
		};
		bN[e].toBack = function() {
			if(this.removed) return this;
			if(this.node.parentNode.firstChild != this.node) {
				this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
				bC(this, this.paper);
				var a = this.paper
			}
			return this
		};
		bN[e].insertAfter = function(a) {
			if(this.removed) return this;
			var b = a.node || a[a.length - 1].node;
			b.nextSibling ? b.parentNode.insertBefore(this.node, b.nextSibling) : b.parentNode[l](this.node);
			bD(this, a, this.paper);
			return this
		};
		bN[e].insertBefore = function(a) {
			if(this.removed) return this;
			var b = a.node || a[0].node;
			b.parentNode.insertBefore(this.node, b);
			bE(this, a, this.paper);
			return this
		};
		bN[e].blur = function(a) {
			var b = this;
			if(+a !== 0) {
				var c = bG("filter"),
					d = bG("feGaussianBlur");
				b.attrs.blur = a;
				c.id = bh();
				bG(d, {
					stdDeviation: +a || 1.5
				});
				c.appendChild(d);
				b.paper.defs.appendChild(c);
				b._blur = c;
				bG(b.node, {
					filter: "url(#" + c.id + ")"
				})
			} else {
				if(b._blur) {
					b._blur.parentNode.removeChild(b._blur);
					delete b._blur;
					delete b.attrs.blur
				}
				b.node.removeAttribute("filter")
			}
		};
		var bP = function(a, b, c, d) {
				var e = bG("circle");
				a.canvas && a.canvas[l](e);
				var f = new bN(e, a);
				f.attrs = {
					cx: b,
					cy: c,
					r: d,
					fill: "none",
					stroke: "#000"
				};
				f.type = "circle";
				bG(e, f.attrs);
				return f
			},
			bQ = function(a, b, c, d, e, f) {
				var g = bG("rect");
				a.canvas && a.canvas[l](g);
				var h = new bN(g, a);
				h.attrs = {
					x: b,
					y: c,
					width: d,
					height: e,
					r: f || 0,
					rx: f || 0,
					ry: f || 0,
					fill: "none",
					stroke: "#000"
				};
				h.type = "rect";
				bG(g, h.attrs);
				return h
			},
			bR = function(a, b, c, d, e) {
				var f = bG("ellipse");
				a.canvas && a.canvas[l](f);
				var g = new bN(f, a);
				g.attrs = {
					cx: b,
					cy: c,
					rx: d,
					ry: e,
					fill: "none",
					stroke: "#000"
				};
				g.type = "ellipse";
				bG(f, g.attrs);
				return g
			},
			bS = function(a, b, c, d, e, f) {
				var g = bG("image");
				bG(g, {
					x: c,
					y: d,
					width: e,
					height: f,
					preserveAspectRatio: "none"
				});
				g.setAttributeNS(a.xlink, "href", b);
				a.canvas && a.canvas[l](g);
				var h = new bN(g, a);
				h.attrs = {
					x: c,
					y: d,
					width: e,
					height: f,
					src: b
				};
				h.type = "image";
				return h
			},
			bT = function(a, b, c, d) {
				var e = bG("text");
				bG(e, {
					x: b,
					y: c,
					"text-anchor": "middle"
				});
				a.canvas && a.canvas[l](e);
				var f = new bN(e, a);
				f.attrs = {
					x: b,
					y: c,
					"text-anchor": "middle",
					text: d,
					font: W.font,
					stroke: "none",
					fill: "#000"
				};
				f.type = "text";
				bK(f, f.attrs);
				return f
			},
			bU = function(a, b) {
				this.width = a || this.width;
				this.height = b || this.height;
				this.canvas[R]("width", this.width);
				this.canvas[R]("height", this.height);
				return this
			},
			bV = function() {
				var b = by[m](0, arguments),
					c = b && b.container,
					d = b.x,
					e = b.y,
					f = b.width,
					h = b.height;
				if(!c) throw new Error("SVG container not found.");
				var i = bG("svg");
				d = d || 0;
				e = e || 0;
				f = f || 512;
				h = h || 342;
				bG(i, {
					xmlns: "http://www.w3.org/2000/svg",
					version: 1.1,
					width: f,
					height: h
				});
				if(c == 1) {
					i.style.cssText = "position:absolute;left:" + d + "px;top:" + e + "px";
					g.body[l](i)
				} else c.firstChild ? c.insertBefore(i, c.firstChild) : c[l](i);
				c = new j;
				c.width = f;
				c.height = h;
				c.canvas = i;
				bz.call(c, c, a.fn);
				c.clear();
				return c
			};
		k.clear = function() {
			var a = this.canvas;
			while(a.firstChild) a.removeChild(a.firstChild);
			this.bottom = this.top = null;
			(this.desc = bG("desc"))[l](g.createTextNode("Created with Raphaël"));
			a[l](this.desc);
			a[l](this.defs = bG("defs"))
		};
		k.remove = function() {
			this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
			for(var a in this) this[a] = bF(a)
		}
	}
	if(a.vml) {
		var bW = {
				M: "m",
				L: "l",
				C: "c",
				Z: "x",
				m: "t",
				l: "r",
				c: "v",
				z: "x"
			},
			bX = /([clmz]),?([^clmz]*)/gi,
			bY = / progid:\S+Blur\([^\)]+\)/g,
			bZ = /-?[^,\s-]+/g,
			b$ = 1000 + q + 1000,
			b_ = 10,
			ca = {
				path: 1,
				rect: 1
			},
			cb = function(a) {
				var b = /[ahqstv]/ig,
					c = bq;
				r(a).match(b) && (c = bw);
				b = /[clmz]/g;
				if(c == bq && !r(a).match(b)) {
					var d = r(a)[Y](bX, function(a, b, c) {
						var d = [],
							e = x.call(b) == "m",
							f = bW[b];
						c[Y](bZ, function(a) {
							if(e && d[w] == 2) {
								f += d + bW[b == "m" ? "l" : "L"];
								d = []
							}
							d[L](Q(a * b_))
						});
						return f + d
					});
					return d
				}
				var e = c(a),
					f, g;
				d = [];
				for(var h = 0, i = e[w]; h < i; h++) {
					f = e[h];
					g = x.call(e[h][0]);
					g == "z" && (g = "x");
					for(var j = 1, k = f[w]; j < k; j++) g += Q(f[j] * b_) + (j != k - 1 ? "," : p);
					d[L](g)
				}
				return d[v](q)
			};
		a[H] = function() {
			return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
		};
		bH = function(a, b) {
			var c = cd("group");
			c.style.cssText = "position:absolute;left:0;top:0;width:" + b.width + "px;height:" + b.height + "px";
			c.coordsize = b.coordsize;
			c.coordorigin = b.coordorigin;
			var d = cd("shape"),
				e = d.style;
			e.width = b.width + "px";
			e.height = b.height + "px";
			d.coordsize = b$;
			d.coordorigin = b.coordorigin;
			c[l](d);
			var f = new bN(d, c, b),
				g = {
					fill: "none",
					stroke: "#000"
				};
			a && (g.path = a);
			f.type = "path";
			f.path = [];
			f.Path = p;
			bK(f, g);
			b.canvas[l](c);
			return f
		};
		bK = function(c, d) {
			c.attrs = c.attrs || {};
			var e = c.node,
				h = c.attrs,
				i = e.style,
				j, k = (d.x != h.x || d.y != h.y || d.width != h.width || d.height != h.height || d.r != h.r) && c.type == "rect",
				m = c;
			for(var n in d) d[f](n) && (h[n] = d[n]);
			if(k) {
				h.path = cc(h.x, h.y, h.width, h.height, h.r);
				c.X = h.x;
				c.Y = h.y;
				c.W = h.width;
				c.H = h.height
			}
			d.href && (e.href = d.href);
			d.title && (e.title = d.title);
			d.target && (e.target = d.target);
			d.cursor && (i.cursor = d.cursor);
			"blur" in d && c.blur(d.blur);
			if(d.path && c.type == "path" || k) e.path = cb(h.path);
			d.rotation != null && c.rotate(d.rotation, true);
			if(d.translation) {
				j = r(d.translation)[s](b);
				cz.call(c, j[0], j[1]);
				if(c._.rt.cx != null) {
					c._.rt.cx += +j[0];
					c._.rt.cy += +j[1];
					c.setBox(c.attrs, j[0], j[1])
				}
			}
			if(d.scale) {
				j = r(d.scale)[s](b);
				c.scale(+j[0] || 1, +j[1] || +j[0] || 1, +j[2] || null, +j[3] || null)
			}
			if("clip-rect" in d) {
				var o = r(d["clip-rect"])[s](b);
				if(o[w] == 4) {
					o[2] = +o[2] + +o[0];
					o[3] = +o[3] + +o[1];
					var q = e.clipRect || g.createElement("div"),
						t = q.style,
						u = e.parentNode;
					t.clip = a.format("rect({1}px {2}px {3}px {0}px)", o);
					if(!e.clipRect) {
						t.position = "absolute";
						t.top = 0;
						t.left = 0;
						t.width = c.paper.width + "px";
						t.height = c.paper.height + "px";
						u.parentNode.insertBefore(q, u);
						q[l](u);
						e.clipRect = q
					}
				}
				d["clip-rect"] || e.clipRect && (e.clipRect.style.clip = p)
			}
			c.type == "image" && d.src && (e.src = d.src);
			if(c.type == "image" && d.opacity) {
				e.filterOpacity = U + ".Alpha(opacity=" + d.opacity * 100 + ")";
				i.filter = (e.filterMatrix || p) + (e.filterOpacity || p)
			}
			d.font && (i.font = d.font);
			d["font-family"] && (i.fontFamily = "\"" + d["font-family"][s](",")[0][Y](/^['"]+|['"]+$/g, p) + "\"");
			d["font-size"] && (i.fontSize = d["font-size"]);
			d["font-weight"] && (i.fontWeight = d["font-weight"]);
			d["font-style"] && (i.fontStyle = d["font-style"]);
			if(d.opacity != null || d["stroke-width"] != null || d.fill != null || d.stroke != null || d["stroke-width"] != null || d["stroke-opacity"] != null || d["fill-opacity"] != null || d["stroke-dasharray"] != null || d["stroke-miterlimit"] != null || d["stroke-linejoin"] != null || d["stroke-linecap"] != null) {
				e = c.shape || e;
				var v = e.getElementsByTagName(I) && e.getElementsByTagName(I)[0],
					x = false;
				!v && (x = v = cd(I));
				if("fill-opacity" in d || "opacity" in d) {
					var y = ((+h["fill-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+a.getRGB(d.fill).o + 1 || 2) - 1);
					y = A(z(y, 0), 1);
					v.opacity = y
				}
				d.fill && (v.on = true);
				if(v.on == null || d.fill == "none") v.on = false;
				if(v.on && d.fill) {
					var B = d.fill.match(M);
					if(B) {
						v.src = B[1];
						v.type = "tile"
					} else {
						v.color = a.getRGB(d.fill).hex;
						v.src = p;
						v.type = "solid";
						if(a.getRGB(d.fill).error && (m.type in {
								circle: 1,
								ellipse: 1
							} || r(d.fill).charAt() != "r") && bI(m, d.fill)) {
							h.fill = "none";
							h.gradient = d.fill
						}
					}
				}
				x && e[l](v);
				var C = e.getElementsByTagName("stroke") && e.getElementsByTagName("stroke")[0],
					D = false;
				!C && (D = C = cd("stroke"));
				if(d.stroke && d.stroke != "none" || d["stroke-width"] || d["stroke-opacity"] != null || d["stroke-dasharray"] || d["stroke-miterlimit"] || d["stroke-linejoin"] || d["stroke-linecap"]) C.on = true;
				(d.stroke == "none" || C.on == null || d.stroke == 0 || d["stroke-width"] == 0) && (C.on = false);
				var E = a.getRGB(d.stroke);
				C.on && d.stroke && (C.color = E.hex);
				y = ((+h["stroke-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+E.o + 1 || 2) - 1);
				var F = (S(d["stroke-width"]) || 1) * 0.75;
				y = A(z(y, 0), 1);
				d["stroke-width"] == null && (F = h["stroke-width"]);
				d["stroke-width"] && (C.weight = F);
				F && F < 1 && (y *= F) && (C.weight = 1);
				C.opacity = y;
				d["stroke-linejoin"] && (C.joinstyle = d["stroke-linejoin"] || "miter");
				C.miterlimit = d["stroke-miterlimit"] || 8;
				d["stroke-linecap"] && (C.endcap = d["stroke-linecap"] == "butt" ? "flat" : d["stroke-linecap"] == "square" ? "square" : "round");
				if(d["stroke-dasharray"]) {
					var G = {
						"-": "shortdash",
						".": "shortdot",
						"-.": "shortdashdot",
						"-..": "shortdashdotdot",
						". ": "dot",
						"- ": "dash",
						"--": "longdash",
						"- .": "dashdot",
						"--.": "longdashdot",
						"--..": "longdashdotdot"
					};
					C.dashstyle = G[f](d["stroke-dasharray"]) ? G[d["stroke-dasharray"]] : p
				}
				D && e[l](C)
			}
			if(m.type == "text") {
				i = m.paper.span.style;
				h.font && (i.font = h.font);
				h["font-family"] && (i.fontFamily = h["font-family"]);
				h["font-size"] && (i.fontSize = h["font-size"]);
				h["font-weight"] && (i.fontWeight = h["font-weight"]);
				h["font-style"] && (i.fontStyle = h["font-style"]);
				m.node.string && (m.paper.span.innerHTML = r(m.node.string)[Y](/</g, "&#60;")[Y](/&/g, "&#38;")[Y](/\n/g, "<br>"));
				m.W = h.w = m.paper.span.offsetWidth;
				m.H = h.h = m.paper.span.offsetHeight;
				m.X = h.x;
				m.Y = h.y + Q(m.H / 2);
				switch(h["text-anchor"]) {
					case "start":
						m.node.style["v-text-align"] = "left";
						m.bbx = Q(m.W / 2);
						break;
					case "end":
						m.node.style["v-text-align"] = "right";
						m.bbx = -Q(m.W / 2);
						break;
					default:
						m.node.style["v-text-align"] = "center";
						break
				}
			}
		};
		bI = function(a, b) {
			a.attrs = a.attrs || {};
			var c = a.attrs,
				d, e = "linear",
				f = ".5 .5";
			a.attrs.gradient = b;
			b = r(b)[Y](bd, function(a, b, c) {
				e = "radial";
				if(b && c) {
					b = S(b);
					c = S(c);
					C(b - 0.5, 2) + C(c - 0.5, 2) > 0.25 && (c = y.sqrt(0.25 - C(b - 0.5, 2)) * ((c > 0.5) * 2 - 1) + 0.5);
					f = b + q + c
				}
				return p
			});
			b = b[s](/\s*\-\s*/);
			if(e == "linear") {
				var g = b.shift();
				g = -S(g);
				if(isNaN(g)) return null
			}
			var h = bx(b);
			if(!h) return null;
			a = a.shape || a.node;
			d = a.getElementsByTagName(I)[0] || cd(I);
			!d.parentNode && a.appendChild(d);
			if(h[w]) {
				d.on = true;
				d.method = "none";
				d.color = h[0].color;
				d.color2 = h[h[w] - 1].color;
				var i = [];
				for(var j = 0, k = h[w]; j < k; j++) h[j].offset && i[L](h[j].offset + q + h[j].color);
				d.colors && (d.colors.value = i[w] ? i[v]() : "0% " + d.color);
				if(e == "radial") {
					d.type = "gradientradial";
					d.focus = "100%";
					d.focussize = f;
					d.focusposition = f
				} else {
					d.type = "gradient";
					d.angle = (270 - g) % 360
				}
			}
			return 1
		};
		bN = function(b, c, d) {
			var e = 0,
				f = 0,
				g = 0,
				h = 1;
			this[0] = b;
			this.id = a._oid++;
			this.node = b;
			b.raphael = this;
			this.X = 0;
			this.Y = 0;
			this.attrs = {};
			this.Group = c;
			this.paper = d;
			this._ = {
				tx: 0,
				ty: 0,
				rt: {
					deg: 0
				},
				sx: 1,
				sy: 1
			};
			!d.bottom && (d.bottom = this);
			this.prev = d.top;
			d.top && (d.top.next = this);
			d.top = this;
			this.next = null
		};
		bO = bN[e];
		bO.rotate = function(a, c, d) {
			if(this.removed) return this;
			if(a == null) {
				if(this._.rt.cx) return [this._.rt.deg, this._.rt.cx, this._.rt.cy][v](q);
				return this._.rt.deg
			}
			a = r(a)[s](b);
			if(a[w] - 1) {
				c = S(a[1]);
				d = S(a[2])
			}
			a = S(a[0]);
			c != null ? this._.rt.deg = a : this._.rt.deg += a;
			d == null && (c = null);
			this._.rt.cx = c;
			this._.rt.cy = d;
			this.setBox(this.attrs, c, d);
			this.Group.style.rotation = this._.rt.deg;
			return this
		};
		bO.setBox = function(a, b, c) {
			if(this.removed) return this;
			var d = this.Group.style,
				e = this.shape && this.shape.style || this.node.style;
			a = a || {};
			for(var g in a) a[f](g) && (this.attrs[g] = a[g]);
			b = b || this._.rt.cx;
			c = c || this._.rt.cy;
			var h = this.attrs,
				i, j, k, l;
			switch(this.type) {
				case "circle":
					i = h.cx - h.r;
					j = h.cy - h.r;
					k = l = h.r * 2;
					break;
				case "ellipse":
					i = h.cx - h.rx;
					j = h.cy - h.ry;
					k = h.rx * 2;
					l = h.ry * 2;
					break;
				case "image":
					i = +h.x;
					j = +h.y;
					k = h.width || 0;
					l = h.height || 0;
					break;
				case "text":
					this.textpath.v = ["m", Q(h.x), ", ", Q(h.y - 2), "l", Q(h.x) + 1, ", ", Q(h.y - 2)][v](p);
					i = h.x - Q(this.W / 2);
					j = h.y - this.H / 2;
					k = this.W;
					l = this.H;
					break;
				case "rect":
				case "path":
					if(this.attrs.path) {
						var m = bn(this.attrs.path);
						i = m.x;
						j = m.y;
						k = m.width;
						l = m.height
					} else {
						i = 0;
						j = 0;
						k = this.paper.width;
						l = this.paper.height
					}
					break;
				default:
					i = 0;
					j = 0;
					k = this.paper.width;
					l = this.paper.height;
					break
			}
			b = b == null ? i + k / 2 : b;
			c = c == null ? j + l / 2 : c;
			var n = b - this.paper.width / 2,
				o = c - this.paper.height / 2,
				q;
			d.left != (q = n + "px") && (d.left = q);
			d.top != (q = o + "px") && (d.top = q);
			this.X = ca[f](this.type) ? -n : i;
			this.Y = ca[f](this.type) ? -o : j;
			this.W = k;
			this.H = l;
			if(ca[f](this.type)) {
				e.left != (q = -n * b_ + "px") && (e.left = q);
				e.top != (q = -o * b_ + "px") && (e.top = q)
			} else if(this.type == "text") {
				e.left != (q = -n + "px") && (e.left = q);
				e.top != (q = -o + "px") && (e.top = q)
			} else {
				d.width != (q = this.paper.width + "px") && (d.width = q);
				d.height != (q = this.paper.height + "px") && (d.height = q);
				e.left != (q = i - n + "px") && (e.left = q);
				e.top != (q = j - o + "px") && (e.top = q);
				e.width != (q = k + "px") && (e.width = q);
				e.height != (q = l + "px") && (e.height = q)
			}
		};
		bO.hide = function() {
			!this.removed && (this.Group.style.display = "none");
			return this
		};
		bO.show = function() {
			!this.removed && (this.Group.style.display = "block");
			return this
		};
		bO.getBBox = function() {
			if(this.removed) return this;
			if(ca[f](this.type)) return bn(this.attrs.path);
			return {
				x: this.X + (this.bbx || 0),
				y: this.Y,
				width: this.W,
				height: this.H
			}
		};
		bO.remove = function() {
			if(this.removed) return;
			bA(this, this.paper);
			this.node.parentNode.removeChild(this.node);
			this.Group.parentNode.removeChild(this.Group);
			this.shape && this.shape.parentNode.removeChild(this.shape);
			for(var a in this) delete this[a];
			this.removed = true
		};
		bO.attr = function(b, c) {
			if(this.removed) return this;
			if(b == null) {
				var d = {};
				for(var e in this.attrs) this.attrs[f](e) && (d[e] = this.attrs[e]);
				this._.rt.deg && (d.rotation = this.rotate());
				(this._.sx != 1 || this._.sy != 1) && (d.scale = this.scale());
				d.gradient && d.fill == "none" && (d.fill = d.gradient) && delete d.gradient;
				return d
			}
			if(c == null && a.is(b, "string")) {
				if(b == "translation") return cz.call(this);
				if(b == "rotation") return this.rotate();
				if(b == "scale") return this.scale();
				if(b == I && this.attrs.fill == "none" && this.attrs.gradient) return this.attrs.gradient;
				return this.attrs[b]
			}
			if(this.attrs && c == null && a.is(b, G)) {
				var g, h = {};
				for(e = 0, g = b[w]; e < g; e++) h[b[e]] = this.attr(b[e]);
				return h
			}
			var i;
			if(c != null) {
				i = {};
				i[b] = c
			}
			c == null && a.is(b, "object") && (i = b);
			if(i) {
				for(var j in this.paper.customAttributes)
					if(this.paper.customAttributes[f](j) && i[f](j) && a.is(this.paper.customAttributes[j], "function")) {
						var k = this.paper.customAttributes[j].apply(this, [][n](i[j]));
						this.attrs[j] = i[j];
						for(var l in k) k[f](l) && (i[l] = k[l])
					}
				i.text && this.type == "text" && (this.node.string = i.text);
				bK(this, i);
				i.gradient && (({
					circle: 1,
					ellipse: 1
				})[f](this.type) || r(i.gradient).charAt() != "r") && bI(this, i.gradient);
				(!ca[f](this.type) || this._.rt.deg) && this.setBox(this.attrs)
			}
			return this
		};
		bO.toFront = function() {
			!this.removed && this.Group.parentNode[l](this.Group);
			this.paper.top != this && bB(this, this.paper);
			return this
		};
		bO.toBack = function() {
			if(this.removed) return this;
			if(this.Group.parentNode.firstChild != this.Group) {
				this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
				bC(this, this.paper)
			}
			return this
		};
		bO.insertAfter = function(a) {
			if(this.removed) return this;
			a.constructor == cC && (a = a[a.length - 1]);
			a.Group.nextSibling ? a.Group.parentNode.insertBefore(this.Group, a.Group.nextSibling) : a.Group.parentNode[l](this.Group);
			bD(this, a, this.paper);
			return this
		};
		bO.insertBefore = function(a) {
			if(this.removed) return this;
			a.constructor == cC && (a = a[0]);
			a.Group.parentNode.insertBefore(this.Group, a.Group);
			bE(this, a, this.paper);
			return this
		};
		bO.blur = function(b) {
			var c = this.node.runtimeStyle,
				d = c.filter;
			d = d.replace(bY, p);
			if(+b !== 0) {
				this.attrs.blur = b;
				c.filter = d + q + U + ".Blur(pixelradius=" + (+b || 1.5) + ")";
				c.margin = a.format("-{0}px 0 0 -{0}px", Q(+b || 1.5))
			} else {
				c.filter = d;
				c.margin = 0;
				delete this.attrs.blur
			}
		};
		bP = function(a, b, c, d) {
			var e = cd("group"),
				f = cd("oval"),
				g = f.style;
			e.style.cssText = "position:absolute;left:0;top:0;width:" + a.width + "px;height:" + a.height + "px";
			e.coordsize = b$;
			e.coordorigin = a.coordorigin;
			e[l](f);
			var h = new bN(f, e, a);
			h.type = "circle";
			bK(h, {
				stroke: "#000",
				fill: "none"
			});
			h.attrs.cx = b;
			h.attrs.cy = c;
			h.attrs.r = d;
			h.setBox({
				x: b - d,
				y: c - d,
				width: d * 2,
				height: d * 2
			});
			a.canvas[l](e);
			return h
		};

		function cc(b, c, d, e, f) {
			return f ? a.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z", b + f, c, d - f * 2, f, -f, e - f * 2, f * 2 - d, f * 2 - e) : a.format("M{0},{1}l{2},0,0,{3},{4},0z", b, c, d, e, -d)
		}
		bQ = function(a, b, c, d, e, f) {
			var g = cc(b, c, d, e, f),
				h = a.path(g),
				i = h.attrs;
			h.X = i.x = b;
			h.Y = i.y = c;
			h.W = i.width = d;
			h.H = i.height = e;
			i.r = f;
			i.path = g;
			h.type = "rect";
			return h
		};
		bR = function(a, b, c, d, e) {
			var f = cd("group"),
				g = cd("oval"),
				h = g.style;
			f.style.cssText = "position:absolute;left:0;top:0;width:" + a.width + "px;height:" + a.height + "px";
			f.coordsize = b$;
			f.coordorigin = a.coordorigin;
			f[l](g);
			var i = new bN(g, f, a);
			i.type = "ellipse";
			bK(i, {
				stroke: "#000"
			});
			i.attrs.cx = b;
			i.attrs.cy = c;
			i.attrs.rx = d;
			i.attrs.ry = e;
			i.setBox({
				x: b - d,
				y: c - e,
				width: d * 2,
				height: e * 2
			});
			a.canvas[l](f);
			return i
		};
		bS = function(a, b, c, d, e, f) {
			var g = cd("group"),
				h = cd("image");
			g.style.cssText = "position:absolute;left:0;top:0;width:" + a.width + "px;height:" + a.height + "px";
			g.coordsize = b$;
			g.coordorigin = a.coordorigin;
			h.src = b;
			g[l](h);
			var i = new bN(h, g, a);
			i.type = "image";
			i.attrs.src = b;
			i.attrs.x = c;
			i.attrs.y = d;
			i.attrs.w = e;
			i.attrs.h = f;
			i.setBox({
				x: c,
				y: d,
				width: e,
				height: f
			});
			a.canvas[l](g);
			return i
		};
		bT = function(b, c, d, e) {
			var f = cd("group"),
				g = cd("shape"),
				h = g.style,
				i = cd("path"),
				j = i.style,
				k = cd("textpath");
			f.style.cssText = "position:absolute;left:0;top:0;width:" + b.width + "px;height:" + b.height + "px";
			f.coordsize = b$;
			f.coordorigin = b.coordorigin;
			i.v = a.format("m{0},{1}l{2},{1}", Q(c * 10), Q(d * 10), Q(c * 10) + 1);
			i.textpathok = true;
			h.width = b.width;
			h.height = b.height;
			k.string = r(e);
			k.on = true;
			g[l](k);
			g[l](i);
			f[l](g);
			var m = new bN(k, f, b);
			m.shape = g;
			m.textpath = i;
			m.type = "text";
			m.attrs.text = e;
			m.attrs.x = c;
			m.attrs.y = d;
			m.attrs.w = 1;
			m.attrs.h = 1;
			bK(m, {
				font: W.font,
				stroke: "none",
				fill: "#000"
			});
			m.setBox();
			b.canvas[l](f);
			return m
		};
		bU = function(a, b) {
			var c = this.canvas.style;
			a == +a && (a += "px");
			b == +b && (b += "px");
			c.width = a;
			c.height = b;
			c.clip = "rect(0 " + a + " " + b + " 0)";
			return this
		};
		var cd;
		g.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
		try {
			!g.namespaces.rvml && g.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
			cd = function(a) {
				return g.createElement("<rvml:" + a + " class=\"rvml\">")
			}
		} catch(a) {
			cd = function(a) {
				return g.createElement("<" + a + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"rvml\">")
			}
		}
		bV = function() {
			var b = by[m](0, arguments),
				c = b.container,
				d = b.height,
				e, f = b.width,
				h = b.x,
				i = b.y;
			if(!c) throw new Error("VML container not found.");
			var k = new j,
				n = k.canvas = g.createElement("div"),
				o = n.style;
			h = h || 0;
			i = i || 0;
			f = f || 512;
			d = d || 342;
			f == +f && (f += "px");
			d == +d && (d += "px");
			k.width = 1000;
			k.height = 1000;
			k.coordsize = b_ * 1000 + q + b_ * 1000;
			k.coordorigin = "0 0";
			k.span = g.createElement("span");
			k.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
			n[l](k.span);
			o.cssText = a.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", f, d);
			if(c == 1) {
				g.body[l](n);
				o.left = h + "px";
				o.top = i + "px";
				o.position = "absolute"
			} else c.firstChild ? c.insertBefore(n, c.firstChild) : c[l](n);
			bz.call(k, k, a.fn);
			return k
		};
		k.clear = function() {
			this.canvas.innerHTML = p;
			this.span = g.createElement("span");
			this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
			this.canvas[l](this.span);
			this.bottom = this.top = null
		};
		k.remove = function() {
			this.canvas.parentNode.removeChild(this.canvas);
			for(var a in this) this[a] = bF(a);
			return true
		}
	}
	var ce = navigator.userAgent.match(/Version\\x2f(.*?)\s/);
	navigator.vendor == "Apple Computer, Inc." && (ce && ce[1] < 4 || navigator.platform.slice(0, 2) == "iP") ? k.safari = function() {
		var a = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
			stroke: "none"
		});
		h.setTimeout(function() {
			a.remove()
		})
	} : k.safari = function() {};
	var cf = function() {
			this.returnValue = false
		},
		cg = function() {
			return this.originalEvent.preventDefault()
		},
		ch = function() {
			this.cancelBubble = true
		},
		ci = function() {
			return this.originalEvent.stopPropagation()
		},
		cj = (function() {
			{
				if(g.addEventListener) return function(a, b, c, d) {
					var e = o && u[b] ? u[b] : b,
						g = function(e) {
							if(o && u[f](b))
								for(var g = 0, h = e.targetTouches && e.targetTouches.length; g < h; g++) {
									if(e.targetTouches[g].target == a) {
										var i = e;
										e = e.targetTouches[g];
										e.originalEvent = i;
										e.preventDefault = cg;
										e.stopPropagation = ci;
										break
									}
								}
							return c.call(d, e)
						};
					a.addEventListener(e, g, false);
					return function() {
						a.removeEventListener(e, g, false);
						return true
					}
				};
				if(g.attachEvent) return function(a, b, c, d) {
					var e = function(a) {
						a = a || h.event;
						a.preventDefault = a.preventDefault || cf;
						a.stopPropagation = a.stopPropagation || ch;
						return c.call(d, a)
					};
					a.attachEvent("on" + b, e);
					var f = function() {
						a.detachEvent("on" + b, e);
						return true
					};
					return f
				}
			}
		})(),
		ck = [],
		cl = function(a) {
			var b = a.clientX,
				c = a.clientY,
				d = g.documentElement.scrollTop || g.body.scrollTop,
				e = g.documentElement.scrollLeft || g.body.scrollLeft,
				f, h = ck.length;
			while(h--) {
				f = ck[h];
				if(o) {
					var i = a.touches.length,
						j;
					while(i--) {
						j = a.touches[i];
						if(j.identifier == f.el._drag.id) {
							b = j.clientX;
							c = j.clientY;
							(a.originalEvent ? a.originalEvent : a).preventDefault();
							break
						}
					}
				} else a.preventDefault();
				b += e;
				c += d;
				f.move && f.move.call(f.move_scope || f.el, b - f.el._drag.x, c - f.el._drag.y, b, c, a)
			}
		},
		cm = function(b) {
			a.unmousemove(cl).unmouseup(cm);
			var c = ck.length,
				d;
			while(c--) {
				d = ck[c];
				d.el._drag = {};
				d.end && d.end.call(d.end_scope || d.start_scope || d.move_scope || d.el, b)
			}
			ck = []
		};
	for(var cn = t[w]; cn--;)(function(b) {
		a[b] = bN[e][b] = function(c, d) {
			if(a.is(c, "function")) {
				this.events = this.events || [];
				this.events.push({
					name: b,
					f: c,
					unbind: cj(this.shape || this.node || g, b, c, d || this)
				})
			}
			return this
		};
		a["un" + b] = bN[e]["un" + b] = function(a) {
			var c = this.events,
				d = c[w];
			while(d--)
				if(c[d].name == b && c[d].f == a) {
					c[d].unbind();
					c.splice(d, 1);
					!c.length && delete this.events;
					return this
				}
			return this
		}
	})(t[cn]);
	bO.hover = function(a, b, c, d) {
		return this.mouseover(a, c).mouseout(b, d || c)
	};
	bO.unhover = function(a, b) {
		return this.unmouseover(a).unmouseout(b)
	};
	bO.drag = function(b, c, d, e, f, h) {
		this._drag = {};
		this.mousedown(function(i) {
			(i.originalEvent || i).preventDefault();
			var j = g.documentElement.scrollTop || g.body.scrollTop,
				k = g.documentElement.scrollLeft || g.body.scrollLeft;
			this._drag.x = i.clientX + k;
			this._drag.y = i.clientY + j;
			this._drag.id = i.identifier;
			c && c.call(f || e || this, i.clientX + k, i.clientY + j, i);
			!ck.length && a.mousemove(cl).mouseup(cm);
			ck.push({
				el: this,
				move: b,
				end: d,
				move_scope: e,
				start_scope: f,
				end_scope: h
			})
		});
		return this
	};
	bO.undrag = function(b, c, d) {
		var e = ck.length;
		while(e--) ck[e].el == this && (ck[e].move == b && ck[e].end == d) && ck.splice(e++, 1);
		!ck.length && a.unmousemove(cl).unmouseup(cm)
	};
	k.circle = function(a, b, c) {
		return bP(this, a || 0, b || 0, c || 0)
	};
	k.rect = function(a, b, c, d, e) {
		return bQ(this, a || 0, b || 0, c || 0, d || 0, e || 0)
	};
	k.ellipse = function(a, b, c, d) {
		return bR(this, a || 0, b || 0, c || 0, d || 0)
	};
	k.path = function(b) {
		b && !a.is(b, F) && !a.is(b[0], G) && (b += p);
		return bH(a.format[m](a, arguments), this)
	};
	k.image = function(a, b, c, d, e) {
		return bS(this, a || "about:blank", b || 0, c || 0, d || 0, e || 0)
	};
	k.text = function(a, b, c) {
		return bT(this, a || 0, b || 0, r(c))
	};
	k.set = function(a) {
		arguments[w] > 1 && (a = Array[e].splice.call(arguments, 0, arguments[w]));
		return new cC(a)
	};
	k.setSize = bU;
	k.top = k.bottom = null;
	k.raphael = a;

	function co() {
		return this.x + q + this.y
	}
	bO.resetScale = function() {
		if(this.removed) return this;
		this._.sx = 1;
		this._.sy = 1;
		this.attrs.scale = "1 1"
	};
	bO.scale = function(a, b, c, d) {
		if(this.removed) return this;
		if(a == null && b == null) return {
			x: this._.sx,
			y: this._.sy,
			toString: co
		};
		b = b || a;
		!(+b) && (b = a);
		var e, f, g, h, i = this.attrs;
		if(a != 0) {
			var j = this.getBBox(),
				k = j.x + j.width / 2,
				l = j.y + j.height / 2,
				m = B(a / this._.sx),
				o = B(b / this._.sy);
			c = +c || c == 0 ? c : k;
			d = +d || d == 0 ? d : l;
			var r = this._.sx > 0,
				s = this._.sy > 0,
				t = ~(~(a / B(a))),
				u = ~(~(b / B(b))),
				x = m * t,
				y = o * u,
				z = this.node.style,
				A = c + B(k - c) * x * (k > c == r ? 1 : -1),
				C = d + B(l - d) * y * (l > d == s ? 1 : -1),
				D = a * t > b * u ? o : m;
			switch(this.type) {
				case "rect":
				case "image":
					var E = i.width * m,
						F = i.height * o;
					this.attr({
						height: F,
						r: i.r * D,
						width: E,
						x: A - E / 2,
						y: C - F / 2
					});
					break;
				case "circle":
				case "ellipse":
					this.attr({
						rx: i.rx * m,
						ry: i.ry * o,
						r: i.r * D,
						cx: A,
						cy: C
					});
					break;
				case "text":
					this.attr({
						x: A,
						y: C
					});
					break;
				case "path":
					var G = bp(i.path),
						H = true,
						I = r ? x : m,
						J = s ? y : o;
					for(var K = 0, L = G[w]; K < L; K++) {
						var M = G[K],
							N = V.call(M[0]); {
							if(N == "M" && H) continue;
							H = false
						}
						if(N == "A") {
							M[G[K][w] - 2] *= I;
							M[G[K][w] - 1] *= J;
							M[1] *= m;
							M[2] *= o;
							M[5] = +(t + u ? !(!(+M[5])) : !(+M[5]))
						} else if(N == "H")
							for(var O = 1, P = M[w]; O < P; O++) M[O] *= I;
						else if(N == "V")
							for(O = 1, P = M[w]; O < P; O++) M[O] *= J;
						else
							for(O = 1, P = M[w]; O < P; O++) M[O] *= O % 2 ? I : J
					}
					var Q = bn(G);
					e = A - Q.x - Q.width / 2;
					f = C - Q.y - Q.height / 2;
					G[0][1] += e;
					G[0][2] += f;
					this.attr({
						path: G
					});
					break
			}
			if(this.type in {
					text: 1,
					image: 1
				} && (t != 1 || u != 1))
				if(this.transformations) {
					this.transformations[2] = "scale(" [n](t, ",", u, ")");
					this.node[R]("transform", this.transformations[v](q));
					e = t == -1 ? -i.x - (E || 0) : i.x;
					f = u == -1 ? -i.y - (F || 0) : i.y;
					this.attr({
						x: e,
						y: f
					});
					i.fx = t - 1;
					i.fy = u - 1
				} else {
					this.node.filterMatrix = U + ".Matrix(M11=" [n](t, ", M12=0, M21=0, M22=", u, ", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
					z.filter = (this.node.filterMatrix || p) + (this.node.filterOpacity || p)
				}
			else if(this.transformations) {
				this.transformations[2] = p;
				this.node[R]("transform", this.transformations[v](q));
				i.fx = 0;
				i.fy = 0
			} else {
				this.node.filterMatrix = p;
				z.filter = (this.node.filterMatrix || p) + (this.node.filterOpacity || p)
			}
			i.scale = [a, b, c, d][v](q);
			this._.sx = a;
			this._.sy = b
		}
		return this
	};
	bO.clone = function() {
		if(this.removed) return null;
		var a = this.attr();
		delete a.scale;
		delete a.translation;
		return this.paper[this.type]().attr(a)
	};
	var cp = {},
		cq = function(b, c, d, e, f, g, h, i, j) {
			var k = 0,
				l = 100,
				m = [b, c, d, e, f, g, h, i].join(),
				n = cp[m],
				o, p;
			!n && (cp[m] = n = {
				data: []
			});
			n.timer && clearTimeout(n.timer);
			n.timer = setTimeout(function() {
				delete cp[m]
			}, 2000);
			if(j != null) {
				var q = cq(b, c, d, e, f, g, h, i);
				l = ~(~q) * 10
			}
			for(var r = 0; r < l + 1; r++) {
				if(n.data[j] > r) p = n.data[r * l];
				else {
					p = a.findDotsAtSegment(b, c, d, e, f, g, h, i, r / l);
					n.data[r] = p
				}
				r && (k += C(C(o.x - p.x, 2) + C(o.y - p.y, 2), 0.5));
				if(j != null && k >= j) return p;
				o = p
			}
			if(j == null) return k
		},
		cr = function(b, c) {
			return function(d, e, f) {
				d = bw(d);
				var g, h, i, j, k = "",
					l = {},
					m, n = 0;
				for(var o = 0, p = d.length; o < p; o++) {
					i = d[o];
					if(i[0] == "M") {
						g = +i[1];
						h = +i[2]
					} else {
						j = cq(g, h, i[1], i[2], i[3], i[4], i[5], i[6]);
						if(n + j > e) {
							if(c && !l.start) {
								m = cq(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n);
								k += ["C", m.start.x, m.start.y, m.m.x, m.m.y, m.x, m.y];
								if(f) return k;
								l.start = k;
								k = ["M", m.x, m.y + "C", m.n.x, m.n.y, m.end.x, m.end.y, i[5], i[6]][v]();
								n += j;
								g = +i[5];
								h = +i[6];
								continue
							}
							if(!b && !c) {
								m = cq(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n);
								return {
									x: m.x,
									y: m.y,
									alpha: m.alpha
								}
							}
						}
						n += j;
						g = +i[5];
						h = +i[6]
					}
					k += i
				}
				l.end = k;
				m = b ? n : c ? l : a.findDotsAtSegment(g, h, i[1], i[2], i[3], i[4], i[5], i[6], 1);
				m.alpha && (m = {
					x: m.x,
					y: m.y,
					alpha: m.alpha
				});
				return m
			}
		},
		cs = cr(1),
		ct = cr(),
		cu = cr(0, 1);
	bO.getTotalLength = function() {
		if(this.type != "path") return;
		if(this.node.getTotalLength) return this.node.getTotalLength();
		return cs(this.attrs.path)
	};
	bO.getPointAtLength = function(a) {
		if(this.type != "path") return;
		return ct(this.attrs.path, a)
	};
	bO.getSubpath = function(a, b) {
		if(this.type != "path") return;
		if(B(this.getTotalLength() - b) < "1e-6") return cu(this.attrs.path, a).end;
		var c = cu(this.attrs.path, b, 1);
		return a ? cu(c, a).end : c
	};
	a.easing_formulas = {
		linear: function(a) {
			return a
		},
		"<": function(a) {
			return C(a, 3)
		},
		">": function(a) {
			return C(a - 1, 3) + 1
		},
		"<>": function(a) {
			a = a * 2;
			if(a < 1) return C(a, 3) / 2;
			a -= 2;
			return(C(a, 3) + 2) / 2
		},
		backIn: function(a) {
			var b = 1.70158;
			return a * a * ((b + 1) * a - b)
		},
		backOut: function(a) {
			a = a - 1;
			var b = 1.70158;
			return a * a * ((b + 1) * a + b) + 1
		},
		elastic: function(a) {
			if(a == 0 || a == 1) return a;
			var b = 0.3,
				c = b / 4;
			return C(2, -10 * a) * y.sin((a - c) * (2 * D) / b) + 1
		},
		bounce: function(a) {
			var b = 7.5625,
				c = 2.75,
				d;
			if(a < 1 / c) d = b * a * a;
			else if(a < 2 / c) {
				a -= 1.5 / c;
				d = b * a * a + 0.75
			} else if(a < 2.5 / c) {
				a -= 2.25 / c;
				d = b * a * a + 0.9375
			} else {
				a -= 2.625 / c;
				d = b * a * a + 0.984375
			}
			return d
		}
	};
	var cv = [],
		cw = function() {
			var b = +(new Date);
			for(var c = 0; c < cv[w]; c++) {
				var d = cv[c];
				if(d.stop || d.el.removed) continue;
				var e = b - d.start,
					g = d.ms,
					h = d.easing,
					i = d.from,
					j = d.diff,
					k = d.to,
					l = d.t,
					m = d.el,
					n = {},
					o;
				if(e < g) {
					var r = h(e / g);
					for(var s in i)
						if(i[f](s)) {
							switch(X[s]) {
								case "along":
									o = r * g * j[s];
									k.back && (o = k.len - o);
									var t = ct(k[s], o);
									m.translate(j.sx - j.x || 0, j.sy - j.y || 0);
									j.x = t.x;
									j.y = t.y;
									m.translate(t.x - j.sx, t.y - j.sy);
									k.rot && m.rotate(j.r + t.alpha, t.x, t.y);
									break;
								case E:
									o = +i[s] + r * g * j[s];
									break;
								case "colour":
									o = "rgb(" + [cy(Q(i[s].r + r * g * j[s].r)), cy(Q(i[s].g + r * g * j[s].g)), cy(Q(i[s].b + r * g * j[s].b))][v](",") + ")";
									break;
								case "path":
									o = [];
									for(var u = 0, x = i[s][w]; u < x; u++) {
										o[u] = [i[s][u][0]];
										for(var y = 1, z = i[s][u][w]; y < z; y++) o[u][y] = +i[s][u][y] + r * g * j[s][u][y];
										o[u] = o[u][v](q)
									}
									o = o[v](q);
									break;
								case "csv":
									switch(s) {
										case "translation":
											var A = r * g * j[s][0] - l.x,
												B = r * g * j[s][1] - l.y;
											l.x += A;
											l.y += B;
											o = A + q + B;
											break;
										case "rotation":
											o = +i[s][0] + r * g * j[s][0];
											i[s][1] && (o += "," + i[s][1] + "," + i[s][2]);
											break;
										case "scale":
											o = [+i[s][0] + r * g * j[s][0], +i[s][1] + r * g * j[s][1], 2 in k[s] ? k[s][2] : p, 3 in k[s] ? k[s][3] : p][v](q);
											break;
										case "clip-rect":
											o = [];
											u = 4;
											while(u--) o[u] = +i[s][u] + r * g * j[s][u];
											break
									}
									break;
								default:
									var C = [].concat(i[s]);
									o = [];
									u = m.paper.customAttributes[s].length;
									while(u--) o[u] = +C[u] + r * g * j[s][u];
									break
							}
							n[s] = o
						}
					m.attr(n);
					m._run && m._run.call(m)
				} else {
					if(k.along) {
						t = ct(k.along, k.len * !k.back);
						m.translate(j.sx - (j.x || 0) + t.x - j.sx, j.sy - (j.y || 0) + t.y - j.sy);
						k.rot && m.rotate(j.r + t.alpha, t.x, t.y)
					}(l.x || l.y) && m.translate(-l.x, -l.y);
					k.scale && (k.scale += p);
					m.attr(k);
					cv.splice(c--, 1)
				}
			}
			a.svg && m && m.paper && m.paper.safari();
			cv[w] && setTimeout(cw)
		},
		cx = function(b, c, d, e, f) {
			var g = d - e;
			c.timeouts.push(setTimeout(function() {
				a.is(f, "function") && f.call(c);
				c.animate(b, g, b.easing)
			}, e))
		},
		cy = function(a) {
			return z(A(a, 255), 0)
		},
		cz = function(a, b) {
			if(a == null) return {
				x: this._.tx,
				y: this._.ty,
				toString: co
			};
			this._.tx += +a;
			this._.ty += +b;
			switch(this.type) {
				case "circle":
				case "ellipse":
					this.attr({
						cx: +a + this.attrs.cx,
						cy: +b + this.attrs.cy
					});
					break;
				case "rect":
				case "image":
				case "text":
					this.attr({
						x: +a + this.attrs.x,
						y: +b + this.attrs.y
					});
					break;
				case "path":
					var c = bp(this.attrs.path);
					c[0][1] += +a;
					c[0][2] += +b;
					this.attr({
						path: c
					});
					break
			}
			return this
		};
	bO.animateWith = function(a, b, c, d, e) {
		for(var f = 0, g = cv.length; f < g; f++) cv[f].el.id == a.id && (b.start = cv[f].start);
		return this.animate(b, c, d, e)
	};
	bO.animateAlong = cA();
	bO.animateAlongBack = cA(1);

	function cA(b) {
		return function(c, d, e, f) {
			var g = {
				back: b
			};
			a.is(e, "function") ? f = e : g.rot = e;
			c && c.constructor == bN && (c = c.attrs.path);
			c && (g.along = c);
			return this.animate(g, d, f)
		}
	}

	function cB(a, b, c, d, e, f) {
		var g = 3 * b,
			h = 3 * (d - b) - g,
			i = 1 - g - h,
			j = 3 * c,
			k = 3 * (e - c) - j,
			l = 1 - j - k;

		function m(a) {
			return((i * a + h) * a + g) * a
		}

		function n(a, b) {
			var c = o(a, b);
			return((l * c + k) * c + j) * c
		}

		function o(a, b) {
			var c, d, e, f, j, k;
			for(e = a, k = 0; k < 8; k++) {
				f = m(e) - a;
				if(B(f) < b) return e;
				j = (3 * i * e + 2 * h) * e + g;
				if(B(j) < 0.000001) break;
				e = e - f / j
			}
			c = 0;
			d = 1;
			e = a;
			if(e < c) return c;
			if(e > d) return d;
			while(c < d) {
				f = m(e);
				if(B(f - a) < b) return e;
				a > f ? c = e : d = e;
				e = (d - c) / 2 + c
			}
			return e
		}
		return n(a, 1 / (200 * f))
	}
	bO.onAnimation = function(a) {
		this._run = a || 0;
		return this
	};
	bO.animate = function(c, d, e, g) {
		var h = this;
		h.timeouts = h.timeouts || [];
		if(a.is(e, "function") || !e) g = e || null;
		if(h.removed) {
			g && g.call(h);
			return h
		}
		var i = {},
			j = {},
			k = false,
			l = {};
		for(var m in c)
			if(c[f](m)) {
				if(X[f](m) || h.paper.customAttributes[f](m)) {
					k = true;
					i[m] = h.attr(m);
					i[m] == null && (i[m] = W[m]);
					j[m] = c[m];
					switch(X[m]) {
						case "along":
							var n = cs(c[m]),
								o = ct(c[m], n * !(!c.back)),
								p = h.getBBox();
							l[m] = n / d;
							l.tx = p.x;
							l.ty = p.y;
							l.sx = o.x;
							l.sy = o.y;
							j.rot = c.rot;
							j.back = c.back;
							j.len = n;
							c.rot && (l.r = S(h.rotate()) || 0);
							break;
						case E:
							l[m] = (j[m] - i[m]) / d;
							break;
						case "colour":
							i[m] = a.getRGB(i[m]);
							var q = a.getRGB(j[m]);
							l[m] = {
								r: (q.r - i[m].r) / d,
								g: (q.g - i[m].g) / d,
								b: (q.b - i[m].b) / d
							};
							break;
						case "path":
							var t = bw(i[m], j[m]);
							i[m] = t[0];
							var u = t[1];
							l[m] = [];
							for(var v = 0, x = i[m][w]; v < x; v++) {
								l[m][v] = [0];
								for(var y = 1, z = i[m][v][w]; y < z; y++) l[m][v][y] = (u[v][y] - i[m][v][y]) / d
							}
							break;
						case "csv":
							var A = r(c[m])[s](b),
								B = r(i[m])[s](b);
							switch(m) {
								case "translation":
									i[m] = [0, 0];
									l[m] = [A[0] / d, A[1] / d];
									break;
								case "rotation":
									i[m] = B[1] == A[1] && B[2] == A[2] ? B : [0, A[1], A[2]];
									l[m] = [(A[0] - i[m][0]) / d, 0, 0];
									break;
								case "scale":
									c[m] = A;
									i[m] = r(i[m])[s](b);
									l[m] = [(A[0] - i[m][0]) / d, (A[1] - i[m][1]) / d, 0, 0];
									break;
								case "clip-rect":
									i[m] = r(i[m])[s](b);
									l[m] = [];
									v = 4;
									while(v--) l[m][v] = (A[v] - i[m][v]) / d;
									break
							}
							j[m] = A;
							break;
						default:
							A = [].concat(c[m]);
							B = [].concat(i[m]);
							l[m] = [];
							v = h.paper.customAttributes[m][w];
							while(v--) l[m][v] = ((A[v] || 0) - (B[v] || 0)) / d;
							break
					}
				}
			}
		if(k) {
			var G = a.easing_formulas[e];
			if(!G) {
				G = r(e).match(P);
				if(G && G[w] == 5) {
					var H = G;
					G = function(a) {
						return cB(a, +H[1], +H[2], +H[3], +H[4], d)
					}
				} else G = function(a) {
					return a
				}
			}
			cv.push({
				start: c.start || +(new Date),
				ms: d,
				easing: G,
				from: i,
				diff: l,
				to: j,
				el: h,
				t: {
					x: 0,
					y: 0
				}
			});
			a.is(g, "function") && (h._ac = setTimeout(function() {
				g.call(h)
			}, d));
			cv[w] == 1 && setTimeout(cw)
		} else {
			var C = [],
				D;
			for(var F in c)
				if(c[f](F) && Z.test(F)) {
					m = {
						value: c[F]
					};
					F == "from" && (F = 0);
					F == "to" && (F = 100);
					m.key = T(F, 10);
					C.push(m)
				}
			C.sort(be);
			C[0].key && C.unshift({
				key: 0,
				value: h.attrs
			});
			for(v = 0, x = C[w]; v < x; v++) cx(C[v].value, h, d / 100 * C[v].key, d / 100 * (C[v - 1] && C[v - 1].key || 0), C[v - 1] && C[v - 1].value.callback);
			D = C[C[w] - 1].value.callback;
			D && h.timeouts.push(setTimeout(function() {
				D.call(h)
			}, d))
		}
		return this
	};
	bO.stop = function() {
		for(var a = 0; a < cv.length; a++) cv[a].el.id == this.id && cv.splice(a--, 1);
		for(a = 0, ii = this.timeouts && this.timeouts.length; a < ii; a++) clearTimeout(this.timeouts[a]);
		this.timeouts = [];
		clearTimeout(this._ac);
		delete this._ac;
		return this
	};
	bO.translate = function(a, b) {
		return this.attr({
			translation: a + " " + b
		})
	};
	bO[H] = function() {
		return "Raphaël’s object"
	};
	a.ae = cv;
	var cC = function(a) {
		this.items = [];
		this[w] = 0;
		this.type = "set";
		if(a)
			for(var b = 0, c = a[w]; b < c; b++) {
				if(a[b] && (a[b].constructor == bN || a[b].constructor == cC)) {
					this[this.items[w]] = this.items[this.items[w]] = a[b];
					this[w]++
				}
			}
	};
	cC[e][L] = function() {
		var a, b;
		for(var c = 0, d = arguments[w]; c < d; c++) {
			a = arguments[c];
			if(a && (a.constructor == bN || a.constructor == cC)) {
				b = this.items[w];
				this[b] = this.items[b] = a;
				this[w]++
			}
		}
		return this
	};
	cC[e].pop = function() {
		delete this[this[w]--];
		return this.items.pop()
	};
	for(var cD in bO) bO[f](cD) && (cC[e][cD] = (function(a) {
		return function() {
			for(var b = 0, c = this.items[w]; b < c; b++) this.items[b][a][m](this.items[b], arguments);
			return this
		}
	})(cD));
	cC[e].attr = function(b, c) {
		if(b && a.is(b, G) && a.is(b[0], "object"))
			for(var d = 0, e = b[w]; d < e; d++) this.items[d].attr(b[d]);
		else
			for(var f = 0, g = this.items[w]; f < g; f++) this.items[f].attr(b, c);
		return this
	};
	cC[e].animate = function(b, c, d, e) {
		(a.is(d, "function") || !d) && (e = d || null);
		var f = this.items[w],
			g = f,
			h, i = this,
			j;
		e && (j = function() {
			!(--f) && e.call(i)
		});
		d = a.is(d, F) ? d : j;
		h = this.items[--g].animate(b, c, d, j);
		while(g--) this.items[g] && !this.items[g].removed && this.items[g].animateWith(h, b, c, d, j);
		return this
	};
	cC[e].insertAfter = function(a) {
		var b = this.items[w];
		while(b--) this.items[b].insertAfter(a);
		return this
	};
	cC[e].getBBox = function() {
		var a = [],
			b = [],
			c = [],
			d = [];
		for(var e = this.items[w]; e--;) {
			var f = this.items[e].getBBox();
			a[L](f.x);
			b[L](f.y);
			c[L](f.x + f.width);
			d[L](f.y + f.height)
		}
		a = A[m](0, a);
		b = A[m](0, b);
		return {
			x: a,
			y: b,
			width: z[m](0, c) - a,
			height: z[m](0, d) - b
		}
	};
	cC[e].clone = function(a) {
		a = new cC;
		for(var b = 0, c = this.items[w]; b < c; b++) a[L](this.items[b].clone());
		return a
	};
	a.registerFont = function(a) {
		if(!a.face) return a;
		this.fonts = this.fonts || {};
		var b = {
				w: a.w,
				face: {},
				glyphs: {}
			},
			c = a.face["font-family"];
		for(var d in a.face) a.face[f](d) && (b.face[d] = a.face[d]);
		this.fonts[c] ? this.fonts[c][L](b) : this.fonts[c] = [b];
		if(!a.svg) {
			b.face["units-per-em"] = T(a.face["units-per-em"], 10);
			for(var e in a.glyphs)
				if(a.glyphs[f](e)) {
					var g = a.glyphs[e];
					b.glyphs[e] = {
						w: g.w,
						k: {},
						d: g.d && "M" + g.d[Y](/[mlcxtrv]/g, function(a) {
							return({
								l: "L",
								c: "C",
								x: "z",
								t: "m",
								r: "l",
								v: "c"
							})[a] || "M"
						}) + "z"
					};
					if(g.k)
						for(var h in g.k) g[f](h) && (b.glyphs[e].k[h] = g.k[h])
				}
		}
		return a
	};
	k.getFont = function(b, c, d, e) {
		e = e || "normal";
		d = d || "normal";
		c = +c || ({
			normal: 400,
			bold: 700,
			lighter: 300,
			bolder: 800
		})[c] || 400;
		if(!a.fonts) return;
		var g = a.fonts[b];
		if(!g) {
			var h = new RegExp("(^|\\s)" + b[Y](/[^\w\d\s+!~.:_-]/g, p) + "(\\s|$)", "i");
			for(var i in a.fonts)
				if(a.fonts[f](i)) {
					if(h.test(i)) {
						g = a.fonts[i];
						break
					}
				}
		}
		var j;
		if(g)
			for(var k = 0, l = g[w]; k < l; k++) {
				j = g[k];
				if(j.face["font-weight"] == c && (j.face["font-style"] == d || !j.face["font-style"]) && j.face["font-stretch"] == e) break
			}
		return j
	};
	k.print = function(c, d, e, f, g, h, i) {
		h = h || "middle";
		i = z(A(i || 0, 1), -1);
		var j = this.set(),
			k = r(e)[s](p),
			l = 0,
			m = p,
			n;
		a.is(f, e) && (f = this.getFont(f));
		if(f) {
			n = (g || 16) / f.face["units-per-em"];
			var o = f.face.bbox.split(b),
				q = +o[0],
				t = +o[1] + (h == "baseline" ? o[3] - o[1] + +f.face.descent : (o[3] - o[1]) / 2);
			for(var u = 0, v = k[w]; u < v; u++) {
				var x = u && f.glyphs[k[u - 1]] || {},
					y = f.glyphs[k[u]];
				l += u ? (x.w || f.w) + (x.k && x.k[k[u]] || 0) + f.w * i : 0;
				y && y.d && j[L](this.path(y.d).attr({
					fill: "#000",
					stroke: "none",
					translation: [l, 0]
				}))
			}
			j.scale(n, n, q, t).translate(c - q, d - t)
		}
		return j
	};
	a.format = function(b, c) {
		var e = a.is(c, G) ? [0][n](c) : arguments;
		b && a.is(b, F) && e[w] - 1 && (b = b[Y](d, function(a, b) {
			return e[++b] == null ? p : e[b]
		}));
		return b || p
	};
	a.ninja = function() {
		i.was ? h.Raphael = i.is : delete Raphael;
		return a
	};
	a.el = bO;
	a.st = cC[e];
	i.was ? h.Raphael = a : Raphael = a
})()
var o = {
	init: function() {
		this.diagram()
	},
	random: function(l, u) {
		return Math.floor((Math.random() * (u - l + 1)) + l)
	},
	diagram: function() {
		var r = Raphael('diagram', 600, 600),
			rad = 73,
			defaultText = 'Skills',
			speed = 250;
		r.circle(300, 300, 85).attr({
			stroke: 'none',
			fill: '#193340'
		});
		var title = r.text(300, 300, defaultText).attr({
			font: '20px Arial',
			fill: '#fff'
		}).toFront();
		r.customAttributes.arc = function(value, color, rad) {
			var v = 3.6 * value,
				alpha = v == 360 ? 359.99 : v,
				random = o.random(91, 240),
				a = (random - alpha) * Math.PI / 180,
				b = random * Math.PI / 180,
				sx = 300 + rad * Math.cos(b),
				sy = 300 - rad * Math.sin(b),
				x = 300 + rad * Math.cos(a),
				y = 300 - rad * Math.sin(a),
				path = [
					['M', sx, sy],
					['A', rad, rad, 0, +(alpha > 180), 1, x, y]
				];
			return {
				path: path,
				stroke: color
			}
		};
		$('.get').find('.arc').each(function(i) {
			var t = $(this),
				color = t.find('.color').val(),
				value = t.find('.percent').val(),
				text = t.find('.text').text();
			rad += 30;
			var z = r.path().attr({
				arc: [value, color, rad],
				'stroke-width': 26
			});
			z.mouseover(function() {
				this.animate({
					'stroke-width': 50,
					opacity: .75
				}, 1000, 'elastic');
				if(Raphael.type != 'VML') {
					this.toFront()
				}
				title.stop().animate({
					opacity: 0
				}, speed, '>', function() {
					this.attr({
						text: text + '\n' + value + '%'
					}).animate({
						opacity: 1
					}, speed, '<')
				})
			}).mouseout(function() {
				this.stop().animate({
					'stroke-width': 26,
					opacity: 1
				}, speed * 4, 'elastic');
				title.stop().animate({
					opacity: 0
				}, speed, '>', function() {
					title.attr({
						text: defaultText
					}).animate({
						opacity: 1
					}, speed, '<')
				})
			})
		})
	}
};
$(function() {
	o.init()
});
/*! howler.js v2.0.3 | (c) 2013-2017, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
! function() {
	"use strict";
	var e = function() {
		this.init()
	};
	e.prototype = {
		init: function() {
			var e = this || n;
			return e._counter = 0, e._codecs = {}, e._howls = [], e._muted = !1, e._volume = 1, e._canPlayEvent = "canplaythrough", e._navigator = "undefined" != typeof window && window.navigator ? window.navigator : null, e.masterGain = null, e.noAudio = !1, e.usingWebAudio = !0, e.autoSuspend = !0, e.ctx = null, e.mobileAutoEnable = !0, e._setup(), e
		},
		volume: function(e) {
			var o = this || n;
			if(e = parseFloat(e), o.ctx || _(), void 0 !== e && e >= 0 && e <= 1) {
				if(o._volume = e, o._muted) return o;
				o.usingWebAudio && (o.masterGain.gain.value = e);
				for(var t = 0; t < o._howls.length; t++)
					if(!o._howls[t]._webAudio)
						for(var r = o._howls[t]._getSoundIds(), a = 0; a < r.length; a++) {
							var u = o._howls[t]._soundById(r[a]);
							u && u._node && (u._node.volume = u._volume * e)
						}
				return o
			}
			return o._volume
		},
		mute: function(e) {
			var o = this || n;
			o.ctx || _(), o._muted = e, o.usingWebAudio && (o.masterGain.gain.value = e ? 0 : o._volume);
			for(var t = 0; t < o._howls.length; t++)
				if(!o._howls[t]._webAudio)
					for(var r = o._howls[t]._getSoundIds(), a = 0; a < r.length; a++) {
						var u = o._howls[t]._soundById(r[a]);
						u && u._node && (u._node.muted = !!e || u._muted)
					}
			return o
		},
		unload: function() {
			for(var e = this || n, o = e._howls.length - 1; o >= 0; o--) e._howls[o].unload();
			return e.usingWebAudio && e.ctx && void 0 !== e.ctx.close && (e.ctx.close(), e.ctx = null, _()), e
		},
		codecs: function(e) {
			return(this || n)._codecs[e.replace(/^x-/, "")]
		},
		_setup: function() {
			var e = this || n;
			if(e.state = e.ctx ? e.ctx.state || "running" : "running", e._autoSuspend(), !e.usingWebAudio)
				if("undefined" != typeof Audio) try {
					var o = new Audio;
					void 0 === o.oncanplaythrough && (e._canPlayEvent = "canplay")
				} catch(n) {
					e.noAudio = !0
				} else e.noAudio = !0;
			try {
				var o = new Audio;
				o.muted && (e.noAudio = !0)
			} catch(e) {}
			return e.noAudio || e._setupCodecs(), e
		},
		_setupCodecs: function() {
			var e = this || n,
				o = null;
			try {
				o = "undefined" != typeof Audio ? new Audio : null
			} catch(n) {
				return e
			}
			if(!o || "function" != typeof o.canPlayType) return e;
			var t = o.canPlayType("audio/mpeg;").replace(/^no$/, ""),
				r = e._navigator && e._navigator.userAgent.match(/OPR\/([0-6].)/g),
				a = r && parseInt(r[0].split("/")[1], 10) < 33;
			return e._codecs = {
				mp3: !(a || !t && !o.canPlayType("audio/mp3;").replace(/^no$/, "")),
				mpeg: !!t,
				opus: !!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
				ogg: !!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
				oga: !!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
				wav: !!o.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
				aac: !!o.canPlayType("audio/aac;").replace(/^no$/, ""),
				caf: !!o.canPlayType("audio/x-caf;").replace(/^no$/, ""),
				m4a: !!(o.canPlayType("audio/x-m4a;") || o.canPlayType("audio/m4a;") || o.canPlayType("audio/aac;")).replace(/^no$/, ""),
				mp4: !!(o.canPlayType("audio/x-mp4;") || o.canPlayType("audio/mp4;") || o.canPlayType("audio/aac;")).replace(/^no$/, ""),
				weba: !!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
				webm: !!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
				dolby: !!o.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
				flac: !!(o.canPlayType("audio/x-flac;") || o.canPlayType("audio/flac;")).replace(/^no$/, "")
			}, e
		},
		_enableMobileAudio: function() {
			var e = this || n,
				o = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator && e._navigator.userAgent),
				t = !!("ontouchend" in window || e._navigator && e._navigator.maxTouchPoints > 0 || e._navigator && e._navigator.msMaxTouchPoints > 0);
			if(!e._mobileEnabled && e.ctx && (o || t)) {
				e._mobileEnabled = !1, e._mobileUnloaded || 44100 === e.ctx.sampleRate || (e._mobileUnloaded = !0, e.unload()), e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050);
				var r = function() {
					var n = e.ctx.createBufferSource();
					n.buffer = e._scratchBuffer, n.connect(e.ctx.destination), void 0 === n.start ? n.noteOn(0) : n.start(0), n.onended = function() {
						n.disconnect(0), e._mobileEnabled = !0, e.mobileAutoEnable = !1, document.removeEventListener("touchend", r, !0)
					}
				};
				return document.addEventListener("touchend", r, !0), e
			}
		},
		_autoSuspend: function() {
			var e = this;
			if(e.autoSuspend && e.ctx && void 0 !== e.ctx.suspend && n.usingWebAudio) {
				for(var o = 0; o < e._howls.length; o++)
					if(e._howls[o]._webAudio)
						for(var t = 0; t < e._howls[o]._sounds.length; t++)
							if(!e._howls[o]._sounds[t]._paused) return e;
				return e._suspendTimer && clearTimeout(e._suspendTimer), e._suspendTimer = setTimeout(function() {
					e.autoSuspend && (e._suspendTimer = null, e.state = "suspending", e.ctx.suspend().then(function() {
						e.state = "suspended", e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume())
					}))
				}, 3e4), e
			}
		},
		_autoResume: function() {
			var e = this;
			if(e.ctx && void 0 !== e.ctx.resume && n.usingWebAudio) return "running" === e.state && e._suspendTimer ? (clearTimeout(e._suspendTimer), e._suspendTimer = null) : "suspended" === e.state ? (e.state = "resuming", e.ctx.resume().then(function() {
				e.state = "running";
				for(var n = 0; n < e._howls.length; n++) e._howls[n]._emit("resume")
			}), e._suspendTimer && (clearTimeout(e._suspendTimer), e._suspendTimer = null)) : "suspending" === e.state && (e._resumeAfterSuspend = !0), e
		}
	};
	var n = new e,
		o = function(e) {
			var n = this;
			if(!e.src || 0 === e.src.length) return void console.error("An array of source files must be passed with any new Howl.");
			n.init(e)
		};
	o.prototype = {
		init: function(e) {
			var o = this;
			return n.ctx || _(), o._autoplay = e.autoplay || !1, o._format = "string" != typeof e.format ? e.format : [e.format], o._html5 = e.html5 || !1, o._muted = e.mute || !1, o._loop = e.loop || !1, o._pool = e.pool || 5, o._preload = "boolean" != typeof e.preload || e.preload, o._rate = e.rate || 1, o._sprite = e.sprite || {}, o._src = "string" != typeof e.src ? e.src : [e.src], o._volume = void 0 !== e.volume ? e.volume : 1, o._duration = 0, o._state = "unloaded", o._sounds = [], o._endTimers = {}, o._queue = [], o._onend = e.onend ? [{
				fn: e.onend
			}] : [], o._onfade = e.onfade ? [{
				fn: e.onfade
			}] : [], o._onload = e.onload ? [{
				fn: e.onload
			}] : [], o._onloaderror = e.onloaderror ? [{
				fn: e.onloaderror
			}] : [], o._onpause = e.onpause ? [{
				fn: e.onpause
			}] : [], o._onplay = e.onplay ? [{
				fn: e.onplay
			}] : [], o._onstop = e.onstop ? [{
				fn: e.onstop
			}] : [], o._onmute = e.onmute ? [{
				fn: e.onmute
			}] : [], o._onvolume = e.onvolume ? [{
				fn: e.onvolume
			}] : [], o._onrate = e.onrate ? [{
				fn: e.onrate
			}] : [], o._onseek = e.onseek ? [{
				fn: e.onseek
			}] : [], o._onresume = [], o._webAudio = n.usingWebAudio && !o._html5, void 0 !== n.ctx && n.ctx && n.mobileAutoEnable && n._enableMobileAudio(), n._howls.push(o), o._autoplay && o._queue.push({
				event: "play",
				action: function() {
					o.play()
				}
			}), o._preload && o.load(), o
		},
		load: function() {
			var e = this,
				o = null;
			if(n.noAudio) return void e._emit("loaderror", null, "No audio support.");
			"string" == typeof e._src && (e._src = [e._src]);
			for(var r = 0; r < e._src.length; r++) {
				var u, i;
				if(e._format && e._format[r]) u = e._format[r];
				else {
					if("string" != typeof(i = e._src[r])) {
						e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
						continue
					}
					u = /^data:audio\/([^;,]+);/i.exec(i), u || (u = /\.([^.]+)$/.exec(i.split("?", 1)[0])), u && (u = u[1].toLowerCase())
				}
				if(u || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), u && n.codecs(u)) {
					o = e._src[r];
					break
				}
			}
			return o ? (e._src = o, e._state = "loading", "https:" === window.location.protocol && "http:" === o.slice(0, 5) && (e._html5 = !0, e._webAudio = !1), new t(e), e._webAudio && a(e), e) : void e._emit("loaderror", null, "No codec support for selected audio sources.")
		},
		play: function(e, o) {
			var t = this,
				r = null;
			if("number" == typeof e) r = e, e = null;
			else {
				if("string" == typeof e && "loaded" === t._state && !t._sprite[e]) return null;
				if(void 0 === e) {
					e = "__default";
					for(var a = 0, u = 0; u < t._sounds.length; u++) t._sounds[u]._paused && !t._sounds[u]._ended && (a++, r = t._sounds[u]._id);
					1 === a ? e = null : r = null
				}
			}
			var i = r ? t._soundById(r) : t._inactiveSound();
			if(!i) return null;
			if(r && !e && (e = i._sprite || "__default"), "loaded" !== t._state && !t._sprite[e]) return t._queue.push({
				event: "play",
				action: function() {
					t.play(t._soundById(i._id) ? i._id : void 0)
				}
			}), i._id;
			if(r && !i._paused) return o || setTimeout(function() {
				t._emit("play", i._id)
			}, 0), i._id;
			t._webAudio && n._autoResume();
			var d = Math.max(0, i._seek > 0 ? i._seek : t._sprite[e][0] / 1e3),
				_ = Math.max(0, (t._sprite[e][0] + t._sprite[e][1]) / 1e3 - d),
				s = 1e3 * _ / Math.abs(i._rate);
			i._paused = !1, i._ended = !1, i._sprite = e, i._seek = d, i._start = t._sprite[e][0] / 1e3, i._stop = (t._sprite[e][0] + t._sprite[e][1]) / 1e3, i._loop = !(!i._loop && !t._sprite[e][2]);
			var l = i._node;
			if(t._webAudio) {
				var c = function() {
						t._refreshBuffer(i);
						var e = i._muted || t._muted ? 0 : i._volume;
						l.gain.setValueAtTime(e, n.ctx.currentTime), i._playStart = n.ctx.currentTime, void 0 === l.bufferSource.start ? i._loop ? l.bufferSource.noteGrainOn(0, d, 86400) : l.bufferSource.noteGrainOn(0, d, _) : i._loop ? l.bufferSource.start(0, d, 86400) : l.bufferSource.start(0, d, _), s !== 1 / 0 && (t._endTimers[i._id] = setTimeout(t._ended.bind(t, i), s)), o || setTimeout(function() {
							t._emit("play", i._id)
						}, 0)
					},
					f = "running" === n.state;
				if("loaded" === t._state && f) c();
				else {
					var p = f || "loaded" !== t._state ? "load" : "resume";
					t.once(p, c, f ? i._id : null), t._clearTimer(i._id)
				}
			} else {
				var v = function() {
						l.currentTime = d, l.muted = i._muted || t._muted || n._muted || l.muted, l.volume = i._volume * n.volume(), l.playbackRate = i._rate, l.play(), s !== 1 / 0 && (t._endTimers[i._id] = setTimeout(t._ended.bind(t, i), s)), o || t._emit("play", i._id)
					},
					m = "loaded" === t._state && (window && window.ejecta || !l.readyState && n._navigator.isCocoonJS);
				if(4 === l.readyState || m) v();
				else {
					var h = function() {
						v(), l.removeEventListener(n._canPlayEvent, h, !1)
					};
					l.addEventListener(n._canPlayEvent, h, !1), t._clearTimer(i._id)
				}
			}
			return i._id
		},
		pause: function(e) {
			var n = this;
			if("loaded" !== n._state) return n._queue.push({
				event: "pause",
				action: function() {
					n.pause(e)
				}
			}), n;
			for(var o = n._getSoundIds(e), t = 0; t < o.length; t++) {
				n._clearTimer(o[t]);
				var r = n._soundById(o[t]);
				if(r && !r._paused && (r._seek = n.seek(o[t]), r._rateSeek = 0, r._paused = !0, n._stopFade(o[t]), r._node))
					if(n._webAudio) {
						if(!r._node.bufferSource) return n;
						void 0 === r._node.bufferSource.stop ? r._node.bufferSource.noteOff(0) : r._node.bufferSource.stop(0), n._cleanBuffer(r._node)
					} else isNaN(r._node.duration) && r._node.duration !== 1 / 0 || r._node.pause();
				arguments[1] || n._emit("pause", r ? r._id : null)
			}
			return n
		},
		stop: function(e, n) {
			var o = this;
			if("loaded" !== o._state) return o._queue.push({
				event: "stop",
				action: function() {
					o.stop(e)
				}
			}), o;
			for(var t = o._getSoundIds(e), r = 0; r < t.length; r++) {
				o._clearTimer(t[r]);
				var a = o._soundById(t[r]);
				if(a && (a._seek = a._start || 0, a._rateSeek = 0, a._paused = !0, a._ended = !0, o._stopFade(t[r]), a._node))
					if(o._webAudio) {
						if(!a._node.bufferSource) return n || o._emit("stop", a._id), o;
						void 0 === a._node.bufferSource.stop ? a._node.bufferSource.noteOff(0) : a._node.bufferSource.stop(0), o._cleanBuffer(a._node)
					} else isNaN(a._node.duration) && a._node.duration !== 1 / 0 || (a._node.currentTime = a._start || 0, a._node.pause());
				a && !n && o._emit("stop", a._id)
			}
			return o
		},
		mute: function(e, o) {
			var t = this;
			if("loaded" !== t._state) return t._queue.push({
				event: "mute",
				action: function() {
					t.mute(e, o)
				}
			}), t;
			if(void 0 === o) {
				if("boolean" != typeof e) return t._muted;
				t._muted = e
			}
			for(var r = t._getSoundIds(o), a = 0; a < r.length; a++) {
				var u = t._soundById(r[a]);
				u && (u._muted = e, t._webAudio && u._node ? u._node.gain.setValueAtTime(e ? 0 : u._volume, n.ctx.currentTime) : u._node && (u._node.muted = !!n._muted || e), t._emit("mute", u._id))
			}
			return t
		},
		volume: function() {
			var e, o, t = this,
				r = arguments;
			if(0 === r.length) return t._volume;
			if(1 === r.length || 2 === r.length && void 0 === r[1]) {
				t._getSoundIds().indexOf(r[0]) >= 0 ? o = parseInt(r[0], 10) : e = parseFloat(r[0])
			} else r.length >= 2 && (e = parseFloat(r[0]), o = parseInt(r[1], 10));
			var a;
			if(!(void 0 !== e && e >= 0 && e <= 1)) return a = o ? t._soundById(o) : t._sounds[0], a ? a._volume : 0;
			if("loaded" !== t._state) return t._queue.push({
				event: "volume",
				action: function() {
					t.volume.apply(t, r)
				}
			}), t;
			void 0 === o && (t._volume = e), o = t._getSoundIds(o);
			for(var u = 0; u < o.length; u++)(a = t._soundById(o[u])) && (a._volume = e, r[2] || t._stopFade(o[u]), t._webAudio && a._node && !a._muted ? a._node.gain.setValueAtTime(e, n.ctx.currentTime) : a._node && !a._muted && (a._node.volume = e * n.volume()), t._emit("volume", a._id));
			return t
		},
		fade: function(e, o, t, r) {
			var a = this,
				u = Math.abs(e - o),
				i = e > o ? "out" : "in",
				d = u / .01,
				_ = d > 0 ? t / d : t;
			if(_ < 4 && (d = Math.ceil(d / (4 / _)), _ = 4), "loaded" !== a._state) return a._queue.push({
				event: "fade",
				action: function() {
					a.fade(e, o, t, r)
				}
			}), a;
			a.volume(e, r);
			for(var s = a._getSoundIds(r), l = 0; l < s.length; l++) {
				var c = a._soundById(s[l]);
				if(c) {
					if(r || a._stopFade(s[l]), a._webAudio && !c._muted) {
						var f = n.ctx.currentTime,
							p = f + t / 1e3;
						c._volume = e, c._node.gain.setValueAtTime(e, f), c._node.gain.linearRampToValueAtTime(o, p)
					}
					var v = e;
					c._interval = setInterval(function(n, t) {
						d > 0 && (v += "in" === i ? .01 : -.01), v = Math.max(0, v), v = Math.min(1, v), v = Math.round(100 * v) / 100, a._webAudio ? (void 0 === r && (a._volume = v), t._volume = v) : a.volume(v, n, !0), (o < e && v <= o || o > e && v >= o) && (clearInterval(t._interval), t._interval = null, a.volume(o, n), a._emit("fade", n))
					}.bind(a, s[l], c), _)
				}
			}
			return a
		},
		_stopFade: function(e) {
			var o = this,
				t = o._soundById(e);
			return t && t._interval && (o._webAudio && t._node.gain.cancelScheduledValues(n.ctx.currentTime), clearInterval(t._interval), t._interval = null, o._emit("fade", e)), o
		},
		loop: function() {
			var e, n, o, t = this,
				r = arguments;
			if(0 === r.length) return t._loop;
			if(1 === r.length) {
				if("boolean" != typeof r[0]) return !!(o = t._soundById(parseInt(r[0], 10))) && o._loop;
				e = r[0], t._loop = e
			} else 2 === r.length && (e = r[0], n = parseInt(r[1], 10));
			for(var a = t._getSoundIds(n), u = 0; u < a.length; u++)(o = t._soundById(a[u])) && (o._loop = e, t._webAudio && o._node && o._node.bufferSource && (o._node.bufferSource.loop = e, e && (o._node.bufferSource.loopStart = o._start || 0, o._node.bufferSource.loopEnd = o._stop)));
			return t
		},
		rate: function() {
			var e, o, t = this,
				r = arguments;
			if(0 === r.length) o = t._sounds[0]._id;
			else if(1 === r.length) {
				var a = t._getSoundIds(),
					u = a.indexOf(r[0]);
				u >= 0 ? o = parseInt(r[0], 10) : e = parseFloat(r[0])
			} else 2 === r.length && (e = parseFloat(r[0]), o = parseInt(r[1], 10));
			var i;
			if("number" != typeof e) return i = t._soundById(o), i ? i._rate : t._rate;
			if("loaded" !== t._state) return t._queue.push({
				event: "rate",
				action: function() {
					t.rate.apply(t, r)
				}
			}), t;
			void 0 === o && (t._rate = e), o = t._getSoundIds(o);
			for(var d = 0; d < o.length; d++)
				if(i = t._soundById(o[d])) {
					i._rateSeek = t.seek(o[d]), i._playStart = t._webAudio ? n.ctx.currentTime : i._playStart, i._rate = e, t._webAudio && i._node && i._node.bufferSource ? i._node.bufferSource.playbackRate.value = e : i._node && (i._node.playbackRate = e);
					var _ = t.seek(o[d]),
						s = (t._sprite[i._sprite][0] + t._sprite[i._sprite][1]) / 1e3 - _,
						l = 1e3 * s / Math.abs(i._rate);
					!t._endTimers[o[d]] && i._paused || (t._clearTimer(o[d]), t._endTimers[o[d]] = setTimeout(t._ended.bind(t, i), l)), t._emit("rate", i._id)
				}
			return t
		},
		seek: function() {
			var e, o, t = this,
				r = arguments;
			if(0 === r.length) o = t._sounds[0]._id;
			else if(1 === r.length) {
				var a = t._getSoundIds(),
					u = a.indexOf(r[0]);
				u >= 0 ? o = parseInt(r[0], 10) : (o = t._sounds[0]._id, e = parseFloat(r[0]))
			} else 2 === r.length && (e = parseFloat(r[0]), o = parseInt(r[1], 10));
			if(void 0 === o) return t;
			if("loaded" !== t._state) return t._queue.push({
				event: "seek",
				action: function() {
					t.seek.apply(t, r)
				}
			}), t;
			var i = t._soundById(o);
			if(i) {
				if(!("number" == typeof e && e >= 0)) {
					if(t._webAudio) {
						var d = t.playing(o) ? n.ctx.currentTime - i._playStart : 0,
							_ = i._rateSeek ? i._rateSeek - i._seek : 0;
						return i._seek + (_ + d * Math.abs(i._rate))
					}
					return i._node.currentTime
				}
				var s = t.playing(o);
				s && t.pause(o, !0), i._seek = e, i._ended = !1, t._clearTimer(o), s && t.play(o, !0), !t._webAudio && i._node && (i._node.currentTime = e), t._emit("seek", o)
			}
			return t
		},
		playing: function(e) {
			var n = this;
			if("number" == typeof e) {
				var o = n._soundById(e);
				return !!o && !o._paused
			}
			for(var t = 0; t < n._sounds.length; t++)
				if(!n._sounds[t]._paused) return !0;
			return !1
		},
		duration: function(e) {
			var n = this,
				o = n._duration,
				t = n._soundById(e);
			return t && (o = n._sprite[t._sprite][1] / 1e3), o
		},
		state: function() {
			return this._state
		},
		unload: function() {
			for(var e = this, o = e._sounds, t = 0; t < o.length; t++) {
				o[t]._paused || e.stop(o[t]._id), e._webAudio || (o[t]._node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA", o[t]._node.removeEventListener("error", o[t]._errorFn, !1), o[t]._node.removeEventListener(n._canPlayEvent, o[t]._loadFn, !1)), delete o[t]._node, e._clearTimer(o[t]._id);
				var a = n._howls.indexOf(e);
				a >= 0 && n._howls.splice(a, 1)
			}
			var u = !0;
			for(t = 0; t < n._howls.length; t++)
				if(n._howls[t]._src === e._src) {
					u = !1;
					break
				}
			return r && u && delete r[e._src], n.noAudio = !1, e._state = "unloaded", e._sounds = [], e = null, null
		},
		on: function(e, n, o, t) {
			var r = this,
				a = r["_on" + e];
			return "function" == typeof n && a.push(t ? {
				id: o,
				fn: n,
				once: t
			} : {
				id: o,
				fn: n
			}), r
		},
		off: function(e, n, o) {
			var t = this,
				r = t["_on" + e],
				a = 0;
			if(n) {
				for(a = 0; a < r.length; a++)
					if(n === r[a].fn && o === r[a].id) {
						r.splice(a, 1);
						break
					}
			} else if(e) t["_on" + e] = [];
			else {
				var u = Object.keys(t);
				for(a = 0; a < u.length; a++) 0 === u[a].indexOf("_on") && Array.isArray(t[u[a]]) && (t[u[a]] = [])
			}
			return t
		},
		once: function(e, n, o) {
			var t = this;
			return t.on(e, n, o, 1), t
		},
		_emit: function(e, n, o) {
			for(var t = this, r = t["_on" + e], a = r.length - 1; a >= 0; a--) r[a].id && r[a].id !== n && "load" !== e || (setTimeout(function(e) {
				e.call(this, n, o)
			}.bind(t, r[a].fn), 0), r[a].once && t.off(e, r[a].fn, r[a].id));
			return t
		},
		_loadQueue: function() {
			var e = this;
			if(e._queue.length > 0) {
				var n = e._queue[0];
				e.once(n.event, function() {
					e._queue.shift(), e._loadQueue()
				}), n.action()
			}
			return e
		},
		_ended: function(e) {
			var o = this,
				t = e._sprite,
				r = !(!e._loop && !o._sprite[t][2]);
			if(o._emit("end", e._id), !o._webAudio && r && o.stop(e._id, !0).play(e._id), o._webAudio && r) {
				o._emit("play", e._id), e._seek = e._start || 0, e._rateSeek = 0, e._playStart = n.ctx.currentTime;
				var a = 1e3 * (e._stop - e._start) / Math.abs(e._rate);
				o._endTimers[e._id] = setTimeout(o._ended.bind(o, e), a)
			}
			return o._webAudio && !r && (e._paused = !0, e._ended = !0, e._seek = e._start || 0, e._rateSeek = 0, o._clearTimer(e._id), o._cleanBuffer(e._node), n._autoSuspend()), o._webAudio || r || o.stop(e._id), o
		},
		_clearTimer: function(e) {
			var n = this;
			return n._endTimers[e] && (clearTimeout(n._endTimers[e]), delete n._endTimers[e]), n
		},
		_soundById: function(e) {
			for(var n = this, o = 0; o < n._sounds.length; o++)
				if(e === n._sounds[o]._id) return n._sounds[o];
			return null
		},
		_inactiveSound: function() {
			var e = this;
			e._drain();
			for(var n = 0; n < e._sounds.length; n++)
				if(e._sounds[n]._ended) return e._sounds[n].reset();
			return new t(e)
		},
		_drain: function() {
			var e = this,
				n = e._pool,
				o = 0,
				t = 0;
			if(!(e._sounds.length < n)) {
				for(t = 0; t < e._sounds.length; t++) e._sounds[t]._ended && o++;
				for(t = e._sounds.length - 1; t >= 0; t--) {
					if(o <= n) return;
					e._sounds[t]._ended && (e._webAudio && e._sounds[t]._node && e._sounds[t]._node.disconnect(0), e._sounds.splice(t, 1), o--)
				}
			}
		},
		_getSoundIds: function(e) {
			var n = this;
			if(void 0 === e) {
				for(var o = [], t = 0; t < n._sounds.length; t++) o.push(n._sounds[t]._id);
				return o
			}
			return [e]
		},
		_refreshBuffer: function(e) {
			var o = this;
			return e._node.bufferSource = n.ctx.createBufferSource(), e._node.bufferSource.buffer = r[o._src], e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node), e._node.bufferSource.loop = e._loop, e._loop && (e._node.bufferSource.loopStart = e._start || 0, e._node.bufferSource.loopEnd = e._stop), e._node.bufferSource.playbackRate.value = e._rate, o
		},
		_cleanBuffer: function(e) {
			var n = this;
			if(n._scratchBuffer) {
				e.bufferSource.onended = null, e.bufferSource.disconnect(0);
				try {
					e.bufferSource.buffer = n._scratchBuffer
				} catch(e) {}
			}
			return e.bufferSource = null, n
		}
	};
	var t = function(e) {
		this._parent = e, this.init()
	};
	t.prototype = {
		init: function() {
			var e = this,
				o = e._parent;
			return e._muted = o._muted, e._loop = o._loop, e._volume = o._volume, e._muted = o._muted, e._rate = o._rate, e._seek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = ++n._counter, o._sounds.push(e), e.create(), e
		},
		create: function() {
			var e = this,
				o = e._parent,
				t = n._muted || e._muted || e._parent._muted ? 0 : e._volume;
			return o._webAudio ? (e._node = void 0 === n.ctx.createGain ? n.ctx.createGainNode() : n.ctx.createGain(), e._node.gain.setValueAtTime(t, n.ctx.currentTime), e._node.paused = !0, e._node.connect(n.masterGain)) : (e._node = new Audio, e._errorFn = e._errorListener.bind(e), e._node.addEventListener("error", e._errorFn, !1), e._loadFn = e._loadListener.bind(e), e._node.addEventListener(n._canPlayEvent, e._loadFn, !1), e._node.src = o._src, e._node.preload = "auto", e._node.volume = t * n.volume(), e._node.load()), e
		},
		reset: function() {
			var e = this,
				o = e._parent;
			return e._muted = o._muted, e._loop = o._loop, e._volume = o._volume, e._muted = o._muted, e._rate = o._rate, e._seek = 0, e._rateSeek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = ++n._counter, e
		},
		_errorListener: function() {
			var e = this;
			e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0), e._node.removeEventListener("error", e._errorListener, !1)
		},
		_loadListener: function() {
			var e = this,
				o = e._parent;
			o._duration = Math.ceil(10 * e._node.duration) / 10, 0 === Object.keys(o._sprite).length && (o._sprite = {
				__default: [0, 1e3 * o._duration]
			}), "loaded" !== o._state && (o._state = "loaded", o._emit("load"), o._loadQueue()), e._node.removeEventListener(n._canPlayEvent, e._loadFn, !1)
		}
	};
	var r = {},
		a = function(e) {
			var n = e._src;
			if(r[n]) return e._duration = r[n].duration, void d(e);
			if(/^data:[^;]+;base64,/.test(n)) {
				for(var o = atob(n.split(",")[1]), t = new Uint8Array(o.length), a = 0; a < o.length; ++a) t[a] = o.charCodeAt(a);
				i(t.buffer, e)
			} else {
				var _ = new XMLHttpRequest;
				_.open("GET", n, !0), _.responseType = "arraybuffer", _.onload = function() {
					var n = (_.status + "")[0];
					if("0" !== n && "2" !== n && "3" !== n) return void e._emit("loaderror", null, "Failed loading audio file with status: " + _.status + ".");
					i(_.response, e)
				}, _.onerror = function() {
					e._webAudio && (e._html5 = !0, e._webAudio = !1, e._sounds = [], delete r[n], e.load())
				}, u(_)
			}
		},
		u = function(e) {
			try {
				e.send()
			} catch(n) {
				e.onerror()
			}
		},
		i = function(e, o) {
			n.ctx.decodeAudioData(e, function(e) {
				e && o._sounds.length > 0 && (r[o._src] = e, d(o, e))
			}, function() {
				o._emit("loaderror", null, "Decoding audio data failed.")
			})
		},
		d = function(e, n) {
			n && !e._duration && (e._duration = n.duration), 0 === Object.keys(e._sprite).length && (e._sprite = {
				__default: [0, 1e3 * e._duration]
			}), "loaded" !== e._state && (e._state = "loaded", e._emit("load"), e._loadQueue())
		},
		_ = function() {
			try {
				"undefined" != typeof AudioContext ? n.ctx = new AudioContext : "undefined" != typeof webkitAudioContext ? n.ctx = new webkitAudioContext : n.usingWebAudio = !1
			} catch(e) {
				n.usingWebAudio = !1
			}
			var e = /iP(hone|od|ad)/.test(n._navigator && n._navigator.platform),
				o = n._navigator && n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
				t = o ? parseInt(o[1], 10) : null;
			if(e && t && t < 9) {
				var r = /safari/.test(n._navigator && n._navigator.userAgent.toLowerCase());
				(n._navigator && n._navigator.standalone && !r || n._navigator && !n._navigator.standalone && !r) && (n.usingWebAudio = !1)
			}
			n.usingWebAudio && (n.masterGain = void 0 === n.ctx.createGain ? n.ctx.createGainNode() : n.ctx.createGain(), n.masterGain.gain.value = 1, n.masterGain.connect(n.ctx.destination)), n._setup()
		};
	"function" == typeof define && define.amd && define([], function() {
		return {
			Howler: n,
			Howl: o
		}
	}), "undefined" != typeof exports && (exports.Howler = n, exports.Howl = o), "undefined" != typeof window ? (window.HowlerGlobal = e, window.Howler = n, window.Howl = o, window.Sound = t) : "undefined" != typeof global && (global.HowlerGlobal = e, global.Howler = n, global.Howl = o, global.Sound = t)
}();
/*! Spatial Plugin */
! function() {
	"use strict";
	HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function(n) {
		var e = this;
		if(!e.ctx || !e.ctx.listener) return e;
		for(var o = e._howls.length - 1; o >= 0; o--) e._howls[o].stereo(n);
		return e
	}, HowlerGlobal.prototype.pos = function(n, e, o) {
		var t = this;
		return t.ctx && t.ctx.listener ? (e = "number" != typeof e ? t._pos[1] : e, o = "number" != typeof o ? t._pos[2] : o, "number" != typeof n ? t._pos : (t._pos = [n, e, o], t.ctx.listener.setPosition(t._pos[0], t._pos[1], t._pos[2]), t)) : t
	}, HowlerGlobal.prototype.orientation = function(n, e, o, t, r, i) {
		var a = this;
		if(!a.ctx || !a.ctx.listener) return a;
		var p = a._orientation;
		return e = "number" != typeof e ? p[1] : e, o = "number" != typeof o ? p[2] : o, t = "number" != typeof t ? p[3] : t, r = "number" != typeof r ? p[4] : r, i = "number" != typeof i ? p[5] : i, "number" != typeof n ? p : (a._orientation = [n, e, o, t, r, i], a.ctx.listener.setOrientation(n, e, o, t, r, i), a)
	}, Howl.prototype.init = function(n) {
		return function(e) {
			var o = this;
			return o._orientation = e.orientation || [1, 0, 0], o._stereo = e.stereo || null, o._pos = e.pos || null, o._pannerAttr = {
				coneInnerAngle: void 0 !== e.coneInnerAngle ? e.coneInnerAngle : 360,
				coneOuterAngle: void 0 !== e.coneOuterAngle ? e.coneOuterAngle : 360,
				coneOuterGain: void 0 !== e.coneOuterGain ? e.coneOuterGain : 0,
				distanceModel: void 0 !== e.distanceModel ? e.distanceModel : "inverse",
				maxDistance: void 0 !== e.maxDistance ? e.maxDistance : 1e4,
				panningModel: void 0 !== e.panningModel ? e.panningModel : "HRTF",
				refDistance: void 0 !== e.refDistance ? e.refDistance : 1,
				rolloffFactor: void 0 !== e.rolloffFactor ? e.rolloffFactor : 1
			}, o._onstereo = e.onstereo ? [{
				fn: e.onstereo
			}] : [], o._onpos = e.onpos ? [{
				fn: e.onpos
			}] : [], o._onorientation = e.onorientation ? [{
				fn: e.onorientation
			}] : [], n.call(this, e)
		}
	}(Howl.prototype.init), Howl.prototype.stereo = function(e, o) {
		var t = this;
		if(!t._webAudio) return t;
		if("loaded" !== t._state) return t._queue.push({
			event: "stereo",
			action: function() {
				t.stereo(e, o)
			}
		}), t;
		var r = void 0 === Howler.ctx.createStereoPanner ? "spatial" : "stereo";
		if(void 0 === o) {
			if("number" != typeof e) return t._stereo;
			t._stereo = e, t._pos = [e, 0, 0]
		}
		for(var i = t._getSoundIds(o), a = 0; a < i.length; a++) {
			var p = t._soundById(i[a]);
			if(p) {
				if("number" != typeof e) return p._stereo;
				p._stereo = e, p._pos = [e, 0, 0], p._node && (p._pannerAttr.panningModel = "equalpower", p._panner && p._panner.pan || n(p, r), "spatial" === r ? p._panner.setPosition(e, 0, 0) : p._panner.pan.value = e), t._emit("stereo", p._id)
			}
		}
		return t
	}, Howl.prototype.pos = function(e, o, t, r) {
		var i = this;
		if(!i._webAudio) return i;
		if("loaded" !== i._state) return i._queue.push({
			event: "pos",
			action: function() {
				i.pos(e, o, t, r)
			}
		}), i;
		if(o = "number" != typeof o ? 0 : o, t = "number" != typeof t ? -.5 : t, void 0 === r) {
			if("number" != typeof e) return i._pos;
			i._pos = [e, o, t]
		}
		for(var a = i._getSoundIds(r), p = 0; p < a.length; p++) {
			var s = i._soundById(a[p]);
			if(s) {
				if("number" != typeof e) return s._pos;
				s._pos = [e, o, t], s._node && (s._panner && !s._panner.pan || n(s, "spatial"), s._panner.setPosition(e, o, t)), i._emit("pos", s._id)
			}
		}
		return i
	}, Howl.prototype.orientation = function(e, o, t, r) {
		var i = this;
		if(!i._webAudio) return i;
		if("loaded" !== i._state) return i._queue.push({
			event: "orientation",
			action: function() {
				i.orientation(e, o, t, r)
			}
		}), i;
		if(o = "number" != typeof o ? i._orientation[1] : o, t = "number" != typeof t ? i._orientation[2] : t, void 0 === r) {
			if("number" != typeof e) return i._orientation;
			i._orientation = [e, o, t]
		}
		for(var a = i._getSoundIds(r), p = 0; p < a.length; p++) {
			var s = i._soundById(a[p]);
			if(s) {
				if("number" != typeof e) return s._orientation;
				s._orientation = [e, o, t], s._node && (s._panner || (s._pos || (s._pos = i._pos || [0, 0, -.5]), n(s, "spatial")), s._panner.setOrientation(e, o, t)), i._emit("orientation", s._id)
			}
		}
		return i
	}, Howl.prototype.pannerAttr = function() {
		var e, o, t, r = this,
			i = arguments;
		if(!r._webAudio) return r;
		if(0 === i.length) return r._pannerAttr;
		if(1 === i.length) {
			if("object" != typeof i[0]) return t = r._soundById(parseInt(i[0], 10)), t ? t._pannerAttr : r._pannerAttr;
			e = i[0], void 0 === o && (r._pannerAttr = {
				coneInnerAngle: void 0 !== e.coneInnerAngle ? e.coneInnerAngle : r._coneInnerAngle,
				coneOuterAngle: void 0 !== e.coneOuterAngle ? e.coneOuterAngle : r._coneOuterAngle,
				coneOuterGain: void 0 !== e.coneOuterGain ? e.coneOuterGain : r._coneOuterGain,
				distanceModel: void 0 !== e.distanceModel ? e.distanceModel : r._distanceModel,
				maxDistance: void 0 !== e.maxDistance ? e.maxDistance : r._maxDistance,
				panningModel: void 0 !== e.panningModel ? e.panningModel : r._panningModel,
				refDistance: void 0 !== e.refDistance ? e.refDistance : r._refDistance,
				rolloffFactor: void 0 !== e.rolloffFactor ? e.rolloffFactor : r._rolloffFactor
			})
		} else 2 === i.length && (e = i[0], o = parseInt(i[1], 10));
		for(var a = r._getSoundIds(o), p = 0; p < a.length; p++)
			if(t = r._soundById(a[p])) {
				var s = t._pannerAttr;
				s = {
					coneInnerAngle: void 0 !== e.coneInnerAngle ? e.coneInnerAngle : s.coneInnerAngle,
					coneOuterAngle: void 0 !== e.coneOuterAngle ? e.coneOuterAngle : s.coneOuterAngle,
					coneOuterGain: void 0 !== e.coneOuterGain ? e.coneOuterGain : s.coneOuterGain,
					distanceModel: void 0 !== e.distanceModel ? e.distanceModel : s.distanceModel,
					maxDistance: void 0 !== e.maxDistance ? e.maxDistance : s.maxDistance,
					panningModel: void 0 !== e.panningModel ? e.panningModel : s.panningModel,
					refDistance: void 0 !== e.refDistance ? e.refDistance : s.refDistance,
					rolloffFactor: void 0 !== e.rolloffFactor ? e.rolloffFactor : s.rolloffFactor
				};
				var l = t._panner;
				l ? (l.coneInnerAngle = s.coneInnerAngle, l.coneOuterAngle = s.coneOuterAngle, l.coneOuterGain = s.coneOuterGain, l.distanceModel = s.distanceModel, l.maxDistance = s.maxDistance, l.panningModel = s.panningModel, l.refDistance = s.refDistance, l.rolloffFactor = s.rolloffFactor) : (t._pos || (t._pos = r._pos || [0, 0, -.5]), n(t, "spatial"))
			}
		return r
	}, Sound.prototype.init = function(n) {
		return function() {
			var e = this,
				o = e._parent;
			e._orientation = o._orientation, e._stereo = o._stereo, e._pos = o._pos, e._pannerAttr = o._pannerAttr, n.call(this), e._stereo ? o.stereo(e._stereo) : e._pos && o.pos(e._pos[0], e._pos[1], e._pos[2], e._id)
		}
	}(Sound.prototype.init), Sound.prototype.reset = function(n) {
		return function() {
			var e = this,
				o = e._parent;
			return e._orientation = o._orientation, e._pos = o._pos, e._pannerAttr = o._pannerAttr, n.call(this)
		}
	}(Sound.prototype.reset);
	var n = function(n, e) {
		e = e || "spatial", "spatial" === e ? (n._panner = Howler.ctx.createPanner(), n._panner.coneInnerAngle = n._pannerAttr.coneInnerAngle, n._panner.coneOuterAngle = n._pannerAttr.coneOuterAngle, n._panner.coneOuterGain = n._pannerAttr.coneOuterGain, n._panner.distanceModel = n._pannerAttr.distanceModel, n._panner.maxDistance = n._pannerAttr.maxDistance, n._panner.panningModel = n._pannerAttr.panningModel, n._panner.refDistance = n._pannerAttr.refDistance, n._panner.rolloffFactor = n._pannerAttr.rolloffFactor, n._panner.setPosition(n._pos[0], n._pos[1], n._pos[2]), n._panner.setOrientation(n._orientation[0], n._orientation[1], n._orientation[2])) : (n._panner = Howler.ctx.createStereoPanner(), n._panner.pan.value = n._stereo), n._panner.connect(n._node), n._paused || n._parent.pause(n._id, !0).play(n._id)
	}
}();
$(window).load(function() {
	$('body').addClass('loaded');
	$('#loader-wrapper').hide();
	$(".W-yi-bg h2").addClass('fadeInUp1');
	$(".W-yi-bg strong").addClass('fadeInUp2');
	$(".W-yi-bg .W-p1").addClass('fadeInUp3');
	$(".W-yi-bg .W-p2").addClass('fadeInUp4');
	$(".W-yi-bg .W-mailbox").addClass('fadeInUp5');
	$('.Ws-tou').addClass('rubberBand')
});
$(function() {
	(function() {
		console.log('Hi! 朋友，感谢您愿意调试简历代码。\n如果您有什么建议或者想学习前端，欢迎您加入我们,我们互相学习，共同进步^_^。\nQQ:1015393113)');
		setTimeout(function() {
			$('body').addClass('loaded')
		}, 400);
		var Timer = null,
			aa = 1,
			bb = null;
		$('#wowslider-container .ws_images').css('height', $(window).height());
		$('#wowslider-container .ws_images').find('img').css('height', $(window).height());
		setInterval(function() {
			$('#wowslider-container .ws_images').find('img').css('height', $(window).height())
		}, 10);
		var mouse = {
				X: 0,
				Y: 0,
				CX: 0,
				CY: 0
			},
			block = {
				X: mouse.X,
				Y: mouse.Y,
				CX: mouse.CX,
				CY: mouse.CY
			},
			imags = ['14828-105.jpg', '51705-105.jpg', '241984-105.jpg', '296480-105.jpg'];
		$('.block').on('mousemove', function(e) {
			mouse.X = (e.pageX - $(this).offset().left) - $('.block').width() / 2;
			mouse.Y = (e.pageY - $(this).offset().top) - $('.block').height() / 2
		});
		$('.block').on('mouseleave', function(e) {
			mouse.X = mouse.CX;
			mouse.Y = mouse.CY
		});
		setInterval(function() {
			block.CY += (mouse.Y - block.CY) / 12;
			block.CX += (mouse.X - block.CX) / 12;
			$('.block .circleLight').css('background', 'radial-gradient(circle at ' + mouse.X + 'px ' + mouse.Y + 'px, #fff, transparent)');
			$('.block').css({
				transform: 'scale(1.03) translate(' + (block.CX * 0.05) + 'px, ' + (block.CY * 0.05) + 'px) rotateX(' + (block.CY * 0.05) + 'deg) rotateY(' + (block.CX * 0.05) + 'deg)'
			})
		}, 20);
		$('.slider .item').each(function(i) {
			if(i == 0) {
				$(this).addClass('active');
				$(this).next().addClass('next');
				$(this).prev().addClass('prev')
			}
			$(this).attr('id', 'slide-' + i)
		});
		$('.nav-toggle').on('click', function() {
			if($('.navigation').css('right') == '0px') {
				quxiao();
				if($(window).width() <= 770) {
					if($(window).scrollTop() >= 480) {
						$('.Ws-hui').stop(true, true).fadeIn(400)
					} else {
						$('.Ws-hui').stop(true, true).fadeOut(400)
					};
					$('.nav-toggle').css('background', 'transparent')
				}
			} else {
				$('.Ws-hui').hide();
				$('.navigation').stop().animate({
					'right': '0px'
				}, 200, 'linear');
				$('.navigation ul').stop().animate({
					'right': '1%'
				}, 100, 'linear');
				$('.W-logo').stop().animate({
					'right': '1%'
				}, 100, 'linear');
				$('body').addClass('nav-open');
				$('.nav-zhe').show();
				Timer = setTimeout(function() {
					$('.nav-toggle').css('background', '#ccc')
				}, 100)
			}
		});
		$('.nav-toggle').hover(function() {
			$(this).css('background', '#337ab7');
			if($(window).width() >= 480) {
				$('.talkbubble').stop(true, true).fadeIn(400)
			} else {
				$('.talkbubble').stop(true, true).hide()
			}
		}, function() {
			$('.talkbubble').stop(true, true).fadeOut(400);
			if($('body').hasClass('nav-open')) {
				$('.nav-toggle').css('background', '#ccc')
			} else {
				$('.nav-toggle').css('background', 'transparent')
			}
		});
		$('.navigation ').css('border-bottom-width', $(window).height());
		$(window).resize(function() {
			$('.navigation ').css('border-bottom-width', $(window).height())
		});
		$('.navigation ul li').hover(function() {
			$(this).find('a span').stop().animate({
				'width': '100%'
			}, 400)
		}, function() {
			if($(this).find('a span').hasClass('span-active')) {
				return false
			} else {
				$(this).find('a span').stop().animate({
					'width': '0'
				}, 100)
			}
		});
		$('.W-yyue').hover(function() {
			if(aa == 1) {
				$(this).find('span').eq(0).css('display', 'block')
			} else if(aa == 0) {
				$(this).find('span').eq(1).css('display', 'block')
			}
		}, function() {
			$(this).find('span').hide()
		});
		$('.W-yyue').on('click', function() {
			if($(this).find('span').eq(0).css('display') == 'block') {
				aa = 0;
				$(this).find('span').eq(0).css('display', 'none');
				$(this).find('span').eq(1).css('display', 'block');
				sound.pause();
				return aa
			} else {
				aa = 1;
				$(this).find('span').eq(0).css('display', 'block');
				$(this).find('span').eq(1).css('display', 'none');
				sound.play();
				return aa
			}
			$(this).find('span').hide();
			return false
		});
		$('.W-introduce-me').on('click', function() {
			window.open('https://show8.github.io')
		});
		$('.W-time').hover(function() {
			$(this).css({
				'animation': 'runs 0.5s linear',
				'-o-animation': 'runs 0.5s linear',
				'-webkit-animation': 'runs 0.5s linear',
				'-ms-animation': 'runs 0.5s linear',
				'-moz-animation': 'runs 0.5s linear'
			});
			$('.W-zhuan').stop(true, true).fadeIn(200)
		}, function() {
			$(this).css({
				'animation': 'runn 0.5s linear',
				'-o-animation': 'runn 0.5s linear',
				'-webkit-animation': 'runn 0.5s linear',
				'-moz-animation': 'runn 0.5s linear',
				'-msanimation': 'runn 0.5s linear'
			});
			$('.W-zhuan').stop(true, true).fadeOut(700)
		});
		$('.W-tim-ul,.W-work-right ul').find('li').hover(function() {
			$('.W-jie1').css('color', '#fff');
			$('.W-jie1').eq($(this).index()).css('color', '#6bc30d');
			if($(this).index() == 0) {
				xuanz1(0, '57px')
			} else if($(this).index() == 1) {
				xuanz1(1, '182px')
			} else if($(this).index() == 2) {
				xuanz1(2, '307px')
			}
		}, function() {
			$('.W-jie1').css('color', '#fff');
			if($(this).index() == 0) {
				xuanz2(0, '63px')
			} else if($(this).index() == 1) {
				xuanz2(1, '188px')
			} else if($(this).index() == 2) {
				xuanz2(2, '313px')
			}
		});

		function xuanz1(n, top) {
			$('.W-tim-ul li').find('span').eq(n).stop().animate({
				'border-width': '8px',
				'right': '-20px',
				'top': top
			}, 100, 'linear')
		}

		function xuanz2(n, top) {
			$('.W-tim-ul li').find('span').eq(n).stop().animate({
				'border-width': '2px',
				'right': '-14px',
				'top': top
			})
		};
		$('.W-lian-bottom').find('a').hover(function() {
			$(this).find('span').stop(true, true).fadeIn(400)
		}, function() {
			$(this).find('span').stop(true, true).fadeOut(400)
		});
		$(document).on('touchstart', function() {
			$('.W-lian-bottom a').find('span').stop(true, true).fadeOut(400)
		});
		var mySwiper1 = new Swiper('.swiper-container1', {
			speed: 500,
			direction: 'vertical',
			paginationClickable: true,
			simulateTouch: false,
			pagination: '.swiper-pagination1',
			onSlideChangeEnd: function(swiper) {},
			onSlideChangeStart: function(swiper) {
				if(swiper.activeIndex == 0) {
					$('.slider').stop(true, true).fadeIn(800);
					$('.navigation li a').removeClass('a-active');
					$('.navigation li').eq(0).find('a').addClass('a-active');
					$('.navigation li a span').css('width', '0').removeClass('span-active');
					$('.navigation li').eq(0).find('a span').css('width', '100%').addClass('span-active')
				} else if(swiper.activeIndex == 1) {
					$('.slider').hide();
					$('.W-introduce').addClass('fadeInLeft');
					$('.navigation li a').removeClass('a-active');
					$('.navigation li').eq(1).find('a').addClass('a-active');
					$('.navigation li a span').css('width', '0').removeClass('span-active');
					$('.navigation li').eq(1).find('a span').css('width', '100%').addClass('span-active')
				} else if(swiper.activeIndex == 2) {
					$('.slider').hide();
					$('#content').addClass('fadeInLeft');
					$('.navigation li a').removeClass('a-active');
					$('.navigation li').eq(2).find('a').addClass('a-active');
					$('.navigation li a span').css('width', '0').removeClass('span-active');
					$('.navigation li').eq(2).find('a span').css('width', '100%').addClass('span-active')
				} else if(swiper.activeIndex == 3) {
					$('.slider').hide();
					$('.W-work-nr').addClass('fadeInLeft');
					$('.navigation li a').removeClass('a-active');
					$('.navigation li').eq(3).find('a').addClass('a-active');
					$('.navigation li a span').css('width', '0').removeClass('span-active');
					$('.navigation li').eq(3).find('a span').css('width', '100%').addClass('span-active')
				} else if(swiper.activeIndex == 4) {
					$('.slider').hide();
					$('.swiper-container2,.W-works-zi').addClass('fadeInLeft');
					$('.navigation li a').removeClass('a-active');
					$('.navigation li').eq(4).find('a').addClass('a-active');
					$('.navigation li a span').css('width', '0').removeClass('span-active');
					$('.navigation li').eq(4).find('a span').css('width', '100%').addClass('span-active')
				} else if(swiper.activeIndex == 5) {
					$('.slider').hide();
					$('.W-lian').addClass('fadeInLeft');
					$('.navigation li a').removeClass('a-active');
					$('.navigation li').eq(5).find('a').addClass('a-active');
					$('.navigation li a span').css('width', '0').removeClass('span-active');
					$('.navigation li').eq(5).find('a span').css('width', '100%').addClass('span-active')
				}
			},
			keyboardControl: true,
			mousewheelControl: true,
			preventClicks: false,
			preventLinksPropagation: true,
			width: window.innerWidth,
			observer: true
		});
		$('.navigation').find('li').on('click touchstart', function() {
			moveNav($(this).index());
			quxiao()
		});

		function moveNav(index) {
			mySwiper1.slideTo(index)
		}
		var mySwiper2 = new Swiper('.swiper-container2', {
			speed: 700,
			paginationClickable: true,
			effect: 'fade',
			pagination: '.swiper-pagination2',
			paginationBulletRender: function(swiper, index, className) {
				return '<span class="' + className + '">' + (index + 1) + '</span>'
			},
			observeParents: true,
			preventClicks: false,
			preventLinksPropagation: true,
			observer: true
		});
		var mySwiper3 = new Swiper('.swiper-container3', {
			speed: 700,
			spaceBetween: 20,
			effect: 'cube',
			pagination: '.swiper-pagination3',
			preventClicks: false,
			paginationClickable: true,
			observeParents: true,
			preventClicks: false,
			preventLinksPropagation: true,
			observer: true
		});
		var sound = new Howl({
			src: ["audio/show.MP3", "audio/show.OGG"],
			autoplay: true,
			loop: true
		});

		function quxiao() {
			clearInterval(Timer);
			$('.navigation').stop().animate({
				'right': '-100%'
			}, 100, 'linear');
			$('body').removeClass('nav-open');
			$('.nav-zhe').hide();
			$('.nav-toggle').css('background', 'transparent');
			$('.navigation ul').stop().animate({
				'right': '-150px'
			}, 100, 'linear');
			$('.W-logo').stop().animate({
				'right': '-80%'
			}, 100, 'linear')
		}
		if(!!window.ActiveXObject || "ActiveXObject" in window) {
			$('.W-introduce-me').find('img').hide();
			$('.W-introduce-me').css({
				'background': 'url(?Anti-stealing-link=img&path=me1.jpg) no-repeat',
				'background-size': 'cover'
			})
		}
		document.oncontextmenu = function() {
			return false
		};
		// $(document).keydown(function(e) {
		// 	e = window.event || e || e.which;
		// 	if(e.keyCode == 123) {
		// 		location.href = 'https://showcc.github.io';
		// 		return false
		// 	}
		// });
		var ping = null;
		$('.bg-3').on('click touchstart', function() {
			$('.W-pinglun').removeClass('PingGuan');
			$('.W-pinglun').stop(true, true).show().addClass('pingl');
			$('.swiper-container,.W-head-portrait,.nav-yuan,.bg-3,.W-page2,.W-s-yyue').addClass('swiper-slide-blur')
		});
		$('.bg-2').on('click', function() {
			clearTimeout(ping);
			$('.swiper-container,.W-head-portrait,.nav-yuan,.bg-3,.W-page2,.W-s-yyue').removeClass('swiper-slide-blur');
			$('.W-pinglun').delay(200).addClass('PingGuan');
			ping = setTimeout(function() {
				$('.W-pinglun').stop(true, true).hide()
			}, 600)
		});
//		var Imgatr = ['?Anti-stealing-link=img&path=WS1.jpg', '?Anti-stealing-link=img&path=WS2.jpg', '?Anti-stealing-link=img&path=WS3.jpg'];
//		var url = Imgatr[Math.floor(Math.random() * Imgatr.length)];
//		$('.W-yi-bg').css('background-image', 'url(' + url + ')');
//		if(url == "?Anti-stealing-link=img&path=WS3.jpg") {
//			$('.Ws-tou').find('img').attr('src', '?Anti-stealing-link=img&path=me2.jpg')
//		} else {
//			$('.Ws-tou').find('img').attr('src', '?Anti-stealing-link=img&path=me1.jpg')
//		}
		var Wjn = [{
			"color": "#1abc9c",
			"text": "PHOTOSHOP"
		}, {
			"color": "#e74c3c",
			"text": "PYTHON"
		}, {
			"color": "#34495e",
			"text": "HTML5"
		}, {
			"color": "#3498db",
			"text": "JQUERY"
		}, {
			"color": "#d35400",
			"text": "javascript"
		}, {
			"color": "#9b59b6",
			"text": "CSS3"
		}];
		$('.Ws-tu').find('.Ws-PHOTOSHOP').each(function(index) {
			$(this).find('em').text(Wjn[index].text);
			$(this).find('.Ws-ph .Ws-ph-f').css('background', Wjn[index].color);
			$(this).find('.Ws-ph .Ws-ph-f').css('width', $(this).find('.Ws-ph .Ws-ph-f').data('percentage'))
		});
		$(window).resize(function() {
			$('#wowslider-container .ws_images').css('height', $(window).height());
			if($(window).width() <= 770) {
				$('.swiper-container,.W-head-portrait,.nav-yuan,.bg-3,.W-page2,.W-s-yyue').removeClass('swiper-slide-blur');
				$('.nav-toggle').hover(function() {
					$(this).css('background', 'transparent')
				})
			}
		});
		var top = $('.Ws-me').find('.me').offset().top - 65,
			top1 = $('.Ws-ji').find('.ji').offset().top - 65,
			top2 = $('.Ws-jing').find('.jing').offset().top - 65,
			top3 = $('.Ws-zuo').find('.zuo').offset().top - 65,
			top4 = $('.Ws-lianxi').find('.lianxi').offset().top - 65;
		if($(window).width() <= 770) {
			$('.swiper-container,.W-head-portrait,.nav-yuan,.bg-3,.W-page2,.W-s-yyue').removeClass('swiper-slide-blur');
			$('.nav-toggle').hover(function() {
				$(this).css('background', 'transparent')
			});
			$('.navigation').find('li').eq(0).on('click touchstart', function() {
				$('body,html').animate({
					scrollTop: 0
				})
			});
			$('.navigation').find('li').eq(1).on('click touchstart', function() {
				$('body,html').animate({
					scrollTop: top
				})
			});
			$('.navigation').find('li').eq(2).on('click touchstart', function() {
				$('body,html').animate({
					scrollTop: top1
				})
			});
			$('.navigation').find('li').eq(3).on('click touchstart', function() {
				$('body,html').animate({
					scrollTop: top2
				})
			});
			$('.navigation').find('li').eq(4).on('click touchstart', function() {
				$('body,html').animate({
					scrollTop: top3
				})
			});
			$('.navigation').find('li').eq(5).on('click touchstart', function() {
				$('body,html').animate({
					scrollTop: top4 + 60
				})
			});
			// $('.navigation').find('li').eq(6).on('click touchstart', function() {
			// 	window.location.href = "https://showcc.github.io"
			// })
		};
		$('.Ws-hui').on('click', function() {
			$('html,body').stop().animate({
				scrollTop: 0
			}, 500)
		});
		$(window).scroll(function() {
			if($(window).scrollTop() > 200) {
				$('.Ws-header').show()
			} else {
				$('.Ws-header').hide()
			};
			if($(window).scrollTop() >= 480) {
				$('.Ws-hui').stop(true, true).fadeIn(400)
			} else {
				$('.Ws-hui').stop(true, true).fadeOut(400)
			}
			var topH = $(window).scrollTop(),
				topc = top1 - topH,
				topji = top2 - topH,
				topzuo = top3 - topH,
				toplian = top4 - topH;
			if($(window).scrollTop() > 10) {
				$('.Ws-me').find('.me i').animate({
					"width": 60
				}, 1000)
			};
			if(topc < $(window).height() - 40) {
				$('.Ws-ji').find('.ji i').animate({
					"width": 80
				}, 1000)
			};
			if(topji < $(window).height() - 40) {
				$('.Ws-jing').find('.jing i').animate({
					"width": 80
				}, 1000)
			};
			if(topzuo < $(window).height() - 40) {
				$('.Ws-zuo').find('.zuo i').animate({
					"width": 80
				}, 1000)
			};
			if(toplian < $(window).height() - 40) {
				$('.Ws-lianxi').find('.lianxi i').animate({
					"width": 60
				}, 1000)
			}
		})
	})()
});