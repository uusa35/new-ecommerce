import{r as g,A as h,e as b,a as e,j as t,l as u,L as x,h as p}from"./app.8f41755a.js";const v=({element:a={}})=>{const{getLarge:s,trans:i,getLocalized:l,classNames:d,mainColor:r,textColor:o,btnClass:c}=g.exports.useContext(h),{locale:n}=b(m=>m);return e("div",{className:"bg-transparent",children:e("div",{className:"max-w-2xl mx-auto lg:max-w-7xl",children:t("div",{className:"relative rounded-lg overflow-hidden lg:h-96",children:[e("div",{className:"absolute inset-0",children:e("img",{src:s(a.image),alt:a[l()],className:"w-full h-full object-center object-cover",width:1440,height:1080,loading:"lazy"})}),e("div",{"aria-hidden":"true",className:"relative w-full h-96 lg:hidden"}),e("div",{"aria-hidden":"true",className:"relative w-full h-32 lg:hidden"}),t("div",{className:d(n.isRTL?"left-0":"right-0","break-all absolute inset-y-0 bottom-0 bg-black bg-opacity-5 p-6 rounded-bl-lg rounded-br-lg backdrop-filter backdrop-blur-sm sm:flex sm:items-center sm:justify-between  lg:w-96 lg:rounded-tl-lg lg:rounded-br-none lg:flex-col lg:items-start"),children:[t("div",{children:[e("h2",{className:`text-xl font-bold ${o} truncate capitalize`,children:a[l()]}),a[l("description")]&&u.exports.size(a[l("description")])>5&&e("p",{className:`mt-2 text-sm text-${r}-400 dark:text-${r}-800 font-bold capitalize break-normal leading-relaxed`,children:a[l("description")]})]}),e(x,{href:p("frontend.product.index",{category_id:a.id}),className:`mt-6 flex-shrink-0 flex ${c} py-3 px-4 border border-white border-opacity-25 rounded-md items-center justify-center text-base font-medium hover:bg-opacity-10 sm:mt-0 sm:ml-8 lg:ml-0 lg:w-full capitalize`,children:i("view")})]})]})})})};export{v as default};
