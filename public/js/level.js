(function() {
  function viewModel() {
    var self = this
    self.level1 = ko.observableArray();
    self.level2 = ko.observableArray();
    self.level3 = ko.observableArray();
    self.levelSelection1 = ko.observable('select one');
    self.levelSelection2 = ko.observable('select one');
    self.levelSelection3 = ko.observable('select one');
    self.details = ko.observable();
    self.loading = ko.observable(false);
    self.level1Click = function() {
      self.levelSelection1(this.key())
      console.log('this',this)
    }

    self.level2Click = function() {
      self.levelSelection2(this.key())
      console.log('this',this)
    }

    self.level3Click = function() {
      self.levelSelection3(this.key())
      console.log('this',this)
    }

    self.showSelect2 = function() {
      console.log(self.levelSelection1())
      console.log(self.levelSelection1() !== 'select one')
      return self.levelSelection1 !== 'select one'
    }

    self.showSelect3 = function() {
      return self.levelSelection1 !== 'select one' && self.levelSelection1 !== 'select one'
    }
  }

  var vm = new viewModel()
  var selections = null

  function optionModel(k, v) {
    this.key = ko.observable(k)
    this.hasNext = ko.observable(v)
  }

  vm.levelSelection1.subscribe(function (newVal) {
    console.log(newVal)
    var l2 = selections[newVal]
    var keys = []
    for (var k in l2) {
      keys.push(new optionModel(k, k))
    }
    vm.level2(keys)
  })

  vm.levelSelection2.subscribe(function (newVal) {
    console.log(newVal)
    var l3 = selections[vm.levelSelection1()][newVal]
    var keys = []
    for (var k in l3) {
      keys.push(new optionModel(k, k))
    }
    vm.level3(keys)
  })

  vm.levelSelection3.subscribe(function (newVal) {
    console.log(newVal)
    var details = selections[vm.levelSelection1()][vm.levelSelection2()][newVal]
    vm.details(details)
  })

  $.ajax({
    type: 'GET',
    url: '/level-all-data',
    success: function (data) {
      console.log(data)
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

})()
