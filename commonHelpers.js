import{i as f,a as P}from"./assets/vendor-ae6d56ab.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const h={hidden:"hidden"},u=(r,e)=>{e?r.classList.add(h.hidden):r.classList.remove(h.hidden)},n=(r,e)=>{e?f.error({title:"Error",message:r,position:"topRight"}):f.success({title:"Success",message:r,position:"topRight"})},a=document.querySelector(".load-more-button"),m=document.querySelector(".search-form"),d=document.querySelector(".gallery"),v="44510469-6a54537c1d88a141b8cb4f82a",L="https://pixabay.com/api/",i={currentPage:0,itemsPerPage:40};m.addEventListener("submit",b);a.addEventListener("click",w);function g(){return m.elements.searchQuery.value.trim()}async function b(r){r.preventDefault(),i.currentPage=1;const e=g();if(d.innerHTML="",u(a,!0),!e){n("Please fill in search query!",!0);return}try{const s=await p(e);if(s.hits.length)n(`Hooray! We found ${s.totalHits} images.`,!1),i.currentPage*i.itemsPerPage>=Math.min(s.total,s.totalHits)?u(a,!0):u(a,!1),d.insertAdjacentHTML("beforeend",y(s.hits));else{n("Sorry, there are no images matching your search query. Please try again.",!0),u(a,!0);return}}catch{n("Something went wrong!",!0)}}async function p(r){const e=new URLSearchParams({page:i.currentPage,per_page:i.itemsPerPage,image_type:"photo",orientation:"horizontal",safesearch:"true",key:v,q:r}),{data:s}=await P.get(`${L}?${e}`);return s}async function w(){try{i.currentPage=i.currentPage+1;const r=g(),e=await p(r);i.currentPage*i.itemsPerPage>=Math.min(e.total,e.totalHits)&&S(),d.insertAdjacentHTML("beforeend",y(e.hits))}catch{n("Something went wrong!",!0)}}function S(){u(a,!0),d.children.length>0&&n("We're sorry, but you've reached the end of search results.",!0)}function y(r){return r.map(({previewURL:e,tags:s,likes:l,views:t,comments:o,downloads:c})=>`
   <div class="photo-card">
  <img
    class="gallery-img"
    src="${e}"
    alt="${s}"
    width="240"
    height="140"
  />
  <div class="info">
    <div class="info-item">
      <h3>Likes</h3>
      <p>${l}</p>
    </div>
    <div class="info-item">
      <h3>Views</h3>
      <p>${t}</p>
    </div>
    <div class="info-item">
      <h3>Comments</h3>
      <p>${o}</p>
    </div>
    <div class="info-item">
      <h3>Downloads</h3>
      <p>${c}</p>
    </div>
  </div>
</div>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
