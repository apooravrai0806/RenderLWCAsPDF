/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 02-02-2023
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class CaseController {
    
    Public String message = System.currentPagereference().getParameters().get('listView');
    
    public List<Case> getGetCase() {
        String strQuery = 'SELECT Id,CaseNumber , Origin from CASE Where CreatedDate = LAST_N_DAYS:'+message;
        return Database.query(strQuery);
    }

    
    @AuraEnabled(cacheable=true)
    public static List<Case> getCase(Integer days){
    String strQuery = 'SELECT Id,CaseNumber , Origin from CASE Where CreatedDate = LAST_N_DAYS:'+days;
    return Database.query(strQuery);
}

}