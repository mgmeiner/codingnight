var Interface = {
	getCategories: function() {
        var items = [];
		$.getJSON("http://extra.apiary.io/reward", function(data) {
            return data;
        });
	},

	getRewardById: function(id) {
		$.getJSON("http://extra.apiary.io/reward/"+id, function(data) {
			return data;
		});
	},
	
	getRewardsByCategory: function(categoryId) {
		$.getJSON("http://extra.apiary.io/reward/"+categoryId+"/reward", function(data) {
			return data;
		});
	},
	
	searchGallery: function(searchTerm, pointsFrom, pointsTo, orderBy, categoryId) [
		$.getJSON("http://extra.apiary.io/reward/search/?searchTerm="+searchTerm+"&pointsFrom="+pointsFrom+"&pointsTo="+pointsTo+"&orderBy="+orderBy+"&category="+categoryId,function(data) {
			return data;
		});
	},

	getAccountData: function() {
		$.getJSON("http://extra.apiary.io/account/data",function(data) {
			return data;
		});
	},
	
	loginCheck: function() {
		$.getJSON("http://extra.apiary.io/loginCheck", (function(data) {
			return data;
		});
	}
}