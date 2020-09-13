$(function(){

    //画像出し分け
    const date = new Date();
    const hour = date.getHours() ;
    if(4 <= hour && hour <= 11 ){
        $("body").addClass("morning");
    }else if (12 <= hour && hour <= 17 ){
        $("body").addClass("noon");
    }else{
        $("body").addClass("night");
    }

    $('#morning').on('click', function() {
        viewTab("morning");
    });
    $('#night').on('click', function() {
        viewTab("night");
    });

    function viewTab(key) {
        data = localStorage.getItem(key);
        const obj = JSON.parse(data);

        if(obj){
            for (const elem of obj.urls) {
                if(elem){
                    chrome.tabs.create({
                        url: elem
                    });    
                }
            }
    
        }
    }

});