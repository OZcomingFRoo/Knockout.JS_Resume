ko.components.register('footer-comp', {
    viewModel: function (params) {
        this.otherInfo = ko.observableArray(params.arr()); // Must be a knockout array observable
    },
    template:
        '<footer data-bind="foreach:otherInfo">\
            <div data-bind="text: $data"></div> <b>&nbsp; || &nbsp;</b> \
        </footer>'
});