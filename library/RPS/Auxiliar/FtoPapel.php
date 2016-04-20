<?php

/** 
 * @author rpsimao
 * 
 */
class RPS_Auxiliar_FtoPapel
{
    public function setFto($line)
    {
        $this->fto = $line;
    }
    
    private function _getFto(){
        
        return $this->fto;
    }
    
    
    
    public function returnFto()
    {
        
        $line = substr($this->_getFto(), -11);
        $fto = preg_replace("/[^0-9,.]/", "", $line);
        
        $gramagem = substr($fto, 0, 3);
        $altura   = substr($fto, 3, 4);
        $largura  = substr($fto, -4);
        
        
        
        return array('grs' =>  $this->_checkZero($gramagem), 'alt' => $this->_checkZero($altura), 'larg' => $this->_checkZero($largura));
        
    }
    
    
    
    private function _checkZero($value)
    {
        
       $z =  substr($value, 0, 1);
       
       if ($z == 0) {
           return substr($value, 1, 3);
       } else {
           
           return $value;
       }
        
        
    }
    
    public function checkFSC($txt)
    {
        
       $find =  preg_match('/FSC/i', $txt);

       if ($find == 1) {
           
           return 'checked="checked" value="1"';
       } else {
           
           return 'value="0"';
       }
       
       
       
       
        
    }
    
    public function checkPEFC($txt)
    {
    
        $find =  preg_match('/PEFC/i', $txt);
    
        if ($find == 1) {
           
         return 'checked="checked" value="1"';
       } else {
           
           return 'value="0"';
       
       }
       
      
    
    }
    
   
    public static function removeUnwanted($txt)
    {
        
        if (strpos($txt,'CARTOLINA') !== false) {
            return True;
        }
        if (strpos($txt,'CART') !== false) {
            return True;
        }
        if (strpos($txt,'AUTOCOPIATIVO') !== false) {
            return True;
        }
        if (strpos($txt,'Autocopiativo') !== false) {
            return True;
        }
        if (strpos($txt,'Autocolante') !== false) {
            return True;
        }
        if (strpos($txt,'Autocola') !== false) {
            return True;
        }
        if (strpos($txt,'AUTOC') !== false) {
            return True;
        }
        if (strpos($txt,'INVERCOTE') !== false) {
            return True;
        }
        if (strpos($txt,'COLORIT') !== false) {
            return True;
        }
        if (strpos($txt,'CARTAZ') !== false) {
            return True;
        }
        if (strpos($txt,'CEPALLITHOS') !== false) {
            return True;
        }
        if (strpos($txt,'PAPEL ESCRITA') !== false) {
            return True;
        }
        if (strpos($txt,'DALI') !== false) {
            return True;
        }
        if (strpos($txt,'CANEVAS') !== false) {
            return True;
        }
        if (strpos($txt,'COLORACTION') !== false) {
            return True;
        }
        if (strpos($txt,'BRIGHTWATER') !== false) {
            return True;
        }
        if (strpos($txt,'PAPEL EMBRULHO') !== false) {
            return True;
        }
        if (strpos($txt,'TROPHÉE') !== false) {
            return True;
        }
        if (strpos($txt,'CHAGALL') !== false) {
            return True;
        }
        if (strpos($txt,'CARPELINE') !== false) {
            return True;
        }
        if (strpos($txt,'CURIOUS') !== false) {
            return True;
        }
        if (strpos($txt,'CONSTELATION') !== false) {
            return True;
        }
        if (strpos($txt,'CONSTELAT') !== false) {
            return True;
        }
        if (strpos($txt,'CURTIS') !== false) {
            return True;
        }
        if (strpos($txt,'EFALIN') !== false) {
            return True;
        }
        if (strpos($txt,'ELEFANTENHAUT') !== false) {
            return True;
        }
        if (strpos($txt,'EVOCATION') !== false) {
            return True;
        }
        if (strpos($txt,'FLANNEL') !== false) {
            return True;
        }
        if (strpos($txt,'FREELIFE') !== false) {
            return True;
        }
        if (strpos($txt,'FLORA') !== false) {
            return True;
        }
        if (strpos($txt,'FEEL ME') !== false) {
            return True;
        }
        if (strpos($txt,'SYMBOL') !== false) {
            return True;
        }
        if (strpos($txt,'GOHRSMUEHLE') !== false) {
            return True;
        }
        if (strpos($txt,'HAVANNA') !== false) {
            return True;
        }
        if (strpos($txt,'IMITLIN') !== false) {
            return True;
        }
        if (strpos($txt,'INSIZE') !== false) {
            return True;
        }
        if (strpos($txt,'ISPIRA') !== false) {
            return True;
        }
        if (strpos($txt,'JOTTA') !== false) {
            return True;
        }
        if (strpos($txt,'KENDAL') !== false) {
            return True;
        }
        if (strpos($txt,'KEAYKOLOUR') !== false) {
            return True;
        }
        if (strpos($txt,'MARSANA') !== false) {
            return True;
        }
        if (strpos($txt,'METAPHOR') !== false) {
            return True;
        }
        if (strpos($txt,'METALVAC') !== false) {
            return True;
        }
        if (strpos($txt,'MODIGLIANI') !== false) {
            return True;
        }
        if (strpos($txt,'MY 360') !== false) {
            return True;
        }
        if (strpos($txt,'NATURALES') !== false) {
            return True;
        }
        if (strpos($txt,'NETTUNO') !== false) {
            return True;
        }
        if (strpos($txt,'NOTTURNO') !== false) {
            return True;
        }
        if (strpos($txt,'PAPAGO') !== false) {
            return True;
        }
        if (strpos($txt,'PERGAMINHO') !== false) {
            return True;
        }
        if (strpos($txt,'PLIKE') !== false) {
            return True;
        }
        if (strpos($txt,'REGINA') !== false) {
            return True;
        }
        if (strpos($txt,'RIVES') !== false) {
            return True;
        }
        if (strpos($txt,'JORNAL JA') !== false) {
            return True;
        }
        if (strpos($txt,'CROXLEY') !== false) {
            return True;
        }
        if (strpos($txt,'CEPALLITHUS') !== false) {
            return True;
        }
        if (strpos($txt,'SCOTIA') !== false) {
            return True;
        }
        if (strpos($txt,'STARDREAM') !== false) {
            return True;
        }
        if (strpos($txt,'SIRIO') !== false) {
            return True;
        }
        if (strpos($txt,'SVECIA') !== false) {
            return True;
        }
        if (strpos($txt,'TINTORETTO') !== false) {
            return True;
        }
        if (strpos($txt,'SIMILI') !== false) {
            return True;
        }
        if (strpos($txt,'SENSATION') !== false) {
            return True;
        }
        if (strpos($txt,'SOFTY') !== false) {
            return True;
        }
        if (strpos($txt,'ROTOFORM') !== false) {
            return True;
        }
        if (strpos($txt,'RIGOLETTO') !== false) {
            return True;
        }
        if (strpos($txt,'REACTION') !== false) {
            return True;
        }
    }
    
}

?>