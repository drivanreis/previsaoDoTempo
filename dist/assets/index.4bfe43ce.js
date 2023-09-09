(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?a.credentials="include":e.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();const w="c4838c19d4ac48f0b1a202458232505",x=async i=>{try{i.length===0&&window.alert("Digite o nome da cidade");const s=await(await fetch(`http://api.weatherapi.com/v1/search.json?lang=pt&key=${w}&q=${i}&aqi=no`)).json();return s.length===0&&window.alert("Nenhuma cidade encontrada"),s}catch(t){window.alert(t.message)}},k=async i=>{const s=await(await fetch(`http://api.weatherapi.com/v1/current.json?lang=pt&key=${w}&q=${i}`)).json(),{current:{temp_c:c,condition:{text:e,icon:a}}}=s;return{temp:c,condition:e,icon:a}},L="c4838c19d4ac48f0b1a202458232505";function o(i,t,s=""){const c=document.createElement(i);return c.classList.add(...t.split(" ")),c.textContent=s,c}function I(i){const{date:t,maxTemp:s,minTemp:c,condition:e,icon:a}=i,d=new Date(t);d.setDate(d.getDate()+1);const y=d.toLocaleDateString("pt-BR",{weekday:"short"}),n=o("div","forecast"),r=o("p","forecast-weekday",y),l=o("div","forecast-temp-container"),E=o("span","forecast-temp max","max");l.appendChild(E);const C=o("span","forecast-temp max",`${s}\xBA`);l.appendChild(C);const p=o("span","forecast-temp min","min");l.appendChild(p);const g=o("span","forecast-temp min",`${c}\xBA`);l.appendChild(g);const f=o("p","forecast-condition",e),m=o("img","forecast-icon");m.src=a.replace("64x64","128x128");const u=o("div","forecast-middle-container");return u.appendChild(l),u.appendChild(m),n.appendChild(r),n.appendChild(u),n.appendChild(f),n}function v(i){const t=document.getElementById(i);for(;t.firstChild;)t.removeChild(t.firstChild)}function $(i){const t=document.getElementById("forecast-container"),s=document.getElementById("weekdays");v("weekdays"),i.forEach(c=>{const e=I(c);s.appendChild(e)}),t.classList.remove("hidden")}function b(i){const{name:t,country:s,temp:c,condition:e,icon:a,url:d}=i,y=document.getElementById("cities"),n=o("li","city");y.appendChild(n);const r=o("div","city-heading"),l=o("h2","city-name",t);r.appendChild(l);const E=o("p","city-country",s);r.appendChild(E);const C=o("p","city-temp",`${c}\xBA`),p=o("div","city-temp-container");p.appendChild(C);const g=o("p","city-condition",e);p.appendChild(g);const f=o("img","condition-icon");f.src=a.replace("64x64","128x128");const m=o("div","city-info-container");m.appendChild(p),m.appendChild(f);const u=o("button","classe-teste","Ver previs\xE3o");return n.appendChild(u),u.addEventListener("click",async()=>{const B=(await(await fetch(`http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${L}&q=${d}&days=7`)).json()).forecast.forecastday.map(h=>({date:h.date,maxTemp:h.day.maxtemp_c,minTemp:h.day.mintemp_c,condition:h.day.condition.text,icon:h.day.condition.icon}));$(B)}),n.appendChild(r),n.appendChild(m),n.appendChild(f),n.appendChild(p),n}async function T(i){i.preventDefault(),v("cities");const s=document.getElementById("search-input").value,c=await x(s),a=c.map(n=>n.url).reduce((n,r)=>[...n,k(r)],[]),d=await Promise.all(a);return d.map((n,r)=>({name:c[r].name,country:c[r].country,temp:n.temp,condition:n.condition,icon:n.icon,url:c[r].url})).forEach(b),d}document.getElementById("search-form").addEventListener("submit",T);document.getElementById("close-forecast").addEventListener("click",()=>{document.getElementById("forecast-container").classList.add("hidden")});
