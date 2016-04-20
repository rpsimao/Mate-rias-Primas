$(function(){
	
	$('#example').dataTable( {
		"sDom": "<'row'<'span3'l><'span3'f>r>t<'row'<'span6'i><'span6'p>>",
		"sPaginationType": "bootstrap",
		"oLanguage": {
			'sPrevious': "Anterior",
			'sNext': "Próximo",
			"sLengthMenu": "_MENU_ por pág.",
			"sZeroRecords": "Sem reultados",
            "sInfo": "A mostrar _START_ a _END_ de _TOTAL_ resultados",
            "sInfoEmpty": "Mostrar 0 até 0 de 0 resultados",
            "sInfoFiltered": "(filtrados de _MAX_ resultados)",
            'sSearch': '<i class="icon-search"></i> _INPUT_'
			
		},
		
		
	} );
	
	makeCal("abertura_obra");
	makeCal("data_entrega");
	
	
	var fields = $("#rawrows").val();

	 for (var i=1; i<fields; i++)
	 { 
		 $( "#drag-"+i ).draggable({ 
			 revert: "valid",
			 cursor: "move",
			 drag: function()
			 {
				 $(this).addClass("RPS_drag");   
			 }


		});
		 

		 $("#qtd_req"+i).droppable({
			    drop: function(event, ui){

			    	var str1 = ui.draggable.attr('class');
			    	var fstrField = ui.draggable.attr('id');
			    	var fieldID = fstrField.replace(/[^\d]/g, '');
			    	var dropObj = $(this).attr('id');
			    	var dropID = dropObj.replace(/[^\d]/g, '');

			    	var val1 = str1.replace(/[^\d]/g, '');

			        var val2 = $(this).val();

			       

				    if ($("#grs"+dropID).val() == $("#grs"+ fieldID).val() && 
						$("#altura"+dropID).val() == $("#altura"+ fieldID).val() && 
						$("#larg"+dropID).val() == $("#larg"+ fieldID).val() &&
			            val1 != val2
			            ){
				    	
					        var sum = parseInt(val1)+parseInt(val2);

					        $(this).val(sum);
					        removeField(fieldID);

						 }

				    else {

				           $(ui.draggable).removeClass("RPS_drag");
				          displayAlert('Os papeis não são iguais!');
					    }
			    	
				    }


			 });
	 };

	 onlyInt("obra");
	 var rowCount = $('#mat-prima-table tr').length;	
	 for (var i=1; i<=rowCount; i++)
	 {
		 onlyInt("grs"+i);
		 onlyInt("altura"+i);
		 onlyInt("larg"+i);
		 onlyInt("qtd_req"+i);
	 }
	 

});



function showObs(id)
{
	
	$( "#obs"+id ).toggle(
			
			$('#obsButton'+id).html($("#obs"+id).is(':visible') ? '<i class="icon-pencil"></i>&nbsp; Escrever' : '<i class="icon-collapse"></i>&nbsp; Fechar'),
			$("#obs"+id).is(':visible') ? showMe(id): hideMe(id)
	);
	
	
		
}

function hideMe(id)
{
	$("#td-tipo-"+id).hide();
	$("#td-grs-"+id).hide();
	$("#td-altura-"+id).hide();
	$("#td-larg-"+id).hide();
	$("#td-qtd_req-"+id).hide();
	$("#td-fsc-"+id).hide();
	$("#td-pefc-"+id).hide();
	$("#td-btn-"+id).hide();


}

function showMe(id)
{
	$("#td-tipo-"+id).show();
	$("#td-grs-"+id).show();
	$("#td-altura-"+id).show();
	$("#td-larg-"+id).show();
	$("#td-qtd_req-"+id).show();
	$("#td-fsc-"+id).show();
	$("#td-pefc-"+id).show();
	$("#td-btn-"+id).show();
}


function removeField(id)
{
	$("#rawInputField"+id ).remove();
	
	
}


