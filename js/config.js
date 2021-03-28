$(function(){
    var idIncrement = 1;
    var type = getParam("type");
    var listByType = localStorage.getItem(type);
    var dataExist = false ;

    //タイトル文言
    var configTitle = "URLを設定してください";
    $("#configTitle").text(configTitle) ;

    //背景画像
    $("body").addClass("config");

    //フォーム生成
    if(listByType){
        var objects  = JSON.parse(listByType);
        for (const obj of objects.urls) {
            addForm(obj.title,obj.url);
            dataExist = true ;
        }    
    }
    //フォーム0件の場合１件デフォルト表示
    if(!dataExist){
        addForm("","");
    }

    //削除ボタン
    $(document).on("click", ".deleteButton", function () {
        var deleteId = $(this).data("did");
        $("#"+deleteId).remove();
        save();
    });
    //追加ボタン    
    $('#addButton').on('click', function() {
        addForm("","");
    });
    
    //保存処理
    function save(){

        var urlsData = Array();

        $(".inputItem").each(function(i, elem) {
            var tempObj = {title: $(elem).find(".title").val(), url: $(elem).find(".url").val()};
            urlsData.push(tempObj) ;
        });

        var jsonArray = {
            name: type,
            color:"blue",
            urls: urlsData
        }
        let complexDataJSON = JSON.stringify(jsonArray);
        localStorage.setItem(type, complexDataJSON);
        return ;
    }
    //テキストボックスのフォーカスが外れたら発火
    $(document).on('blur', 'input[type="text"]', function() {
        save();
    });
    //フォーム追加処理
    function addForm(title,url){
        idIncrement++;
        var id = "did_"+idIncrement;
        var addTag = "";

        addTag += '<div id="'+id+'" class="inputItem" >';
        addTag += '<input type="text" value="'+title+'" class="title" name="title[]" placeholder="タイトル">';
        addTag += '<input data-iid="'+id+'" type="text" value="'+url+'" class="url" name="url[]" placeholder="URLを入力してください">';
        addTag += '<div class="deleteButton" data-did="'+id+'"></div>';
        addTag += '</div>';
        $('#form_area').append(addTag);
    }


    //getパラメータ取得
    function getParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
});