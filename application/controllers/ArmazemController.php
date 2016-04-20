<?php

class ArmazemController extends Zend_Controller_Action
{

    public function init()
    {
       $this->db = new Application_Model_MateriasPrimas();
    }

    public function indexAction()
    {
        
        $records = $this->db->getAllRecordsForAramazem();
        
        $this->view->records = $records;
    }

    public function detailsAction()
    {
        $job = $this->_getParam('id');
        
        $this->view->details = $this->db->getDetailsFromJob($job);
        $this->view->raw = $this->db->getRawForJob($job);
    
        $frontendOptions = array('lifetime' => 7200 ,'automatic_serialization' => true);
        $backendOptions = array('cache_dir' => '/tmp/');
        $cache = Zend_Cache::factory('Output', 'File', $frontendOptions, $backendOptions);
    
        $list = $cache->load('getallpaper');
        
        
        var_dump($list);
    
    
    }


}



