$(function(){
    var idIncrement = 0;
    var key = "GROUP-LIST";
    var groupList = localStorage.getItem(key);
    

    dataExist = false ; 
    //フォーム生成
    if(groupList){
        var objects  = JSON.parse(groupList);
        for (const obj of objects.groups) {
            addForm(obj.groupId,obj.color,obj.title);
            dataExist = true ;
        }    
    }
    //フォーム0件の場合１件デフォルト表示
    if(!dataExist){
        addForm("","","");
    }

    //削除ボタン
    $(document).on("click", ".deleteButton", function () {
        var deleteId = $(this).data("did");
        $("#"+deleteId).remove();
        save();
    });
    //追加ボタン    
    $('#addButton').on('click', function() {
        addForm("","","");
    });
    
    //保存処理
    function save(){

        var groupsData = Array();

        $(".inputItem").each(function(i, elem) {
            var tempObj = {
                groupId: $(elem).find(".groupId").val(),
                color: $(elem).find(".color").val(),
                title: $(elem).find(".title").val()
            };
            groupsData.push(tempObj) ;
        });

        var jsonArray = {
            groups: groupsData
        }
        let complexDataJSON = JSON.stringify(jsonArray);
        localStorage.setItem(key, complexDataJSON);
        return ;
    }
    //テキストボックスのフォーカスが外れたら発火
    $(document).on('blur', 'input[type="text"]', function() {
        save();
    });
    //フォーム追加処理
    function addForm(groupId,color,title){
        idIncrement++;

        if(groupId == ""){            
            groupId = nowTime()+"_"+idIncrement;
        }
        var addTag = "";

        color = "green";
        addTag += '<div id="'+groupId+'" class="inputItem" >';
        addTag += '<input type="hidden" value="'+groupId+'" class="groupId" name="groupId[]" placeholder="groupId">';
        addTag += '<input type="hidden" value="'+color+'" class="color" name="color[]" placeholder="color">';
        addTag += '<input type="text" value="'+title+'" class="title" name="title[]" placeholder="タイトル">';
        addTag += '<div class="deleteButton" data-did="'+groupId+'"></div>';
        addTag += '</div>';
        $('#form_area').append(addTag);
    }

    function nowTime(){
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var h = now.getHours();
        var mi = now.getMinutes();
        var s = now.getSeconds();
        return  y+""+m+""+d+""+h+""+mi+""+s;
    }

});