<?php

class Application_Form_Entrada extends Zend_Form
{

     public function init()
    {
       $this->setAction("/index/entrada");
       $this->setMethod("POST");
       
       $password = new Zend_Form_Element_Text('obra');
       $password->setLabel('Nº Obra:');
       $password->setRequired(TRUE);
       $password->setAttribs(array('placeholder' => "Insira o número da Obra"));
       $password->addValidators(array(new Zend_Validate_Int(), new RPS_Validator_CheckJobExists()));
       $password->setAttribs(array("onfocus"=>'onlyInt("obra")'));
       $this->addElement($password);
       
       $submit = new Zend_Form_Element_Submit('submit');
       $submit->setLabel('Enviar');
       $submit->setAttrib('class', 'btn btn-primary');
       $this->addElement($submit);

    }
}

