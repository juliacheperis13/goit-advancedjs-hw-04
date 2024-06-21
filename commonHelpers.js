import{i as f,a as v}from"./assets/vendor-ae6d56ab.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const m={hidden:"hidden"},l=(r,e)=>{e?r.classList.add(m.hidden):r.classList.remove(m.hidden)},n=(r,e)=>{e?f.error({title:"Error",message:r,position:"topRight"}):f.success({title:"Success",message:r,position:"topRight"})};document.querySelector(".search-button");const u=document.querySelector(".load-more-button"),h=document.querySelector(".search-form"),d=document.querySelector(".gallery"),P="44510469-6a54537c1d88a141b8cb4f82a",L="https://pixabay.com/api/",i={currentPage:0,itemsPerPage:40};h.addEventListener("submit",b);u.addEventListener("click",w);function g(){return h.elements.searchQuery.value.trim()}async function b(r){r.preventDefault(),i.currentPage=1;const e=g();if(d.innerHTML="",l(u,!0),!e){n("Please fill in search query!",!0);return}try{const o=await p(e);if(o.hits.length)n("Images found!",!1),l(u,!1),d.insertAdjacentHTML("beforeend",y(o.hits));else{n("No images found!",!0),l(u,!0);return}}catch{n("Something went wrong!",!0)}}async function p(r){const e=new URLSearchParams({page:i.currentPage,per_page:i.itemsPerPage,image_type:"photo",orientation:"horizontal",safesearch:"true",key:P,q:r});try{return(await v.get(`${L}?${e}`)).data}catch{n("Something went wrong!",!0)}}async function w(){i.currentPage=i.currentPage+1;const r=g(),e=await p(r);i.currentPage*i.itemsPerPage>=Math.min(e.total,e.totalHits)&&S(),d.insertAdjacentHTML("beforeend",y(e.hits))}function S(){l(u,!0),d.children.length>0&&n("There are no more results!",!0)}function y(r){return r.map(({previewURL:e,tags:o,likes:a,views:t,comments:s,downloads:c})=>`
   <div class="photo-card">
  <img
    class="gallery-img"
    src="${e}"
    alt="${o}"
    width="240"
    height="140"
  />
  <div class="info">
    <div class="info-item">
      <h3>Likes</h3>
      <p>${a}</p>
    </div>
    <div class="info-item">
      <h3>Views</h3>
      <p>${t}</p>
    </div>
    <div class="info-item">
      <h3>Comments</h3>
      <p>${s}</p>
    </div>
    <div class="info-item">
      <h3>Downloads</h3>
      <p>${c}</p>
    </div>
  </div>
</div>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
