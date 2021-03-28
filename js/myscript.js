$(function(){
    
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

            startTabId = 0;
            //group作成用のtab作成
            callbackFuncA = function(tab){
                startTabId = tab.id;
                chrome.tabs.group({
                    tabIds: startTabId
                },function(groupId){
                    chrome.tabGroups.update(
                        groupId,
                        {
                            collapsed:true,
                            color: obj.color,
                            title: obj.name
                        },function(TabGroup){
                            for (const elem of obj.urls) {
                                if(elem.url){
                                    chrome.tabs.create({
                                        url: elem.url,
                                        active: false
                                    },function(tab){
                                        chrome.tabs.group({
                                            groupId :groupId,
                                            tabIds: tab.id
                                        },function(tabGroupId){
                                            chrome.tabs.remove(startTabId);
                                        });
                                    });
                                }
                            };
                        }
                    );
                });
            };
            chrome.tabs.create({
                url: "",
                active: false
            },callbackFuncA);    


        }





    }

});