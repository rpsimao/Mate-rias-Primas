
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
	});
	
	$('.obsTooltip').tooltip({title:"Clique para ver", placement:"bottom"});
	
});



function showObsTxt(id)
{
	
	var obstxt = $.ajax({
			type: 'GET',
			url: '/ajax/getobstxt',
			data: 'id=' + id,
			dataType: 'text',
			async: false,
		}).responseText;

	$('#obsModal').modal('show');
	$("#ObsModalTxt").html(obstxt);

}


function createRow()
{
	var i = $("#rawrows").val();
	var id = parseInt(i)+1;
	
	var html ="<tr>";
	
	html+='<td><input type="hidden" value="" id="id'+id+'"></td>';
	html+='<td><input type="text" id="novo-tipo-'+id+'" onfocus="listPaper('+id+')"></td>';
	html+='<td><input type="text" class="input-mini" id="novo-grs-'+id+'"></td>';
	html+='<td><input type="text" class="input-mini" id="novo-altura-'+id+'"></td>';
	html+='<td><input type="text" class="input-mini" id="novo-largura-'+id+'"></td>';
	html+='<td><input type="text" class="input-mini" id="qtdped'+id+'"><span id="pedida'+id+'"></span></td>';
	html+='<td><input type="text" class="input-mini" id="qtd_armz'+id+'"></td>';
	html+='<td><input type="text" class="input-mini"" id="aencomendar'+id+'"></td>';
	html+='<td><select id="fsc-novo-'+id+'" class="input-mini"><option value="1">Sim</option><option value="0" selected="selected">Não</option></select></td>';
	html+='<td><select id="pefc-novo-'+id+'" class="input-mini"><option value="1">Sim</option><option value="0" selected="selected">Não</option></select></td>';
	html+='<td><textarea id="obs-newtext-'+id+'" rows="6"></textarea></td>';
	html+='<td>';
	html+='<span id="edit-buttons-'+id+'"><span id="obs'+id+'edit"><button id="btn-edit-'+id+'>" class="btn btn-mini btn-danger left-10" onclick="fornSave('+id+'">Gravar</button></span>';
	html+='</td>';
	html+="</tr>";
	
	$(html).appendTo("#mat-prima-table");
    

    
	var html2 = "<tr>";
	html2+='<td><input type="checkbox" value="0" id="antalis_pp-'+id+'" onclick=\'doisPorCento("antalis_total-'+id+'", '+id+')\' disabled></td>';
	html2+='<td id="antalis_ton-'+id+'"><input class="input-mini" type="text" id="antalis_ton_txt-'+id+'" onblur=\'calcForn("antalis_ton_txt-'+id+'", "antalis_total-'+id+'", '+id+')\'></td>';
	html2+='<td id="antalis_total-'+id+'" class="txt-blue"></td>';
	html2+='<td id="inapa_ton-'+id+'"><input class="input-mini" type="text" id="inapa_ton_txt-'+id+'" onblur=\'calcForn("inapa_ton_txt-'+id+'", "inapa_total-'+id+'", '+id+')\'></td>';
	html2+='<td id="inapa_total-'+id+'" class="txt-blue"></td>';
	html2+='<td id="torras_ton-'+id+'"><input class="input-mini" type="text" id="torras_ton_txt-'+id+'" onblur=\'calcForn("torras_ton_txt-'+id+'", "torras_total-'+id+'", '+id+')\'></td>';
	html2+='<td id="torras_total-'+id+'" class="txt-blue"></td>';
	html2+='<td><input type="text" id="outro-nome-'+id+'" class="input-mini"></td>';
	html2+='<td id="outro_ton-'+id+'"><input class="input-mini" type="text" id="outro_ton_txt-'+id+'" onblur=\'calcForn("outro_ton_txt-'+id+'", "outro_total-'+id+'", '+id+')\'></td>';
	html2+='<td id="outro_total-'+id+'" class="txt-blue"></td>';
	html2+='<td><input type="checkbox" name="mapa-'+id+'" value="0" id="mapa-'+id+'" onclick=\'toMapa('+id+')\'></td>';
	html2+='</tr>';
	
	
	
	$(html2).appendTo("#table-fornecedores");
	
	var sum = parseInt(i)+1;

    $("#rawrows").val(sum);


}

