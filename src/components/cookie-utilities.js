const YEAR_IN_SECONDS = 365 * 24 * 60 * 60;


export function getCookie(cookieName){
    //regex search cookies where the cookieName=cookieValue
    var match = document.cookie.match(new RegExp(`(?:^| )${cookieName}=([^;]+)`))
    if(match) return match[1];
}

export function setCookie(cookieName,value,path){
    if(cookieName==="accept-cookies" || getCookie("accept-cookies")==="true"){
        document.cookie = ` ${cookieName}=${value};expires=${(new Date(Date.now() + YEAR_IN_SECONDS)).toUTCString()}${path? ";path="+path : ""}`;
    }
}
