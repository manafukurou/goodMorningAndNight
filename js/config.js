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
    
    // key = "aaa";
    // val = '{"morning": ["aaa","bbb","ccc"],"night": []}';

    // //保存
    // localStorage.setItem(key, val);
    // //読み込み
    // hoge = localStorage.getItem(key);
    
    // const obj = JSON.parse(hoge);
    // alert(hoge);
    // for (const elem of obj.morning) {
    //     alert(elem);
    //   }
   

    $('#addButton').on('click', function() {
        $('#form_area').append('<input type="text">');
      });
    // var input_data = document.createElement('input');
    // input_data.type = 'text';
    // input_data.id = 'inputform_' + i;
    // input_data.placeholder = 'フォーム-' + i;
    // var parent = document.getElementById('form_area');
    // parent.appendChild(input_data);
    // i++ ;
});