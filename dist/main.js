!function r(s,i,a){function o(t,e){if(!i[t]){if(!s[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(c)return c(t,!0);throw(n=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",n}n=i[t]={exports:{}},s[t][0].call(n.exports,function(e){return o(s[t][1][e]||e)},n,n.exports,r,s,i,a)}return i[t].exports}for(var c="function"==typeof require&&require,e=0;e<a.length;e++)o(a[e]);return o}({1:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.selectActions=void 0;r.selectActions=({selectors:e})=>[...document.querySelectorAll(e.title.actions)]},{}],2:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.getSuggestionsUserStats=r.getSuggestionsByPost=void 0;const i=e("./config"),a=e("./utils");r.getSuggestionsByPost=async(e,{site:t=i.DEF_SITE,type:r="all"})=>{const o=new URL(`${i.API_BASE}/${i.API_VER}/posts/${e}/suggested-edits`);o.search=new URLSearchParams({site:t}).toString();const n=await fetch(o.toString());if(!n.ok)return[];const{items:s}=await n.json();r={approved:({approval_date:e})=>!!e,rejected:({rejection_date:e})=>!!e,pending:({approval_date:e,rejection_date:t})=>!e&&!t}[r];return r?s.filter(r):s};r.getSuggestionsUserStats=async(e,t={})=>{const r=new URL(`${i.API_BASE}/${i.API_VER}/users/${e}/suggested-edits`),o={site:t.site||i.DEF_SITE};Object.keys(t).length&&({from:t,to:s=new Date}=t,t&&(o.from=a.toApiDate(t)),s&&(o.to=a.toApiDate(s))),r.search=new URLSearchParams(o).toString();const n=await fetch(r.toString());if(!n.ok)return[];var{items:s}=await n.json();return s}},{"./config":4,"./utils":15}],3:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.addAuditNotification=void 0;const i=e("./api");r.addAuditNotification=async({selectors:{content:e}},t)=>{var r="audit_notification";if(document.getElementById(r))return!0;var{length:t}=await i.getSuggestionsByPost(t,{type:"pending"});if(t)return!0;const o=document.querySelector(e.typeHint),n=document.querySelector(e.postSummary);if(!o)return!1;const s=document.createElement("blockquote");return s.id=r,s.classList.add("mb12","fs-headline1"),s.textContent="This is an Audit. Tread carefully",o.after(s),o.remove(),null!==n&&void 0!==n&&n.remove(),!0}},{"./api":2}],4:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.config=r.API_VER=r.DEF_SITE=r.API_BASE=void 0;const o=e("./utils");r.API_BASE="https://api.stackexchange.com",r.DEF_SITE="stackoverflow",r.API_VER=2.2,r.config={page:{suggestionId:o.last(location.pathname.split("/"))},classes:{grid:{container:"grid",cell:"grid--cell"}},selectors:{actions:{action:".js-action-radio-parent",disabled:".is-disabled",wrapper:".js-review-actions",sidebar:".js-actions-sidebar",modal:{form:"form[action='/suggested-edits/reject']",votes:{labels:"label[for^=rejection-reason].s-label",counts:".s-badge__votes"}},inputs:{reject:"#review-action-Reject"}},buttons:{submit:".js-review-submit",skip:".js-review-actions:not(.d-none) .js-action-button[value=1]",close:".s-modal--close"},reviews:{done:".js-reviews-done",daily:".js-reviews-per-day"},diffs:{deleted:".full-diff .deleted > div",added:".full-diff .inserted > div"},page:{links:{question:"a[href*='/questions/']",answer:"a.answer-hyperlink"}},content:{typeHint:".js-review-content h2",postSummary:".s-post-summary"},title:{description:".s-page-title--description",actions:".s-page-title--actions a",learnMore:".js-show-modal-from-nav.s-link",title:".s-page-title--text",header:".s-page-title--header"},info:{post:{wrapper:".postcell span"},editor:{card:"a.s-user-card--link"}}}}},{"./utils":15}],5:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.decolorDiff=void 0;r.decolorDiff=e=>{var{added:t,deleted:e}=e.selectors.diffs;const r=document.querySelector(t),o=document.querySelector(e);return!(!r||!o)&&(r.style.backgroundColor="unset",o.style.backgroundColor="unset",!0)}},{}],6:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.createItem=r.createGridCell=void 0;const o=e("./config");r.createGridCell=()=>{const e=document.createElement("div");return e.classList.add(o.config.classes.grid.cell),e};r.createItem=(...e)=>{const t=document.createElement("div");return t.classList.add(o.config.classes.grid.cell,"p12"),t.append(...e),t}},{"./config":4}],7:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.waitForSelector=r.goParentUp=r.arraySelect=void 0;r.arraySelect=(e,t)=>[...e.querySelectorAll(t)];r.goParentUp=(e,t=1)=>0!==t&&e?r.goParentUp(e.parentElement,t-1):e;r.waitForSelector=o=>{var e=document.querySelectorAll(o);return e.length?Promise.resolve(e):new Promise(t=>{const r=new MutationObserver(()=>{var e=document.querySelectorAll(o);e.length&&(r.disconnect(),t(e))});r.observe(document,{subtree:!0,childList:!0,attributes:!0})})}},{}],8:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.getRejectionCount=r.getSuggestionTotals=r.getEditAuthorId=r.getPostId=r.getQuestionId=r.getAnswerId=void 0;const n=e("./config"),l=e("./domUtils"),i=e("./utils");r.getAnswerId=e=>{e=document.querySelector(e);return i.safeMatch((null==e?void 0:e.href)||"",/\/questions\/\d+\/[\w-]+\/(\d+)/,"")[0]};r.getQuestionId=e=>{e=document.querySelector(e);return i.safeMatch((null==e?void 0:e.href)||"",/\/questions\/(\d+)/,"")[0]};r.getPostId=({selectors:{page:{links:e}}})=>r.getAnswerId(e.answer)||r.getQuestionId(e.question);r.getEditAuthorId=()=>{var e=n.config.selectors.info.post.wrapper,t=document.querySelectorAll(e);if(!t.length)return i.handleMatchFailure(e,null);e=Array.from(t).find(({textContent:e})=>/proposed/i.test(e||""));if(!e)return null;t=n.config.selectors.info.editor.card;const{parentElement:r}=e;e=r.querySelector(t);if(!e)return i.handleMatchFailure(t,null);const{href:o}=e;var[,e]=o.match(/users\/(\d+)/)||[];return e||null};r.getSuggestionTotals=e=>{const r={get ratio(){var{approved:e,rejected:t,total:r}=this;return{ofApproved:e/r,ofRejected:t/r,approvedToRejected:e/(0===t?1:t)}},approved:0,rejected:0,total:0};return e.forEach(({approval_date:e,rejection_date:t})=>{r.total+=1,e&&(r.approved+=1),t&&(r.rejected+=1)}),r};r.getRejectionCount=async e=>{var{selectors:{actions:{modal:t}}}=e,e=await(async e=>{var{selectors:{buttons:t,actions:{inputs:r,modal:o,action:n,disabled:e}}}=e;const s=document.querySelector(r.reject),i=document.querySelector(t.submit);if(!s||!i)return null;await l.waitForSelector(`${n}:not(${e})`),s.click(),i.click();const[a]=[...await l.waitForSelector(o.form)];if(!a)return null;o=a.cloneNode(!0);const c=a.querySelector(t.close);return c.click(),o})(e);if(!e)return i.handleMatchFailure(t.form,null);const r=l.arraySelect(e,t.votes.labels),o={spam:0,improvement:0,intent:0,reply:0,harm:0},n={102:"improvement",101:"spam",104:"intent",105:"reply",0:"harm"},s=t.votes.counts;return r.forEach(e=>{const{htmlFor:t}=e;var[,r]=t.match(/(\d+$)/)||[],r=n[r];e.querySelector(s)&&(o[r]+=1)}),o}},{"./config":4,"./domUtils":7,"./utils":15}],9:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const a=e("./audits"),c=e("./config"),l=e("./diffs"),d=e("./getters"),u=e("./progress"),m=e("./stats"),p=e("./title");(async()=>{const t=d.getPostId(c.config);if(t){const r=[u.moveProgressToTabs,p.optimizePageTitle,l.decolorDiff,a.addAuditNotification];var e=r.map(e=>[e.name,e(c.config,t)]);const o=await Promise.all(e);e=o.reduce((e,[t,r])=>`${e}\n${t} - ${r?"ok":"failed"}`,"Status: ");console.debug(e);const{selectors:{actions:{wrapper:n}}}=c.config,s=[Node.TEXT_NODE,Node.COMMENT_NODE],i=new MutationObserver(async e=>{e.find(({addedNodes:e})=>[...e].some(t=>s.every(e=>e!==t.nodeType)&&t.matches(n)))&&await m.addStatsSidebar(c.config)});i.observe(document,{subtree:!0,childList:!0}),await m.addStatsSidebar(c.config)}})()},{"./audits":3,"./config":4,"./diffs":5,"./getters":8,"./progress":10,"./stats":11,"./title":13}],10:[function(e,t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.moveProgressToTabs=a.removeProgressBar=void 0;const c=e("./actions"),r=e("./domUtils"),l=e("./utils");a.removeProgressBar=e=>{const t=r.goParentUp(e,3);return!!t&&(t.remove(),!0)};a.moveProgressToTabs=e=>{var{selectors:{reviews:t}}=e;const r=c.selectActions(e),o=r.find(({href:e})=>/\/review\/suggested-edits/.test(e));var n=document.querySelector(t.daily),s=document.querySelector(t.done);if(!n||!s)return!1;e=l.trimNumericString(n.textContent||"0"),t=l.trimNumericString(s.textContent||"0"),s=+t/+e,s=l.toPercent(s);if(!o)return!1;const{style:i}=o;return i.background=`linear-gradient(90deg, var(--theme-primary-color) ${s}, var(--black-075) ${s})`,i.color="var(--black-600)",o.textContent+=` (${t}/${e})`,a.removeProgressBar(n)}},{"./actions":1,"./domUtils":7,"./utils":15}],11:[function(e,t,c){"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.addStatsSidebar=c.createRejectionCountItem=c.createEditorStatsItem=c.createEditAuthorItem=void 0;const l=e("./api"),d=e("./dom"),u=e("./getters"),m=e("./templaters"),p=e("./users"),f=e("./utils");c.createEditAuthorItem=({display_name:e,reputation:t,link:r})=>{const o=m.p("Name: ");return o.append(m.a(r,e)),d.createItem(m.ul({header:"Edit Author",items:[o,`Reputation: ${t}`]}))};c.createEditorStatsItem=({link:e},t)=>{const{approved:r,rejected:o,total:n,ratio:{approvedToRejected:s,ofApproved:i,ofRejected:a}}=u.getSuggestionTotals(t),c={header:"Author Stats",items:[]};if(n)return c.items.push(`Approved: ${r} (${f.toPercent(i)})`,`Rejected: ${o} (${f.toPercent(a)})`,`Of total: ${n}`,`Ratio: ${s.toExponential(1)}`),d.createItem(m.ul(c));{const l=m.p("Tag wiki/excerpt edits are not returned.");return l.append(m.br(),m.text("See their "),m.a(`${e}?tab=activity`,"activity tab")),c.items.push(l),d.createItem(m.ul(c))}};c.createRejectionCountItem=e=>{const t=Object.entries(e).filter(([,e])=>!!e),r=t.map(([e,t])=>`${f.scase(e)}: ${t}`);return r.length||r.push("No reject votes"),d.createItem(m.ul({items:r,header:"Reject votes"}))};c.addStatsSidebar=async e=>{const t=document.querySelector(e.selectors.actions.sidebar);if(!t)return!1;const r=document.createElement("div");r.classList.add("s-sidebarwidget","ml24","mt24");const o=document.createElement("div");o.classList.add("s-sidebarwidget--header"),o.textContent="Extra Info";const n=document.createElement("div");n.classList.add(e.classes.grid.container,"fd-column");var s=u.getEditAuthorId();if(!s)return!1;var[i,s]=await Promise.all([p.getUserInfo(s),l.getSuggestionsUserStats(s)]),e=await u.getRejectionCount(e);if(!i||!e)return!1;const a=[];return a.push(c.createEditAuthorItem(i),c.createEditorStatsItem(i,s),c.createRejectionCountItem(e)),n.append(...a),r.append(o,n),i&&t.append(r),!0}},{"./api":2,"./dom":6,"./getters":8,"./templaters":12,"./users":14,"./utils":15}],12:[function(e,t,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.ul=s.text=s.p=s.li=s.br=s.a=void 0;s.a=(e,t=e)=>{const r=document.createElement("a");return r.href=e,r.textContent=t,r.target="_blank",r.referrerPolicy="no-referrer",r};s.br=()=>document.createElement("br");s.li=e=>{const t=document.createElement("li");return"string"==typeof e?t.textContent=e:t.append(e),t};s.p=e=>{const t=document.createElement("p");return t.style.marginBottom="0",t.innerText=e,t};s.text=e=>document.createTextNode(e);s.ul=({header:e,items:t})=>{const r=document.createElement("ul"),{style:o}=r;if(o.listStyle="none",o.margin="0",e){const n=document.createElement("h3");n.classList.add("mb8"),n.textContent=e,r.append(n)}t=t.map(s.li);return r.append(...t),r}},{}],13:[function(e,t,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.optimizePageTitle=s.removeTitleLines=void 0;const i=e("./dom"),a=e("./utils");s.removeTitleLines=(e,t)=>(t||document).querySelectorAll(e.selectors.title.description).forEach(e=>e.remove());s.optimizePageTitle=e=>{var t=e.selectors.title.title;const r=document.querySelector(t);if(!r)return a.handleMatchFailure(t,!1);r.classList.add(e.classes.grid.container);t=document.querySelector(e.selectors.title.header);const o=i.createGridCell();o.classList.add("ml12"),t&&o.append(t);t=r.querySelector(e.selectors.title.learnMore);const n=o.cloneNode();return t&&n.append(t),s.removeTitleLines(e,r),r.append(o,n),!0}},{"./dom":6,"./utils":15}],14:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.getUserInfo=void 0;const n=e("./config");r.getUserInfo=async(e,t=n.DEF_SITE)=>{const r=new URL(`${n.API_BASE}/${n.API_VER}/users/${e}`);r.search=new URLSearchParams({site:t}).toString();const o=await fetch(r.toString());if(!o.ok)return null;var{items:[t]}=await o.json();return t}},{"./config":4}],15:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.trimNumericString=r.toPercent=r.toApiDate=r.scase=r.safeMatch=r.last=r.handleMatchFailure=void 0;r.handleMatchFailure=(e,t)=>(console.debug(`Couldn't find the element with selector: ${e}`),t);r.last=e=>e[e.length-1];r.safeMatch=(e,t,r="")=>(e.match(t)||[e,r]).slice(1);r.scase=e=>e[0].toUpperCase()+e.slice(1).toLowerCase();r.toApiDate=e=>(e.valueOf()/1e3).toString();r.toPercent=e=>`${Math.trunc(100*e)}%`;r.trimNumericString=e=>e.replace(/\D/g,"")},{}]},{},[9]);