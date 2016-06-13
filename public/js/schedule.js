var today = new Date();
today.setUTCSeconds(0);

//Make sure there is either a name or email
function validateForm() {
    var name = $('#candidatename').val();
    var email = $('#candidateemail').val();
    if ((name == null || name == '') && (email == null || email == '')) {
        alert('A name or email must be provided');
        return false;
    }
}

$(function() {
	//Make the start time datetimepicker
	$('#starttime').datetimepicker({
		inline: true,
		sideBySide: true,
		useCurrent: false,
		defaultDate: today,
		stepping: 1
	});
	
	//Make the end time datetimepicker
	$('#endtime').datetimepicker({
		inline: true,
		sideBySide: true,
		useCurrent: false,
		defaultDate: today,
		stepping: 1
	});
	
	//Link the pickers so that start <= end
	$('#starttime').data('DateTimePicker').maxDate(today);
	$('#endtime').data('DateTimePicker').minDate(today);
	
	//Relink if one changes
	$('#starttime').on('dp.change', function (e) {
		$('#endtime').data('DateTimePicker').minDate(e.date);
		$('#starttimehidden').val(new Date(e.date).toUTCString());
	});
	$('#endtime').on('dp.change', function (e) {
		$('#starttime').data('DateTimePicker').maxDate(e.date);
		$('#endtimehidden').val(new Date(e.date).toUTCString());
	});
	
	//Set the values of the hidden inputs
	$('#starttimehidden').val(today.toUTCString());
	$('#endtimehidden').val(today.toUTCString());
	
	//Validate on submission
	$('#test_form').submit(validateForm);
	
	//Submit the form on enter keypress
	$('#candidatename').keypress(function (e) {
		if (e.which == 13) {
			$('form#test_form').submit();
		return false;
	  }
	});
	$('#candidateemail').keypress(function (e) {
		if (e.which == 13) {
			$('form#test_form').submit();
			return false;
		}
	});
});