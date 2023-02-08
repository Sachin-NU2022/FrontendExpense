import { useState } from "react";

const inputValidator = (divName) => {
    if(!divName) {
        return "課名欄は必須です";
    }else if ( divName.length >= 20) {
        return "入力の長さは20文字以下にする必要があります。。。"; 
    } else{
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
export const useFormValidator = (division) => {
    const [ errors, setErrors ] = useState({
        department_name:{
            dirty:false,
            error:false,
            message:"",
        },
        division_name:{
            dirty:false,
            error:false,
            message:"",
        }
    });
    const validateForm = ({division, field, errors, forceTouchErrors = false}) => {
        let isValid = true;

        let nextErrors = JSON.parse(JSON.stringify(errors));

        if (forceTouchErrors) {
            nextErrors = showErrors(errors);
        }
        const { department_name, division_name } = division;

        if(nextErrors.department_name.dirty && (field ? field === "department_name":true)) {
            const deptMessage = inputValidator(department_name,division);
            nextErrors.department_name.error = !!deptMessage;
            nextErrors.department_name.message = deptMessage;
            if(!!deptMessage) isValid =false; 
        }
        if(nextErrors.division_name && (field ? field === "division_name":true)) {
            const divMessage = inputValidator(division_name,division);
            nextErrors.division_name.error = !!divMessage;
            nextErrors.division_name.message = divMessage;
            if(!!divMessage) isValid =false; 
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
        validateForm({division, field, errors:updatedErrors})
    }
    return {
        validateForm,
        onBlurField,
        errors,
    }
}
