 export const staffNumberValidator = staffNumber => {
    if(!staffNumber){
        return "社員番号欄は必須です";
    }else if(!new RegExp(/^(0|[1-9][0-9]*)$/).test(staffNumber)){ 
      return "登録社員番号のみ入力してください。。。";
    }else if(new RegExp(/\d{10}/).test(staffNumber)){               
      return "登録ユーザーIDを入力してください。。。";
    }
    return ""
};

export const passwordValidator = password => {
    if (!password) {
      return "パスワード欄は必須です";
    }else if((password.match(/[\uff00-\uffff]/g))){
      return "半角のみで入力してください。";
    }
    return "";
};




  
