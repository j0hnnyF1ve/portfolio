//var Dialog = (Dialog) ? Dialog : {};
/*
   Dialog
   Creation, opening, and closing of a dialog
*/

function Dialog(params)
{
   if(params)
   {
      if(!params.id) { alert('Problem initializing Dialog: No dialog ID provided.'); return; }

      var thisObj = this;
      this.dialogId = params.id;
      this.dialogWidth = params.width || 400;
      this.dialogHeight = params.height || 400;
      $('#' + this.dialogId + ' .closeButton').on('click', function() { thisObj.closeModal(); } ); 
   }
}

Dialog.prototype = {
   constructor: Dialog,
   openModal: function()
   {
      $('#' + this.dialogId).modal({
            autoPosition: true,
            autoResize: true,
            escClose: true,
            overlayCss: { backgroundColor: 'rgb(0,0,0)' },
            containerCss: { backgroundColor: 'rgb(255,255,255)', border: 'solid 1px black', width: this.dialogWidth, height: this.dialogHeight, overflow: 'hidden'},
            onOpen: function(dialog) { dialog.overlay.fadeIn(300, function() { dialog.container.show(); dialog.data.show(); } ); }
      });
   },
   closeModal: function()
   {
      $.modal.close();
   },
   changeDisplay: function(displayHtml)
   {
      $('#' + this.dialogId + ' .display').html(displayHtml);
   }
}


