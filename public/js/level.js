(function() {
  function viewModel() {
    var self = this
    //this.phones = ko.observableArray();

    self.level1 = ko.observableArray();
    self.level2 = ko.observableArray();
    self.level3 = ko.observableArray();
    self.levelSelection1 = ko.observable('select one');
    self.levelSelection2 = ko.observable();
    self.levelSelection3 = ko.observable();
    self.details = ko.observable();
    self.loading = ko.observable(false);
    self.level1Click = function() {
      self.levelSelection1(this.key())
      console.log('this',this)
    }
  }

  var vm = new viewModel()
  var selections = null

  function optionModel(k, v) {
    this.key = ko.observable(k)
    this.value = ko.observable(v)
  }

  vm.levelSelection1.subscribe(function (newVal) {
    console.log(newVal)
    var l2 = selections[newVal]
    var keys = []
    for (var k in l2) {
      keys.push(k)
    }
    vm.level2(keys)
  })

  vm.levelSelection2.subscribe(function (newVal) {
    console.log(newVal)
    var l3 = selections[vm.levelSelection1()][newVal]
    var keys = []
    for (var k in l3) {
      console.log('k', k)
      keys.push(k)
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
        keys.push(new optionModel(k, k))
      }
      vm.level1(keys)
    }
  })

  ko.applyBindings(vm);

})()

//var example2 = new viewmodel();
//
//ko.applyBindings(example2, document.getElementById('cascading-dropdown'));

//$('#cascading-dropdown').cascadingDropdown({
//    selectBoxes: [
//    {
//        selector: '.step1',
//        source: [{ label: '4.0"', value: 4 }, { label: '4.3"', value: 4.3 }, { label: '4.7"', value: 4.7 }, { label: '5.0"', value: 5 }]
//    },
//    {
//        selector: '.step2',
//        requires: ['.step1'],
//        source: function(request, response) {
//            $.getJSON('/api/resolutions', request, function(data) {
//                var selectOnlyOption = data.length <= 1;
//                response($.map(data, function(item, index) {
//                    return {
//                        label: item + 'p',
//                        value: item,
//                        selected: selectOnlyOption
//                    };
//                }));
//            });
//        }
//    },
//    {
//        selector: '.step3',
//        requires: ['.step1', '.step2'],
//        requireAll: true,
//        source: function(request, response) {
//            $.getJSON('/api/storages', request, function(data) {
//                response($.map(data, function(item, index) {
//                    return {
//                        label: item + ' GB',
//                        value: item,
//                        selected: index == 0
//                    };
//                }));
//            });
//        },
//        onChange: function(event, value, requiredValues, requirementsMet) {
//            if(!requirementsMet) return;
//
//            example2.loading(true);
//
//            var ajaxData = requiredValues;
//            ajaxData[this.el.attr('name')] = value;
//            $.getJSON('/api/phones', ajaxData, function(data) {
//                example2.phones(data);
//                example2.loading(false);
//            });
//        }
//    }
//    ]
//});
