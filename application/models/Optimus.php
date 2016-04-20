<?php

class Application_Model_Optimus
{

    public function __construct ()
    {
        $config = Zend_Registry::get('optimus');
        $db = Zend_Db::factory($config->database);
        Zend_Db_Table_Abstract::setDefaultAdapter($db);
    
        $this->job = new Application_Model_DbTable_OptimusJobs();
        $this->cu = new Application_Model_DbTable_OptimusCustomers();
        $this->itm = new Application_Model_DbTable_OptimusITM();
        
    }
    
    public function getJob($jnumber)
    {
        $row = $this->job->find((int) $jnumber);
        return $row->toArray();
    }
    
    
    public function getAllCustomersByCuCode ()
    {
    
        $return_arr = array();
        $rows = $this->cu->getAllActiveCustomers();
    
        foreach ($rows as $customer) {
            $return_arr[] = "'" . $customer['cu_code'] . "'". "_-_";
    
        }
        $cleanFile = implode(',', $return_arr);
        $cleanFile = str_replace('"', '', $cleanFile);
        $cleanFile = str_replace("'", '', $cleanFile);
        $cleanFile = str_replace("\\", '', $cleanFile);
        $cleanFile = str_replace("/", '', $cleanFile);
        $cleanFile = str_replace("_-_", '","', $cleanFile);
        $cleanFile = str_replace('",",', '","', $cleanFile);
        $cleanFile = '"' . $cleanFile . '-"';
        $cleanFile = substr($cleanFile, 0, -4);
        $cleanFile = utf8_encode($cleanFile);
    
    
        return $cleanFile;
    }
    
    public function getClienteRealName($cliCode)
    {
       $rows = $this->cu->getCliente($cliCode);
       
       return $rows[0]['cu_name'];
        
        
    }
    
    
    public function getParamsFromJob($obra) {
        $sql = $this->job->select();
        $sql->where('j_number= ?', (int) $obra);
        $rows = $this->job->fetchRow($sql);
    
        return $rows;
    }
    
    
    public function getRawMaterial($jobNumber)
    {
        $rows = $this->job->getAdapter()->fetchAll('select id, item, raised, required, status, sostatus, qty_req, unit, qty_req_base, std_price, std_price_qty, price_unit, qty_alloc, qty_onorder, qty_picked, qty_issued, qty_taken, cost_centre, cust_owned, sales_order, so_line, orig_cost, note, tax2, bill_and_hold, currency, xrate, foreign_price, name, class_code, req.flags from req inner join itm on code = item where req_for = "J"  and (class_code ="PAPEL FOLH" or class_code ="DIVERSOS UN" or class_code ="ENVEL/SACO") and job = ' . (int) $jobNumber . ' order by id');
        return $rows;
        
        
    }
    
    public function getPapers()
    {
        $sql = $this->itm->select('name');
        $sql->where('class_code = "PAPEL FOLH"');
        $rows = $this->itm->fetchAll($sql);
        
       
        return $rows;
        
    }
    
    
    public function getPapersLike($paper)
    {
        
        
    }
    
    
    
    
    
    
}

