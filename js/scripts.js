// Empty JS for your own code to be here
var sort = "";



function articleSearch() {
  console.log($("#searchTerms").val());
	var APIKey = "9f7ffdfe7c9d477ebeeafd2e8c0b26c7";
  // Here we are building the URL we need to query the database
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  var queryObj = {'api-key': "9f7ffdfe7c9d477ebeeafd2e8c0b26c7"};
  console.log($("#searchTerms").val());
  console.log(queryURL);


  if($("#searchTerms").val() == ""){
  	console.log("no search term");
  }
  else{
  	queryObj.q = $("#searchTerms").val();
  }

  if($("#startDate > .form-control").val() == ""){
  	console.log("no begin_date");
  }
  else{
  	queryObj.begin_date = $("#startDate > .form-control").val();
  }
   console.log($("#startDate > .form-control").val())



   //endDate
  if($("#endDate > .form-control").val() == ""){
  	console.log("no end_date");
  }
  else{
  	queryObj.end_date = $("#endDate > .form-control").val();
  }
   console.log($("#endDate > .form-control").val())

  if(sort === ""){
    console.log("by relavence");
  }
  else{
    queryObj.sort = sort;
    console.log("sort by " + sort);
  }

 

  queryURL += '?' + $.param(
  	queryObj
  	);

  $.ajax({
  	url: queryURL,
  	method: "GET"
  }).done(function(ajaxOutput) {
  	console.log(ajaxOutput);
  	for (var i = 0; i < ajaxOutput.response.docs.length; i++) {

  		var temp = "";
  		if(ajaxOutput.response.docs[i].byline !== undefined){
  			temp = ajaxOutput.response.docs[i].byline.original;
  		}
      var d = new Date(ajaxOutput.response.docs[i].pub_date);
      var n = d.toLocaleDateString();
      var title = "";
      if(ajaxOutput.response.docs[i].headline.print_headline == null){
        if(ajaxOutput.response.docs[i].headline.main == null){
          title = "Title Unavailable";
        }
        else{
          title = ajaxOutput.response.docs[i].headline.main;
        }
      }
      else{
        title = ajaxOutput.response.docs[i].headline.print_headline;
      }

      console.log(n);
  		$("#outputTable").append("<tr><th>" +parseInt(i+1) +"</th><th><a href='"+ ajaxOutput.response.docs[i].web_url+"'>" + title + "</a></th><th>" + temp + "</th><th>" + n + "</th><th>" + ajaxOutput.response.docs[i].snippet+ "</th></tr>");
  		console.log("<tr><th>" + parseInt(i+1) +"</th><th><a href='"+ ajaxOutput.response.docs[i].web_url+"'>" + ajaxOutput.response.docs[i].headline.print_headline + "</a></th><th>" + temp + "</th><th>" + n + "</th><th>" + ajaxOutput.response.docs[i].snippet+ "</th></tr>");
  	}

  	console.log(queryURL);

    // console.log(response);
});
}

$(function () {
   var bindDatePicker = function() {
		$(".date").datetimepicker({
        format:'YYYY-MM-DD',
			icons: {
				time: "fa fa-clock-o",
				date: "fa fa-calendar",
				up: "fa fa-arrow-up",
				down: "fa fa-arrow-down"
			}
		}).find('input:first').on("blur",function () {
			// check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
			// update the format if it's yyyy-mm-dd
			var date = parseDate($(this).val());

			if (! isValidDate(date)) {
				//create date based on momentjs (we have that)
				date = moment().format('YYYY-MM-DD');
			}

			$(this).val(date);
		});
	}
   
   var isValidDate = function(value, format) {
		format = format || false;
		// lets parse the date to the best of our knowledge
		if (format) {
			value = parseDate(value);
		}

		var timestamp = Date.parse(value);

		return isNaN(timestamp) == false;
   }
   
   var parseDate = function(value) {
		var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
		if (m)
			value = m[5] + '-' + ("00" + m[3]).slice(-2) + '-' + ("00" + m[1]).slice(-2);

		return value;
   }
   
   bindDatePicker();
 });


$("body").on("click", "#submit", function() {
	articleSearch();
	
});

$("body").on("click", "#sortBy ul li a", function(){
    console.log(this);
    $("#sortText").text($(this).text());
    $("#sortText").val($(this).val());
    sort = $(this).attr("value");
    console.log(sort);
});

