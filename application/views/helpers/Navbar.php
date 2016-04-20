<?php
class Application_View_Helper_Navbar extends Zend_View_Helper_Abstract
{
   
    public function Navbar ($active)
    {
        $this->html = '<div class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container-fluid">
                <span class="brand">MAPA CONTROLO MATÉRIAS-PRIMAS</span>
                    <ul class="nav">
                        '.$this->_html($active).'
                    </ul>
              </div>
        </div>
    </div>';
        return $this->html;
    }
    
    
    
    
    private function _html($active)
    {
        
        switch ($active) {
            case "index":
               return $this->_generateNavbar("active", null, null, null);
            break;
            
            case "armazem":
                return $this->_generateNavbar(null, "active", null, null);
                break;
                
            case "encomendas":
                 return $this->_generateNavbar(null, null, "active", null);
                 break;
                 
            case "mapa":
                 return $this->_generateNavbar(null, null, null, "active");
                 break;
            
            default:
                return '<li><a href="/"><i class="icon-signin"></i> Entrada</a></li>
                        <li><a href="/armazem"><i class="icon-signout"></i> Armazém</a></li>
                        <li><a href="/encomendas"><i class="icon-truck"></i> Encomendas</a></li>
                        <li><a href="/mapa"><i class="icon-list-alt"></i> Mapa</a></li>';
            break;
        }
        
        
    }
    
    
    
    private function _generateNavbar($nav1, $nav2, $nav3, $nav4)
    {
        
        $li1 = '<li class="active">';
        $li2 = '<li>';
        
        $a = '<a href="/"><i class="icon-signin"></i> Entrada</a></li>';
        $b = '<a href="/armazem"><i class="icon-signout"></i> Armazém</a></li>';
        $c = '<a href="/encomendas"><i class="icon-truck"></i> Encomendas</a></li>';
        $d = '<a href="/mapa"><i class="icon-list-alt"></i> Mapa</a></li>';
        
        
        
        
        
        
        if ($nav1 == "active" ){ return $li1.$a.$li2.$b.$li2.$c.$li2.$d;}
        if ($nav2 == "active" ){ return $li2.$a.$li1.$b.$li2.$c.$li2.$d;}
        if ($nav3 == "active" ){ return $li2.$a.$li2.$b.$li1.$c.$li2.$d;}
        if ($nav4 == "active" ){ return $li2.$a.$li2.$b.$li2.$c.$li1.$d;}
        
        
        
    }
   
   
}




?>