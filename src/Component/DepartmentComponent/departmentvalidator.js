import { useState } from "react";

const inputValidDept = (deptName) => {
    if(!deptName) {
        return "部署名欄は必須です";
    }  else if ( deptName.length >= 20) {
        return "入力の長さは20文字以下にする必要があります。。。"; 
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

export const useFormValidDept = (department) => {
    const [ errors, setErrors ] = useState({
        department_name:{
            dirty:false,
            error:false,
            message:"",
        }
    });

const validationForm = ({department, field, errors, forceTouchErrors = false}) => {
        let isValid = true;

        let nextErrors = JSON.parse(JSON.stringify(errors));

        if (forceTouchErrors) {
            nextErrors = showErrors(errors);
        }
        const { department_name } = department;

        if(nextErrors.department_name.dirty && (field ? field === "department_name":true)) {
            const deptMessage = inputValidDept(department_name);
            nextErrors.department_name.error = !!deptMessage;
            nextErrors.department_name.message = deptMessage;
            if(!!deptMessage) isValid =false; 
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
        validationForm({department, field, errors:updatedErrors})
    }
    return {
        validationForm,
        onBlurField,
        errors,
    }
}
