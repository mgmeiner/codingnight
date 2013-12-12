var interface = {
	getCategories: function() {
		$.ajax({
		url: "http://extra.apiary.io/reward",
		context: document.body
		}).done(function(data) {
			return data;
		});
	},
	
	getRewardById: function(id) {
		$.ajax({
		url: "http://extra.apiary.io/reward/"+id,
		context: document.body
		}).done(function(data) {
			return data;
		});
	},
	
	getRewardsByCategory: function(categoryId) {
		$.ajax({
		url: "http://extra.apiary.io/reward/"+categoryId+"/reward",
		context: document.body
		}).done(function(data) {
			return data;
		});
	},
	
	searchGallery: function(searchTerm, pointsFrom, pointsTo, orderBy, categoryId) [
		$.ajax({
		url: "http://extra.apiary.io/reward/search/?searchTerm="+searchTerm+"&pointsFrom="+pointsFrom+"&pointsTo="+pointsTo+"&orderBy="+orderBy+"&category="+categoryId,
		context: document.body
		}).done(function(data) {
			return data;
		});
	},
	getAccountData: function() {
		$.ajax({
		url: "http://extra.apiary.io/account/data",
		context: document.body
		}).done(function(data) {
			return data;
		});
	}
	
	loginCheck: function() {
		$.ajax({
		url: "http://extra.apiary.io/loginCheck",
		context: document.body
		}).done(function(data) {
			return data;
		});
	}
}