function createRow()
{
    var i = $("#rawrows").val();

    var html = '<tr id="rawInputField'+i+'"><td><label class="" for="tipo'+i+'"><i class="icon-map-marker"></i> Tipo:&nbsp;<a href="#" onclick="listPaper('+i+')"><i class="icon-info-sign"></i></a></label><input type="text" class="input-xlarge" id="tipo'+i+'" name="tipo'+i+'" onfocus="selectBox(\'tipo\''+i+');"> </td>';

    html+='<td><label class="" for="grs'+i+'"><i class="icon-sort"></i> Grs.:&nbsp;</label><input type="text"  class="input-mini" id="grs'+i+'" name="grs'+i+'"></td>';
    html+='<td><label class="" for="altura'+i+'"><i class="icon-resize-vertical"></i> Alt:&nbsp;</label><input type="text" class="input-mini" id="altura'+i+'" name="altura'+i+'"></td>';
    html+='<td><label class="" for="larg'+i+'"><i class="icon-resize-horizontal"></i> Larg:&nbsp;</label><input type="text" class="input-mini" id="larg'+i+'" name="larg'+i+'"></td>';
    html+='<td><label id="drag-'+i+'" for="qtd_req'+i+'"><i class="icon-align-justify" ></i> Qtd:&nbsp;</label><input type="text" class="input-mini" id="qtd_req'+i+'" name="qtd_req'+i+'"></td>';
    html+='<td class="sp-left-20"><label class="" for="fsc'+i+'"><i class="icon-leaf"></i> FSC:&nbsp;</label><input type="checkbox" id="fsc'+i+'" name="fsc'+i+'"></td>';
    html+='<td class="sp-left-20"><label class="" for="pefc'+i+'"><i class="icon-leaf"></i> PEFC:&nbsp;</label><input type="checkbox" id="pefc'+i+'" name="pefc'+i+'"></td>';
    html+='<td class="sp-left-20"><label class="" for="obs'+i+'"><i class="icon-comment"></i> Obs:&nbsp;</label><button class="btn btn-mini btn-info" type="button" id="obsButton'+i+'" onclick="showObs('+i+');"><i class="icon-pencil"></i>&nbsp;Escrever</button><textarea id="obs'+i+'" name="obs'+i+'" style="display:none;"></textarea></td>';
    html+='<td class="sp-left-20"><label>&nbsp;</label><button class="btn btn-mini btn-danger" type="button" onclick="removeField('+i+');"><i class="icon-remove-sign"></i>&nbsp;Remover</button></td>';

    $(html).appendTo("#mat-prima-table");
    

    var sum = parseInt(i)+1;

    $("#rawrows").val(sum);
    
    //console.log($("#rawrows").val());
	
}

function listPaper(rowID)
{
	
	$("#row-for-paper-id").val(rowID);
	
	$('#myModal').modal({
		  keyboard: true,
		  show: true,
		});
}

function sendRaw(id)
{
	var whereFrom = $("#row-for-paper-id").val();

	var tipo = $("#raw-id-name-"+id).text();
	var grs = $("#raw-id-grs-"+id).text();
	var alt = $("#raw-id-alt-"+id).text();
	var larg = $("#raw-id-larg-"+id).text();



	$('#myModal').modal('hide');
	
	
	 $("#tipo"+whereFrom).val(tipo);
	 $("#grs"+whereFrom).val(grs);
	 $("#altura"+whereFrom).val(alt);
	 $("#larg"+whereFrom).val(larg);
	 $("#qtd_req"+whereFrom).val("");
	 $("#qtd_req"+whereFrom).focus();
}/* Set the defaults for DataTables initialisation */






function createError(id, msg)
{
		displayAlert(msg);
	 	$(id).css({ "background-color": "#ffd7dd" });
	 	$(id).focus();
	 	$(id).change(function(){
	 		$(id).css({ "background-color": "#ffffff" });
	 	});
	 	$(id).keyup(function(){
	 		$(id).css({ "background-color": "#ffffff" });
	 	});
}


function displayAlert(msg)
{
	var dsp = $('.up-right').notify({
	    message: { html: '<i class="icon-warning-sign"></i>&nbsp;&nbsp;&nbsp;<b>'+msg+'</b>' },
	    type: 'error'
	  }).show();

	return dsp;
}

function checkForm(){
	
	var rowCount = $('#mat-prima-table tr').length;	
	
	var obra = $("#obra").val();
	var cliente = $("#cliente").val();
	var abObra = $("#abertura_obra").val();
	var entrg = $("#data_entrega").val();
	var desc = $("#descricao").val();
	
	if( obra == "")
	 {
		 createError(obra, "Tem de introduzir o número da Obra!");
		 return false;
	 }
	 
	 if( cliente == "")
	 {
		 createError(cliente, "Tem de introduzir o Cliente!");
		 return false;
	 }
	 
	 if( abObra == "")
	 {
		 createError(abObra, "Tem de introduzir a data de abertura de obra");
		 return false;
	 }
	 
	 if( entrg == "")
	 {
		 createError(entrg, "Tem de introduzir a data de entrega do trabalho!");
		 return false;
	 }
	 
	 if( desc == "")
	 {
		 createError(desc, "Tem de introduzir a descrição do trabalho!");
		 return false;
	 }
	
	
	 for (var i=1; i<=rowCount; i++)
	 {
		 if( $("#tipo"+i).val() == "")
		 {
			 createError("#tipo"+i, "Tem de escolher o tipo de papel!");
			 return false;
		 }
		 
		 if( $("#grs"+i).val() == "")
		 {
			 createError("#grs"+i, "Tem de introduzir a gramagem do papel!");
			 return false;
		 }
		 
		 if( $("#altura"+i).val() == "")
		 {
			 createError("#altura"+i, "Tem de introduzir a altura do papel!");
			 return false;
		 }
		 
		 if( $("#larg"+i).val() == "")
		 {
			 createError("#larg"+i, "Tem de introduzir a largura do papel!");
			 return false;
		 }
		 
		 if( $("#qtd_req"+i).val() == "")
		 {
			 createError("#qtd_req"+i, "Tem de introduzir a quantidade do papel!");
			 return false;
		 }
	  }
	 
	
}

