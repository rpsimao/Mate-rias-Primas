<?php

class MapaController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function entradaAction()
    {
        // action body
    }

    public function editarAction()
    {
        // action body
    }

    public function listagemAction()
    {
        // action body
    }

    public function listagempapelAction()
    {
        
        $frontendOptions = array('lifetime' => 7200 ,'automatic_serialization' => true);
        $backendOptions = array('cache_dir' => '/tmp/');
        
        $this->view->cache = Zend_Cache::factory('Output', 'File', $frontendOptions, $backendOptions);
        
        
        if( $this->view->cache->load('getallpaper') === false ) {
        
            $db = new Application_Model_Optimus();
            $papel = $db->getPapers();
            $this->view->cache->save($papel, 'getallpaper');
        
            $this->view->papers = $this->view->cache->load('getallpaper');
        
        } else {
        
            $this->view->papers = $this->view->cache->load('getallpaper');
             
        }
        
        
        
    }


}









