const userUrl = "https://mock-api.driven.com.br/api/v4/uol/participants";
const messageUrl = "https://mock-api.driven.com.br/api/v4/uol/messages";
const statusUrl = "https://mock-api.driven.com.br/api/v4/uol/status";
const user = prompt("Qual seu nome?");
let data= [];
let to = "Todos";
let type= "message";
setInterval(online, 5000);
setInterval(getData, 2000);

function getData(){
    
    const promise = axios.get(messageUrl);
    promise.then(loadChat);
    promise.catch(error);
}

function postData(url, object){
    const promise= axios.post(url, object);
    promise.catch(error);
}

function sendText(){
    let text = document.querySelector("#message").value;
    let object= {};
    object.from = user;
    object.to= to;
	object.text= text;
	object.type= type;    
    document.querySelector("#message").value = ""
    postData(messageUrl, object);
    getData();
}

function loadChat(load){
    //    por na tela as mensagens
    
    data = load.data;
    let chat = document.querySelector(".chat");
    
    chat.innerHTML= "";
    for(let i = 0; i<data.length; i++){
        if(data[i].type === "status"){
            chat.innerHTML += `<div class="chat-action"><p><span class="time">(${data[i].time})</span> <span class="font-bold">${data[i].from}</span>  ${data[i].text} </p></div>`
        }else if(data[i].type === "private_message" && data[i].to === user){
            chat.innerHTML += `<div class="message-close">
                    <p><span class="time">(${data[i].time})</span> <span class="font-bold">${data[i].from}</span>  reservadamente para <span class="font-bold">${data[i].to}</span>: ${data[i].text}</p>
            </div>`
        }else if(data[i].type === "message"){
                chat.innerHTML += `<div class=message-open><p><span class="time">(${data[i].time})</span> <span class="font-bold">${data[i].from}</span>  para <span class="font-bold">${data[i].to}</span>: ${data[i].text}</p></div>`;
           }
    }
    
    
    
}
function error(load){
    alert(load.response.status);
   
}
function online(){
    const object={
        name: user
    };
    postData(statusUrl, object);
}
function login(){
    const object={
        name: user
    };
    postData(userUrl, object);
    
    getData();
}
login();
//getData();