export const MOBILE_REG = /^1[3-9]\d{9}$/;
export const PASSWORD_REG = /[a-zA-Z].*\d.*|\d.*[a-zA-Z].*/;
export const CAPTCHA_REG = /\w{4}$/;
export const SMS_REG = /\w{6}$/;

export const NUMBER = /^[0-9]+$/;
export const LETTER = /^[a-zA-Z]*$/;
export const CHARACTER = /[|`~!@#$%^&*()\-_+=\\{}[\]:;'".,<>?/～·！￥…（）—；：‘“、「」【】《》，。？／]/;

export const TKL_BY_COPY = /https:\/\/m\.tb\.cn\/h\..*?sm=[0-9a-zA-Z]{6}\s+(.+)/;
export const TKL_BY_SHARE = /(👈|\.0)\s*(ha|hihi|hi):\/.+[0-9a-zA-Z]{11}.\s+(.+)/;
