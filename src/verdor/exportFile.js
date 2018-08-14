/* 
    导出文件
    url 请求地址
    data 数据
    method 请求方法
*/

export default function exportFile({url,data={},method = 'get',token,shopId}){
    
    data = Object.assign({format:'json',r:Math.random(),token,shopId},data);
    console.log(data);
    if( url ){ 
        
        let inputs = '';


        for(let str in data){
            inputs += `<input type='hidden' name='${str}' value = '${data[str]}'/>`
        }
        
        if(!document.exportFile){
        	let iframe = document.createElement("iframe");
	        iframe.style.display = 'none';
	        iframe.name = 'exportFile';
	        document.body.appendChild(iframe);
        }
        
        
        let dom = document.createElement('div');
        dom.innerHTML = `<form enctype="multipart/form-data" name="exportFile" action = '${url}' method = '${method}'>${inputs}</form>`;
        let form = dom.firstChild;
        document.body.appendChild(form);
        form.submit();
        form.remove();
      	
      	
    };

}