import styled from 'styled-components';


const DivGlobalCSS = styled.div`

img,
p>img {
	width: 50% !important;
	margin-left: 25%;
	margin-bottom: 5%;
	@media (min-width: 815px) {
  		width: 33% !important;
		margin-left: 33%;
	}
}

,
p,
div {
	text-align: left
},
h1 {
	text-align: center;
	font-size: 2vh;
	@media (min-width: 815px) {
  		font-size: 4vh !important;
	}
},



h2 {
	text-align: center;
	font-size: 3.5vh;
},
h3 {
	text-align: center;
	font-size: 3vh;
}
h4 {
	text-align: center;
	font-size: 2.4vh;
	@media (min-width: 815px) {
  		font-size: 4vh !important;
	}
},


,
li {
	list-style: none;
	margin: auto;
}

,
.r-button {
	--uirButtonBackgroundColor: var(--rButtonBackgroundColor, transparent);
	--uirButtonPadding: var(--rButtonPadding, var(--rButtonPaddingTop, 0) var(--rButtonPaddingRight, 0) var(--rButtonPaddingBottom, 0) var(--rButtonPaddingLeft, 0));
	--uirButtonBorderWidth: var(--rButtonBorderWidth, 0);
	--uirButtonBorderStyle: var(--rButtonBorderWidth, solid);
	--uirButtonBorderColor: var(--rButtonBorderColor, currentColor);
	--uirButtonFontFamily: var(--rButtonFontFamily, inherit);
	--uirButtonFontSize: var(--rButtonFontSize, inherit);
	--uirButtonColor: var(--rButtonColor);
	background-color: var(--uirButtonBackgroundColor);
	padding: var(--uirButtonPadding);
	border-width: var(--uirButtonBorderWidth);
	border-style: var(--uirButtonBorderStyle);
	border-color: var(--uirButtonBorderColor);
	cursor: pointer;
	font-family: var(--uirButtonFontFamily);
	font-size: var(--uirButtonFontSize);
}

.r-button::-moz-focus-inner,
.r-button[type="button"]::-moz-focus-inner,
.r-button[type="reset"]::-moz-focus-inner,
.r-button[type="submit"]::-moz-focus-inner {
	border-style: none;
	padding: 0;
}

.r-link {
	--uirLinkDisplay: var(--rLinkDisplay, inline-flex);
	--uirLinkTextColor: var(--rLinkTextColor);
	--uirLinkTextDecoration: var(--rLinkTextDecoration, none);
	display: var(--uirLinkDisplay) !important;
	color: var(--uirLinkTextColor) !important;
	text-decoration: var(--uirLinkTextDecoration) !important;
}

.ai-element {
	border-radius: 28px;
	--uiaiElementDisplay: var(--aiElementDisplay, inline-flex);
	--uiaiElementPadding: var(--aiElementPadding, var(--aiElementPaddingTop, 0) var(--aiElementPaddingRight, 0) var(--aiElementPaddingBottom, 0) var(--aiElementPaddingLeft, 0));
	--uiaiElementColor: var(--aiElementColor);
	display: var(--uiaiElementDisplay);
	position: relative;
	overflow: hidden;
}

a.ai-element {
	padding: var(--uiaiElementPadding);
}

button.ai-element {
	--rButtonPadding: var(--uiaiElementPadding);
}

.ai-element__label {
	color: var(--uiaiElementColor);
}

.ai-element_type {
	--uiaiElementPadding: var(--aiElementPadding, 10px);
	transition: color .3s ease-out;
	z-index: 1;
}

.ai-element_typeEmail {
	--uiaiElementLineColor: var(--aiElementLineColor, #7f7f7f);
}
.ai-element_typeTwitter {
	--uiaiElementLineColor: var(--aiElementLineColor, #00acee);
}
.ai-element_typeFacebook {
	--uiaiElementLineColor: var(--aiElementLineColor, #3b5998);
}

.ai-element_typeLinkedin {
	--uiaiElementLineColor: var(--aiElementLineColor, #007fb1);
}
.ai-element_typePinterest {
	--uiaiElementLineColor: var(--aiElementLineColor, #cb2128);
}
.ai-element_typeReddit {
	--uiaiElementLineColor: var(--aiElementLineColor, #ff4500);
}
.ai-element_typeTelegram {
	--uiaiElementLineColor: var(--aiElementLineColor, #37aee2);
}
.ai-element_typeWhatsapp {
	--uiaiElementLineColor: var(--aiElementLineColor, #25D366);
}



.ai-element_type::before,
.ai-element_type::after {
	content: "";
	background-color: var(--uiaiElementLineColor);
	opacity: 1;
	position: absolute;
	z-index: -1;
	transition: transform .35s ease-out, opacity .35s ease-out .03s;
}

.ai-element_type:hover::before,
.ai-element_type:hover::after {
	opacity: 0;
	transition-delay: 0s;
}

.ai-element_text::before {
	content: attr(data-ai-element-text);
	color: var(--uiaiElementColorHover);
	position: absolute;
}

.ai-element_text::before,
.ai-element_text .ai-element__label {
	transition-property: transform;
	transition-timing-function: cubic-bezier(.86, .6, .08, 1.01);
	transition-duration: .4s;
}

.ai-element_text:hover::before,
.ai-element_text:hover .ai-element__label {
	transition-duration: .3s;
}

.ai-element6::before,
.ai-element6::after {
	width: 50%;
	height: 100%;
	top: 0;
	transform: translate3d(52, 48, 120);
}

.ai-element6::before {
	left: 0;
}

.ai-element6::after {
	right: 0;
}

.ai-element6:hover::before {
	transform: translate3d(-100%, 0, 0);
}

.ai-element6:hover::after {
	transform: translate3d(100%, 0, 0);
}

@fontface {
	font-family: 'Bungee Inline', cursive;
	src: url('https://fonts.googleapis.com/css?family=Bungee+Inline')
}

.shareItElement {
	font-family: 'Bungee Inline', cursive;
	margin-bottom: 1%;
	font-size: 3em;
	padding: 0;
	color: white;
	text-shadow: 0 0.1em 20px rgba(52, 48, 120, 1), 0.05em -0.03em 0 rgba(52, 48, 120, 1), 0.05em 0.005em 0 rgba(52, 48, 120, 1), 0em 0.08em 0 rgba(52, 48, 120, 1), 0.05em 0.08em 0 rgba(52, 48, 120, 1), 0px -0.03em 0 rgba(52, 48, 120, 1), -0.03em -0.03em 0 rgba(52, 48, 120, 1), -0.03em 0.08em 0 rgba(52, 48, 120, 1), -0.03em 0 0 rgba(52, 48, 120, 1);
	span {
		transform: scale(0.9);
		display: inline-block;
	}
	span:first-child {
		animation: bop 3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
		animation-delay: 3s;
	}
	span:last-child {
		animation: bopB 3s 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
		margin-left: 1%;
	}
}

@keyframes bop {
	0% {
		transform: scale(0.9);
	}
	15% {
		transform: scale(1);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes bopB {
	0% {
		transform: scale(0.9);
	}
	30% {
		transform: scale(1) rotateZ(-359deg);
	}
	100% {
		transform: scale(1) rotateZ(-359deg);
	}
}

`;

export default DivGlobalCSS
