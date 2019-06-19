(function($) {
	"use strict";

	function articles() {
		var animaDevelopmentContainer = $('#animaDevelopment').get(0);
		var animaDesignContainer = $('#animaDesign').get(0);
		
		lottie.loadAnimation({
			container: animaDesignContainer,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: './animations/article/develop.json'
		});
		
		lottie.loadAnimation({
			container: animaDevelopmentContainer,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: './animations/article/develop.json'
		});
	}

	function preStart() {
		var animaInContainer = $('#animaIn').get(0);
		var animaOnContainer = $('#animaOn').get(0);
		var animaOutContainer = $('#animaOut').get(0);

		var animaIn = lottie.loadAnimation({
			container: animaInContainer,
			renderer: 'svg',
			loop: false,
			autoplay: true,
			path: './animations/loader/anima-in.json'
		});

		var animaOn = lottie.loadAnimation({
			container: animaOnContainer,
			renderer: 'svg',
			loop: true,
			autoplay: false,
			path: './animations/loader/anima-on.json'
		});

		var animaOut = lottie.loadAnimation({
			container: animaOutContainer,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: './animations/loader/anima-out.json'
		});

		var animaInComplete = function() {
			animaIn.stop();

			$("#animaOn").toggleClass("hidden");

			animaOn.play();

			setTimeout(function() {
				$("#animaOn").toggleClass("hidden");
	
				animaOn.stop();
	
				$("#animaOut").toggleClass("hidden");
	
				animaOut.play();
			}, 3000);
		}

		var animaOutComplete = function() {
			TweenMax.to($("#start"), .5, {top:"50%", ease: Back.easeOut});
		}

		$('#reloadFunctionLoader').on('click', function() {
			$("#animaOut").addClass("hidden");
			TweenMax.set($("#start"), {top:"150%"});
			animaIn.play();
			animaOut.stop();
		});

		animaIn.addEventListener('complete', animaInComplete);
		animaOut.addEventListener('complete', animaOutComplete);
	}

	function like() {
		var animaLikeContainer = $('#animaLike').get(0);

		var animaLike = lottie.loadAnimation({
			container: animaLikeContainer,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: './animations/like/like.json'
		});

		$(document).on('click', '#animaLike path', function() {
			animaLike.play();
		});	
		
		$('#reloadFunctionLike').on('click', function() {
			animaLike.stop();
		});
	}
	
	function menu() {
		var openMenu = false;

		$('.btn-menu').on('click', function() {
			if (openMenu) {
				openMenu = false;
				TweenMax.to($(".menu-content"), .5, {left: -300, ease: Back.easeIn});
				
				TweenMax.set($(".menu-content ul li span"), {left: '-100%'});

				$('.hamburger').removeClass('is-active');

			} else {
				openMenu = true;
				TweenMax.to($(".menu-content"), .7, {left: -30, ease: Expo.easeOut});

				var tl = new TimelineMax();
				tl.staggerTo($(".menu-content ul li span"), .5, {left: 80, ease: Back.easeOut, delay: .3}, .2);
				
				$('.hamburger').addClass('is-active');

			}
		});
	}
	
	function init() {
		preStart();

		menu();

		like();

		articles();
	}

	init();


})(jQuery);
