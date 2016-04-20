<?php

class EncomendasController extends Zend_Controller_Action
{

    public function init()
    {
        $this->db = new Application_Model_MateriasPrimas();
    }

    public function indexAction()
    {
        $records = $this->db->getAllRecordsForEncomendas();
        $this->view->records = $records;
    }

    public function detailsAction()
    {
        $job = $this->_getParam('id');
        
        $this->view->details = $this->db->getDetailsFromJob($job);
        $this->view->raw = $this->db->getRawForJob($job);
    }

}