<?php

/** 
 * @author rpsimao
 * 
 */
class RPS_Auxiliar_XChars
{
    
    /**
     * 
     * @param int $numberOfChars
     * @param string $string
     */
    
    public static function short($numberOfChars, $string)
    {
        
        $red_string = (strlen($string) > $numberOfChars +  3) ? substr($string, 0, $numberOfChars).'...' : $string;
        
        return $red_string;
        
        
    }
    
    
}

?>