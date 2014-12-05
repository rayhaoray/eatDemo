var isUpdating = false
var venue_id = $('#venue-id').attr("data")
var _csrf = $('#csrf').attr("data")

$('#like').on('change', function() {
  isUpdating = true
  console.log(this.checked)
  //$('#like').attr("disabled", true)
  $.ajax({
    url: '/venue/' + venue_id + '/likes',
    type: 'POST',
    data: {
      like: this.checked,
      _csrf: _csrf
    },
    success: function(data) {
      console.log(data)
      isUpdating = false
    }
  })
})
