
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
	
});	
	function calculateQty(id)
{
	
	var pedida = parseInt($("#qtdped"+id).text());
	
	var armazem = parseInt($("#armazem"+id).val());
	
	var pedido = pedida - armazem;
	
	if (pedido)
		{
		 $("#aencomendar"+id).text(pedido);
		}
	
	
	
	if (armazem > pedida)
		{
			$('#loading-animation').show()
			.html('<div class="alert alert-error"><i class="icon-minus-sign"></i>&nbsp;&nbsp;&nbsp;<span class="err-txt"><b>ERRO</b> A quantidade em armazém não pode ser maior que a pedida!</span></div>');
			$("#aencomendar"+id).text("");
			$('#loading-animation').fadeOut(10000);
		}

}

function obs(id, db)
{

var obj = $("#obs"+id);

var txtOriginal = obj.text();

	obj.html('<textarea id="obs-newtext-'+id+'" rows="6">'+txtOriginal+'</textarea>');
	$("#obs"+id+"edit").html('<a href="#" class="btn btn-danger btn-mini" onclick="saveObs('+id+','+db+')">Gravar</a>');
	
	$("#tipo"+id).html('<input type="text" id="novo-tipo-'+id+'" value="'+$("#tipo"+id).text()+'" onfocus="listPaper('+id+')">');
	$("#grs"+id).html('<input type="text" class="input-mini" id="novo-grs-'+id+'" value="'+$("#grs"+id).text()+'" >');
	$("#altura"+id).html('<input type="text" class="input-mini" id="novo-altura-'+id+'" value="'+$("#altura"+id).text()+'" >');
	$("#largura"+id).html('<input type="text" class="input-mini" id="novo-largura-'+id+'" value="'+$("#largura"+id).text()+'" >');
	$("#qtdped"+id).html('<input type="text" class="input-mini" id="novo-qtdped-'+id+'" value="'+$("#qtdped"+id).text()+'" >');
	$("#del"+id).hide();
	
	
	
	var fscV1 = $("#fsc"+id).text();
	
	if (fscV1 == "Sim"){
		
		$("#fsc"+id).html('<select id="fsc-novo-'+id+'" class="input-mini"><option value="1" selected="selected">Sim</option><option value="0">Não</option></select>');
		
	} else {
		
		$("#fsc"+id).html('<select id="fsc-novo-'+id+'" class="input-mini"><option value="1">Sim</option><option value="0" selected="selected">Não</option></select>');
	}
	
	
	var pefcV1 = $("#pefc"+id).text();
		
		if (pefcV1 == "Sim"){
			
			$("#pefc"+id).html('<select id="pefc-novo-'+id+'" class="input-mini"><option value="1" selected="selected">Sim</option><option value="0">Não</option></select>');
			
		} else {
			
			$("#pefc"+id).html('<select id="pefc-novo-'+id+'" class="input-mini"><option value="1">Sim</option><option value="0" selected="selected">Não</option></select>');
		}

}


function sendRaw(id)
{
	var whereFrom = $("#row-for-paper-id").val();

	var tipo = $("#raw-id-name-"+id).text();
	var grs = $("#raw-id-grs-"+id).text();
	var alt = $("#raw-id-alt-"+id).text();
	var larg = $("#raw-id-larg-"+id).text();



	$('#myModal').modal('hide');
	
	
	 $("#novo-tipo-"+whereFrom).val(tipo);
	 $("#novo-grs-"+whereFrom).val(grs);
	 $("#novo-altura-"+whereFrom).val(alt);
	 $("#novo-largura-"+whereFrom).val(larg);
	 
}

function saveObs(id,db)
{
var obj = $("#obs-newtext-"+id);		

var ajaxData = 'id=' + db;
	ajaxData+= '&obs=' + obj.val();
	ajaxData+= "&tipo=" + escape($("#novo-tipo-"+id).val());
	ajaxData+= "&grs=" + escape($("#novo-grs-"+id).val());
	ajaxData+= "&altura=" + escape($("#novo-altura-"+id).val());
	ajaxData+= "&qtdped=" + escape($("#novo-qtdped-"+id).val());
	ajaxData+= "&qtdarmz=" + escape($("#armazem"+id).val());
	ajaxData+= "&qtdenc=" + escape($("#aencomendar"+id).text());
	ajaxData+= "&fsc=" + escape($("#fsc-novo-"+id).val());
	ajaxData+= "&pefc=" + escape($("#pefc-novo-"+id).val());
	//ajaxData+= "&ck=1";


$.ajax({
	type: 'GET',
	url: '/ajax/obs',
	data:  ajaxData,
	datatype: 'html',
	beforeSend: loading(),
	complete: complete(),
	complete: function(){$('#loading-animation').fadeOut(2000);},
		
	success: function(response) {
		
		 var fscV = $("#fsc-novo-"+id).val();
		 	(fscV == 1) ? fsc="Sim" : fsc="Não";
		 
		 var pefcV = $("#pefc-novo-"+id).val();
		 	(pefcV == 1) ? pefc="Sim" : pefc="Não";
		 
		 
		 $("#obs"+id).text(obj.val());
		 $("#tipo"+id).text($("#novo-tipo-"+id).val());
		 $("#grs"+id).text($("#novo-grs-"+id).val());
		 $("#altura"+id).text($("#novo-altura-"+id).val());
		 $("#largura"+id).text($("#novo-largura-"+id).val());
		 $("#qtdped"+id).text($("#novo-qtdped-"+id).val());
		 $("#fsc"+id).text(fsc);
		 $("#pefc"+id).text(pefc);
		 
		 
		 $("#obs"+id+"edit").html('<button id="btn-edit-'+id+'" class="btn btn-mini btn-primary left-10" onclick="obs('+id+','+db+')">Editar</button>');
		 $("#del"+id).show();
		 
	}
	
});
}

