export const  getFetch = (url,params) => {   
        var str = '';  
        if(typeof params === 'object' && params){  
            str += '?';  
            Object.keys(params).forEach(function(val){  
                // str += val + '=' + encodeURIComponent(that.params[val]) + '&';
                str += val + '=' + params[val] + '&';   
            });  
        }  
        return fetch(url + str, {  
            method : 'GET'  
        }).then( (res) => {  
              return res.json();
        });  
    };


export const postFetch =(url, params) =>{  
        
        var formData = new FormData();  
        for(let k in params){  
            formData.append(k, params[k]);  
        }  
        return fetch(url, {  
            method : 'POST',  
            mode : 'cors',  
            body : formData  
        }).then((res)=>{  
            return res.json();  
        }); 
    };

// class Fetch {  
      
//     constructor(url, params, successFunc, errorFunc){  
//         super();  
//         this.url = super()._URL + url;  
//         this.params = params;  
//         this.successFunc = successFunc;  
//         this.errorFunc = errorFunc;  
//     }  
  
//     //发送GET请求  
      
//     //发送POST请求  
      
// }  
  
// export default Fetch;  