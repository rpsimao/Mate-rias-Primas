<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        $this->form = new Application_Form_Entrada();
        
        $this->view->form = $this->form;
        
        
    }
    
    public function preDispatch ()
    {
        if ($this->_helper->FlashMessenger->hasMessages()) {
            $this->view->messages = $this->_helper->FlashMessenger->getMessages();
        }
    }

    public function indexAction()
    {
        
    }
    
    
    

    public function entradaAction()
    {
    
        
        $frontendOptions = array('lifetime' => 7200 ,'automatic_serialization' => true);
        
        $backendOptions = array('cache_dir' => '/tmp/');
        $this->cache = Zend_Cache::factory('Core', 'File', $frontendOptions, $backendOptions);
        
        
        if( $this->cache->load('getallclients') === false ) {
        
            $this->cu  = new Application_Model_Optimus();
            $customers = $this->cu->getAllCustomersByCuCode();
            $this->cache->save($customers, 'getallclients');
            
        
            $this->view->customers = $this->cache->load('getallclients');
            
        
        } else {
        
            $this->view->customers = $this->cache->load('getallclients');
           
        }
        
        
        if ($this->getRequest()->isPost())
        {
            if ($this->form->isValid($_POST))
            {
                
               $formData = $this->_getAllParams();
               $optimusDB = new Application_Model_Optimus();
               $jobData = $optimusDB->getJob($formData['obra']);
               
               $this->view->jobData = $jobData;
               $this->view->raw = $optimusDB->getRawMaterial($formData['obra']);
               
              
            } else {
        
                $this->view->errors = $this->form->getMessages();
                 
            }
        }
    }

    public function fase1Action()
    {
        $formData = $this->getRequest()->getPost(); 
        
        $db = new Application_Model_MateriasPrimas();
        $db->insertReg($formData);
        
        
        $this->_helper->flashMessenger->addMessage('success');
        $this->_helper->flashMessenger->addMessage('O Registo de Matéria Prima para a Obra Nº' . $this->_request->getPost('obra') . " foi enviado com sucesso.");
        $this->_redirect('/');
        
       
    }


}





