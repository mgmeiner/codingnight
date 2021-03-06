var serviceUrl = "http://193.158.235.145:9000/";

$(window).on("navigate", function (event, data) {
    if (data.state.direction == 'back') {
        checkanker();
    }
});

$(document).ready(function() {
    checkanker();
});

function checkanker() {
    var anker = window.location.hash.substring(1);
 
    if (anker == '') {
        Common.switchContent('start');
    } else if (anker.contains('-')) {
        anker = anker.slice(0, anker.indexOf('-'));
        var someId = window.location.hash.slice(window.location.hash.indexOf('-') + 1, window.location.hash.length);
        Common.switchContent(anker, '-' + someId);
    } else {
        Common.switchContent(anker);
    }
};

$(document).ready(function() {
    $(document).ajaxStart(function() {
        $.mobile.loading('show');
		$.ajaxSetup({
		headers: {          
			 Accept : "application/json; charset=utf-8",         
			"Content-Type": "application/json; charset=utf-8"   
		},
		accepts: {text: "application/json"},
		beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + btoa(window.username + ":" + window.password)); }		
		});
    });

    $(document).ajaxStop(function() {
        $.mobile.loading('hide');
    });
});

var Common = {
	loadAccountData: function() {
		$.getJSON(serviceUrl+"account/data", function( data ) {
			$("#account_data").html($("#account_data").html()+"<h4>"+data[0].email+"</h4><h4>"+data[0].company+"</h4><h4>"+data[0].concept+"</h4><h4>"+data[0].employeeCount+"</h4>");
			//$("#account_data").html($("#account_data").html()+"<h4>"+data[0].company+"</h4>");
			//$("#account_data").html($("#account_data").html()+"<h4>"+data[0].concept+"</h4>");
			//$("#account_data").html($("#account_data").html()+"<h4>"+data[0].employeeCount+"</h4>");
        });
	},
	
	loadAddressData: function() {
		$.getJSON(serviceUrl+"account/data", function( data ) {
			$("#address_data").html($("#address_data").html()+"<h4>"+data[0].address.firstName+"</h4>");
			$("#address_data").html($("#address_data").html()+"<h4>"+data[0].address.lastName+"</h4>");
			$("#address_data").html($("#address_data").html()+"<h4>"+data[0].address.street+"</h4>");
			$("#address_data").html($("#address_data").html()+"<h4>"+data[0].address.city+"</h4>");
			$("#address_data").html($("#address_data").html()+"<h4>"+data[0].address.country+"</h4>");
        });
	},
	
	doSomethingEveryTime: function() {
		Common.getPoints();
	},
	
    switchContent: function(partID, suffix) {
		Common.doSomethingEveryTime();
        $.ajax({
            url: partID + ".html",
            cache: true
        })
        .done(function(html) {
            var hash = partID;

            if (suffix != undefined) {
                hash = hash + suffix
            }

            window.location.href = "#" + hash;
            $("#content").html(html).trigger("create");
        });
    },

	switchContentWithParams: function(partID, paramString) {
		var url_whole = partID+".html";
		Common.doSomethingEveryTime();
        $.ajax({
            url: url_whole,
            cache: true
        })
        .done(function(html) {
			window.location.href = "#" + partID;
			window.parameters = paramString;
            $("#content").html(html).trigger("create");
        });
    },
	
    displayCategories: function() {
        $.getJSON(serviceUrl+"reward", function( data ) {
            var $categoryWrapper = $("#categories");
            var $categoryTemplate = $("#template");

            $.each(data, function(key, val) {
                var categoryId = "category-" + val.id;
                $categoryWrapper.append('<div id="' + categoryId + '" class="category-box" onclick="Common.switchContent(\'rewardList\', -' + val.id + ');"></div>');
                $("#" + categoryId).loadTemplate($categoryTemplate,
                    {
                        title: val.title,
                        picture: 'http://193.158.235.145:9000/media/' + val.imageURL
                    });
            });
        });
    },

    displayRewardDetail: function(id) {
        $.getJSON(serviceUrl + "reward/" + id, function(data) {
            $.each(data, function(key, val) {
                 $("#rewardDetail").loadTemplate($("#template"),
                 {
                        title: 'Artikelname: ' + val.title,
                        description: 'Beschreibung: ' + val.description,
                        manufacturer: 'Hersteller: ' +val.manufacturer,
                        points: 'Punkte: ' + val.points,
                        picture: 'http://193.158.235.145:9000/media/' +  val.imageURL
                });
            });
        });
    },
	
	getCategoriesSelect: function() {
		$.getJSON(serviceUrl+"reward", function( data ) {
            var items = [];
			$("#category_selector").children().remove();
            $.each( data, function(key, val) {
				$("#category_selector").append($('<option></option>').val(val.id).html(val.title));
            });
        });
	},
	
	doSearch: function() {
		searchTerm = $('#search_term').val();
		pointsFrom = $('#points_from').val();
		pointsTo = $('#points_to').val();
		categoryId = $('#category_selector').val();
		orderBy = $('#order_by').val();
		
		var params = "searchTerm="+searchTerm+"&pointsFrom="+pointsFrom+"&pointsTo="+pointsTo+"&orderBy="+orderBy+"&category="+categoryId;
		
		Common.switchContentWithParams('search_result', params);
	},
	
	getSearchResults: function() {
	    $.getJSON(serviceUrl+"reward/search/?"+window.parameters, function( data ) {
            var items = [];
            $.each( data, function(key, val) {
                items.push("<li id='" + key + "'>" + val.title + "</li>");
            });
            $( "<ul/>", {
                "class": "koccimu",
                html: items.join( "" )
            }).appendTo( "#search_results");
        });
	},

    loadRewardsForCategory: function(categoryId) {
        $.getJSON(serviceUrl+"rewardcategory/" + categoryId + "/reward", function(data) {
            var items = [];
            $.each( data, function(key, val) {
                items.push(val.title, val.imageURL, val.id, val.points);
            });

            var $rewardWrapper = $("#rewards");
            var $rewardsTemplate = $("#template");

            $.each(data, function(key, val) {
                var rewardId = "reward-" + val.id;
                $rewardWrapper.append('<div id="' + rewardId + '" class="reward-box" onclick="Common.switchContent(\'rewardDetail\', -' + val.id +');"></div>');
                $("#" + rewardId).loadTemplate($rewardsTemplate,
                    {
                        title: val.title,
                        picture: 'http://193.158.235.145:9000/media/' + val.imageURL,
                        points: val.points
                    });
            });
        });
    },
	
	login: function() {
		username = $('#username').val();
		password = $('#password').val();
		
		$.ajax({
			url: serviceUrl+"loginCheck",
			cache: false,
			dataType: "json"
        }).done(function(html) {
			window.username = username;
			window.password = password;
			window.loginSuccess = true;
			Common.switchContent('start');
        }).fail(function() {
			window.username = "";
			window.password = "";
			alert( "Username/Password falsch" );
		});
	},
	
	getPoints: function() {
		$.getJSON(serviceUrl+"account/data", function( data ) {
            $('#pointbalance').text("Points: " + data[0].pointBalance);
        });
	}
};
