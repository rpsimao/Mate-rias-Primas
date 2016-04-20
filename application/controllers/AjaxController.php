<?php

class AjaxController extends Zend_Controller_Action
{

    public function init()
    {
        $this->_helper->layout()->disableLayout(); 
        $this->_helper->viewRenderer->setNoRender(true);
    }

    public function indexAction()
    {
        // action body
    }

    public function obsAction()
    {
        $params = $this->_getAllParams();
        
        
        
        $db = new Application_Model_MateriasPrimas();
        $db->updateConsumo(array('id'=>$params['id'], 
                        'obs'=>$params['obs'], 
                'tipo'=>$params['tipo'], 
                'grs'=>$params['grs'],
                'altura' => $params['altura'],
                'qty_req' => $params['qtdped'],
                'qtd_armz' => $params['qtdarmz'],
                'qtd_aencomendar' => $params['qtdenc'],
                'fsc' => $params['fsc'],
                'pefc' => $params['pefc'],
                'checkencomenda' => $params['ck']
              ));
        
        
        
        
        $db->updateRegbyJob(array('obra' => $params['job'], 'armazem' => 1));
        
    }
    
    
    
    public function updateencAction()
    {
        
        
        $params = $this->_getAllParams();
        
        
        
        $db = new Application_Model_MateriasPrimas();
        $db->updateConsumo(array('id'=>$params['id'],
                'obs'=>$params['obs'],
                'tipo'=>$params['tipo'],
                'grs'=>$params['grs'],
                'altura' => $params['altura'],
                'qty_req' => $params['qtdped'],
                'qtd_armz' => $params['qtdarmz'],
                'qtd_aencomendar' => $params['qtdenc'],
                'fsc' => $params['fsc'],
                'pefc' => $params['pefc'],
                'checkencomenda' => $params['ck']
        ));
        
        
        
        
        
        
        
    }
    
    
    public function delAction()
    {
        
        $id   = $this->_getParam('id');
        $rows = $this->_getParam('r');
        $job  = $this->_getParam('j');
        
        $db = new Application_Model_MateriasPrimas();
        $db->removeConsumo($id);
        
        if ($rows == 1) {
            $db->removeReg($job);
        }
        
    }
    
    
    public function infornAction()
    {
        
    }

    
    
    public function insertfromencomendaAction()
    {
        
        
        
    }
    
    
    public function getobstxtAction()
    {
        $id   = $this->_getParam('id');
        
        $db = new Application_Model_MateriasPrimas();
        $obs = $db->getObsFromConsumos($id);
        
        $this->getResponse()->appendBody($obs);
    }

}



