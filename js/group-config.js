$(function(){
    var idIncrement = 0;
    var key = "GROUP-LIST";
    var groupList = localStorage.getItem(key);
    var colors = ["grey", "blue", "red", "green", "pink", "purple"];

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
    //テキストボックスのフォーカスが外れたら発火
    $(document).on('blur', 'input[type="text"]', function() {
        save();
    });
    //ラジオボックスのフォーカスが外れたら発火
    $(document).on('change', 'input[type="radio"]', function() {
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

            enteredGroupId = $(elem).find(".groupId").val();
            color_key = "color_"+enteredGroupId;
            enteredColor = $('input:radio[name="'+color_key+'"]:checked').val();
            enteredTitle = $(elem).find(".title").val();

            var tempObj = {
                groupId: enteredGroupId,
                color: enteredColor,
                title: enteredTitle
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

    //フォーム追加処理
    function addForm(groupId,color,title){
        idIncrement++;

        if(groupId == ""){            
            groupId = nowTime()+"_"+idIncrement;
        }
        var addTag = "";


        addTag += '<div id="'+groupId+'" class="inputItem form-check" >';
        addTag += '<input type="hidden" value="'+groupId+'" class="groupId" name="groupId[]" placeholder="groupId">';

        for (var colorData of colors) {
            isChecked = "";
            if (color == colorData){
                isChecked = "checked";
            }
            addTag += '<input class="'+colorData+'" type="radio" name="color_'+groupId+'" value="'+colorData+'" '+isChecked+'>';
        }
        
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