(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{22:function(e,t,n){},42:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var c=n(2),r=n.n(c),a=n(17),o=n.n(a),s=(n(22),n(4)),u=n.n(s),i=n(7),l=n(3),b=n(8),j=n.n(b),d=(n(42),{cpp:'#include <iostream>\n#include <stdio.h>\nusing namespace std;\nint main() {\n  cout<<"Hello world!\\n";\n  return 0;\n}\n',py:'print("Hello world!")'}),p=d,O=n(5),f=n.n(O),h=n(0);var g=function(){var e=Object(c.useState)(""),t=Object(l.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)("cpp"),o=Object(l.a)(a,2),s=o[0],b=o[1],d=Object(c.useState)(""),O=Object(l.a)(d,2),g=O[0],x=O[1],v=Object(c.useState)(""),m=Object(l.a)(v,2),S=m[0],w=m[1],k=Object(c.useState)(""),I=Object(l.a)(k,2),C=I[0],y=I[1],A=Object(c.useState)(null),E=Object(l.a)(A,2),F=E[0],J=E[1];Object(c.useEffect)((function(){var e=localStorage.getItem("default-language")||"cpp";b(e)}),[]),Object(c.useEffect)((function(){r(p[s])}),[s]);var B=function(){var e=Object(i.a)(u.a.mark((function e(){var t,c,r,a,o,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={language:s,code:n},e.prev=1,y(""),w(""),x(""),J(null),e.next=8,j.a.post("https://coduo.herokuapp.com/run",t);case 8:c=e.sent,r=c.data,console.log(r),y(r.jobId),a=setInterval(Object(i.a)(u.a.mark((function e(){var t,n,c,o,s,i,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.get("https://coduo.herokuapp.com/status",{params:{id:r.jobId}});case 2:if(t=e.sent,n=t.data,c=n.success,o=n.job,s=n.error,console.log(n),!c){e.next=16;break}if(i=o.status,l=o.output,w(i),J(o),"pending"!==i){e.next=12;break}return e.abrupt("return");case 12:x(l),clearInterval(a),e.next=20;break;case 16:console.error(s),x(s),w("Bad request"),clearInterval(a);case 20:console.log(n);case 21:case"end":return e.stop()}}),e)}))),1e3),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(1),(o=e.t0.response)?(l=o.data.err.stderr,x(l)):x("Error connecting to server!");case 19:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(){return e.apply(this,arguments)}}();return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)("h1",{children:"Online Code compiler"}),Object(h.jsxs)("div",{children:[Object(h.jsx)("label",{children:"Language: "}),Object(h.jsxs)("select",{value:s,onChange:function(e){window.confirm("Are you sure you want to change language? WARNING: Your current code will be lost.")&&b(e.target.value)},children:[Object(h.jsx)("option",{value:"cpp",children:"C++"}),Object(h.jsx)("option",{value:"py",children:"Python"})]})]}),Object(h.jsx)("br",{}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{onClick:function(){localStorage.setItem("default-language",s),console.log("".concat(s))},children:"Set Default"})}),Object(h.jsx)("br",{}),Object(h.jsx)("textarea",{rows:"20",cols:"70",value:n,onChange:function(e){r(e.target.value)}}),Object(h.jsx)("br",{}),Object(h.jsx)("button",{onClick:B,children:"Submit"}),Object(h.jsx)("p",{children:S}),Object(h.jsx)("p",{children:C&&"JobID : ".concat(C)}),Object(h.jsx)("p",{children:function(){if(!F)return"";var e=F.submittedAt,t=F.startedAt,n=F.completedAt,c="";if(e=f()(e).toString(),c+="Job Submitted At: ".concat(e,"  "),!t||!n)return c;var r=f()(t),a=f()(n).diff(r,"seconds",!0);return c+="Execution Time: ".concat(a,"s")}}),Object(h.jsx)("p",{children:g})]})},x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,46)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),a(e),o(e)}))};o.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(g,{})}),document.getElementById("root")),x()}},[[45,1,2]]]);
//# sourceMappingURL=main.2d944c08.chunk.js.map