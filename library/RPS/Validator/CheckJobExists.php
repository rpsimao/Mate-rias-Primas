<?php

class RPS_Validator_CheckJobExists extends Zend_Validate_Abstract
{
 const JOB_ERROR = 'jobError';

    protected $db;

    protected $_messageTemplates = array(
        self::JOB_ERROR => '* Não existe esse número de Obra no Optimus.');

    public function isValid ($value)
    {
         $this->_setValue((int) $value);

        
         $this->db = new Application_Model_Optimus();
         $val = $this->db->getJob($value);
         
         
         if (!count($val) > 0) {
            $this->_error(self::JOB_ERROR);
            return false;
        } 
        return true;
    }
}

?>