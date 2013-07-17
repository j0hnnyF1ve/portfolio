<?php
/* 
  DESCRIPTION: 
  The template is rendered based on the xml file.
  The template is expected to have the information rendered from the xml in {} tags.
  The createHtml method will take out the keys from each entry, and look for them in the template
  The xml doc is expected to be formatted like this:
  <{parentName}>
    <entry>
      <{key1}>{value1}</{key1}>
      <{key2}>{value2}</{key2}>
      <{key3}>{value3}</{key3}>
                ...
      <{keyN}>{valueN}</{keyN}>
    </entry>
  </{parentName}>
*/
class PortfolioTemplate
{
  private $template;
  private $xmlPath;

  public function __construct($template, $xmlPath)
  {
    $this->__set('template', $template);
    $this->__set('xmlPath', $xmlPath);
  }
  public function createHtml()
  {
    if(!is_file($this->xmlPath) ) 
    {
      return '';
    }
    $html = '';
    $xmlString = file_get_contents($this->xmlPath);

    $xmlDoc = new SimpleXMLElement($xmlString);

    foreach($xmlDoc->entry as $entry)
    {
      $newTemplate = $this->template;

      $objArray = array();
      foreach($entry as $key => $value)
      {
        $objArray[$key] = $value;
        $newTemplate = str_replace('{' . $key . '}', $value, $newTemplate);
      }
      $html .= $newTemplate;
    }    
    return $html;
  }

  public function __get($property) 
  {
    if (property_exists($this, $property)) 
    {
      return $this->$property;
    }
  }

  public function __set($property, $value) 
  {
    if (property_exists($this, $property)) 
    {
      $this->$property = $value;
    }

    return $this;
  }

}
?>