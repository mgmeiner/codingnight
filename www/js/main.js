var oldContent;

$(window).on("navigate", function (event, data) {
    if (data.state.direction == 'back') {
        $( "#content" ).html(oldContent);
    }
});

$(document).ready(function() {
    $(document).ajaxStart(function() {
        $.mobile.loading('show');
    });

    $(document).ajaxStop(function() {
        $.mobile.loading('hide');
    });
});

var Common = {
    switchContent: function(partID) {
        $.ajax({
            url: partID + ".html",
            cache: false
        })
        .done(function(html) {
            window.location.href = "#" + partID;
            var $content = $("#content");
            oldContent = $content.html();
            $content.html(html);
            $content.trigger("create");
        });
    },

    displayCategories: function() {
        $.getJSON("http://extra.apiary.io/reward", function( data ) {
            var items = [];
            $.each( data, function(key, val) {
                items.push(val.title, val.imageURL, val.id);
            });

            var $categoryWrapper = $("#categories");
            var $categoryTemplate = $("#template");

            $.each(data, function(key, val) {
                var categoryId = "category-" + val.id;
                $categoryWrapper.append('<div id="' + categoryId + '" </div>');
                $("#" + categoryId).loadTemplate($categoryTemplate,
                    {
                        title: val.title,
                        picture: 'http://193.158.235.145:9000/' + val.imageURL
                    });
            });
        });
    }
};
