<?php

class Application_Model_MateriasPrimas
{


    public function __construct ()
    {
        $config = Zend_Registry::get('matprimas');
        $db = Zend_Db::factory($config->database);
        Zend_Db_Table_Abstract::setDefaultAdapter($db);
    
        $this->reg  = new Application_Model_DbTable_Registos();
        $this->cons = new Application_Model_DbTable_Consumos();
        $this->forn = new Application_Model_DbTable_Fornecedores();
        
    
    }
    
    
    public function insertForn(array $values)
    {
        
        $this->forn->insert(array(
                'obra' =>$values['obra'],
                'pp_inapa'=>$values['pp'],
                'antalis_ton' =>$values['at'],
                'antalis_total' =>$values['atl'],
                'inapa_ton' =>$values['it'],
                'inapa_total' =>$values['itl'],
                'torras_ton' =>$values['tt'],
                'torras_total' =>$values['ttl'],
                'outro_nome' => $values['on'],
                'outro_ton' =>$values['ot'],
                'outro_total' =>$values['otl'],
                'mapa'=>$values['m'],
                'dia'=>date('Y-m-d H:i:s')
                ));
     
    }
    
    
    
    
    /**
     * 
     * @param array $values
     */
    public function insertReg (array $values)
    {
        
        $validator = new Zend_Validate_Db_NoRecordExists( array('table' => 'registos', 'field' => 'obra' ));
        

        if ($validator->isValid($values['obra'])) {
            
            $this->reg->insert(array(
                    'obra'          => $values['obra'],
                    'cliente'       => $values['cliente'],
                    'abertura_obra' => $values['abertura_obra'],
                    'data_entrega'  => $values['data_entrega'],
                    'descricao'     => $values['descricao']));
        } else {
            
            $this->updateRegbyJob(array('obra' => $values['obra'], 'armazem' => 0));
        }
        
        
        for ($i = 1; $i < $values['rawrows']; $i++) {
            
            if ($values['tipo'.$i] != NULL)
            {
                $this->cons->insert(array(
                        'obra'    => $values['obra'],
                        'tipo'    => $values['tipo'.$i] ,
                        'grs'     => $values['grs'.$i] ,
                        'altura'  => $values['altura'.$i] ,
                        'larg'    => $values['larg'.$i],
                        'qty_req' => $values['qtd_req'.$i] ,
                        'fsc'     => $values['fsc'.$i] ,
                        'pefc'    => $values['pefc'.$i] ,
                        'obs'     => $values['obs'.$i] ,
                        'dia'     => date('Y-m-d H:i:s'),
                ));
            }
            
        }
   }
    
    
    public function getAllRecordsForAramazem()
    {
        $sql = $this->reg->select();
        $sql->where("armazem = ?", FALSE);
        
        $rows = $this->reg->fetchAll($sql);
        
        return $rows;
    }
    
    public function getAllRecordsForEncomendas()
    {
        $sql = $this->reg->select();
        $sql->where("encomendado = ?", FALSE);
    
        $rows = $this->reg->fetchAll($sql);
    
        return $rows;
    }
    
    
    public function getDetailsFromJob($job)
    {
        $row = $this->reg->find($job);
        
        return $row->toArray();
        
    }
    
    public function getRawForJob($job)
    {
        $sql = $this->cons->select();
        $sql->where("obra = ?", (int) $job);
        
        $rows = $this->cons->fetchAll($sql);
        
        return $rows;
        
    }
    
    /**
     * Delete record
     * @param string $id
     */
    public function removeReg($id)
    {
        $where = $this->reg->getAdapter()->quoteInto('obra = ?', (int) $id);
        $this->reg->delete($where);
    }
    
    
    /**
     * Delete record
     * @param string $id
     */
    public function removeConsumo($id)
    {
        $where = $this->cons->getAdapter()->quoteInto('id = ?', $id);
        $this->cons->delete($where);
    }
    /**
     * 
     * @param array $values
     */
    public function updateReg(array $values)
    {
        $where = $this->reg->getAdapter()->quoteInto('id = ?', $values['id']);
        $this->reg->update($values, $where);
    }
    
    public function updateRegbyJob(array $values)
    {
        $where = $this->reg->getAdapter()->quoteInto('obra = ?', $values['obra']);
        $this->reg->update($values, $where);
    }
    
    public function updateConsumo(array $values)
    {
        $where = $this->cons->getAdapter()->quoteInto('id = ?', $values['id']);
        $this->cons->update($values, $where);
    }
    
    
    public function getObsFromConsumos($id)
    {
        $sql = $this->cons->select();
        $sql->where("id = ?", (int) $id);
        
        $row = $this->cons->fetchRow($sql);
        
        return $row['obs'];
        
        
    }
    
}

