const userUrl = "https://mock-api.driven.com.br/api/v4/uol/participants";
const messageUrl = "https://mock-api.driven.com.br/api/v4/uol/messages";
const statusUrl = "https://mock-api.driven.com.br/api/v4/uol/status";
const user = prompt("Qual seu nome?");
let data= [];
let to = "Todos";
let type= "message";
let lastMessage = [];
setInterval(online, 5000);
setInterval(getMessage, 400);

function getMessage(){
    
    const promise = axios.get(messageUrl);
    if(data.length === 0){
         promise.then(loadChat); 
     }else{
        promise.then(newData);
        let lastChild = data.length; 
        if(data[lastChild-1].text === lastMessage.text && data[lastChild-1].from === lastMessage.from && data[lastChild-1].time === lastMessage.time){
             return false;}
        else{printChat(data[lastChild-1]);}
        

        }

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
    getMessage();
}

function loadChat(load){
    //    por na tela as mensagens
    
    data = load.data;
    let chat = document.querySelector(".chat");
    chat.innerHTML= "";
    for(let i = 0; i<data.length; i++){
        printChat(data[i]);
        
    }
    
    
    
}
function printChat(load){
    
    let chat = document.querySelector(".chat");
    // var element = document.querySelector(".message");
    // if(element!= null){element.classList.remove("last");}
    if(load.type === "status"){
        chat.innerHTML += `<div class="chat-action message last"><p><span class="time">(${load.time})</span> <span class="font-bold">${load.from}</span>  ${load.text} </p></div>`
        
    }else if(load.type === "private_message" && load.to === user){
        chat.innerHTML += `<div class="message-close message last">
                <p><span class="time">(${load.time})</span> <span class="font-bold">${load.from}</span>  reservadamente para <span class="font-bold">${load.to}</span>: ${load.text}</p>
        </div>`
        
    }else if(load.type === "message"){
            chat.innerHTML += `<div class="message-open message last"><p><span class="time">(${load.time})</span> <span class="font-bold">${load.from}</span>  para <span class="font-bold">${load.to}</span>: ${load.text}</p></div>`;
            
    }
    lastMessage = load;   
    document.querySelector(".last").scrollIntoView();
    document.querySelector(".last").classList.remove("last");
}  

function newData(load){
    data = load.data;
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
    
    getMessage();
}

function sideBar(){
    document.querySelector(".sidebar").classList.toggle("none");
}
login();