function fornSave(id)
{
	
	alert("sqdfda");
	
	
	$.ajax({
		type: 'GET',
		url: '/ajax/insertfromencomenda',
		data:  {
		   obra: $("#jobnumber").text(),
			 
			 m: 1,
		},
		datatype: 'html',
		//beforeSend: confirmDel(),
		complete: complete(),
			
		success: function(response) {
			
			
		}
		
	});


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
	$("#qtd_armz"+id).html('<input type="text" class="input-mini" id="novo-qtd_armz-'+id+'" value="'+$("#qtd_armz"+id).text()+'" >');
	$("#aencomendar"+id).html('<input type="text" class="input-mini" id="novo-aencomendar-'+id+'" value="'+$("#aencomendar"+id).text()+'" >');
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




function toMapa(id)
{
	
	if ($("#antalis_ton_txt-"+id).val() == "" && $("#inapa_ton_txt-"+id).val() == "" && $("#torras_ton_txt-"+id).val() == "" &&  $("#outro_ton_txt-"+id).val() == "")
	{
		 displayAlert("Tem de selecionar um Fornecedor.");
		 $('input:checkbox[name=mapa-'+id+']').attr('checked',false);
		
	} else {
		
		sendMapa(id);
	}
	
	

}


function checkMapa(id)
{
	


}
	

function sendMapa(id)
{
	
	$.ajax({
		type: 'GET',
		url: '/ajax/inforn',
		data:  {
		   obra: $("#jobnumber").text(),
			 pp: $("#antalis_pp-"+id).val(),
			 at: $("#antalis_ton-"+id).val(),
			atl: $("#antalis_total-"+id).text(),
			 it: $("#inapa_ton-"+id).val(),
			itl: $("#ainapa_total-"+id).text(),
			 tt: $("#torras_ton-"+id).val(),
			ttl: $("#torras_total-"+id).text(),
			 on: $("#outro_nome-"+id).val(),
			 ot: $("#outro_ton-"+id).val(),
			otl: $("#outro_total-"+id).text(),
			  m: 1,
		},
		datatype: 'html',
		//beforeSend: confirmDel(),
		complete: complete(),
			
		success: function(response) {
			
			
		}
		
	});


}


function doisPorCento(id, id2)
{
	
	if ($('#antalis_pp-' + id2).is(":checked"))
		{
			
			var value = parseFloat($("#"+id).text());
		
			var desc = value / 1.02;
			
			$("#"+id).text(desc.toFixed(2));
			$('#antalis_pp-' + id2).val(1);
		
		} else {
			$("#antalis_pp-"+id2).prop( "disabled", true );
			$("#antalis_ton_txt-"+id2).val("");
			$("#"+id).text("");
			$("#antalis_ton_txt-"+id2).focus();
			$('#antalis_pp-' + id2).val(0);
			
		}
	
	
	console.log($('#antalis_pp-' + id2).val());
	
}



function calculateFinalPrice()
{
	var rowCount = parseInt($('#table-fornecedores tr').length) - 2;

	var antalis = parseInt(0);
	var inapa   = parseInt(0);
	var torras  = parseInt(0);
	var outro   = parseInt(0);

	for (var a = 1; a <= rowCount; a++)
		{
			if($("#antalis_total-"+a).text() > 0){antalis+= parseFloat($("#antalis_total-"+a).text());}
			if($("#inapa_total-"+a).text() > 0){inapa+=   parseFloat($("#inapa_total-"+a).text());}	
			if($("#torras_total-"+a).text() > 0){torras+=  parseFloat($("#torras_total-"+a).text());}
			if($("#outro_total-"+a).text() > 0){outro+=   parseFloat($("#outro_total-"+a).text());}
		}
	
	var total = parseFloat(antalis) + parseFloat(inapa) + parseFloat(torras) + parseFloat(outro);
	var cIva = total * 1.23;
	
	$("#total-papel").text(cIva.toFixed(2));
	
}



function calcForn(input, output, id)
{
	
	var rowID = input.replace(/[^0-9]+/g, '');  
	
	var qtd   = $("#aencomendar"+rowID).text();
	var grs   = $("#grs"+rowID).text();
	var alt   = $("#altura"+rowID).text();
	var larg  = $("#largura"+rowID).text();
	var preco = $("#"+input).val();
	
	var calc = algoritmoPreco(qtd, grs, alt, larg, preco);
	
	$("#"+output).text(calc);
	
	if ($("#antalis_ton_txt-"+id).val() !="")
		{
			$("#antalis_pp-"+id).prop( "disabled", false );
		}
	
	
}



function algoritmoPreco(qtd, grs, alt, larg, preco)
{

var $qtd   = parseInt(qtd);
var $grs   = parseInt(grs);
var $alt   = parseInt(alt) / 10;
var $larg  = parseInt(larg) / 10;
var $preco = parseInt(preco);

var total = $qtd * $grs / 1000 * $alt / 100 * $larg / 100 * $preco / 1000;

	if (total){
		return total.toFixed(2);
	}
}




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
	ajaxData+= "&qtdarmz=" + escape($("#novo-qtd_armz-"+id).val());
	ajaxData+= "&qtdenc=" + escape($("#novo-aencomendar-"+id).val());
	ajaxData+= "&fsc=" + escape($("#fsc-novo-"+id).val());
	ajaxData+= "&pefc=" + escape($("#pefc-novo-"+id).val());
	ajaxData+= "&ck=1";


$.ajax({
	type: 'GET',
	url: '/ajax/updateenc',
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
		 $("#qtd_armz"+id).text($("#novo-qtd_armz-"+id).val());
		 $("#aencomendar"+id).text($("#novo-aencomendar-"+id).val());
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
	

window.location = "/encomendas";

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


function displayAlert(msg)
{
	var dsp = $('.up-right').notify({
	    message: { html: '<i class="icon-warning-sign"></i>&nbsp;&nbsp;&nbsp;<b>'+msg+'</b>' },
	    type: 'error'
	  }).show();

	return dsp;
}
