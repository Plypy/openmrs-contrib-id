usernameRegex=/^[a-z0-9]+[.]?[a-z0-9]+$/,emailRegex=/^[A-Za-z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,function(t){t.fn.invisible=function(){return this.each(function(){t(this).css("visibility","hidden")})},t.fn.visible=function(){return this.each(function(){t(this).css("visibility","visible")})}}(jQuery),$(document).ready(function(){$("form input").focusin(function(){$(this).closest(".form-group").find(".description").addClass("show")}).focusout(function(){$(this).closest(".form-group").find(".description").removeClass("show")}),$("form input:focus").closest(".form-group").find(".description").addClass("show"),$("form.validate input").focusin(function(){$(this).closest(".input-wrapper").find("label.error.show").removeClass("show")}),$("form.validate label.error").click(function(){$(this).removeClass("show").closest(".input-wrapper").find("input").focus()}),$("form.validate input#username").data({validate:function(){var t=$("form.validate input#username").val();return t.length<3?"Too short":t.length>19?"Too long":/[0-9]/.test(t[0])?"Start with letter":usernameRegex.test(t)?void 0:"Only (a-z, 0-9) are allowed"}}),$("form.validate input#password").data({validate:function(){var t=$("form.validate input#password").val();return t.length<8?"Too short":t.length>32?"Too long":void 0}}),$("form.validate input#email").data({validate:function(){var t=$("form.validate input#email").val();return t.length>64?"Too long":emailRegex.test(t)?void 0:"Invalid email"}}),$("form#form-login").data({vns:function(t){}}),$("form.validate").submit(function(t){function i(t,i){var n=t.closest(".input-wrapper").find("label.error");i&&"string"==typeof i||(i="×"),n.html(i),n.addClass("show")}var n=!0,e=$(this);if(e.find("input").each(function(t,e){if(e=$(e),e.hasClass("required")&&""===e.val())return n=!1,void i(e,"Forgot?");var r=e.data("validate");if(r){var o=r();o&&(n=!1,i(e,o))}}),!n)return void t.preventDefault();var r=e.data("vns");return r?(t.preventDefault(),void r(function(t,n){if(t)for(var e in t)i($("#"+e),t[e])})):void e.submit()})}),$(document).ready(function(){if("signup"===$("#uname").html()){$("input[name=spinner]").val();$("input#country").closest(".form-group").hide(),$("form#form-signup").data({vns:function(t){return""===grecaptcha.getResponse()?(setTimeout(function(){$("form#form-signup").find("input#submit").closest(".form-group").find("label.error").removeClass("show")},2e3),t({submit:"Mind Captcha!"})):void $.post("/signup",$("form#form-signup").serialize()).done(function(i){return i.success?void(window.location.href="/signup/verify"):i.fail?(i.fail.primaryEmail&&(i.fail.email=i.fail.primaryEmail,delete i.fail.primaryEmail),t(i.fail)):void 0}).fail(function(){})}}),"signup"===$("#uname").val()&&(alert("find signup"),$("#country").parent().hide(),function(){var t=$("#username");return""===t.val()?t.focus():(t=$("#firstName"),""===t.val()?t.focus():(t=$("#lastName"),""===t.val()?t.focus():(t=$("#primaryEmail"),""===t.val()?t.focus():(t=$("#password"),""===t.val()?t.focus():void 0))))}())}}),$(document).ready(function(){"profile"===$("#uname").html()&&(Cookies.get("welcome-later")&&$("#welcome-message").hide(),$("#done").click(function(){$.ajax("/profile/welcome",function(){$("#welcome-message").hide()})}),$("#later").click(function(){Cookies.set("welcome-later",!0,{expires:1,path:""}),$("#welcome-message").hide()}),$("#addEmail").hide(),$("#addEmailToggle").on("click",function(t){t.preventDefault(),$("#addEmail").slideToggle(),$("#addEmail input[name=newEmail]").focus()}),$("#editPassword").hide(),$("#editPasswordToggle").on("click",function(t){t.preventDefault(),$("#editPassword").slideToggle()}),$("#editPassword input#currentpassword").data({validate:function(){var t=$("#editPassword input#currentpassword").val();return t.length<8?"Too short":void 0}}),$("#editPassword input#newpassword").data({validate:function(){var t=$("#editPassword input#newpassword").val();return t.length<8?"Too short":void 0}}),$("#editPassword input#confirmpassword").data({validate:function(){var t=$("#editPassword input#newpassword").val(),i=$("#editPassword input#confirmpassword").val();return t!==i?"Mismatched":void 0}}),$("#editPassword.validate").data({vns:function(t){$.post("/password",$("#editPassword").serialize()).done(function(i){return i.success?window.location.reload():i.fail?t(i.fail):void 0}).fail(function(){})}}),$("#addMail.validate").data({vns:function(t){$.post("/profile/email",$("#addMail").serialize()).done(function(i){return i.success?window.location.reload():i.fail?t(i.fail):void 0}).fail(function(){})}}))});var CryptoJS=CryptoJS||function(t,i){var n={},e=n.lib={},r=function(){},o=e.Base={extend:function(t){r.prototype=this;var i=new r;return t&&i.mixIn(t),i.hasOwnProperty("init")||(i.init=function(){i.$super.init.apply(this,arguments)}),i.init.prototype=i,i.$super=this,i},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var i in t)t.hasOwnProperty(i)&&(this[i]=t[i]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},a=e.WordArray=o.extend({init:function(t,n){t=this.words=t||[],this.sigBytes=n!=i?n:4*t.length},toString:function(t){return(t||u).stringify(this)},concat:function(t){var i=this.words,n=t.words,e=this.sigBytes;if(t=t.sigBytes,this.clamp(),e%4)for(var r=0;t>r;r++)i[e+r>>>2]|=(n[r>>>2]>>>24-8*(r%4)&255)<<24-8*((e+r)%4);else if(65535<n.length)for(r=0;t>r;r+=4)i[e+r>>>2]=n[r>>>2];else i.push.apply(i,n);return this.sigBytes+=t,this},clamp:function(){var i=this.words,n=this.sigBytes;i[n>>>2]&=4294967295<<32-8*(n%4),i.length=t.ceil(n/4)},clone:function(){var t=o.clone.call(this);return t.words=this.words.slice(0),t},random:function(i){for(var n=[],e=0;i>e;e+=4)n.push(4294967296*t.random()|0);return new a.init(n,i)}}),s=n.enc={},u=s.Hex={stringify:function(t){var i=t.words;t=t.sigBytes;for(var n=[],e=0;t>e;e++){var r=i[e>>>2]>>>24-8*(e%4)&255;n.push((r>>>4).toString(16)),n.push((15&r).toString(16))}return n.join("")},parse:function(t){for(var i=t.length,n=[],e=0;i>e;e+=2)n[e>>>3]|=parseInt(t.substr(e,2),16)<<24-4*(e%8);return new a.init(n,i/2)}},l=s.Latin1={stringify:function(t){var i=t.words;t=t.sigBytes;for(var n=[],e=0;t>e;e++)n.push(String.fromCharCode(i[e>>>2]>>>24-8*(e%4)&255));return n.join("")},parse:function(t){for(var i=t.length,n=[],e=0;i>e;e++)n[e>>>2]|=(255&t.charCodeAt(e))<<24-8*(e%4);return new a.init(n,i)}},c=s.Utf8={stringify:function(t){try{return decodeURIComponent(escape(l.stringify(t)))}catch(i){throw Error("Malformed UTF-8 data")}},parse:function(t){return l.parse(unescape(encodeURIComponent(t)))}},f=e.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=c.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(i){var n=this._data,e=n.words,r=n.sigBytes,o=this.blockSize,s=r/(4*o),s=i?t.ceil(s):t.max((0|s)-this._minBufferSize,0);if(i=s*o,r=t.min(4*i,r),i){for(var u=0;i>u;u+=o)this._doProcessBlock(e,u);u=e.splice(0,i),n.sigBytes-=r}return new a.init(u,r)},clone:function(){var t=o.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});e.Hasher=f.extend({cfg:o.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){f.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(i,n){return new t.init(n).finalize(i)}},_createHmacHelper:function(t){return function(i,n){return new d.HMAC.init(t,n).finalize(i)}}});var d=n.algo={};return n}(Math);!function(t){function i(t,i,n,e,r,o,a){return t=t+(i&n|~i&e)+r+a,(t<<o|t>>>32-o)+i}function n(t,i,n,e,r,o,a){return t=t+(i&e|n&~e)+r+a,(t<<o|t>>>32-o)+i}function e(t,i,n,e,r,o,a){return t=t+(i^n^e)+r+a,(t<<o|t>>>32-o)+i}function r(t,i,n,e,r,o,a){return t=t+(n^(i|~e))+r+a,(t<<o|t>>>32-o)+i}for(var o=CryptoJS,a=o.lib,s=a.WordArray,u=a.Hasher,a=o.algo,l=[],c=0;64>c;c++)l[c]=4294967296*t.abs(t.sin(c+1))|0;a=a.MD5=u.extend({_doReset:function(){this._hash=new s.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,o){for(var a=0;16>a;a++){var s=o+a,u=t[s];t[s]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8)}var a=this._hash.words,s=t[o+0],u=t[o+1],c=t[o+2],f=t[o+3],d=t[o+4],p=t[o+5],h=t[o+6],v=t[o+7],m=t[o+8],g=t[o+9],w=t[o+10],$=t[o+11],y=t[o+12],_=t[o+13],B=t[o+14],C=t[o+15],b=a[0],x=a[1],P=a[2],z=a[3],b=i(b,x,P,z,s,7,l[0]),z=i(z,b,x,P,u,12,l[1]),P=i(P,z,b,x,c,17,l[2]),x=i(x,P,z,b,f,22,l[3]),b=i(b,x,P,z,d,7,l[4]),z=i(z,b,x,P,p,12,l[5]),P=i(P,z,b,x,h,17,l[6]),x=i(x,P,z,b,v,22,l[7]),b=i(b,x,P,z,m,7,l[8]),z=i(z,b,x,P,g,12,l[9]),P=i(P,z,b,x,w,17,l[10]),x=i(x,P,z,b,$,22,l[11]),b=i(b,x,P,z,y,7,l[12]),z=i(z,b,x,P,_,12,l[13]),P=i(P,z,b,x,B,17,l[14]),x=i(x,P,z,b,C,22,l[15]),b=n(b,x,P,z,u,5,l[16]),z=n(z,b,x,P,h,9,l[17]),P=n(P,z,b,x,$,14,l[18]),x=n(x,P,z,b,s,20,l[19]),b=n(b,x,P,z,p,5,l[20]),z=n(z,b,x,P,w,9,l[21]),P=n(P,z,b,x,C,14,l[22]),x=n(x,P,z,b,d,20,l[23]),b=n(b,x,P,z,g,5,l[24]),z=n(z,b,x,P,B,9,l[25]),P=n(P,z,b,x,f,14,l[26]),x=n(x,P,z,b,m,20,l[27]),b=n(b,x,P,z,_,5,l[28]),z=n(z,b,x,P,c,9,l[29]),P=n(P,z,b,x,v,14,l[30]),x=n(x,P,z,b,y,20,l[31]),b=e(b,x,P,z,p,4,l[32]),z=e(z,b,x,P,m,11,l[33]),P=e(P,z,b,x,$,16,l[34]),x=e(x,P,z,b,B,23,l[35]),b=e(b,x,P,z,u,4,l[36]),z=e(z,b,x,P,d,11,l[37]),P=e(P,z,b,x,v,16,l[38]),x=e(x,P,z,b,w,23,l[39]),b=e(b,x,P,z,_,4,l[40]),z=e(z,b,x,P,s,11,l[41]),P=e(P,z,b,x,f,16,l[42]),x=e(x,P,z,b,h,23,l[43]),b=e(b,x,P,z,g,4,l[44]),z=e(z,b,x,P,y,11,l[45]),P=e(P,z,b,x,C,16,l[46]),x=e(x,P,z,b,c,23,l[47]),b=r(b,x,P,z,s,6,l[48]),z=r(z,b,x,P,v,10,l[49]),P=r(P,z,b,x,B,15,l[50]),x=r(x,P,z,b,p,21,l[51]),b=r(b,x,P,z,y,6,l[52]),z=r(z,b,x,P,f,10,l[53]),P=r(P,z,b,x,w,15,l[54]),x=r(x,P,z,b,u,21,l[55]),b=r(b,x,P,z,m,6,l[56]),z=r(z,b,x,P,C,10,l[57]),P=r(P,z,b,x,h,15,l[58]),x=r(x,P,z,b,_,21,l[59]),b=r(b,x,P,z,d,6,l[60]),z=r(z,b,x,P,$,10,l[61]),P=r(P,z,b,x,c,15,l[62]),x=r(x,P,z,b,g,21,l[63]);a[0]=a[0]+b|0,a[1]=a[1]+x|0,a[2]=a[2]+P|0,a[3]=a[3]+z|0},_doFinalize:function(){var i=this._data,n=i.words,e=8*this._nDataBytes,r=8*i.sigBytes;n[r>>>5]|=128<<24-r%32;var o=t.floor(e/4294967296);for(n[(r+64>>>9<<4)+15]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),n[(r+64>>>9<<4)+14]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8),i.sigBytes=4*(n.length+1),this._process(),i=this._hash,n=i.words,e=0;4>e;e++)r=n[e],n[e]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8);return i},clone:function(){var t=u.clone.call(this);return t._hash=this._hash.clone(),t}}),o.MD5=u._createHelper(a),o.HmacMD5=u._createHmacHelper(a)}(Math);