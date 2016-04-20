<?php

class Application_Model_DbTable_OptimusCustomers extends Zend_Db_Table_Abstract
{

    protected $_name = 'cu';
    protected $_primary = "cu_code";
    
    
    
    
    public function getAllActiveCustomers()
    {
        $sql = $this->select();
        $sql->where('cu_classif != ?', "CANCELADO");
        $sql->where('cu_discontinued = ?', FALSE);
        $rows = $this->fetchAll($sql);
    
        return $rows;
    }
    
    
    public function getCliente($cliente)
    {
    
        $query = $this->find($cliente);
    
        return $query;
    
    }

}

