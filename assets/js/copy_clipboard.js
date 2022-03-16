//Bo sung COPY CLIPBOARD
function copy_clipboard(el, id) {
	// Copy textarea, pre, div, etc.
	if (document.body.createTextRange) {
		// IE 
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(el);
		textRange.select();
		textRange.execCommand("Copy");
		//tooltip(el, "Copied!");  
	} else if (window.getSelection && document.createRange) {
		// non-IE
		var editable = el.contentEditable; // Record contentEditable status of element
		var readOnly = el.readOnly; // Record readOnly status of element
		el.contentEditable = true; // iOS will only select text on non-form elements if contentEditable = true;
		el.readOnly = false; // iOS will not select in a read only form element
		var range = document.createRange();
		range.selectNodeContents(el);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range); // Does not work for Firefox if a textarea or input
		if (el.nodeName == "TEXTAREA" || el.nodeName == "INPUT")
			el.select(); // Firefox will only select a form element with select()
		if (el.setSelectionRange && navigator.userAgent.match(/ipad|ipod|iphone/i))
			el.setSelectionRange(0, 999999); // iOS only selects "form" elements with SelectionRange
		el.contentEditable = editable; // Restore previous contentEditable status
		el.readOnly = readOnly; // Restore previous readOnly status 
		if (document.queryCommandSupported("copy")) {
			var successful = document.execCommand('copy');

			if (successful) console.log('ok'); //tooltip(el, "Copied to clipboard.");
			else console.log('not ok'); //tooltip(el, "Press CTRL+C to copy");
		} else {
			if (!navigator.userAgent.match(/ipad|ipod|iphone|android|silk/i))
				//tooltip(el, "Press CTRL+C to copy");    
				console.log('not ok');
		}
	}
	$('#btn_copy_' + id).html('copied');
} // end function select_all_and_copy(el)