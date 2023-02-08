  export const emailValidator = email => {
    if (!email) {
      return "メールアドレス欄は必須です";
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
      return "a@a.a 形式である必要があります。";
    }
    return "";
  };
  
  export const idValidator = id => {
    if (!id){
       return "社員番号欄は必須です";
    }else if(!new RegExp(/^(0|[1-9][0-9]*)$/).test(id)){ 
      return "0 ～ 999999999 までの数字を入力してください。。。";
    }else if(new RegExp(/\d{10}/).test(id)){               
      return "社員番号を9桁以内で入力してください。。。";
    }
    return "";
  };

  export const passwordValidator = password => {
    if (!password) {
      return "パスワード欄は必須です";
    // } else if (password.length <= 7 || password.length >=21 ) {
    //   return "パスワードを8～20文字で入力してください。。。";
    // }   
    }
      return "";
  };

  export const nameValidator = name => {
        if(!name){
            return "氏名欄は必須です";
        }
        return "";
  }  

  export const furiganaValidator = furigana => {
        if(!furigana){
          return "フリガナ欄は必須です";
        } else if(!new RegExp(/[ァ-ン]+|[ｧ-ﾝﾞﾟ]+/u).test(furigana)){
          return "カタカナのみ入力してください。。。";
        }
   }
  // use katakana only
  // export const furiganaValidator = furigana => {
  //    var code = 0;
  //    code = furigana.charCodeAt();
  //    if(!furigana){
  //       return "フリガナ欄は必須です";
  //    }else if(!(12449 <= code && code <= 12538)){
  //       return "カタカナのみ入力してください。。。";
  //    }
  //    return "";
  // };

 

 
  