function loading()
{	
	$('#loading-animation').fadeIn();
	$('#loading-animation').html('<div class="alert alert-info"><i class="icon-spinner icon-spin"></i>&nbsp;&nbsp;&nbsp;A actualizar dados...</div>');
}

function complete()
{	
	$('#loading-animation').fadeIn();
	$('#loading-animation').html('<div class="alert alert-success"><i class="icon-check-sign"></i>&nbsp;&nbsp;&nbsp;Dados Actualizados</div>');
}


function saveAll(rows, id)
{
	
	for (var i=1; i<=rows; i++)
	 { 
		
		if ($("#armazem"+i).val() == ""){
			$('#loading-animation').show();
			$('#loading-animation')
			.html('<div class="alert alert-error"><i class="icon-minus-sign"></i>&nbsp;&nbsp;&nbsp;<span class="err-txt"><b>ERRO</b> A quantidade em armazém não pode estar vazia!</span></div>');
			
			$("#armazem"+i).focus(function(){$('#loading-animation').hide();});
			
			return false;
		
		 } 
		}


	$("#loading-animation").is(':visible') ? console.log("SIM") : finalProcess(rows);


}


function closeAll()
{
	

window.location = "/armazem";

}


function delRec(row, id)
{
	
	var number = $('#countrows').text();
	
	
	
	$.ajax({
		type: 'GET',
		url: '/ajax/del',
		data:  {
			id: id,
			r: number,
			j: $("#jobnumber").text(),
		},
		datatype: 'html',
		//beforeSend: confirmDel(),
		//complete: complete(),
			
		success: function(response) {
			
			$("#tr-row-"+row).addClass("error");	
			$("#tr-row-"+row).addClass("strike");
			$('#armazem'+row).remove();
			$('#edit-buttons-'+row).remove();
			
			$('#loading-animation').fadeIn();
			$('#loading-animation').html('<div class="alert alert-success"><i class="icon-check-sign"></i>&nbsp;&nbsp;&nbsp;Matéria Prima removida</div>');
		}
		
	});
	
	var remain = parseInt(number) - 1;
	
	$('#countrows').text(remain);

}


function confirmDel(row, id)
{
	
	$("#dialog-confirm").dialog({
	      resizable: false,
	      height:180,
	      modal: true,
	      buttons: {
	        "Apagar": function() {
	        	$( this ).dialog( "close" );
	        	delRec(row, id);
	        },
	        Cancel: function() {
	          $( this ).dialog( "close" );
	        }
	      }
	    });
	

}

function finalProcess(rows)
{
	
	for (var id=1; id<=rows; id++)
	 { 	
		
		var dbID = $('#id'+id).val();
		var ajaxData = 'id=' + dbID;
			ajaxData+= '&obs=' + $("#obs"+id).text();
			ajaxData+= "&tipo=" + escape($("#tipo"+id).text());
			ajaxData+= "&grs=" + escape($("#grs"+id).text());
			ajaxData+= "&altura=" + escape($("#altura"+id).text());
			ajaxData+= "&qtdped=" + escape($("#qtdped"+id).text());
			ajaxData+= "&qtdarmz=" + escape($("#armazem"+id).val());
			ajaxData+= "&qtdenc=" + escape($("#aencomendar"+id).text());
			ajaxData+= "&fsc=" + escape(translate($("#fsc"+id).text()));
			ajaxData+= "&pefc=" + escape(translate($("#pefc"+id).text()));
			ajaxData+= "&ck=1";
			ajaxData+= "&job=" + escape($("#jobnumber").text());
	
		$.ajax({
			type: 'GET',
			url: '/ajax/obs',
			data:  ajaxData,
			datatype: 'html',
			beforeSend: loading(),
			complete: complete(),
				
			success: function(response) {
				
				
				
			}
			
		});

	}

	
}

function translate(txt)
{
	
	var number = (txt== 'Sim') ? 1 : 0;
    return number;

}


function listPaper(rowID)
{
	
	$("#row-for-paper-id").val(rowID);
	
	$('#myModal').modal({
		  keyboard: true,
		  show: true,
		});
}



