export const descriptionValidator = description => {
    if (!description) {
      return "摘要欄は必須です";
    }else if(!new RegExp(/[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[々〆〤ヶ]+/u).test(description)){
      return "日本語入力のみを挿入してください。。。";
    }
    return "";
  };
  
  export const payment_destinationValidator = payment_destination => {
    if (!payment_destination){
       return "支払先欄は必須です";
    }else if (!new RegExp(/[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[々〆〤ヶ]+/u).test(payment_destination)) {
      return "日本語入力のみを挿入してください。。。"
    } 
    return "";
  };

  export const entraining_pointValidator = entraining_point => {
    if (!entraining_point) {
      return "乗車駅欄は必須です";
    } else if (!new RegExp(/[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[々〆〤ヶ]+/u).test(entraining_point)) {
      return "日本語入力のみを挿入してください。。。"
    } 
    return "";
  };

  export const arrival_stationValidator = arrival_station => {
        if(!arrival_station){
            return "降車駅欄は必須です";
        }else if(!new RegExp(/[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[々〆〤ヶ]+/u).test(arrival_station)){
            return "日本語入力のみを挿入してください。。。";
        }
        return "";
  }  

  export const amountValidator = amount => {
    if(!amount){
        return "金額欄は必須です";
    }else if(!new RegExp(/^(0|[1-9][0-9]*)$/).test(amount)){ 
      return "0 ～ 999999999 までの数字を入力してください。。。";
    }else if(new RegExp(/\d{9}/).test(amount)){               
      return "金額を9桁以内で入力してください。。。";
    }
    return ""
  };

  export const noteValidator = note => {
    if(!note){
        return "備考欄は必須です";
    }else if(!new RegExp(/[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[々〆〤ヶ]+/u).test(note)){
      return "日本語入力のみを挿入してください。。。";
    }
    return "";
  };


  // export const furiganaValidator = furigana => {
  //    if(!furigana){
  //       return "Furigana field is required";
  //    }else if(!new RegExp(/[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[々〆〤ヶ]+/u).test(furigana)){
  //       return "Japanese character only";
  //    }
  //    return "";
  // }

  //　check half width only
  // export const nameValidator = name => {
  //     var code = 0;
  //     code = name.charCodeAt();
  //     if(!name){
  //        return "Name field is required";
  //     }else if((12352<= code && code <= 12447) || 
  //              (12448<= code && code <= 12543) || 
  //              (19968<= code && code <= 19893)) {
  //        return "Half width character only";
  //     }
  //     return "";
  // };

  
