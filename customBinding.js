ko.bindingHandlers.valueOnKeyPress = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        let ele = $(element);
        let value = ko.unwrap(valueAccessor());
        ele.val(value);

        ele.keyup((event) => {
            let curVal = ele.val();
            valueAccessor(curVal);
        });
        //     // This will be called when the binding is first applied to an element
        //     // Set up any initial state, event handlers, etc. here
    }
};

ko.bindingHandlers.SimpleEdit = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(function () {
            const ob = valueAccessor();
            const ele = $(element);
            ele.attr("title", "Edit text");
            ele.click(() => {
                const oldVal = ob();
                let newVal = window.prompt("Enter value", oldVal);
                if (newVal) ob(newVal);
            });
        });
    }
};

ko.bindingHandlers.AddItem = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(function () {
            const func = ko.unwrap(valueAccessor());
            const ele = $(element);
            const addLinkItem = $("<li></li>").append("<button> Add </button>");
            ele.append(addLinkItem);
            addLinkItem.click(() => {
                let collection = allBindings.get("foreach");
                collection = ko.unwrap(collection);
                func(collection);
            });
        });
    }
};