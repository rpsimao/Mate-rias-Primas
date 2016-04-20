function makeCal(id)
{
	

	$("#" + id).datepicker({ dateFormat: "yy-mm-dd" , 
    	dayNamesMin: ["Dom","Seg", "Ter", "Qua", "Qui", "Sex", "Sab"], 
    	monthNames:["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    	monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
		
	});
	$('#'+id).datepicker($.datepicker.regional['pt']);

}


function onlyInt(id)
{
	
	$("#"+id).keypress(function (e)  
			{
				if(e.which!=8 && e.which!=0 && e.which!=44 && e.which!=46 && e.which!=13 && (e.which<48 || e.which>57))
			{
					$('.up-right').notify({
					    message: { html: '<i class="icon-warning-sign"></i>&nbsp;&nbsp;&nbsp;<b>Apenas números.</b>' },
					    type: 'error'
					  }).show();
					
					return false;
					}
			});

}

function selectBox(id){

	
	    var $this = $("#"+id);
	    $this.select();

	    // Work around Chrome's little problem
	    $this.mouseup(function() {
	        // Prevent further mouseup intervention
	        $this.unbind("mouseup");
	        return false;
	    });
	

};