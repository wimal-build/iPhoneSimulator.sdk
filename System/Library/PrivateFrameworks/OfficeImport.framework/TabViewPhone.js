


/********  Utilities.js  ******************************/
$ = function $(selector){ return document.documentElement.$(selector); };
$$ = function $$(selector){ return document.documentElement.$$(selector); };

Element.prototype.$ = function $(anyCSSselector){
	return this.querySelector(anyCSSselector);
};

Element.prototype.$$ = function $$(anyCSSselector){
	return this.querySelectorAll(anyCSSselector);
};


//********* Web Inspector's Utility Methods *********/
// Fixme: understand, evaluate, strip and test this code
Element.prototype.addClassName = function addClassName(className){
	if(!this.hasClassName(className))
		this.className += ' '+ className;
};

Element.prototype.removeClassName = function removeClassName(className){
	// Test for the simple case before using a RegExp.
    if (this.className === className)
        this.className = "";
	else
    	this.removeMatchingClassNames(className.escapeForRegExp());
};

Element.prototype.removeMatchingClassNames = function removeMatchingClassNames(classNameRegex){
    var regex = new RegExp("(^|\\s+)" + classNameRegex + "($|\\s+)");
    if (regex.test(this.className))
        this.className = this.className.replace(regex, " ");
};

Element.prototype.hasClassName = function hasClassName(className){
    if (!className)
        return false;
    // Test for the simple case before using a RegExp.
    if (this.className === className)
        return true;
    var regex = new RegExp("(^|\\s)" + className.escapeForRegExp() + "($|\\s)");
    return regex.test(this.className);
};

String.prototype.escapeForRegExp = function escapeForRegExp(){
    return this.escapeCharacters("^[]{}()\\.$*+?|");
};

String.prototype.escapeCharacters = function escapeCharacters(chars){
    var foundChar = false;
    for (var i = 0; i < chars.length; ++i) {
        if (this.indexOf(chars.charAt(i)) !== -1) {
            foundChar = true;
            break;
        }
    }

    if (!foundChar)
        return this;

    var result = "";
    for (var j = 0; j < this.length; ++j) {
        if (chars.indexOf(this.charAt(j)) !== -1)
            result += "\\";
        result += this.charAt(j);
    }

    return result;
};


/********  Native.js  ******************************/
/* Native behaviour: the window has an inactive style when blurred */
document.defaultView.onfocus = function windowOnFocus(event){
	document.body.removeClassName('inactive');
	//console.log('Back to App at '+ Date());
};

document.defaultView.onblur = function windowOnBlur(event){
	document.body.addClassName('inactive');
	//console.log('Leaving App at '+ Date());
};

/* Native behaviour: prevent the default right-click on a page. 
	(We don't want to allow WebInspector for instance.)
	http://www.quirksmode.org/dom/events/contextmenu.html */
document.documentElement.oncontextmenu = function documentOnContextMenu(event){
	//event.preventDefault(); //disabled during development
};


function initTabViewsInPage(){
	var TabViewsInPage = document.documentElement.getElementsByClassName('TabView');
	var horizTabViews = [];
	for (var i=0; i < TabViewsInPage.length; i++) {
		var newTabView = new TabView().initFromDOM(TabViewsInPage[i]);
		horizTabViews.push(newTabView);
	}
	
	// Handle overflow - only for horizontal TabViews.
	window.onresize = dispatchResizeToHorizontalTabViews;
	dispatchResizeToHorizontalTabViews();
	
	function dispatchResizeToHorizontalTabViews(event){
		var j=0, length = horizTabViews.length;
		for (; j < length; j++) {
			horizTabViews[j].fixOverflowIfNeeded();
		}	
	}
}


TabView = function(){};

TabView.prototype = {
	initFromScript : function(something){
		//placeholder
		return this;
	},
	
	initFromDOM : function(tabViewElement){
		this.DOMelement = tabViewElement;
		var nodeList = this.DOMelement.getElementsByClassName('TabViewItem');
		this.tabs = [];
		// convert nodelist to array
		for(var i=0; i< nodeList.length; i++){
			this.tabs.push(nodeList[i]);
		}
		this.selectedTab = this.DOMelement.getElementsByClassName('selected')[0] || this.DOMelement.children[0]; //Select first tab if none specified.
        this.setSelectedTab(this.selectedTab);

		if(!this.selectedTab) //if TabView is empty
			return this; 
		this.selectedTab.addClassName('selected');

		// Looping in Tabs
		for (var j=0; j < this.tabs.length; j++){
			var tab = this.tabs[j];

			tab.children[0].style.zIndex = this.tabs.length+1 - j; //make the (iTunes) tabs stack in the right order
            
			var self = this;
			tab.onclick = function(){  
				self.setSelectedTab(this);
			};
		}

		return this;
	},
	
	setSelectedTab : function(newTab){
		if (this.selectedTab) this.selectedTab.removeClassName("selected");
		newTab.addClassName("selected");
		this.selectedTab = newTab;
		this.indexOfSelectedTab = this.tabs.indexOf(newTab);
		this.fixOverflowIfNeeded();//quick hack to get the overflow in selected mode.
        var address = newTab.getElementsByTagName('a')[0].href;
        var excelView = document.getElementById('ExcelView');
		excelView.src = address;
	},
	
	fixOverflowIfNeeded : function(){
   		//console.log("%s, %s", this.DOMelement.scrollWidth, this.DOMelement.offsetWidth);
	   	
		if(this.clippingMask) //Don't alter overflow detection
	    	this.clippingMask.style.display = "none";
	
	   	var isOverflowing = this.DOMelement.scrollWidth > this.DOMelement.offsetWidth;

		var tabsWidth = 0;
		for (var j=0; j < this.tabs.length; j++){
			var tab = this.tabs[j];
			var tabWidth = tab.children[0].offsetWidth;
			tabsWidth = tabsWidth+tabWidth;
		}
		document.getElementById('tabs').style.minWidth = tabsWidth +"px";
	}
	
};

