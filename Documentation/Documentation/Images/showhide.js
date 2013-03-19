var allHTMLTags = new Array();
document.divs = new Array();

function getElementByClass(theClass) {
    var allHTMLTags=document.getElementsByTagName("*");
    for (var i=0; i<allHTMLTags.length; i++) {
        if (allHTMLTags[i].className==theClass) {
            return true;
        }
    }
    return false;
}

function ShowHideDiv(containerName, className, content){
    var container = document.getElementById(containerName);
    if(container == null)
        return;
    if(content == '') {//In case there are no divs in the page we still can change the icons.
        if(containerName == 'desktopRef') {
            if(container.innerHTML == '<img src="../Images/DesktopNO.png" alt="">') {
                container.innerHTML = '<img src="../Images/DesktopYES.png" alt="">';
                SetCookie(containerName, 'set', 30);
            } else {
                container.innerHTML = '<img src="../Images/DesktopNO.png" alt="">';
                UnSetCookie(containerName);
            }
        }
        if(containerName == 'iosRef') {
            if(container.innerHTML == '<img src="../Images/iPhoneNO.png" alt="">') {
                container.innerHTML = '<img src="../Images/iPhoneYES.png" alt="">';
                SetCookie(containerName, 'set', 30);
            } else {
                container.innerHTML = '<img src="../Images/iPhoneNO.png" alt="">';
                UnSetCookie(containerName);
            }
        }
        if(containerName == 'androidRef') {
            if(container.innerHTML == '<img src="../Images/AndroidNO.png" alt="">') {
                container.innerHTML = '<img src="../Images/AndroidYES.png" alt="">';
                SetCookie(containerName, 'set', 30);
            } else {
                container.innerHTML = '<img src="../Images/AndroidNO.png" alt="">';
                UnSetCookie(containerName);
            }    
        }
    } else {
        if(container.innerHTML == '<h1><img src="../Images/PlatformArrowRight.png" alt=""> ' + content + '</h1>') {
            container.innerHTML = '<h1><img src="../Images/PlatformArrowDown.png" alt="">' + content + '</h1>';
            SetCookie(containerName, 'set', 30);
        } else {
            container.innerHTML = '<h1><img src="../Images/PlatformArrowRight.png" alt="">' + content + '</h1>';
            UnSetCookie(containerName);
        }
    }
    for(var i = 0; i < document.divs.length; i++) {
        var divClassName = document.divs[i];
        var matched = false;
        if(divClassName.className == className)
               matched = true;
        if(matched) {
            
            if(divClassName != null) {
                if (divClassName.style.display == 'block') {
                    divClassName.style.display = 'none';
                    if(content == '') {
                        if(className == 'specific-desktop')
                            container.innerHTML = '<img src="../Images/DesktopNO.png" alt="" />';
                        if(className == 'specific-ios')
                            container.innerHTML = '<img src="../Images/iPhoneNO.png" alt="" />';
                        if(className == 'specific-android')
                            container.innerHTML = '<img src="../Images/AndroidNO.png" alt="" />';
                    } else {
                        container.innerHTML = '<h1><img src="../Images/PlatformArrowRight.png" alt="" /> ' + content + '</h1>';
                    }
                    UnSetCookie(containerName);
                } else {
                    divClassName.style.display = 'block';
                    if(content == '') {
                        if(className == 'specific-desktop')
                            container.innerHTML = '<img src="../Images/DesktopYES.png" alt="" />';
                        if(className == 'specific-ios')
                            container.innerHTML = '<img src="../Images/iPhoneYES.png" alt="" />';
                        if(className == 'specific-android')
                            container.innerHTML = '<img src="../Images/AndroidYES.png" alt="" />';
                    } else {
                        container.innerHTML = '<h1><img src="../Images/PlatformArrowDown.png" alt="" /> ' + content + '</h1>';
                    }
                    SetCookie(containerName, 'set', 30);
                }
            }
        }
    }
}

function UnSetCookie(cn) {
    SetCookie(cn,'',30);
}

function GetCookie(cName) {
    if (document.cookie.length > 0) {
            cStart = document.cookie.indexOf(cName + "=");
        if(cStart != -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd == -1) {
                cEnd = document.cookie.length;
            }
            return unescape(document.cookie.substring(cStart, cEnd));;
        }
    }
    return "";
}

function SetCookie(cName, value, expireDays) {
    var exDate = new Date();
    exDate.setDate(exDate.getDate()+expireDays);
    document.cookie = cName + "=" + escape(value) + ((expireDays ==null) ? "" : ";expires=" + exDate.toGMTString()) + ";path=/";
}

function DocLoaded() {
    document.divs = document.getElementsByTagName('div');
    var prefDesktop = GetCookie('desktopRef');
    var prefiOS = GetCookie('iosRef');
    var prefAndroid = GetCookie('androidRef');
    var firstTime = GetCookie('FT');
    if (firstTime == null || firstTime == "" ) {
        SetCookie('FT', 'no', 30);
        SetCookie('desktopRef', 'set', 30)
    } else if (prefDesktop == null || prefDesktop =="") {
        if(getElementByClass('desktopRefIMG')) {
            ShowHideDiv('desktopRef','specific-desktop','');
        } else {
            ShowHideDiv('desktopRef','specific-desktop','Desktop');
        }
    }
    if (prefiOS == null || prefiOS =="") {
        if(getElementByClass('iosRefIMG')) {
            ShowHideDiv('iosRef','specific-ios','');
        } else {
            ShowHideDiv('iosRef','specific-ios','iOS');
        }
    }
    if (prefAndroid == null || prefAndroid =="") {
        if(getElementByClass('androidRefIMG')) {
            ShowHideDiv('androidRef','specific-android','');
        } else {
            ShowHideDiv('androidRef','specific-android','Android');
        }
    }
}
