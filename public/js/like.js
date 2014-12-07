var isUpdating = false
var venue_id = $('#venue-id').attr("data")
var _csrf = $('#csrf').attr("data")

$('#like').on('change', function() {
  isUpdating = true
  setView()
  $.ajax({
    url: '/venue/' + venue_id + '/likes',
    type: 'POST',
    data: {
      like: this.checked,
      _csrf: _csrf
    },
    success: function(data) {
      isUpdating = false
      setView()
      $("#like-count").html(data.likes)
    }
  })
})

function setView(likeCount) {
  if (isUpdating) {
    $('#like').attr("disabled", true)
  } else {
    $('#like').attr("disabled", false)
  }
}