import{c as v,u as g,j as a,a as e,L as x}from"./app.8f41755a.js";import{T as m,I as o}from"./TextInput.75a70d79.js";import{I as l}from"./InputLabel.fe8ab611.js";import{P as y}from"./PrimaryButton.42ef57e2.js";import{W as N}from"./transition.a7dac45d.js";import"./open-closed.0d489d91.js";function C({mustVerifyEmail:c,status:u,className:d}){const r=v().props.auth.user,{data:i,setData:s,patch:f,errors:n,processing:p,recentlySuccessful:h}=g({name:r.name,email:r.email});return a("section",{className:d,children:[a("header",{children:[e("h2",{className:"text-lg font-medium text-gray-900",children:"Profile Information"}),e("p",{className:"mt-1 text-sm text-gray-600",children:"Update your account's profile information and email address."})]}),a("form",{onSubmit:t=>{t.preventDefault(),f(route("profile.update"))},className:"mt-6 space-y-6",children:[a("div",{children:[e(l,{for:"name",value:"Name"}),e(m,{id:"name",type:"text",className:"mt-1 block w-full",value:i.name,handleChange:t=>s("name",t.target.value),required:!0,autofocus:!0,autocomplete:"name"}),e(o,{className:"mt-2",message:n.name})]}),a("div",{children:[e(l,{for:"email",value:"Email"}),e(m,{id:"email",type:"email",className:"mt-1 block w-full",value:i.email,handleChange:t=>s("email",t.target.value),required:!0,autocomplete:"email"}),e(o,{className:"mt-2",message:n.email})]}),c&&r.email_verified_at===null&&a("div",{children:[a("p",{className:"text-sm mt-2 text-gray-800",children:["Your email address is unverified.",e(x,{href:route("verification.send"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Click here to re-send the verification email."})]}),u==="verification-link-sent"&&e("div",{className:"mt-2 font-medium text-sm text-green-600",children:"A new verification link has been sent to your email address."})]}),a("div",{className:"flex items-center gap-4",children:[e(y,{processing:p,children:"Save"}),e(N,{show:h,enterFrom:"opacity-0",leaveTo:"opacity-0",className:"transition ease-in-out",children:e("p",{className:"text-sm text-gray-600",children:"Saved."})})]})]})]})}export{C as default};
