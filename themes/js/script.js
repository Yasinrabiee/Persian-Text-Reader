const textarea = $(`textarea`);
const fileInput = document.querySelector(`#file`);
const result = $(`#result`);
const x = $(`#x`);

function changeScroll() {
	$(`html, body`).animate({
		scrollTop: result.offset().top
	},1000);
}

textarea.focus(function() {
	$(this).animate({
		height: '200px'
	});
});

textarea.focusout(function() {
	$(this).animate({
		height: '38px'
	});
});

x.click(function() {
	textarea.val(``);
	result.html(``);
});

textarea.on('input', function() {
	const text = $(this).val();
	result.html(text);
	$(`#dotless_container, #bionic_container`).show();
});

textarea.on('paste', function() {
	setTimeout(function(){
		let text = $('#text').val();
		$('#result').html(text);
	},10);
	$(`#dotless_container, #bionic_container`).show();
	changeScroll();
});

fileInput.addEventListener('change', (e) =>{
	$(`#dotless_container, #bionic_container`).hide();
	const file = e.target.files[0];
	let fileReader = new FileReader();
	fileReader.readAsDataURL(file);
	fileReader.onload = function (){
		result.css({
			'background-image': `url('${fileReader.result}')`,
			'height': '500px'
		});
	}
	changeScroll();
});

$(`#zoom-in`).click(function(e) {
	result.css(`font-size`,`+=1px`);
});

$(`#zoom-out`).click(function(e) {
	result.css(`font-size`,`-=1px`);
});

$(`#zoom-100`).click(function(e) {
	result.css(`font-size`,`1rem`);
});

$(`#bionic`).change(function() {
	const pureText = result.text();
	if ($(this).is(`:checked`)) {
		pureText.replaceAll(`  `, ``);
		let splitedText = pureText.split(` `);
		const l = splitedText.length;
		for(let i = 0; i < l; i++) {
			let sliced = splitedText[i].length > 2 ? splitedText[i].substr(0, 2) : splitedText[i].substr(0, 1); 
			console.log(sliced);
			splitedText[i] = splitedText[i].replace(sliced, `<b>${sliced}</b>`);
		}
		result.html(splitedText.join(` `));		
	} else {
		result.html(pureText);
	}
});

$(`#level`).change(function() {
	if ($(this).is(`:checked`))
		result.append(`<div class="level"></div>`);
	else
		$(`.level`).remove();
});

$(`#dotless`).change(function() {
	if ($(this).is(`:checked`))
		result.css(`font-family`, `VazirDotless`);	
	else
		result.css(`font-family`, `Vazir`);
});

$(`#reverse`).change(function() {
	if ($(this).is(`:checked`)) {
		if ($(`#mirror`).is(`:checked`)) {
			result.css(`transform`, `rotate(180deg) scaleX(-1)`);
		} else {
			result.css(`transform`, `rotate(180deg)`);
		}
	}
	else 
		result.css(`transform`, `rotate(0deg)`);
});

$(`#mirror`).change(function() {
	if ($(this).is(`:checked`)) {
		if ($(`#reverse`).is(`:checked`)) {
			result.css(`transform`, `rotate(180deg) scaleX(-1)`);
		} else {
			result.css(`transform`, `scaleX(-1)`);
		}
	}
	else 
		result.css(`transform`, `scaleX(1)`);
});

$(`#dark`).click(function() {
	$(this).toggleClass(`moon`);
	if($(this).hasClass(`moon`)) {
		localStorage.setItem(`mode`, `dark`);
		$(`html`).css(`filter`, `invert(1)`);
	} else {
		localStorage.setItem(`mode`, `light`);
		$(`html`).css(`filter`, `invert(0)`);
	}
});

if (localStorage.getItem(`mode`) == `dark`) {
	$(`html`).css(`filter`, `invert(1)`);
} else {
	$(`html`).css(`filter`, `invert(0)`);
}