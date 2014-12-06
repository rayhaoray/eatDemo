(function() {
  function viewModel() {
    var self = this
    self.leftVenue = ko.observable();
    self.level1 = ko.observableArray();
    self.level2 = ko.observableArray();
    self.level3 = ko.observableArray();
    self.levelSelection1 = ko.observable('Select One');
    self.levelSelection2 = ko.observable('Select One');
    self.levelSelection3 = ko.observable('Select One');
    self.details = ko.observable();
    self.loading = ko.observable(false);
    self.level1Click = function() {
      self.levelSelection1(this.key())
    }

    self.level2Click = function() {
      self.levelSelection2(this.key())
    }

    self.level3Click = function() {
      self.levelSelection3('Sort by ' + this.key())
    }

    self.showSelect2 = ko.observable(false)
    self.showSelect3 = ko.observable(false)

    self.leftBtnValue = ko.observable('Select One')

    self.rightGo = function () {
      console.log()
      $('#right-form').submit()
    }

    self.leftGo = function () {
      console.log()
      $('#left-form').submit()
    }

    self.leftBtn = function() {
      var venuesSelect2 = $('#venues-selection')
      venuesSelect2.select2('open')
    }
  }

  var vm = new viewModel()
  var selections = null

  function optionModel(k, v) {
    this.key = ko.observable(k)
    this.hasNext = ko.observable(v)
  }

  vm.leftVenue.subscribe(function () {
    vm.leftBtnValue($("#venues-selection").find(":selected").text())
  })

  vm.levelSelection1.subscribe(function (newVal) {
    if (newVal !== 'Select One') {
      vm.showSelect2(true)
      console.log(vm.levelSelection2())
      vm.levelSelection2('Select One')
      vm.showSelect3(false)
    }
    var l2 = selections[newVal]
    var keys = []
    for (var k in l2) {
      keys.push(new optionModel(k, k))
    }
    keys[keys.length - 1].hasNext(false)
    vm.level2(keys)
  })

  vm.levelSelection2.subscribe(function (newVal) {
    if (newVal !== 'Select One') {
      vm.levelSelection3('(Optional) Sort By:') 
      vm.showSelect3(true)
      //var l3 = selections[vm.levelSelection1()][newVal]
      var l3 = {'Likes (Default)': 0, 'Name': 1, 'Score': 2} 
      var keys = []
      for (var k in l3) {
        keys.push(new optionModel(k, k))
      }
      keys[keys.length - 1].hasNext(false)
      vm.level3(keys)
    }
  })

  vm.levelSelection3.subscribe(function (newVal) {
    var details = selections[vm.levelSelection1()][vm.levelSelection2()][newVal]
    vm.details(details)
  })

  $.ajax({
    type: 'GET',
    url: '/level-all-data',
    success: function (data) {
      selections = data
      var keys = []
      for (var k in data) {
        keys.push(new optionModel(k, true))
      }
      keys[keys.length - 1].hasNext(false)
      vm.level1(keys)
    }
  })

  ko.applyBindings(vm);

  $(function () {
    $("#venues-selection").select2()
    $(".select2-choice").css("display", "none")
  })

})()
