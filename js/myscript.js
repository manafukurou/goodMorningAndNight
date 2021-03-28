$(function(){
    
    var key = "GROUP-LIST";
    var groupList = localStorage.getItem(key);

    if(groupList){
        var objects  = JSON.parse(groupList);
        for (const obj of objects.groups) {
            addButton(obj.groupId,obj.title);
        }    
    }

    //フォーム追加処理
    function addButton(groupId,title){
        if(groupId == ""){            
            groupId = nowTime()+"_"+idIncrement;
        }
        var addTag = "";
        addTag += '<div class="buttonItem" >';
        addTag += '<div class="executeButton" id="'+groupId+'" data-groupid="'+groupId+'">'+title+'</div>';
        addTag += '<a href="config.html?type='+groupId+'" class="configButton"></a>';
        addTag += '</div>';
        $('#button_area').append(addTag);
    }

    $('.executeButton').on('click', function() {    
        groupId = $(this).data("groupid");
        viewTab(groupId);
    });

    function viewTab(groupId) {
        data = localStorage.getItem(groupId);
        const obj = JSON.parse(data);
        groupInfo = getGroupInfo(groupId);


        if(obj){

            startTabId = 0;
            //group作成用のtab作成
            callbackFirstTab = function(tab){
                startTabId = tab.id;
                chrome.tabs.group({
                    tabIds: startTabId
                },function(groupId){
                    
                    chrome.tabGroups.update(
                        groupId,
                        {
                            collapsed:true,
                            color: groupInfo.color,
                            title: groupInfo.title

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
            },callbackFirstTab);    
        }else{
            alert("URLの設定をしてください");
        }
    }

    function getGroupInfo(groupId){

        if(groupList){
            var objects  = JSON.parse(groupList);
            for (const obj of objects.groups) {
                if(obj.groupId == groupId){
                    return obj;
                }
            }    
        }
        return {
            groupId: "0",
            color: "red",
            title: "-"
        }
    }
});