//var Dialog = (Dialog) ? Dialog : {};
/*
   Dialog
   Creation, opening, and closing of a dialog
*/
var Dialog = (function($) {

// private members of Dialog

var listeners = {};
var listenerType = ["open", "close"];
// initialize the array for each listener type
for(let type of listenerType) {
  listeners[type] = [];
}

// Dialog constructor
function Dialog(params) {
   if(params)
   {
      if(!params.id) { alert("Problem initializing Dialog: No dialog ID provided."); return; }

      var thisObj = this;
      this.dialogId = params.id;
      this.dialogWidth = params.width || 400;
      this.dialogHeight = params.height || 400;
      $("#" + this.dialogId + " .closeButton").on("click", function() { thisObj.closeModal(); } );
      this.listenerType = listenerType;
   }
}

// Dialog public methods
Dialog.prototype = {
   constructor: Dialog,
   openModal: function()
   {
      $("#" + this.dialogId).modal({
            autoPosition: true,
            autoResize: true,
            escClose: true,
            overlayCss: { backgroundColor: "rgb(0,0,0)" },
//            containerCss: { backgroundColor: "rgb(255,255,255)", border: "solid 1px black", width: this.dialogWidth, height: this.dialogHeight, overflow: "hidden"},
            containerCss: { width: this.dialogWidth, height: this.dialogHeight, overflow: "hidden"},
            onOpen: function(dialog) {
              var self = this;
              dialog.overlay.fadeIn(300, function() {
                dialog.container.show(); dialog.data.show();
                $(dialog.overlay).on( 'click', function() { self.close() } );
              } );
              for(let listener of listeners["open"]) { listener.apply(dialog, arguments); }
            },
            onClose: function(dialog) {
              for(let listener of listeners["close"]) { listener.apply(dialog, arguments); }
              this.close();
            }
      });
   },
   closeModal: function() {
      $.modal.close();
   },
   changeDisplay: function(displayHtml) {
      $("#" + this.dialogId + " .display").html(displayHtml);
   },
   addListener : function(type, listener) {
     if(!listenerType.includes(type) ) { return; }

     listeners[type].push(listener);
   },
   removeListener : function(type, listener) {
     if(!listenerType.includes(type) ) { return; }

     for(let i=0; i < listeners[type].length; i++) {
       if(listener === listeners[type][i]) { listeners[type].splice(i, 1); }
     }
   },
   getListeners : function(type) {
     if(!listenerType.includes(type) ) { return; }

     return listeners[type];
   }
}

return Dialog;

})(jQuery);
