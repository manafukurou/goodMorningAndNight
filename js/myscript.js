$(function(){
    
	// 背景色を変える
	$("#morning").hover(function() {
        $("body").removeClass('night');
        $("body").addClass('morning');
        
	});
    // 背景色を変える
	$("#night").hover(function() {
        $("body").removeClass('morning');
		$("body").addClass('night');
	});

});
function morning() {

    var urls = [

    ];

    for(var i = 0; i < urls.length; i++) {
        chrome.tabs.create({
            url: urls[i]
        });
    }
}

function goodNight() {

    var urls = [

    ];

    for(var i = 0; i < urls.length; i++) {
        chrome.tabs.create({
            url: urls[i]
        });
    }
}

document.getElementById("morning").onclick = function () {
    morning();
}
document.getElementById("goodNight").onclick = function () {
    goodNight();
}

