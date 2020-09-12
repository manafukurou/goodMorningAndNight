$(function(){

    //
    var idIncrement = 1;
    var type = getParam("type");
    var listByType = localStorage.getItem(type);

    //$("body").addClass(type);

    if(listByType){
        var objects  = JSON.parse(listByType);
        for (const obj of objects.urls) {
            addForm(obj);
        }    
    }
    $(document).on("click", ".deleteButton", function () {
        var deleteId = $(this).data("did");
        $("#"+deleteId).remove();
        save();
    });
    $('#addButton').on('click', function() {
        addForm("");
    });
    $('#save').on('click', function() {

        var urlsData = Array();
        $('.url').each(function(){
            urlsData.push($(this).val()) ;
        });

        var jsonArray = {
            urls: urlsData
        }
        let complexDataJSON = JSON.stringify(jsonArray);
        localStorage.setItem(type, complexDataJSON);
    });

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
    //テキストボックスのフォーカスが外れたら発動
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

    function addForm(url){
        idIncrement++;
        var id = "did_"+idIncrement;
        var title = getUrlTitle(url);
        $('#form_area').append('<div id="'+id+'"><div class="title">'+title+'</div><input data-iid="'+id+'" type="text" value="'+url+'" class="url" name="url[]"><div class="deleteButton" data-did="'+id+'">Delete</div></div>');
    }
    
    function getUrlTitle(url){
        key = encodeKey(url);
       
        title = localStorage.getItem(key);
        if(title){
            return title;
        }
        return "";

    }
    function setUrlTitle(url,title){
        key = encodeKey(url);
        localStorage.setItem(key, title);

    }
    function encodeKey(key){
        return "url:"+window.btoa(unescape(encodeURIComponent(key)));
    }


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