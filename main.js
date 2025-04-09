(()=>{"use strict";var t="8dbe2058-c3e9-43bd-bec4-3024a54b8cad",e="https://nomoreparties.co/v1/wff-cohort-32";function n(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}function r(r){return fetch("".concat(e,"/cards/likes/").concat(r),{method:"PUT",headers:{authorization:t}}).then(n)}function o(r){return fetch("".concat(e,"/cards/likes/").concat(r),{method:"DELETE",headers:{authorization:t}}).then(n)}var c=document.querySelector("#card-template").content;function a(t,e,n,r,o){var a=c.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__title"),l=a.querySelector(".card__like-count"),s=a.querySelector(".card__delete-button");return i.src=t.link,i.alt=t.name,u.textContent=t.name,o!==t.owner._id&&s.classList.add("card__delete-button-hidden"),a.addEventListener("click",(function(o){o.target.classList.contains("card__like-button")?e(t._id,l,o):o.target.classList.contains("card__image")?n(i,u):o.target.classList.contains("card__delete-button")&&r(a,t._id)})),a}function i(t,e,n){(n.target.classList.contains("card__like-button_is-active")?o:r)(t).then((function(t){n.target.classList.toggle("card__like-button_is-active"),e.classList.toggle("card__like-count-inactive",0===t.likes.length),e.textContent=t.likes.length||""})).catch((function(t){return console.error("Ошибка вывода количества лайков карточки:",t)}))}function u(t){t.classList.add("popup_is-animated"),t.classList.add("popup_is-opened"),document.addEventListener("keydown",s),t.addEventListener("click",d)}function l(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)}function s(t){"Escape"===t.key&&l(document.querySelector(".popup_is-opened"))}function d(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&l(t.currentTarget)}function p(t,e,n){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function f(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove(n.inactiveButtonClass)):(e.disabled=!0,e.classList.add(n.inactiveButtonClass))}function m(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector));n.forEach((function(n){p(t,n,e)})),f(n,t.querySelector(e.submitButtonSelector),e)}function _(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var y,h=document.querySelector(".places__list"),v=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),b=document.querySelector(".profile__image"),g=document.querySelector(".popup__button_type_delete-card"),L=document.querySelector(".popup_type_edit"),C=document.querySelector(".popup_type_new-card"),q=document.forms["edit-profile"],E=document.querySelector(".popup_type_delete-card"),k=document.querySelector(".popup_type_edit-avatar"),x=document.forms["new-place"],A=document.forms.avatar,T=q.elements.name,w=q.elements.description,j=A.elements["avatar-link"],z=document.querySelector(".profile__title"),O=document.querySelector(".profile__description"),B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function D(t,e){var n=document.querySelector(".popup_type_image"),r=n.querySelector(".popup__image"),o=n.querySelector(".popup__caption");r.src=t.src,r.alt=t.alt,o.textContent=e.textContent,u(n)}function P(r,o){u(E),g.onclick=function(){(function(r){return fetch("".concat(e,"/cards/").concat(r),{method:"DELETE",headers:{authorization:t}}).then(n)})(o).then((function(){r.remove()})).catch((function(t){return console.error("Ошибка удаления карточки:",t)})).finally((function(){l(E)}))}}function I(t,e){e.querySelector(".popup__button").textContent=t?"Сохранение...":"Сохранить"}Promise.all([fetch("".concat(e,"/users/me"),{method:"GET",headers:{authorization:t}}).then(n),fetch("".concat(e,"/cards"),{method:"GET",headers:{authorization:t}}).then(n)]).then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(e,n)||function(t,e){if(t){if("string"==typeof t)return _(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0];r[1].forEach((function(t){h.append(a(t,i,D,P,o._id))})),z.textContent=o.name,O.textContent=o.about,b.style.backgroundImage="url(".concat(o.avatar,")")})).catch((function(t){return console.error("Ошибка получения данных с сервера:",t)})),v.addEventListener("click",(function(){T.value=z.textContent,w.value=O.textContent,m(L,B),u(L)})),S.addEventListener("click",(function(){x.reset(),m(C,B),u(C)})),b.addEventListener("click",(function(){A.reset(),m(k,B),u(k)})),k.addEventListener("submit",(function(r){var o;r.preventDefault(),I(!0,k),(o=j.value,fetch("".concat(e,"/users/me/avatar"),{method:"PATCH",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({avatar:o})}).then(n)).then((function(t){b.style.backgroundImage="url(".concat(t.avatar,")")})).catch((function(t){return console.error("Ошибка обновления аватарки:",t)})).finally((function(){I(!1,k),l(k)}))})),q.addEventListener("submit",(function(r){var o,c;r.preventDefault(),I(!0,L),(o=T.value,c=w.value,fetch("".concat(e,"/users/me"),{method:"PATCH",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({name:o,about:c})}).then(n)).then((function(t){z.textContent=t.name,O.textContent=t.about})).catch((function(t){return console.error("Ошибка обновления профиля:",t)})).finally((function(){I(!1,L),l(L)}))})),x.addEventListener("submit",(function(r){var o,c;r.preventDefault(),I(!0,C),(o=x.elements["place-name"].value,c=x.elements.link.value,fetch("".concat(e,"/cards"),{method:"POST",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({name:o,link:c})}).then(n)).then((function(t){h.prepend(a(t,i,D,P,t.owner._id))})).catch((function(t){return console.error("Ошибка создания новой карточки:",t)})).finally((function(){I(!1,C),l(C)}))})),y=B,Array.from(document.querySelectorAll(y.formSelector)).forEach((function(t){t.addEventListener("submit",(function(t){t.preventDefault})),function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(t,e,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?p(t,e,n):function(t,e,n,r){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(t,e,e.validationMessage,n)}(t,o,e),f(n,r,e)}))}))}(t,y)}))})();