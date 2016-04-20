<?php

class RPS_Plugins_Controller_RawMaterial extends Zend_Controller_Plugin_Abstract
{
     public function preDispatch(Zend_Controller_Request_Abstract $request) {
        
         $frontendOptions = array('lifetime' => 7200 ,'automatic_serialization' => true);
         $backendOptions = array('cache_dir' => '/tmp/');
         
         $layout = Zend_Layout::getMvcInstance();
         $view = $layout->getView();
         
          $view->cache = Zend_Cache::factory('Output', 'File', $frontendOptions, $backendOptions);
          

          if( $view->cache->load('getallpaper') === false ) {
          
              $db = new Application_Model_Optimus();
              $papel = $db->getPapers();
              $view->cache->save($papel, 'getallpaper');
          
              $view->papers = $view->cache->load('getallpaper');
          
          } else {
          
              $view->papers = $view->cache->load('getallpaper');
               
          }
         
        
    }
}

?>



        
        
       
        
        