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
        });
    },

    displayCategories: function() {
        $.getJSON("http://extra.apiary.io/reward", function( data ) {
            var items = [];
            $.each( data, function(key, val) {
                items.push("<li id='" + key + "'>" + val.title + "</li>");
            });
            $( "<ul/>", {
                "class": "koccimu",
                html: items.join( "" )
            }).appendTo( "#categories");
        });
    }
};
