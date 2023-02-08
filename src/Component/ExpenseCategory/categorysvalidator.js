import { useState } from "react";

const inputValidCat = (catName) => {
    if(!catName) {
        return "カテゴリー名欄は必須です";
    } else if (!new RegExp(/[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[々〆〤ヶ]+/u).test(catName)) {
        return "日本語入力のみを挿入してください。。。"
    }else if ( catName.length >= 15) {
        return "入力の長さ15文字以下にする必要があります。。。"; 
    }  else{
        return "";
    }
}

const showErrors = (errors) => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            dirty:true,
        }
        return acc;
    },{});
}

export const useFormValidCat = (category) => {
    const [ errors, setErrors ] = useState({
        expense_category_name:{
            dirty:false,
            error:false,
            message:"",
        }
    });

const validationForm = ({category, field, errors, forceTouchErrors = false}) => {
        let isValid = true;

       let nextErrors = JSON.parse(JSON.stringify(errors));

        if (forceTouchErrors) {
            nextErrors = showErrors(errors);
        }
        const { expense_category_name } = category;

        if(nextErrors.expense_category_name.dirty && (field ? field === "expense_category_name":true)) {
            const catMessage = inputValidCat(expense_category_name);
            nextErrors.expense_category_name.error = !!catMessage;
            nextErrors.expense_category_name.message = catMessage;
            if(!!catMessage) isValid =false; 
        }
        setErrors(nextErrors);
        return{
            isValid,
            errors:nextErrors,
        };
    };
    const onBlurField = (e) => {
        const field = e.target.name;
        const fieldError = errors[field];
        if(fieldError.dirty) return;
            const updatedErrors = {
                ...errors,
                [field]:{...errors[field],
                dirty:true
            }
        };  
        validationForm({category, field, errors:updatedErrors})
    }
    return {
        validationForm,
        onBlurField,
        errors,
    }
}
