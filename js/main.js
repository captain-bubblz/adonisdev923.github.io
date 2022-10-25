$(document).ready(function () {
	"use strict"; // start of use strict

	/*==============================
	Mobile navigation
	==============================*/
	$('.header__btn').on('click', function() {
		$(this).toggleClass('header__btn--active');
		$('.header__nav').toggleClass('header__nav--active');

		if ( $(window).scrollTop() == 0 ) {
			$('.header').toggleClass('header--active');
		}
	});

	/*==============================
	Multi level dropdowns
	==============================*/
	$('ul.dropdown-menu [data-toggle="dropdown"]').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();

		$(this).siblings().toggleClass('show');
	});

	$(document).on('click', function (e) {
		$('.dropdown-menu').removeClass('show');
	});

	/*==============================
	Header
	==============================*/
	$(window).on('scroll', function () {
		if ( $(window).scrollTop() > 0 ) {
			$('.header').addClass('header--active');
		} else {
			$('.header').removeClass('header--active');
		}
	});
	$(window).trigger('scroll');

	/*==============================
	Carousel
	==============================*/
	if ($('.section__carousel--content').length) {
		var elms = document.getElementsByClassName('section__carousel--content');

		for ( var i = 0; i < elms.length; i++ ) {
			new Splide(elms[ i ], {
				type: 'loop',
				perPage: 3,
				drag: true,
				pagination: false,
				autoWidth: false,
				autoHeight: false,
				speed: 800,
				gap: 30,
				arrows: false,
				focus: 0,
				breakpoints: {
					767: {
						gap: 20,
						autoHeight: true,
						pagination: true,
						arrows: false,
						perPage: 1,
					},
					991: {
						autoHeight: true,
						pagination: true,
						arrows: false,
						perPage: 2,
					},
					1199: {
						autoHeight: true,
						pagination: true,
						arrows: false,
						perPage: 2,
					},
				}
			}).mount();
		}
	}

	if ($('.section__carousel--block').length) {
		var elms = document.getElementsByClassName('section__carousel--block');

		for ( var i = 0; i < elms.length; i++ ) {
			new Splide(elms[ i ], {
				type: 'loop',
				perPage: 3,
				drag: true,
				pagination: false,
				autoWidth: false,
				autoHeight: true,
				speed: 800,
				gap: 30,
				arrows: false,
				focus: 0,
				breakpoints: {
					767: {
						gap: 20,
						pagination: true,
						arrows: false,
						perPage: 1,
					},
					991: {
						pagination: true,
						arrows: false,
						perPage: 2,
					},
					1199: {
						pagination: true,
						arrows: false,
						perPage: 3,
					},
				}
			}).mount();
		}
	}

	/*==============================
	Details
	==============================*/
	if ($('.details__slider').length) {
		var details = new Splide('.details__slider', {
				type: 'loop',
				drag: true,
				pagination: false,
				speed: 800,
				gap: 15,
				arrows: false,
				focus: 0,
		});

		var thumbnails = document.getElementsByClassName("thumbnail");
		var current;

		for (var i = 0; i < thumbnails.length; i++) {
			initThumbnail(thumbnails[i], i);
		}

		function initThumbnail(thumbnail, index) {
			thumbnail.addEventListener("click", function () {
				details.go(index);
			});
		}

		details.on("mounted move", function () {
			var thumbnail = thumbnails[details.index];

			if (thumbnail) {
				if (current) {
					current.classList.remove("is-active");
				}

				thumbnail.classList.add("is-active");
				current = thumbnail;
			}
		});

		details.mount();
	}

	/*==============================
	Gallery
	==============================*/
	if ($('#gallery').length) {
		document.getElementById('gallery').onclick = function (event) {
			event = event || window.event
			var target = event.target || event.srcElement
			var link = target.src ? target.parentNode : target
			var options = {
				index: link,
				event: event,
				titleElement: 'h4',
				transitionDuration: 500,
				onopen: function () {
					if ($(window).width() > 1200) {
						$('body').css('padding-right', getScrollBarWidth() + "px");
						$('.header').css('padding-right', getScrollBarWidth() + "px");
					}
				},
				onclosed: function() {
					if ($(window).width() > 1200) {
						$('body').css('padding-right', 0);
						$('.header').css('padding-right', 0);
					}
				},
			}
			var links = this.getElementsByTagName('a')
			blueimp.Gallery(links, options)
		}
	}

	/*==============================
	Chart
	==============================*/
	if ($('#myChart').length) {
		const data = {
			labels: ['Liquidity', 'Public Sale', 'Strategic', 'Private', 'Seed', 'Team', 'Strategic Reserve', 'Advisors', 'Community'],
			datasets: [{
				data: [10, 6, 9, 12, 9, 10, 19, 5, 20],
				backgroundColor: [
					'rgba(232, 193, 137, 0.9)',
					'rgba(140, 122, 209, 0.9)',
					'rgba(243, 239, 189, 0.9)',
					'rgba(34, 127, 158, 0.9)',
					'rgba(99, 120, 214, 0.9)',
					'rgba(224, 118, 182, 0.9)',
					'rgba(232, 209, 137, 0.9)',
					'rgba(121, 220, 155, 0.9)',
					'rgba(170, 114, 206, 0.9)',
				],
				borderWidth: 0
			}]
		};

		const getOrCreateTooltip = (chart) => {
			let tooltipEl = chart.canvas.parentNode.querySelector('div');

			if (!tooltipEl) {
				tooltipEl = document.createElement('div');
				tooltipEl.style.background = 'rgba(20, 26, 42, 0.7)';
				tooltipEl.style.borderRadius = '12px';
				tooltipEl.style.color = 'white';
				tooltipEl.style.opacity = 1;
				tooltipEl.style.pointerEvents = 'none';
				tooltipEl.style.position = 'absolute';
				tooltipEl.style.transform = 'translate(-50%, 0)';
				tooltipEl.style.transition = 'all .4s ease';

				const table = document.createElement('table');
				table.style.margin = '0px';

				tooltipEl.appendChild(table);
				chart.canvas.parentNode.appendChild(tooltipEl);
			}

			return tooltipEl;
		};

		const externalTooltipHandler = (context) => {
			// Tooltip Element
			const {chart, tooltip} = context;
			const tooltipEl = getOrCreateTooltip(chart);

			// Hide if no tooltip
				if (tooltip.opacity === 0) {
				tooltipEl.style.opacity = 0;
				return;
			}

			// Set Text
			if (tooltip.body) {
				const titleLines = tooltip.title || [];
				const bodyLines = tooltip.body.map(b => b.lines);

				const tableHead = document.createElement('thead');

				titleLines.forEach(title => {
					const tr = document.createElement('tr');
					tr.style.borderWidth = 0;

					const th = document.createElement('th');
					th.style.borderWidth = 0;
					const text = document.createTextNode(title);

					th.appendChild(text);
					tr.appendChild(th);
					tableHead.appendChild(tr);
				});

				const tableBody = document.createElement('tbody');
				bodyLines.forEach((body, i) => {
					const colors = tooltip.labelColors[i];

					const span = document.createElement('span');
					span.style.background = colors.backgroundColor;
					span.style.borderColor = colors.borderColor;
					span.style.borderWidth = '0px';
					span.style.marginRight = '6px';
					span.style.height = '12px';
					span.style.width = '12px';
					span.style.borderRadius = '50%';
					span.style.display = 'inline-block';
					span.style.lineHeight = '100%';

					const tr = document.createElement('tr');
					tr.style.backgroundColor = 'inherit';
					tr.style.borderWidth = 0;

					const td = document.createElement('td');
					td.style.borderWidth = 0;

					const text = document.createTextNode(body);

					td.appendChild(span);
					td.appendChild(text);
					tr.appendChild(td);
					tableBody.appendChild(tr);
				});

				const tableRoot = tooltipEl.querySelector('table');

				// Remove old children
				while (tableRoot.firstChild) {
					tableRoot.firstChild.remove();
				}

				// Add new children
				tableRoot.appendChild(tableHead);
				tableRoot.appendChild(tableBody);
			}

			const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

			// Display, position, and set styles for font
			tooltipEl.style.opacity = 1;
			tooltipEl.style.left = positionX + tooltip.caretX + 'px';
			tooltipEl.style.top = positionY + tooltip.caretY + 'px';
			tooltipEl.style.font = tooltip.options.bodyFont.string;
			tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
		};

		const config = {
			type: 'doughnut',
			data: data,
			options: {
				responsive: true,
				plugins: {
					legend: false,
					tooltip: {
						enabled: false,
						position: 'nearest',
						external: externalTooltipHandler
					}
				},
			},
		};

		const myChart = new Chart(
			document.getElementById('myChart'),
			config
		);
	}

	/*==============================
	Select
	==============================*/
	$('.filter__select').select2({
		minimumResultsForSearch: Infinity,
		theme: 'default filter__select2'
	});

	$('.form__select').select2({
		minimumResultsForSearch: Infinity,
		theme: 'default form__select2'
	});

	/*==============================
	Modal
	==============================*/
	$('.open-video, .open-map').magnificPopup({
		disableOn: 0,
		fixedContentPos: true,
		type: 'iframe',
		preloader: false,
		removalDelay: 300,
		mainClass: 'mfp-fade',
		callbacks: {
			open: function() {
				if ($(window).width() > 1200) {
					$('.header').css('padding-right', + getScrollBarWidth() + "px");
				}
			},
			close: function() {
				if ($(window).width() > 1200) {
					$('.header').css('padding-right', 0);
				}
			}
		}
	});

	$('.open-modal').magnificPopup({
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		type: 'inline',
		preloader: false,
		focus: '#username',
		modal: false,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in',
		callbacks: {
			open: function() {
				if ($(window).width() > 1200) {
					$('.header').css('padding-right', getScrollBarWidth() + "px");
				}
			},
			close: function() {
				if ($(window).width() > 1200) {
					$('.header').css('padding-right', 0);
				}
			}
		}
	});

	$('.modal__close').on('click', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

	/*==============================
	Get Scrollbar Width
	==============================*/
	function getScrollBarWidth () {
		var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
			widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		$outer.remove();
		return 100 - widthWithScroll;
	};

	/*==============================
	Scrollbar
	==============================*/
	var Scrollbar = window.Scrollbar;

	if ($('.ranking').length) {
		Scrollbar.init(document.querySelector('.ranking'), {
			damping: 0.1,
			renderByPixels: true,
			alwaysShowTracks: true,
			continuousScrolling: true
		});
	}

	if ($('.play__text').length) {
		Scrollbar.init(document.querySelector('.play__text'), {
			damping: 0.1,
			renderByPixels: true,
			alwaysShowTracks: true,
			continuousScrolling: true
		});
	}

	/*==============================
	Upload gallery
	==============================*/
	$('.form__gallery-upload').on('change', function() {
		var length = $(this).get(0).files.length;
		var galleryLabel  = $(this).attr('data-name');

		if( length > 1 ){
			$(galleryLabel).text(length + " files selected");
		} else {
			$(galleryLabel).text($(this)[0].files[0].name);
		}
	});

	/*==============================
	Canvas
	==============================*/
	if ($('.hero__canvas').length) {
		VANTA.CELLS({
			el: "#canvas",
			mouseControls: false,
			touchControls: false,
			gyroControls: false,
			minHeight: 200.00,
			minWidth: 200.00,
			scale: 1.00,
			color1: 0x227f9e,
			color2: 0xaa72ce,
			size: 4.00,
			speed: 1.00
		})
	}

	if ($('.section__canvas').length) {
		VANTA.CELLS({
			el: "#canvas2",
			mouseControls: false,
			touchControls: false,
			gyroControls: false,
			minHeight: 200.00,
			minWidth: 200.00,
			scale: 1.00,
			color1: 0x227f9e,
			color2: 0xaa72ce,
			size: 3.00,
			speed: 1.00
		})
	}

});