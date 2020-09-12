$(function(){
    
    $('#morning').on('click', function() {
        viewTab("morning");
    });
    $('#night').on('click', function() {
        viewTab("night");
    });

    function viewTab(key) {
        //読み込み
        data = localStorage.getItem(key);
        
        const obj = JSON.parse(data);

        for (const elem of obj.urls) {

            if(elem){
                chrome.tabs.create({
                    url: elem
                });    
            }
        }
    }

});