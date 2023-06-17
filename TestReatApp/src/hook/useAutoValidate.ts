import { useEffect, useState } from "react";

enum EValidationType {
    MIN_LENGTH,
    MAX_LENGTH,
    REGEXP,
    START_WIDTH,
    END_WIDTH
}

export class CValidationType {

    public ValidateType: EValidationType;
    public Validate: number | string;
    public Error: string;
    constructor(validType: EValidationType, validate: number | string, error: string) {
        this.ValidateType = validType;
        this.Validate = validate;
        this.Error = error;
    }
}

export class CValidation {

    private AllValidation?: CValidationType[] = [];
   
    MinLength(min: number = 1, error = "ตัวอักษรต่ำสุด ") {

        let v = new CValidationType(EValidationType.MIN_LENGTH, min, error+min)
        this.AllValidation?.push(v);
        return this;
    }
    MaxLength(max: number, error = "ตัวอักษรสูงสุด ") {
        let v = new CValidationType(EValidationType.MAX_LENGTH, max, error+max)
        this.AllValidation?.push(v);
        return this;
    }
    MatchRegX(reg: string, error = "ตัวอักษรไม่ตรงแบบฟอร์ม") {
        let v = new CValidationType(EValidationType.REGEXP, reg, error)
        this.AllValidation?.push(v);
        return this;
    }
    StartWidth(start:string,error="ต้องเริ่มต้นด้วย "){
        let v = new CValidationType(EValidationType.START_WIDTH, start, error+start)
        this.AllValidation?.push(v);
        return this;
    }
    EndWidth(end:string,error="ต้องลงท้ายด้วย "){
        let v = new CValidationType(EValidationType.END_WIDTH, end, error+end)
        this.AllValidation?.push(v);
        return this;
    }
    isValid(value: string) {
        let error: string[] = [];
        this.AllValidation?.forEach(element => {
            switch (element.ValidateType) {
                case EValidationType.MIN_LENGTH:
                    if (typeof element.Validate === "number") {
                        if ( value.length >= element.Validate ) {

                        } else {
                            error.push(element.Error);
                        }
                    }
                    break;
                case EValidationType.MAX_LENGTH:
                    if (typeof element.Validate === "number") {
                        if (value.length <= element.Validate) {

                        } else {
                            error.push(element.Error);
                        }
                    }
                    break;
                    case EValidationType.START_WIDTH:
                        if (typeof element.Validate === "string") {
                            if (value.startsWith(element.Validate)) {
    
                            } else {
                                error.push(element.Error);
                            }
                        }
                        break;
                        case EValidationType.END_WIDTH:
                            if (typeof element.Validate === "string") {
                                if (value.endsWith(element.Validate)) {
        
                                } else {
                                    error.push(element.Error);
                                }
                            }
                            break;
                case EValidationType.REGEXP:
                    if (typeof element.Validate === "string") {
                        const regx = new RegExp(element.Validate);
                        if (regx.test(value)) {

                        } else {
                            error.push(element.Error);
                        }
                    }
                    break;
            }
        });
        let isValid = error.length === 0;
        return { isValid, error }
    }
}

export const useAutoValidate = (validate: CValidation) => {


    const [value, setValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const data = validate.isValid(value);
        if (data.error.length > 0) {
            setError(data.error.reduce((prev, curr) => prev+"*"+ curr, ""));
            setIsValid(false);
        } else {
            setError("");
            setIsValid(true);
        }
    }, [value]);

    return { value, isValid, setValue, error }
}