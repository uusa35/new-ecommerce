import{r as a,G as g,A as k,j as p,a as t,F as d,l as m}from"./app.8f41755a.js";import v from"./FrontendContainer.f87df6a5.js";import r from"./ElementSlider.6e66dad9.js";import{i as u,a as b}from"./lib.3666cbba.js";import y from"./MainGallery.18f18fd7.js";import E from"./FrontendContentContainer.e2e5b70a.js";import"./index.74c4741c.js";import"./MainNav.20d61781.js";import"./index.esm.968e8465.js";import"./index.esm.c2914463.js";import"./helpers.b999fcd4.js";import"./SearchField.46d947e0.js";import"./pluralize.a87e66d1.js";import"./MainNavBookCategoriesList.378062f1.js";import"./popover.4efe15a7.js";import"./open-closed.0d489d91.js";import"./use-owner.dcb13aec.js";import"./use-resolve-button-type.fe2d668c.js";import"./use-event-listener.cd17cf37.js";import"./motion.5c4d7eb2.js";import"./CartIndexOrderSummary.222fd040.js";import"./NoElements.fe12762f.js";import"./tabs.59b69d47.js";import"./transition.a7dac45d.js";import"./dialog.d76c2d8b.js";import"./menu.b1c0e94d.js";import"./MetaElement.15b324ae.js";/* empty css                   */import"./SystemMessage.0606d8b1.js";import"./NormalCourseWidget.e14b1976.js";import"./ElementPrice.24f8d79a.js";import"./ElementTags.b41162b2.js";import"./NormalBookWidget.6de3e1ef.js";import"./CategoryWidget.53bf316a.js";import"./NormalProductWidget.cf6f8f88.js";import"./NormalUserWidget.ae15c5d7.js";import"./swiper-slide.5957fc6c.js";import"./VerticalProductWidget.5fabd828.js";import"./image-gallery.4848a544.js";import"./FrontendBreadCrumbs.bfadd15b.js";function fe({slides:l,homeCategories:z,newOnHomeBooks:c,newOnHomeCourses:_,newOnHomeProducts:f,settings:i,onHomeParticipantAuthors:x,categoriesWithProducts:C}){const[s,w]=a.exports.useState(u?1:b?2:4),{categories:n}=a.exports.useContext(g),{trans:o,getLocalized:h,classNames:V,contentBgColor:P}=a.exports.useContext(k);return a.exports.useEffect(()=>{function e(){window.innerWidth<1200?w(2):w(4)}return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)},[]),p(v,{showBreadCrumbs:!1,children:[l&&i.wide_screen?t(y,{elements:l}):null,p(E,{showBreadCrumbs:!1,children:[l&&!i.wide_screen?t(y,{elements:l}):null,p("div",{className:V(i.wide_screen?"xl:w-5/5 2xl:w-5/5":"w-full",`${P} shadow-lg space-y-10 py-14 m-auto px-4 sm:py-14 sm:px-6 lg:px-8`),children:[i.enable_books&&p(d,{children:[t(r,{elements:m.exports.filter(n,e=>e.is_book&&e.on_home),slidesPerView:s,title:o("book_home_featured_categories"),type:"category",moduleType:"book",params:{is_book:!0}}),c&&t(r,{elements:c,slidesPerView:s,title:o("new_chosen_books"),type:"book"}),x&&t(r,{elements:x,slidesPerView:b||u?1:8,title:o("participant_authors"),type:"user"})]}),i.enable_courses&&p(d,{children:[t(r,{elements:m.exports.filter(n,e=>e.is_course&&e.on_home),slidesPerView:s,title:o("course_home_featured_categories"),type:"category",moduleType:"course",params:{is_course:!0}}),_&&t(r,{elements:_,slidesPerView:s,title:o("featured_courses"),type:"course"})]}),i.enable_products&&p(d,{children:[t(r,{elements:m.exports.filter(n,e=>e.is_product&&e.on_home),slidesPerView:s,title:o("product_home_featured_categories"),type:"category",moduleType:"product",params:{is_product:!0}}),f&&t(r,{elements:f,slidesPerView:2,title:o("featured_products"),type:"product",virtical:!u}),m.exports.map(m.exports.filter(C,e=>e.products&&!m.exports.isEmpty(e.products)),e=>t(r,{elements:e.products,slidesPerView:s,title:e[h()],description:e[h("description")],type:"product",params:{category_id:e.id}},e.id))]})]})]})]})}export{fe as default};