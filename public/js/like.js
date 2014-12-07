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

$(function(){
  initRating()
});

function initRating(){
  $("#rating").jRating({
    smallStarsPath: '/image/icons/small.png',
    bigStarsPath: '/image/icons/stars.png',
    showRateInfo: false,
    step:true,
    //isDisabled: true,
    length : 5, // nb of stars
    decimalLength:0,
    rateMax: 5,
    //phpPath: '/',
    sendRequest: false,
    canRateAgain: true,
    nbRates: 10000000,
    onClick: function (element, rate) {
      console.log(element, rate)
      var hashData = {
        venue_id: venue_id,
        _csrf: _csrf,
        rate: rate
      }
      postRating(hashData)
    }
  });
}

function postRating(dataHash) {
  $.ajax({
    url: '/venue/' + venue_id + '/rates',
    type: 'POST',
    data: dataHash,
    success: function(data) {
      console.log(data)
    }
  })
}
