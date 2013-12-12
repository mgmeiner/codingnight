var oldContent;

$(window).on("navigate", function (event, data) {
    if (data.state.direction == 'back') {
        $( "#content" ).html(oldContent);
    }
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
    }
};
