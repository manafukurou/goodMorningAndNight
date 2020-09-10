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
    
    key = "aaa";
    val = '{"morning": ["aaa","bbb","ccc"],"night": []}';

    //保存
    localStorage.setItem(key, val);
    //読み込み
    hoge = localStorage.getItem(key);
    
    const obj = JSON.parse(hoge);
    alert(hoge);
    for (const elem of obj.morning) {
        alert(elem);
      }
   

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

