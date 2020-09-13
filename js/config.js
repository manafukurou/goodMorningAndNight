$(function(){
    var idIncrement = 1;
    var type = getParam("type");
    var listByType = localStorage.getItem(type);
    var dataExist = false ;

    //タイトル文言
    var defaultTitle = "URLを入力してください";
    var configTitle = "夜の作業の設定";
    if(type == "morning"){
        configTitle = "朝の作業の設定";
    }
    $("#configTitle").text(configTitle) ;

    //背景画像
    $("body").addClass("config");

    //フォーム生成
    if(listByType){
        var objects  = JSON.parse(listByType);
        for (const obj of objects.urls) {
            addForm(obj);
            dataExist = true ;
        }    
    }
    //フォーム0件の場合１件デフォルト表示
    if(!dataExist){
        addForm("");
    }

    //削除ボタン
    $(document).on("click", ".deleteButton", function () {
        var deleteId = $(this).data("did");
        $("#"+deleteId).remove();
        save();
    });
    //追加ボタン    
    $('#addButton').on('click', function() {
        addForm("");
    });
    //保存処理
    function save(){
        var urlsData = Array();
        $('.url').each(function(){
            urlsData.push($(this).val()) ;
        });

        var jsonArray = {
            urls: urlsData
        }
        let complexDataJSON = JSON.stringify(jsonArray);
        localStorage.setItem(type, complexDataJSON);
    }
    //テキストボックスのフォーカスが外れたら発火
    $(document).on('blur', 'input[type="text"]', function() {
        var inputId = $(this).data("iid");
        var inputUrl = $(this).val();
        var inputTitle = getUrlTitle(inputUrl);
        if(inputTitle){
            $("#"+inputId).find(".title").text(inputTitle);
            save();
        }else{
            $.ajax({
                url:inputUrl,
                type: 'GET',
                cache: false,
                dataType: 'html'
              }).done(function(html) {
                var t = html.match(/<title>(.*)<\/title>/);
                var title = t[1];
                $("#"+inputId).find(".title").text(title);
                setUrlTitle(inputUrl,title);
                save();
    
              }).fail(function() {
                alert('エラーが起きました');
                $("#"+inputId).find("input").val("");
              }).always(function() {
                console.log('complete');
              });
        }
    });
    //フォーム追加処理
    function addForm(url){
        idIncrement++;
        var id = "did_"+idIncrement;
        var title = "";
        var addTag = "";

        if(url == ""){
            title = defaultTitle ;
        }else{
            title = getUrlTitle(url);
        }
        addTag += '<div id="'+id+'" class="inputItem">';
        addTag += '<div class="title">'+title+'</div>';
        addTag += '<input data-iid="'+id+'" type="text" value="'+url+'" class="url" name="url[]">';
        addTag += '<div class="deleteButton" data-did="'+id+'"></div>';
        addTag += '</div>';
        $('#form_area').append(addTag);
    }
    //タイトル取得　(ストレージにキャッシュしてあるテキストを取得する)
    function getUrlTitle(url){
        key = encodeKey(url);
        title = localStorage.getItem(key);
        if(title){
            return title;
        }
        return "";

    }
    //タイトル保存　(ストレージにキャッシュしておく)
    function setUrlTitle(url,title){
        key = encodeKey(url);
        localStorage.setItem(key, title);

    }
    //キャッシュ用のキー生成
    function encodeKey(key){
        return "url:"+window.btoa(unescape(encodeURIComponent(key)));
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