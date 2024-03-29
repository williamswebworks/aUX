    /* * Copyright: 4-2-2011 AppMobi * Description:  This script will replace all drop downs with friendly select controls.  Users can still interact * with the old drop down box as normal with javascript, and this will be reflected * @TODO - add listeners for new options added after page is rendered  */if(!window.aUX)	aUX={};if (!aUX.web)	aUX.web = {};aUX.web.appMobiSelect = function() {	this.oldSelects = [];};
aUX.web.appMobiSelect.prototype = {
    oldSelects: [],
    scroller: null,
    getOldSelects: function(elID) {
        if (!aUX.web.scroller) {
            alert("This library requires aUX_web scroller");
            return;
        }
        var container = elID && document.getElementById(elID) ? document.getElementById(elID) : document;
        if (!container) {
            alert("Could not find container element for aUX_web password " + elID);
            return;
        }
        var sels = container.getElementsByTagName("select");
        for (var i = 0; i < sels.length; i++) {
            this.oldSelects.push(document.getElementById(sels[i]));
        }
        var that = this;
        for (var i = 0; i < sels.length; i++) {
            var fakeInput = document.createElement("div");
            var selWidth = parseInt(sels[i].style.width) > 0 ? parseInt(sels[i].style.width) : 100;
            var selHeight = parseInt(sels[i].style.height) > 0 ? parseInt(sels[i].style.height) : 20;
            //fakeInput.type = "text";
            fakeInput.style.width = selWidth + "px";
            fakeInput.style.height = selHeight + "px";
            fakeInput.style.position = "absolute";
            fakeInput.style.left = "0px";
            fakeInput.style.top = "0px";
            fakeInput.style.zIndex = "1";
            fakeInput.value = sels[i].value;
            fakeInput.style.background = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAIAAABFWWJ4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM1NjQxRUQxNUFEODExRTA5OUE3QjE3NjI3MzczNDAzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM1NjQxRUQyNUFEODExRTA5OUE3QjE3NjI3MzczNDAzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzU2NDFFQ0Y1QUQ4MTFFMDk5QTdCMTc2MjczNzM0MDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzU2NDFFRDA1QUQ4MTFFMDk5QTdCMTc2MjczNzM0MDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6YWbdCAAAAlklEQVR42mIsKChgIBGwAHFPTw/xGkpKSlggrG/fvhGjgYuLC0gyMZAOoPb8//9/0Or59+8f8XrICQN66SEnDOgcp3AgKiqKqej169dY9Hz69AnCuHv3rrKyMrIKoAhcVlBQELt/gIqwstHD4B8quH37NlAQSKKJEwg3iLbBED8kpeshoGcwh5uuri5peoBFMEluAwgwAK+5aXfuRb4gAAAAAElFTkSuQmCC') right top no-repeat";
            fakeInput.style.backgroundColor = "white";
            fakeInput.className = "appMobiSelect_fakeInput "+sels[i].className;
            fakeInput.id = sels[i].id + "_appMobiSelect";
            fakeInput.style.border = "1px solid gray";
            fakeInput.style.color = "black";
            var imageMask = document.createElement("input");
            imageMask.type = "image";
            imageMask.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
            imageMask.style.width = selWidth + 5 + "px";
            imageMask.style.height = selHeight + 5 + "px";
            imageMask.style.left = "0px";
            imageMask.style.top = "0px";
            imageMask.style.zIndex = "2";
            imageMask.style.position = "absolute";
            imageMask.linkId = sels[i].id;
            imageMask.className = "appMobiSelect_imageMask";
            imageMask.onclick = function(e) {
                e.preventDefault();
                that.initDropDown(this.linkId);
            };
            sels[i].parentNode.appendChild(fakeInput);
            sels[i].parentNode.appendChild(imageMask);
            sels[i].parentNode.style.position = "relative";
            sels[i].style.display = "none";
            sels[i].style.webkitAppearance = "none";

            // Create listeners to watch when the select value has changed.
            // This
            // is needed so the users can continue to interact as normal,
            // via
            // jquery or other frameworks
            for (var j = 0; j < sels[i].options.length; j++) {
                if (sels[i].options[j].selected)
                    fakeInput.value = sels[i].options[j].text;
                this.watcher(sels[i].options[j], "selected", function(prop, oldValue, newValue) {
                    if (newValue == true) {
                        that.updateMaskValue(this.parentNode.id, this.text);
                        this.parentNode.value = this.value;
                    }
                    return newValue;
                });
            }
            this.watcher(sels, "selectedIndex", function(prop, oldValue, newValue) {
                if (this.options[newValue]) {
                    that.updateMaskValue(this.id, this.options[newValue].text);
                    this.value = this.options[newValue].value;
                }
                return newValue;
            });
            this.createHtml();
        }
    },
    updateDropdown: function(id) {
        var el = document.getElementById(id);
        if (!el)
            return;
        for (var j = 0; j < el.options.length; j++) {
            if (el.options[j].selected)
                fakeInput.value = el.options[j].text;
            ;
            this.watcher(el.options[j], "selected", function(prop, oldValue, newValue) {
                if (newValue == true) {
                    that.updateMaskValue(this.parentNode.id, this.text);
                    this.parentNode.value = this.value;
                }
                return newValue;
            });
        }
    },
    initDropDown: function(elID) {
        var that = this;
        var el = document.getElementById(elID);
        if (!el || !el.options || el.options.length == 0)
            return;
        var htmlTemplate = "";
        var foundInd = 0;
        document.getElementById("appMobiselectBoxScroll").innerHTML = "";
        for (var j = 0; j < el.options.length; j++) {
            var currInd = j;
            this.watcher(el.options[j], "selected", function(prop, oldValue, newValue) {
                if (newValue == true) {
                    that.updateMaskValue(this.parentNode.id, this.text);
                    this.parentNode.value = this.value;
                }
                return newValue;
            });
            var checked = (el.value == el.options[j].value) ? true : false;
            var button = "";
            var bg = "background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.17, rgb(102,102,102)),color-stop(0.59, rgb(94,94,94)))";
            var foundID;
            if (checked) {
                bg = "background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.17, rgb(8,8,8)),color-stop(0.59, rgb(38,38,38)))";
                button = "checked";
                foundInd = j;
                foundID = "id='appmobiSelectBox_found'";
            } else {
                foundID = "";
            }
            var div = document.createElement("div");
            div.id = foundID;
            div.style.cssText = bg + ";padding-top:10px;font-size:80%;padding-left:10px;height:30px;width:100%;position:relative;width:100%;";
            var anchor = document.createElement("a");
            anchor.href = "javascript:;";
            anchor.tmpValue = j;
            anchor.onclick = function() {
                that.setDropDownValue(elID, this.tmpValue);
            };
            anchor.style.cssText = "text-decoration:none;color:white;";
            anchor.innerHTML = el.options[j].text;
            var span = document.createElement("span");
            span.style.cssText = "float:right;margin-right:20px;margin-top:-2px";
            var rad = document.createElement("button");
            if (foundID)
                rad.style.cssText = "color: #ffffff;padding: 0px 0px;background: -webkit-gradient(linear, left top, left bottom,from(#ffffff),color-stop(0.50, #3b3b3b),color-stop(0.50, #242424),to(#ffffff));border-radius: 30px;border: 0px solid #000000;-webkit-box-shadow:	0px 1px 3px rgba(000,000,000,0.5),inset 0px 0px 1px rgba(255,255,255,0.6);";
            else
                rad.style.cssText = "color: #ffffff;padding: 0px 0px;background: -webkit-gradient(linear, left top, left bottom,from(#ffffff),color-stop(0.44, #dbd8db),to(#ffffff));border-radius: 30px;border: 0px solid #000000;-webkit-box-shadow:	0px 1px 3px rgba(000,000,000,0.5),inset 0px 0px 1px rgba(255,255,255,0.6);";
            rad.style.width = "20px";
            rad.style.height = "20px";
            rad.tmpValue = j;
            rad.onclick = function() {
                that.setDropDownValue(elID, this.tmpValue);
            };
            rad.checked = button;
            span.appendChild(rad);
            div.appendChild(anchor);
            div.appendChild(span);
            document.getElementById("appMobiselectBoxScroll").appendChild(div);
        }
        try {
            document.getElementById("appMobiselectBoxContainer").style.display = 'block';
        } catch (e) {
            console.log("Error showing div " + e);
        }
        try {
            var scrollThreshold = 40;
            var scrollToPos = (foundInd) * -scrollThreshold;
            if (foundInd >= 3) {
                this.scroller.scrollTo({
                    x: 0,
                    y: scrollToPos
                });
            }
        } catch (e) {
            console.log("error init dropdown" + e);
        }
    },
    updateMaskValue: function(elID, value) {
        var el = document.getElementById(elID + "_appMobiSelect");
        if (el)
            el.innerHTML = value;
        var theSel = document.getElementById(elID);
        if (theSel && typeof (theSel.onchange) == "function") {
            theSel.onchange(value);
        }
    },
    setDropDownValue: function(elID, value) {
        var el = document.getElementById(elID);
        if (el) {
            el.selectedIndex = value;
        }
        this.scroller.scrollTo({
            x: 0,
            y: 0
        });
        this.hideDropDown();
    },
    hideDropDown: function() {
        document.getElementById("appMobiselectBoxContainer").style.display = 'none';
        document.getElementById("appMobiselectBoxScroll").innerHTML = "";
    },
    createHtml: function() {
        var that = this;
        if (document.getElementById("appMobiselectBoxContainer"))
            return;
        var myDiv = document.createElement("div");
        myDiv.id = "appMobiselectBoxContainer";
        myDiv.style.cssText = "position:absolute;bottom:0px;display:none;width:100%;height:175px; z-index:200000;background:black;color:white;";
        myDiv.innerHTML = '<div style=\'height:35px;width:100%;text-align:center;\'><button id="appMobiSelectCloseButton"  style="width:100px;background:#e3e3e3;border: 1px solid #bbb;border-radius: 6px;box-shadow: inset 0 0 1px 1px #f6f6f6;color: #333;font-weight: bold;line-height: 1;padding: 8px 0 9px;text-align: center;text-shadow: 0 1px 0 #fff;width: 6-px;">Done</button></div><div id="appMobiselectBoxFix"  style="position:relative;height:150px;background:black;overflow:hidden;width:100%"><div id="appMobiselectBoxScroll"></div></div>';
        document.body.appendChild(myDiv);
        document.getElementById('appMobiSelectCloseButton').onclick = function() {
            that.hideDropDown();
        };
        try {
            this.scroller = new aUX.web.scroller("appMobiselectBoxScroll", {
                scroller: false,
                verticalScroll: true
            });
        } catch (e) {
            console.log("Error creating select html " + e);
        }
    },
    watcher: function(object, prop, handler) {
        var that = object;
        var val = object[prop];
        window.setInterval(function() {
            newval = that[prop];
            if (newval != val) {
                handler.call(that, prop, val, newval);
                val = newval;
            }
        }, 1500);
    }
};function getScrollerValue(el) {	return document.getElementById(el).value;}