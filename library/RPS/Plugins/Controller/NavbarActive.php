<?php

class RPS_Plugins_Controller_NavbarActive extends Zend_Controller_Plugin_Abstract
{
     public function preDispatch(Zend_Controller_Request_Abstract $request) {
        
         $this->controller = $this->_request->getControllerName();
         
         $layout = Zend_Layout::getMvcInstance();
         $view = $layout->getView();
         
         $view->controllerName = $this->controller;
         
        
    }
}

?>