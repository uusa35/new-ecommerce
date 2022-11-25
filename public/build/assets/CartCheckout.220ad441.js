import{r as i,j as a,a as e,F as h}from"./app.8f41755a.js";import{b as l}from"./index.esm.968e8465.js";const g=["CAD","USD","AUD","EUR","GBP"],n={categories:[{name:"Women",featured:[{name:"New Arrivals",href:"#",imageSrc:"https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",imageAlt:"Models sitting back to back, wearing Basic Tee in black and bone."},{name:"Basic Tees",href:"#",imageSrc:"https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",imageAlt:"Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees."},{name:"Accessories",href:"#",imageSrc:"https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg",imageAlt:"Model wearing minimalist watch with black wristband and white watch face."},{name:"Carry",href:"#",imageSrc:"https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg",imageAlt:"Model opening tan leather long wallet with credit card pockets and cash pouch."}]},{name:"Men",featured:[{name:"New Arrivals",href:"#",imageSrc:"https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg",imageAlt:"Hats and sweaters on wood shelves next to various colors of t-shirts on hangers."},{name:"Basic Tees",href:"#",imageSrc:"https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg",imageAlt:"Model wearing light heather gray t-shirt."},{name:"Accessories",href:"#",imageSrc:"https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg",imageAlt:"Grey 6-panel baseball hat with black brimg, black mountain graphic on front, and light heather gray body."},{name:"Carry",href:"#",imageSrc:"https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg",imageAlt:"Model putting folded cash into slim card holder olive leather wallet with hand stitching."}]}],pages:[{name:"Company",href:"#"},{name:"Stores",href:"#"}]},f=[{id:1,title:"Basic Tee",href:"#",price:"$32.00",color:"Black",size:"Large",imageSrc:"https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg",imageAlt:"Front of men's Basic Tee in black."}],u=[{id:1,title:"Standard",turnaround:"4\u201310 business days",price:"$5.00"},{id:2,title:"Express",turnaround:"2\u20135 business days",price:"$16.00"}],y=[{id:"credit-card",title:"Credit card"},{id:"paypal",title:"PayPal"},{id:"etransfer",title:"eTransfer"}],c={products:[{name:"Bags",href:"#"},{name:"Tees",href:"#"},{name:"Objects",href:"#"},{name:"Home Goods",href:"#"},{name:"Accessories",href:"#"}],company:[{name:"Who we are",href:"#"},{name:"Sustainability",href:"#"},{name:"Press",href:"#"},{name:"Careers",href:"#"},{name:"Terms & Conditions",href:"#"},{name:"Privacy",href:"#"}],customerService:[{name:"Contact",href:"#"},{name:"Shipping",href:"#"},{name:"Returns",href:"#"},{name:"Warranty",href:"#"},{name:"Secure Payments",href:"#"},{name:"FAQ",href:"#"},{name:"Find a store",href:"#"}]};function d(...o){return o.filter(Boolean).join(" ")}function v(){const[o,m]=i.exports.useState(!1),[p,x]=i.exports.useState(u[0]);return a("div",{className:"bg-gray-50",children:[e(Transition.Root,{show:o,as:i.exports.Fragment,children:a(Dialog,{as:"div",className:"fixed inset-0 flex z-40 lg:hidden",onClose:m,children:[e(Transition.Child,{as:i.exports.Fragment,enter:"transition-opacity ease-linear duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition-opacity ease-linear duration-300",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:e(Dialog.Overlay,{className:"fixed inset-0 bg-black bg-opacity-25"})}),e(Transition.Child,{as:i.exports.Fragment,enter:"transition ease-in-out duration-300 transform",enterFrom:"-translate-x-full",enterTo:"translate-x-0",leave:"transition ease-in-out duration-300 transform",leaveFrom:"translate-x-0",leaveTo:"-translate-x-full",children:a("div",{className:"relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto",children:[e("div",{className:"px-4 pt-5 pb-2 flex",children:a("button",{type:"button",className:"-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400",onClick:()=>m(!1),children:[e("span",{className:"sr-only",children:"Close menu"}),e(l,{className:"h-6 w-6","aria-hidden":"true"})]})}),a(Tab.Group,{as:"div",className:"mt-2",children:[e("div",{className:"border-b border-gray-200",children:e(Tab.List,{className:"-mb-px flex px-4 space-x-8",children:n.categories.map(r=>e(Tab,{className:({selected:t})=>d(t?"text-indigo-600 border-indigo-600":"text-gray-900 border-transparent","flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"),children:r.name},r.name))})}),e(Tab.Panels,{as:i.exports.Fragment,children:n.categories.map(r=>e(Tab.Panel,{className:"px-4 py-6 space-y-12",children:e("div",{className:"grid grid-cols-2 gap-x-4 gap-y-10",children:r.featured.map(t=>a("div",{className:"group relative",children:[e("div",{className:"aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75",children:e("img",{src:t.imageSrc,alt:t.imageAlt,className:"object-center object-cover"})}),a("a",{href:t.href,className:"mt-6 block text-sm font-medium text-gray-900",children:[e("span",{className:"absolute z-10 inset-0","aria-hidden":"true"}),t.name]}),e("p",{"aria-hidden":"true",className:"mt-1 text-sm text-gray-500",children:"Shop now"})]},t.name))})},r.name))})]}),e("div",{className:"border-t border-gray-200 py-6 px-4 space-y-6",children:n.pages.map(r=>e("div",{className:"flow-root",children:e("a",{href:r.href,className:"-m-2 p-2 block font-medium text-gray-900",children:r.name})},r.name))}),a("div",{className:"border-t border-gray-200 py-6 px-4 space-y-6",children:[e("div",{className:"flow-root",children:e("a",{href:"#",className:"-m-2 p-2 block font-medium text-gray-900",children:"Create an account"})}),e("div",{className:"flow-root",children:e("a",{href:"#",className:"-m-2 p-2 block font-medium text-gray-900",children:"Sign in"})})]}),e("div",{className:"border-t border-gray-200 py-6 px-4 space-y-6",children:e("form",{children:a("div",{className:"inline-block",children:[e("label",{htmlFor:"mobile-currency",className:"sr-only",children:"Currency"}),a("div",{className:"-ml-2 group relative border-transparent rounded-md focus-within:ring-2 focus-within:ring-white",children:[e("select",{id:"mobile-currency",name:"currency",className:"bg-none border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-gray-800 group-hover:text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent",children:g.map(r=>e("option",{children:r},r))}),e("div",{className:"absolute right-0 inset-y-0 flex items-center pointer-events-none",children:e("svg",{"aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20",className:"w-5 h-5 text-gray-500",children:e("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",d:"M6 8l4 4 4-4"})})})]})]})})})]})})]})}),e("header",{className:"relative",children:a("nav",{"aria-label":"Top",children:[e("div",{className:"bg-gray-900",children:a("div",{className:"max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8",children:[e("form",{children:a("div",{children:[e("label",{htmlFor:"desktop-currency",className:"sr-only",children:"Currency"}),a("div",{className:"-ml-2 group relative bg-gray-900 border-transparent rounded-md focus-within:ring-2 focus-within:ring-white",children:[e("select",{id:"desktop-currency",name:"currency",className:"bg-none bg-gray-900 border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-white group-hover:text-gray-100 focus:outline-none focus:ring-0 focus:border-transparent",children:g.map(r=>e("option",{children:r},r))}),e("div",{className:"absolute right-0 inset-y-0 flex items-center pointer-events-none",children:e("svg",{"aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20",className:"w-5 h-5 text-gray-300",children:e("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",d:"M6 8l4 4 4-4"})})})]})]})}),a("div",{className:"flex items-center space-x-6",children:[e("a",{href:"#",className:"text-sm font-medium text-white hover:text-gray-100",children:"Sign in"}),e("a",{href:"#",className:"text-sm font-medium text-white hover:text-gray-100",children:"Create an account"})]})]})}),e("div",{className:"bg-white shadow-sm",children:e("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:a("div",{className:"h-16 flex items-center justify-between",children:[e("div",{className:"hidden lg:flex-1 lg:flex lg:items-center",children:a("a",{href:"#",children:[e("span",{className:"sr-only",children:"Workflow"}),e("img",{className:"h-8 w-auto",src:"https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600",alt:""})]})}),e("div",{className:"hidden h-full lg:flex",children:e(Popover.Group,{className:"px-4 bottom-0 inset-x-0",children:a("div",{className:"h-full flex justify-center space-x-8",children:[n.categories.map(r=>e(Popover,{className:"flex",children:({open:t})=>a(h,{children:[e("div",{className:"relative flex",children:e(Popover.Button,{className:d(t?"border-indigo-600 text-indigo-600":"border-transparent text-gray-800 hover:text-gray-800","relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"),children:r.name})}),e(Transition,{as:i.exports.Fragment,enter:"transition ease-out duration-200",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition ease-in duration-150",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:a(Popover.Panel,{className:"absolute top-full inset-x-0 bg-white text-sm text-gray-500",children:[e("div",{className:"absolute inset-0 top-1/2 bg-white shadow","aria-hidden":"true"}),e("div",{className:"absolute inset-0 top-0 h-px max-w-7xl mx-auto px-8","aria-hidden":"true",children:e("div",{className:d(t?"bg-gray-200":"bg-transparent","w-full h-px transition-colors ease-out duration-200")})}),e("div",{className:"relative",children:e("div",{className:"max-w-7xl mx-auto px-8",children:e("div",{className:"grid grid-cols-4 gap-y-10 gap-x-8 py-16",children:r.featured.map(s=>a("div",{className:"group relative",children:[e("div",{className:"aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75",children:e("img",{src:s.imageSrc,alt:s.imageAlt,className:"object-center object-cover"})}),a("a",{href:s.href,className:"mt-4 block font-medium text-gray-900",children:[e("span",{className:"absolute z-10 inset-0","aria-hidden":"true"}),s.name]}),e("p",{"aria-hidden":"true",className:"mt-1",children:"Shop now"})]},s.name))})})})]})})]})},r.name)),n.pages.map(r=>e("a",{href:r.href,className:"flex items-center text-sm font-medium text-gray-800 hover:text-gray-800",children:r.name},r.name))]})})}),a("div",{className:"flex-1 flex items-center lg:hidden",children:[a("button",{type:"button",className:"-ml-2 bg-white p-2 rounded-md text-gray-400",onClick:()=>m(!0),children:[e("span",{className:"sr-only",children:"Open menu"}),e(l,{className:"h-6 w-6","aria-hidden":"true"})]}),a("a",{href:"#",className:"ml-2 p-2 text-gray-400 hover:text-gray-500",children:[e("span",{className:"sr-only",children:"Search"}),e(l,{className:"w-6 h-6","aria-hidden":"true"})]})]}),a("a",{href:"#",className:"lg:hidden",children:[e("span",{className:"sr-only",children:"Workflow"}),e("img",{src:"https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600",alt:"",className:"h-8 w-auto"})]}),a("div",{className:"flex-1 flex items-center justify-end",children:[e("a",{href:"#",className:"hidden text-sm font-medium text-gray-800 hover:text-gray-800 lg:block",children:"Search"}),a("div",{className:"flex items-center lg:ml-8",children:[a("a",{href:"#",className:"p-2 text-gray-400 hover:text-gray-500 lg:hidden",children:[e("span",{className:"sr-only",children:"Help"}),e(l,{className:"w-6 h-6","aria-hidden":"true"})]}),e("a",{href:"#",className:"hidden text-sm font-medium text-gray-800 hover:text-gray-800 lg:block",children:"Help"}),e("div",{className:"ml-4 flow-root lg:ml-8",children:a("a",{href:"#",className:"group -m-2 p-2 flex items-center",children:[e(l,{className:"flex-shink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500","aria-hidden":"true"}),e("span",{className:"ml-2 text-sm font-medium text-gray-800 group-hover:text-gray-800",children:"0"}),e("span",{className:"sr-only",children:"items in cart, view bag"})]})})]})]})]})})})]})}),e("main",{className:"max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8",children:a("div",{className:"max-w-2xl mx-auto lg:max-w-none",children:[e("h1",{className:"sr-only",children:"Checkout"}),a("form",{className:"lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16",children:[a("div",{children:[a("div",{children:[e("h2",{className:"text-lg font-medium text-gray-900",children:"Contact information"}),a("div",{className:"mt-4",children:[e("label",{htmlFor:"email-address",className:"block text-sm font-medium text-gray-800",children:"Email address"}),e("div",{className:"mt-1",children:e("input",{type:"email",id:"email-address",name:"email-address",autoComplete:"email",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]})]}),a("div",{className:"mt-10 border-t border-gray-200 pt-10",children:[e("h2",{className:"text-lg font-medium text-gray-900",children:"Shipping information"}),a("div",{className:"mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4",children:[a("div",{children:[e("label",{htmlFor:"first-name",className:"block text-sm font-medium text-gray-800",children:"First name"}),e("div",{className:"mt-1",children:e("input",{type:"text",id:"first-name",name:"first-name",autoComplete:"given-name",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]}),a("div",{children:[e("label",{htmlFor:"last-name",className:"block text-sm font-medium text-gray-800",children:"Last name"}),e("div",{className:"mt-1",children:e("input",{type:"text",id:"last-name",name:"last-name",autoComplete:"family-name",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]}),a("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"company",className:"block text-sm font-medium text-gray-800",children:"Company"}),e("div",{className:"mt-1",children:e("input",{type:"text",name:"company",id:"company",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]}),a("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"address",className:"block text-sm font-medium text-gray-800",children:"Address"}),e("div",{className:"mt-1",children:e("input",{type:"text",name:"address",id:"address",autoComplete:"street-address",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]}),a("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"apartment",className:"block text-sm font-medium text-gray-800",children:"Apartment, suite, etc."}),e("div",{className:"mt-1",children:e("input",{type:"text",name:"apartment",id:"apartment",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]}),a("div",{children:[e("label",{htmlFor:"city",className:"block text-sm font-medium text-gray-800",children:"City"}),e("div",{className:"mt-1",children:e("input",{type:"text",name:"city",id:"city",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]}),a("div",{children:[e("label",{htmlFor:"country",className:"block text-sm font-medium text-gray-800",children:"Country"}),e("div",{className:"mt-1",children:a("select",{id:"country",name:"country",autoComplete:"country",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",children:[e("option",{children:"Canada"}),e("option",{children:"Mexico"}),e("option",{children:"United States"})]})})]}),a("div",{children:[e("label",{htmlFor:"province",className:"block text-sm font-medium text-gray-800",children:"Province"}),e("div",{className:"mt-1",children:e("input",{type:"text",name:"province",id:"province",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]}),a("div",{children:[e("label",{htmlFor:"postal-code",className:"block text-sm font-medium text-gray-800",children:"Postal code"}),e("div",{className:"mt-1",children:e("input",{type:"text",name:"postal-code",id:"postal-code",autoComplete:"postal-code",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]}),a("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"phone",className:"block text-sm font-medium text-gray-800",children:"Phone"}),e("div",{className:"mt-1",children:e("input",{type:"text",name:"phone",id:"phone",autoComplete:"tel",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]})]})]}),e("div",{className:"mt-10 border-t border-gray-200 pt-10",children:a(RadioGroup,{value:p,onChange:x,children:[e(RadioGroup.Label,{className:"text-lg font-medium text-gray-900",children:"Delivery method"}),e("div",{className:"mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4",children:u.map(r=>e(RadioGroup.Option,{value:r,className:({checked:t,active:s})=>d(t?"border-transparent":"border-gray-300",s?"ring-2 ring-indigo-500":"","relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"),children:({checked:t,active:s})=>a(h,{children:[e("div",{className:"flex-1 flex",children:a("div",{className:"flex flex-col",children:[e(RadioGroup.Label,{as:"span",className:"block text-sm font-medium text-gray-900",children:r.title}),e(RadioGroup.Description,{as:"span",className:"mt-1 flex items-center text-sm text-gray-500",children:r.turnaround}),e(RadioGroup.Description,{as:"span",className:"mt-6 text-sm font-medium text-gray-900",children:r.price})]})}),t?e(l,{className:"h-5 w-5 text-indigo-600","aria-hidden":"true"}):null,e("div",{className:d(s?"border":"border-2",t?"border-indigo-500":"border-transparent","absolute -inset-px rounded-lg pointer-events-none"),"aria-hidden":"true"})]})},r.id))})]})}),a("div",{className:"mt-10 border-t border-gray-200 pt-10",children:[e("h2",{className:"text-lg font-medium text-gray-900",children:"Payment"}),a("fieldset",{className:"mt-4",children:[e("legend",{className:"sr-only",children:"Payment type"}),e("div",{className:"space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10",children:y.map((r,t)=>a("div",{className:"flex items-center",children:[t===0?e("input",{id:r.id,name:"payment-type",type:"radio",defaultChecked:!0,className:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"}):e("input",{id:r.id,name:"payment-type",type:"radio",className:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"}),e("label",{htmlFor:r.id,className:"ml-3 block text-sm font-medium text-gray-800",children:r.title})]},r.id))})]}),a("div",{className:"mt-6 grid grid-cols-4 gap-y-6 gap-x-4",children:[a("div",{className:"col-span-4",children:[e("label",{htmlFor:"card-number",className:"block text-sm font-medium text-gray-800",children:"Card number"}),e("div",{className:"mt-1",children:e("input",{type:"text",id:"card-number",name:"card-number",autoComplete:"cc-number",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]}),a("div",{className:"col-span-4",children:[e("label",{htmlFor:"name-on-card",className:"block text-sm font-medium text-gray-800",children:"Name on card"}),e("div",{className:"mt-1",children:e("input",{type:"text",id:"name-on-card",name:"name-on-card",autoComplete:"cc-name",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]}),a("div",{className:"col-span-3",children:[e("label",{htmlFor:"expiration-date",className:"block text-sm font-medium text-gray-800",children:"Expiration date (MM/YY)"}),e("div",{className:"mt-1",children:e("input",{type:"text",name:"expiration-date",id:"expiration-date",autoComplete:"cc-exp",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]}),a("div",{children:[e("label",{htmlFor:"cvc",className:"block text-sm font-medium text-gray-800",children:"CVC"}),e("div",{className:"mt-1",children:e("input",{type:"text",name:"cvc",id:"cvc",autoComplete:"csc",className:"block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]})]})]})]}),a("div",{className:"mt-10 lg:mt-0",children:[e("h2",{className:"text-lg font-medium text-gray-900",children:"Order summary"}),a("div",{className:"mt-4 bg-white border border-gray-200 rounded-lg shadow-sm",children:[e("h3",{className:"sr-only",children:"Items in your cart"}),e("ul",{role:"list",className:"divide-y divide-gray-200",children:f.map(r=>a("li",{className:"flex py-6 px-4 sm:px-6",children:[e("div",{className:"flex-shrink-0",children:e("img",{src:r.imageSrc,alt:r.imageAlt,className:"w-20 rounded-md"})}),a("div",{className:"ml-6 flex-1 flex flex-col",children:[a("div",{className:"flex",children:[a("div",{className:"min-w-0 flex-1",children:[e("h4",{className:"text-sm",children:e("a",{href:r.href,className:"font-medium text-gray-800 hover:text-gray-800",children:r.title})}),e("p",{className:"mt-1 text-sm text-gray-500",children:r.color}),e("p",{className:"mt-1 text-sm text-gray-500",children:r.size})]}),e("div",{className:"ml-4 flex-shrink-0 flow-root",children:a("button",{type:"button",className:"-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500",children:[e("span",{className:"sr-only",children:"Remove"}),e(l,{className:"h-5 w-5","aria-hidden":"true"})]})})]}),a("div",{className:"flex-1 pt-2 flex items-end justify-between",children:[e("p",{className:"mt-1 text-sm font-medium text-gray-900",children:r.price}),a("div",{className:"ml-4",children:[e("label",{htmlFor:"quantity",className:"sr-only",children:"Quantity"}),a("select",{id:"quantity",name:"quantity",className:"rounded-md border border-gray-300 text-base font-medium text-gray-800 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",children:[e("option",{value:1,children:"1"}),e("option",{value:2,children:"2"}),e("option",{value:3,children:"3"}),e("option",{value:4,children:"4"}),e("option",{value:5,children:"5"}),e("option",{value:6,children:"6"}),e("option",{value:7,children:"7"}),e("option",{value:8,children:"8"})]})]})]})]})]},r.id))}),a("dl",{className:"border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6",children:[a("div",{className:"flex items-center justify-between",children:[e("dt",{className:"text-sm",children:"Subtotal"}),e("dd",{className:"text-sm font-medium text-gray-900",children:"$64.00"})]}),a("div",{className:"flex items-center justify-between",children:[e("dt",{className:"text-sm",children:"Shipping"}),e("dd",{className:"text-sm font-medium text-gray-900",children:"$5.00"})]}),a("div",{className:"flex items-center justify-between",children:[e("dt",{className:"text-sm",children:"Taxes"}),e("dd",{className:"text-sm font-medium text-gray-900",children:"$5.52"})]}),a("div",{className:"flex items-center justify-between border-t border-gray-200 pt-6",children:[e("dt",{className:"text-base font-medium",children:"Total"}),e("dd",{className:"text-base font-medium text-gray-900",children:"$75.52"})]})]}),e("div",{className:"border-t border-gray-200 py-6 px-4 sm:px-6",children:e("button",{type:"submit",className:"w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500",children:"Confirm order"})})]})]})]})]})}),a("footer",{"aria-labelledby":"footer-heading",className:"bg-white border-t border-gray-200",children:[e("h2",{id:"footer-heading",className:"sr-only",children:"Footer"}),a("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e("div",{className:"py-20",children:a("div",{className:"grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min",children:[e("div",{className:"col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1",children:e("img",{src:"https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600",alt:"",className:"h-8 w-auto"})}),a("div",{className:"mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6",children:[a("div",{className:"grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8",children:[a("div",{children:[e("h3",{className:"text-sm font-medium text-gray-900",children:"Products"}),e("ul",{role:"list",className:"mt-6 space-y-6",children:c.products.map(r=>e("li",{className:"text-sm",children:e("a",{href:r.href,className:"text-gray-500 hover:text-gray-600",children:r.name})},r.name))})]}),a("div",{children:[e("h3",{className:"text-sm font-medium text-gray-900",children:"Company"}),e("ul",{role:"list",className:"mt-6 space-y-6",children:c.company.map(r=>e("li",{className:"text-sm",children:e("a",{href:r.href,className:"text-gray-500 hover:text-gray-600",children:r.name})},r.name))})]})]}),a("div",{children:[e("h3",{className:"text-sm font-medium text-gray-900",children:"Customer Service"}),e("ul",{role:"list",className:"mt-6 space-y-6",children:c.customerService.map(r=>e("li",{className:"text-sm",children:e("a",{href:r.href,className:"text-gray-500 hover:text-gray-600",children:r.name})},r.name))})]})]}),a("div",{className:"mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4",children:[e("h3",{className:"text-sm font-medium text-gray-900",children:"Sign up for our newsletter"}),e("p",{className:"mt-6 text-sm text-gray-500",children:"The latest deals and savings, sent to your inbox weekly."}),a("form",{className:"mt-2 flex sm:max-w-md",children:[e("label",{htmlFor:"newsletter-email-address",className:"sr-only",children:"Email address"}),e("input",{id:"newsletter-email-address",type:"text",maxLength:100,autoComplete:"email",required:!0,className:"appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"}),e("div",{className:"ml-4 flex-shrink-0",children:e("button",{type:"submit",className:"w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Sign up"})})]})]})]})}),e("div",{className:"border-t border-gray-100 py-10 text-center",children:e("p",{className:"text-sm text-gray-500",children:"\xA9 2021 Workflow, Inc. All rights reserved."})})]})]})]})}export{v as default};