const BASE_URL = "https://api.frankfurter.app/latest?from=USD&to=EUR";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn")
const from = document.querySelector(".from select")
const to = document.querySelector(".to select ")
const msg = document.querySelector(".msg")


for(let select of dropdowns) 
{
    for(currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });

};


const UpdateExchangerate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    console.log(amountValue);
    if(amountValue === "" || amountValue < 1){
        amountValue = 1;
        amount.value = "1";
    }
    if (from.value === to.value) {
    msg.innerText = "Please select two different currencies.";
    return;
}

    // console.log(from.value,to.value)
      const URL = `https://api.frankfurter.app/latest?amount=${amountValue}&from=${from.value}&to=${to.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[to.value]
    console.log(rate)

    let finalAmount = data.rates[to.value];
    msg.innerText = `${amountValue} ${from.value} = ${finalAmount} ${to.value}`
};

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc; 
}

btn.addEventListener("click",(evt) => {
    evt.preventDefault(); 
    UpdateExchangerate(); 
});

window.addEventListener("load",()=>{ 
    UpdateExchangerate();
})