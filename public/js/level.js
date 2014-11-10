function viewmodel() {
    this.phones = ko.observableArray([]);
    this.loading = ko.observable(false);
}

var example2 = new viewmodel();

ko.applyBindings(example2, document.getElementById('cascading-dropdown'));

$('#cascading-dropdown').cascadingDropdown({
    selectBoxes: [
    {
        selector: '.step1',
        source: [{ label: '4.0"', value: 4 }, { label: '4.3"', value: 4.3 }, { label: '4.7"', value: 4.7 }, { label: '5.0"', value: 5 }]
    },
    {
        selector: '.step2',
        requires: ['.step1'],
        source: function(request, response) {
            $.getJSON('/api/resolutions', request, function(data) {
                var selectOnlyOption = data.length <= 1;
                response($.map(data, function(item, index) {
                    return {
                        label: item + 'p',
                        value: item,
                        selected: selectOnlyOption
                    };
                }));
            });
        }
    },
    {
        selector: '.step3',
        requires: ['.step1', '.step2'],
        requireAll: true,
        source: function(request, response) {
            $.getJSON('/api/storages', request, function(data) {
                response($.map(data, function(item, index) {
                    return {
                        label: item + ' GB',
                        value: item,
                        selected: index == 0
                    };
                }));
            });
        },
        onChange: function(event, value, requiredValues, requirementsMet) {
            if(!requirementsMet) return;

            example2.loading(true);

            var ajaxData = requiredValues;
            ajaxData[this.el.attr('name')] = value;
            $.getJSON('/api/phones', ajaxData, function(data) {
                example2.phones(data);
                example2.loading(false);
            });
        }
    }
    ]
});
