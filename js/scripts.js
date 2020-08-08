/*!
 * Start Bootstrap - Agency v6.0.2 (https://startbootstrap.com/template-overviews/agency)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */
(function ($) {
	'use strict'; // Start of use strict

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
		if (
			location.pathname.replace(/^\//, '') ==
				this.pathname.replace(/^\//, '') &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate(
					{
						scrollTop: target.offset().top - 72,
					},
					1000,
					'easeInOutExpo'
				);
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll-trigger').click(function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: 74,
	});

	// Collapse Navbar
	var navbarCollapse = function () {
		if ($('#mainNav').offset().top > 100) {
			$('#mainNav').addClass('navbar-shrink');
		} else {
			$('#mainNav').removeClass('navbar-shrink');
		}
	};
	// Collapse now if page is not at top
	navbarCollapse();
	// Collapse the navbar when page is scrolled
	$(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

window.addEventListener('DOMContentLoaded', function () {
	// get the form elements defined in your form HTML above

	var form = document.getElementById('contactForm');
	// var button = document.getElementById("contactForm-button");
	var status = document.getElementById('contactForm-status');

	// Success and Error functions for after the form is submitted
	const Toast = Swal.mixin({
		toast: true,
		position: 'center',
		showConfirmButton: false,
		timer: 4000,
		timerProgressBar: true,
		onOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		},
	});
	function success() {
		form.reset();
		Toast.fire({
			icon: 'success',
			title: 'Gracias por escribirnos, muy pronto le estaremos respondiendo!',
		});
	}

	function error() {
		Toast.fire({
			icon: 'error',
			title: 'Oops! lo sentimos tuvimos un inconveniente intenta más tarde!',
		});
	}

	// handle the form submission event

	form.addEventListener('submit', function (ev) {
		ev.preventDefault();
		var data = new FormData(form);
		ajax(form.method, form.action, data, success, error);
	});
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.onreadystatechange = function () {
		if (xhr.readyState !== XMLHttpRequest.DONE) return;
		if (xhr.status === 200) {
			success(xhr.response, xhr.responseType);
		} else {
			error(xhr.status, xhr.response, xhr.responseType);
		}
	};
	xhr.send(data);
}

function InvalidMsg(textbox) {
	if (textbox.value === '') {
		textbox.setCustomValidity('Este campo es obligatorio!');
	} else if (textbox.validity.typeMismatch) {
		textbox.setCustomValidity('El tipo de dato no es correcto!');
	} else {
		textbox.setCustomValidity('');
	}

	return true;
}
