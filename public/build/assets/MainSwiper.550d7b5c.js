import{S as g,b as h,c as x,N as v,P as w,a as b,A as E}from"./swiper-slide.5957fc6c.js";import{r as y,A as T,e as S,a as d,F as $,l as N,j as u}from"./app.8f41755a.js";/* empty css                   */import"./lib.3666cbba.js";function P(t){const{effect:s,swiper:e,on:n,setTranslate:l,setTransition:a,overwriteParams:o,perspective:c,recreateShadows:r,getEffectParams:m}=t;n("beforeInit",()=>{if(e.params.effect!==s)return;e.classNames.push(`${e.params.containerModifierClass}${s}`),c&&c()&&e.classNames.push(`${e.params.containerModifierClass}3d`);const f=o?o():{};Object.assign(e.params,f),Object.assign(e.originalParams,f)}),n("setTranslate",()=>{e.params.effect===s&&l()}),n("setTransition",(f,p)=>{e.params.effect===s&&a(p)}),n("transitionEnd",()=>{if(e.params.effect===s&&r){if(!m||!m().slideShadows)return;e.slides.each(f=>{e.$(f).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove()}),r()}});let i;n("virtualUpdate",()=>{e.params.effect===s&&(e.slides.length||(i=!0),requestAnimationFrame(()=>{i&&e.slides&&e.slides.length&&(l(),i=!1)}))})}function j(t,s){return t.transformEl?s.find(t.transformEl).css({"backface-visibility":"hidden","-webkit-backface-visibility":"hidden"}):s}function M({swiper:t,duration:s,transformEl:e,allSlides:n}){const{slides:l,activeIndex:a,$wrapperEl:o}=t;if(t.params.virtualTranslate&&s!==0){let c=!1,r;n?r=e?l.find(e):l:r=e?l.eq(a).find(e):l.eq(a),r.transitionEnd(()=>{if(c||!t||t.destroyed)return;c=!0,t.animating=!1;const m=["webkitTransitionEnd","transitionend"];for(let i=0;i<m.length;i+=1)o.trigger(m[i])})}}function F({swiper:t,extendParams:s,on:e}){s({fadeEffect:{crossFade:!1,transformEl:null}}),P({effect:"fade",swiper:t,on:e,setTranslate:()=>{const{slides:a}=t,o=t.params.fadeEffect;for(let c=0;c<a.length;c+=1){const r=t.slides.eq(c);let i=-r[0].swiperSlideOffset;t.params.virtualTranslate||(i-=t.translate);let f=0;t.isHorizontal()||(f=i,i=0);const p=t.params.fadeEffect.crossFade?Math.max(1-Math.abs(r[0].progress),0):1+Math.min(Math.max(r[0].progress,-1),0);j(o,r).css({opacity:p}).transform(`translate3d(${i}px, ${f}px, 0px)`)}},setTransition:a=>{const{transformEl:o}=t.params.fadeEffect;(o?t.slides.find(o):t.slides).transition(a),M({swiper:t,duration:a,transformEl:o,allSlides:!0})},overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})}x.use([v,w,b,E,F]);function V({elements:t}){const{getLarge:s,getLocalized:e,classNames:n}=y.exports.useContext(T),{locale:l}=S(a=>a);return d($,{children:!N.exports.isEmpty(t)&&d(g,{navigation:!0,pagination:{clickable:!0},className:"mySwiper sm:aspect-w-1 sm:aspect-h-1",style:{maxHeight:700},spaceBetween:0,slidesPerView:1,onSlideChange:()=>console.log("slide change"),children:t.map(a=>u(h,{className:"relative",children:[(a.name_ar||a.name_en)&&u("div",{className:n(l.isRTL?"left-36":"right-36","transition-shadow ease-in-out absolute bottom-10 invisible lg:visible flex flex-col w-auto m-10 p-4 px-12 shadow-sm bg-white opacity-100 gap-y-1 flex-1  justify-center items-center"),children:[d("div",{className:"text-lg text-gray-800 truncate",children:a[e()]}),d("div",{className:"text-sm text-gray-800 truncate",children:a[e("caption")]}),d("div",{className:"text-sm text-gray-800 truncate",children:a[e("description")]}),d("div",{className:"flex flex-1 w-full justify-end hidden",children:a.url&&d("a",{className:"p-2 px-6 rounded-sm shadow-md bg-gray-600 text-white",href:a.url,children:a[e()]})})]}),d("img",{style:{maxHeight:750,width:"100%"},className:"w-full object-cover ",src:s(a.image)})]},a.name_en))})})}export{V as default};
