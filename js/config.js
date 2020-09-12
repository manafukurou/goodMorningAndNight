$(function(){
    
	// // 背景色を変える
	// $("#morning").hover(function() {
    //     $("body").removeClass('night');
    //     $("body").addClass('morning');
        
	// });
    // // 背景色を変える
	// $("#night").hover(function() {
    //     $("body").removeClass('morning');
	// 	$("body").addClass('night');
    // });
    
    // key = "morning";
    // val = '{"urls":["aaa","bbb","ccc"]}';

    // //保存
    // localStorage.setItem(key, val);
    // //読み込み
    // hoge = localStorage.getItem(key);
    
    // const obj = JSON.parse(hoge);
    // alert(hoge);
    // for (const elem of obj.morning) {
    //     alert(elem);
    //   }
   
    //
    var idIncrement = 1;
    var type = getParam("type");
    var listByType = localStorage.getItem(type);
    if(listByType){
        var objects  = JSON.parse(listByType);
        for (const obj of objects.urls) {
            addForm(obj);
        }    
    }
    $(document).on("click", ".deleteButton", function () {
    // $('.deleteButton').on('click', function() {
        var deleteId = $(this).data("did");
        $("#"+deleteId).remove();
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
    //テキストボックスのフォーカスが外れたら発動
    $(document).on('blur', 'input[type="text"]', function() {
        var inputId = $(this).data("iid");
        var inputUrl = $(this).val();
 
        $.ajax({
            url:inputUrl,
            type: 'GET',
            cache: false,
            dataType: 'html'
          }).done(function(html) {
            var t = html.match(/<title>(.*)<\/title>/);
            var title = t[1];
            $("#"+inputId).find(".title").text(title);
          }).fail(function() {
            alert('エラーが起きました');
          }).always(function() {
            console.log('complete');
          });
          
    });
    function addForm(url){
        idIncrement++;
        var id = "did_"+idIncrement;
        var title = getUrlTitle(url);
        $('#form_area').append('<div id="'+id+'"><div class="title">'+title+'</div><input data-iid="'+id+'" type="text" value="'+url+'" class="url" name="url[]"><div class="deleteButton" data-did="'+id+'">Delete</div></div>');
    }
    
    function getUrlTitle(url){
        //key = "url"+window.btoa(url);
        key="aaa";
        title = localStorage.getItem(key);
        if(title){
            return title;
        }
        return "";

    }
    function setUrlTitle(url,title){
        //key = "url"+window.btoa(url);
        key="aaa";

        alert(key + "_" + title)
        localStorage.setItem(key, title);

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