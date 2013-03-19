//prevent an error on older versions of IE(x) < IE7 who did not have a javascript console.
    if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} };

    var $j = jQuery.noConflict();
    $j(document).ready(function($){

    	var languages = [];
    	function getCookie(cookieName){
    //a wrapper, because google chrome does not allow for security reasons cookies on local files.
    //an option can be set while loading chrome to allow cookies on local files
    		try {
    			return $.cookie(cookieName);
    		}catch(e){
    			console.log(e);
    		}
    	}

    	function setCookie(cookieName, cookieValue){
    //a wrapper, because google chrome does not allow for security reasons cookies on local files.
    //an option can be set while loading chrome to allow cookies on local files
    		try{
    			return $.cookie(cookieName, cookieValue);
    		}catch(e){
    			console.log(e);
    		}
    	}
    
    /*
    decectLangauges looks at all of the div(s) containing a class of "code"
    it then creates a list of languages in that list to generate the drop down.
    to ad a language, ad an example with that language defined 
    in the attribute "code_lang_name" for that div
    */
    	function detectLanguages(){
    		languages = [];
    		$("pre.code").each(
    			function(){
    				var isThere = false;
    //set the value of the attribute
    				var isNewLang = $(this).attr("code_lang_name");
    				for ( i in languages ){
    					if( isNewLang == languages[i] ){
    						isThere = true;
    					}
    				}				
    				if( !isThere ){
    //adds a new language to the stack/ array
    				   languages.push(isNewLang);
    				}
    			});
    		console.log("languages detected", languages);
    	}
    
    //execute the function detectLanguages just after we defined it, this should only happen once and on page load after the document object model is ready
    	detectLanguages();

    	function buildListCSelect(){
    //finds the doc element with an id of selectedLangauge, base on css3 rules, then removes all children
    		$(".cSelect ul").empty();
    		$(".cSelect .cSelect-Selected").text("");
    		var langCookie = getCookie("codeLanguage");		
    		for( i in languages ){
    //inserts a new child with the included html
    			$(".cSelect ul").append("<li>" + languages[i] + "</li>");
    		}
    
    //if the cookie is there, set that item to selected.
    		for( i in languages ){
    			if(langCookie !== null && languages[i] == langCookie){
    				$(".cSelect .cSelect-Selected").text(languages[i]);
    			}
    		}

    		if( $(".cSelect .cSelect-Selected").text().length == 0){
    			var first = $(".cSelect li:first").text();
    			$(".cSelect .cSelect-Selected").text(first);
    		}

    	}
    	buildListCSelect();
    
    	function showCSelectedLanguage(){
    		var selected = $(".cSelect .cSelect-Selected:first").text();
    		var langAvail = false;
    		var langCookie = getCookie("codeLanguage");
    		for( i in languages ){
    			if(langCookie == languages[i]){
    				langAvail = true;
    			}
    		}
    		if(langAvail) {
    			selected = langCookie;
    		} else {
    			console.log("the language stored in the cookie is not availible", langCookie);
    		}
    		$("pre.code[code_lang_name]").hide();
    		$("pre.code[code_lang_name='"+ selected +"']").show();
    	}
    	showCSelectedLanguage(); //set the default.
           $(".cSelect").addClass("roundBottom");
    	$(".cSelect ul").hide();
    /* 	$(".cSelect").hover(
     		function(){
     			$(this).find("ul").show();
     		},
     		function(){
     			$(this).find("ul").hide();
     		}
     	);
*/
    	$(".cSelect").hover(
    		function(){
    			$(document).unbind("click.cSelect");
    		},
    		function(){
    			$(document).bind("click.cSelect", function(event){
                                   $(".cSelect").addClass("roundBottom");
    				$(".cSelect ul").hide();
    				$(this).unbind(event);
    			});
    		}
    	);


    	$(".cSelect li").hover(
    		function(){
    			$(this).addClass("cSelect-highlight");
    		},
    		function(){
    			$(this).removeClass("cSelect-highlight");
    		}
    	);

    	var suppress = false;
    	function enable(){
    		suppress = false;
    	}


    	$(".cSelect li").click(function(){
    		var value = $(this).text();
    		console.log( "new selection ", value );
    		$(this).parents(".cSelect").find(".cSelect-Selected").text(value);
    		suppress = true;
                   $(".cSelect").addClass("roundBottom");
    		$(".cSelect ul").hide();
    		$(this).parents(".cSelect").trigger("change");
    		setTimeout(enable, 300 );
    	});


           $(".cSelect-ArrowDown")
     		.add(".cSelect-Selected")
     		.add(".cSelect").click(
     		function(){
     			var visible = $(this).parents(".cSelect").find("ul").css("display") == "block" ? true : false;
     			if( !visible ){
     				$(this).parents(".cSelect").removeClass("roundBottom");
     				$(this).parents(".cSelect").find("ul").show();
     			}else{
     				$(this).parents(".cSelect").addClass("roundBottom");
     				$(".cSelect ul").hide();
     			}
     		});


    	$(".cSelect").click(function(){if(!suppress){}});
 
    	$(".cSelect").change(function(){
    		console.log("selected",$(this).find(".cSelect-Selected").text());
    		selected = $(this).find(".cSelect-Selected").text();
    		$(".cSelect").find(".cSelect-Selected").text(selected);
    		$("pre.code[code_lang_name]").hide();
    		$("pre.code[code_lang_name='"+ selected +"']").show();
    		setCookie("codeLanguage", selected);
    	});
    });