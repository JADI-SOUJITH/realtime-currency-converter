const base_URL="https://latest.currency-api.pages.dev/v1/currencies";
const drop=document.querySelectorAll(".dropdown select");
const msg=document.querySelector(".msg");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

for(let select of drop){
    for(let code in countryList){
        let currencyCode=document.createElement("option");
        currencyCode.innerText=code;
        currencyCode.value=code;
        if(select.name=="from"&&code=="USD"){
            currencyCode.selected=true;
        }else if(select.name=="to"&&code =="INR"){
            currencyCode.selected=true;
        }
        select.append(currencyCode);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

const updateflag=(element)=>{
    let currencyCode=element.value;
    let countryCode=countryList[currencyCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

const button=document.querySelector("form button");
const fetchAndUpdate = async () => {
    let amount=document.querySelector(".amount input");
    let amountValue=amount.value;
    if(amountValue===""||amountValue<1){
        amountValue=1;
        amount.value="1";
    }

    const URL = `${base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let final=(amountValue*rate).toFixed(2);
    msg.innerText=`${amountValue} ${fromCurr.value} = ${final} ${toCurr.value}`;
};

// Run once on page load
fetchAndUpdate();

// Run when button is clicked
button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    fetchAndUpdate();
});
