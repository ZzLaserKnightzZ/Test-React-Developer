import { BackToHomePage, CheckBox, ErrorText, FormContainer, FormWrap, FormWraperContainer, From, IdCardContainer, IdCardInputText, IdCardShowText, InputText, Label, NormalRow, PaginationContainer, PaginationItem, PaginationSelecter, PaginationShiftLeft, PaginationShiftRight, RadioButton, Row1, Row2, Row3, Row4, Row5, Row6, Row7, SelectOption, Separate, SortSign, SortSignContainer, Table, TableWraper, Tbody, Td, Th, Thead, Tr, TrHearder } from "../styled/FromPage.styled";
import { useAppDispatch } from "../reduxTk/store/store";
import { IPerson, deleteSelectedPerson, pagination, personSelecter, saveState, selectAllPerson, selectPerson, sortByGender, sortByName, sortByNationality, sortByPhoneNumber } from "../reduxTk/personSlice";
import { useSelector } from 'react-redux';
import { addPerson, deletePerson, editPerson } from "../reduxTk/personSlice"
import { v4 as uuidv4 } from 'uuid';
//import { nanoid } from "@reduxjs/toolkit";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CValidation, useAutoValidate } from "../hook/useAutoValidate";

type Prop = {
    maxLength: number;
    selectPage: (start: number, stop: number) => void;
}

type paginationList = {
    isSelected: boolean;
    startIndex: number;
    stopIndex: number;
}

const PaginationSlecter = ({ maxLength, selectPage }: Prop) => {

    let selectList: paginationList[] = [];
    const maxItemInTable = 3; //ค่าสูงสุดของ แถว table 
    for (let i = 0; i < maxLength; i++) {
        if (i === 0) {
            let select = { isSelected: false, startIndex: 0, stopIndex: 2 }
            selectList.push(select);
        } else {
            if (i % maxItemInTable === 0) {
                let select = { isSelected: false, startIndex: i, stopIndex: i + (maxItemInTable - 1) < maxLength ? i + (maxItemInTable - 1) : maxLength }
                selectList.push(select);
            }
        }
    }
    //if no last index
    if (selectList.filter(x => x.stopIndex === maxLength).length === 0) {
        const beforeLastIndex = selectList[selectList.length - 1].stopIndex;
        let select = { isSelected: false, startIndex: beforeLastIndex + 1 > maxLength ? maxLength : beforeLastIndex + 1, stopIndex: maxLength }
        selectList.push(select);
    }

    const [pageNumber, setPageNumber] = useState<paginationList[]>([...selectList]);

    return (<>
        {
            pageNumber.map((x, i) =>
                <PaginationItem key={i} isActive={x.isSelected}
                    onClick={() => {
                        selectPage(x.startIndex, x.stopIndex);
                        setPageNumber(x => x.map((xx, ii) => ii === i ? { ...xx, isSelected: true } : { ...xx, isSelected: false }));
                    }}>{i}</PaginationItem >)
        }
    </>)
}

export default function FormPage() {

    const dispatcher = useAppDispatch();
    const persons = useSelector(personSelecter);

    //state form
    const [id, setId] = useState('');
    const prefix = useAutoValidate(new CValidation().MinLength(1));
    const name = useAutoValidate(new CValidation().MinLength(2).MaxLength(30).MatchRegX("^[ก-ฮแเ์ืใา่๋้็โี๊ะำัไึูุ]*$", "ภาษาไทยเท่านั้นนะจะ"));
    const lastName = useAutoValidate(new CValidation().MinLength(2).MaxLength(30).MatchRegX("^[ก-ฮแเ์ืใา่๋้็โี๊ะำัไึูุ]*$", "ภาษาไทยเท่านั้นนะจะ"));
    const dateOfBirth = useAutoValidate(new CValidation().MinLength(10).MaxLength(10).MatchRegX("[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,4}"));
    const nationality = useAutoValidate(new CValidation().MinLength(1));
    const idcard = useAutoValidate(new CValidation().MinLength(13).MatchRegX("[0-9]+$"));
    const gender = useAutoValidate(new CValidation().MinLength(1, "กรุณาเลือกอย่างน้อย "));
    const preFixPhoneNumber = useAutoValidate(new CValidation().MinLength(2).MaxLength(2));
    const phoneNumber = useAutoValidate(new CValidation().MinLength(10).MaxLength(10).MatchRegX("^[0-9]*$"));
    const passPort = useAutoValidate(new CValidation().MinLength(1).MatchRegX("^[A-Za-z0-9]*$"));
    const expectSalary = useAutoValidate(new CValidation().MinLength(1).MatchRegX("^[0-9]*$"));
    const [validateIdCard, setValidateIdCard] = useState(false);


    const clickChangePrefixName = (e: React.ChangeEvent<HTMLSelectElement>) => prefix.setValue(e.target.value);
    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => name.setValue(e.target.value);
    const changeLastName = (e: React.ChangeEvent<HTMLInputElement>) => lastName.setValue(e.target.value);
    const changeDateOfBirth = (e: React.ChangeEvent<HTMLInputElement>) => dateOfBirth.setValue(e.target.value);
    const changeNationality = (e: React.ChangeEvent<HTMLSelectElement>) => nationality.setValue(e.target.value);
    const changeIdCard = (e: React.ChangeEvent<HTMLInputElement>) => idcard.setValue(e.target.value);
    const clickSelectGender = (e: React.ChangeEvent<HTMLInputElement>) => gender.setValue(e.target.value);
    const changePreFixPhoneNumber = (e: React.ChangeEvent<HTMLSelectElement>) => preFixPhoneNumber.setValue(e.target.value);
    const changePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => phoneNumber.setValue(e.target.value);
    const changePassPort = (e: React.ChangeEvent<HTMLInputElement>) => passPort.setValue(e.target.value);
    const changeSalaryExpect = (e: React.ChangeEvent<HTMLInputElement>) => expectSalary.setValue(e.target.value);


    //sort
    const [isSortName, setIsSortName] = useState(false);
    const [isSortGender, setIsSortGender] = useState(false);
    const [isSortPhoneNumber, setIsSortPhoneNumber] = useState(false);
    const [isSortNationality, setIsSortNationality] = useState(false);
    //select  All person
    const [isSelectAllPerson, setIsSelectedAllPerson] = useState(false);
    const validateCardId = (id: string) => {

        if (id.length !== 13) return false;
        const degit = id.split("");
        let sum = 0;
        let index = 0;
        for (let i = 13; i >= 2; i--) {
            sum += Number(degit[index]) * i;
            index++;
        }
        return 11 - (sum % 11) === Number(degit[12]);
    }

    const formatIdCard = (id: string) => {
        if (id.length !== 13) return id;
        return id.replace(/(\d{1})(\d{1,4})(\d{1,5})(\d{1,2})(\d{1})/, "$1-$2-$3-$4-$5")
    }

    useEffect(() => {
        prefix.setValue("นาย")
        nationality.setValue("1");
        preFixPhoneNumber.setValue("+66");
        dispatcher(saveState({}));
    }, [persons]);

    /*
    useEffect(() => {
        const validate = validateCardId(idcard.value);
        setValidateIdCard(validate);
    }, [idcard]);
    */

    const clickEditForm = (id: string) => {
        const person = persons.find(x => x.id === id);
        if (person) {
            setId(id)
            prefix.setValue(person.prefix);
            name.setValue(person.name);
            lastName.setValue(person.lasName);
            dateOfBirth.setValue(person.dateOfbirth);
            nationality.setValue(person.nationality);
            idcard.setValue(person.identityCard);
            gender.setValue(person.gender);
            preFixPhoneNumber.setValue(person.prefexCellPhone);
            phoneNumber.setValue(person.cellPhone);
            passPort.setValue(person.passPort);
            expectSalary.setValue(person.saralyExpect);
        }
    }

    const clickClearForm = () => {
        prefix.setValue("");
        name.setValue("");
        lastName.setValue("");
        dateOfBirth.setValue("");
        nationality.setValue("");
        idcard.setValue("");
        gender.setValue("");
        preFixPhoneNumber.setValue("");
        phoneNumber.setValue("");
        passPort.setValue("");
        expectSalary.setValue("");
        setId('');
    }

    const clickAddForm = () => {
        //if(isValidate) for show only
        const person: IPerson = {
            id: id.length === 0 ? uuidv4() : id, //if new person or edite
            isSelected: false,
            isShowing: false,

            prefix: prefix.value,
            name: name.value,
            lasName: lastName.value,
            dateOfbirth: dateOfBirth.value,
            nationality: nationality.value,
            identityCard: idcard.value,
            gender: gender.value,
            prefexCellPhone: preFixPhoneNumber.value,
            cellPhone: phoneNumber.value,
            passPort: passPort.value,
            saralyExpect: expectSalary.value
        }

        //if new person
        if (id.length === 0) {
            dispatcher(addPerson(person));
        } else {
            dispatcher(editPerson(person));
        }

        dispatcher(saveState({}));
        clickClearForm();
    }

    return (
        <>
            <FormContainer>
                <BackToHomePage to="/">กลับหน้าหลัก</BackToHomePage>
                <FormWraperContainer>
                    <FormWrap>
                        <From>

                            <Row1>
                                <NormalRow maxWidthColumn="7rem">
                                    <Label> <span><sub>*</sub>คำนำหน้าชื่อ</span></Label>
                                    <SelectOption onChange={clickChangePrefixName} value={preFixPhoneNumber.value}>
                                        <option>นาย</option>
                                        <option>นาง</option>
                                        <option>นางสาว</option>
                                    </SelectOption>
                                </NormalRow>
                                <NormalRow maxWidthColumn="4rem">
                                    <Label><span><sub>*</sub>ชื่อจริง</span></Label>
                                    <InputText onChange={changeName} value={name.value} isValid={name.isValid} />
                                </NormalRow>
                                <NormalRow maxWidthColumn="5rem">
                                    <Label><span><sub>*</sub>นามสกุล</span></Label>
                                    <InputText onChange={changeLastName} value={lastName.value} isValid={lastName.isValid} />
                                </NormalRow>
                            </Row1>
                            <ErrorText>{name.error + " " + lastName.error}</ErrorText>
                            <Row2>
                                <NormalRow maxWidthColumn={null} >
                                    <Label><span><sub>*</sub>วันเกิด</span></Label>
                                    <InputText type="date" min="1990-01-01" max="2100-12-31" onChange={changeDateOfBirth} value={dateOfBirth.value} isValid={dateOfBirth.isValid} />
                                </NormalRow>
                                <NormalRow maxWidthColumn="4rem">
                                    <Label><span><sub>*</sub>สัญชาติ</span></Label>
                                    <SelectOption onChange={changeNationality} value={nationality.value}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </SelectOption>
                                </NormalRow>
                            </Row2>
                            <ErrorText>{dateOfBirth.error + " " + nationality.error}</ErrorText>
                            <Row3>
                                <NormalRow maxWidthColumn="8rem">
                                    <Label><span><sub>*</sub>เลขบัตรประชาชน</span></Label>
                                    <IdCardContainer>
                                        <IdCardShowText readOnly value={formatIdCard(idcard.value)} />
                                        <IdCardInputText onChange={changeIdCard} maxLength={13} />
                                    </IdCardContainer>
                                </NormalRow>
                            </Row3>
                            <ErrorText>{idcard.error + " " + validateIdCard ? "" : "เลขบัตประชาชนไม่ถูกต้อง"}</ErrorText>
                            <Row4>
                                <NormalRow maxWidthColumn={null}>
                                    <Label><span><sub>*</sub>เพศ</span></Label>
                                </NormalRow>
                                <NormalRow maxWidthColumn={null}>
                                    <RadioButton type="radio" name="gender" value="ผู้ชาย" checked={gender.value === "ผู้ชาย"} onChange={clickSelectGender} />
                                    <Label>ผู้ชาย</Label>
                                </NormalRow>
                                <NormalRow maxWidthColumn={null}>
                                    <RadioButton type="radio" name="gender" value="ผู้หญิง" checked={gender.value === "ผู้หญิง"} onChange={clickSelectGender} />
                                    <Label>ผู้หญิง</Label>
                                </NormalRow>
                                <NormalRow maxWidthColumn={null}>
                                    <RadioButton type="radio" name="gender" value="ไม่ระบุ" checked={gender.value === "ไม่ระบุ"} onChange={clickSelectGender} />
                                    <Label>ไม่ระบุ</Label>
                                </NormalRow>
                            </Row4>
                            <ErrorText>{gender.error}</ErrorText>
                            <Row5>
                                <NormalRow maxWidthColumn={null}>
                                    <Label><span><sub>*</sub>หมายเลขโทรศัพท์มือถือ</span></Label>
                                    <SelectOption onChange={changePreFixPhoneNumber} value={preFixPhoneNumber.value}>
                                        <option>+66</option>
                                        <option>+77</option>
                                        <option>+88</option>
                                    </SelectOption>
                                </NormalRow>
                                <NormalRow maxWidthColumn={null}>
                                    <Label>-</Label>
                                    <InputText onChange={changePhoneNumber} value={phoneNumber.value} isValid={phoneNumber.isValid} />
                                </NormalRow>
                            </Row5>
                            <ErrorText>{phoneNumber.error}</ErrorText>
                            <Row6>
                                <NormalRow maxWidthColumn="20rem">
                                    <Label><span><sub>*</sub>หนังสือเดินทาง</span></Label>
                                    <InputText onChange={changePassPort} value={passPort.value} isValid={passPort.isValid} />
                                </NormalRow>
                            </Row6>
                            <ErrorText>{passPort.error}</ErrorText>
                            <Row7>
                                <NormalRow maxWidthColumn="10rem">
                                    <Label><span><sub>*</sub> เงินเดือนที่คาดหวัง</span></Label>
                                    <InputText onChange={changeSalaryExpect} value={expectSalary.value} isValid={expectSalary.isValid} />
                                </NormalRow>
                                <NormalRow maxWidthColumn={null}>
                                    <div></div>
                                    <button onClick={clickClearForm}>ล้างข้อมูล</button>
                                </NormalRow>
                                <NormalRow maxWidthColumn={null}>
                                    <button onClick={clickAddForm}>ส่งข้อมูล</button>
                                </NormalRow>
                            </Row7>
                            <ErrorText>{expectSalary.error}</ErrorText>
                        </From>
                    </FormWrap>

                    <TableWraper>
                        <input type="checkbox" onClick={() => {
                            dispatcher(selectAllPerson({ isSelect: !isSelectAllPerson }));
                            setIsSelectedAllPerson(x => !x);
                        }} /> <label>เลือกทั้งหมด</label>
                        <button onClick={() => {
                            dispatcher(deleteSelectedPerson({}));
                        }}>ลบทั้งหมด</button>
                        <br /> <br />
                        <Table>
                            <Thead>
                                <TrHearder>
                                    <Th onClick={() => {
                                        dispatcher(sortByName({ upDown: isSortName }));
                                        setIsSortName(x => !x);
                                    }}>ชื่อ
                                        <Separate>
                                            <SortSignContainer>
                                                <SortSign>
                                                    <AiFillCaretUp />
                                                    <AiFillCaretDown />
                                                </SortSign>
                                                <span>|</span>
                                            </SortSignContainer>
                                        </Separate>
                                    </Th>
                                    <Th onClick={() => {
                                        dispatcher(sortByGender({ upDown: isSortGender }));
                                        setIsSortGender(x => !x);
                                    }}>เพศ
                                        <Separate>
                                            <SortSignContainer>
                                                <SortSign>
                                                    <AiFillCaretUp />
                                                    <AiFillCaretDown />
                                                </SortSign>
                                                <span>|</span>
                                            </SortSignContainer>
                                        </Separate>
                                    </Th>
                                    <Th onClick={() => {
                                        dispatcher(sortByPhoneNumber({ upDown: isSortPhoneNumber }));
                                        setIsSortPhoneNumber(x => !x);
                                    }}>หมายเลขโทรศัพท์มือถือ
                                        <Separate>
                                            <SortSignContainer>
                                                <SortSign>
                                                    <AiFillCaretUp />
                                                    <AiFillCaretDown />
                                                </SortSign>
                                                <span>|</span>
                                            </SortSignContainer>
                                        </Separate>
                                    </Th>
                                    <Th onClick={() => {
                                        dispatcher(sortByNationality({ upDown: isSortNationality }));
                                        setIsSortNationality(x => !x);
                                    }}>สัญชาติ
                                        <Separate>
                                            <SortSignContainer>
                                                <SortSign>
                                                    <AiFillCaretUp />
                                                    <AiFillCaretDown />
                                                </SortSign>
                                                <span>|</span>
                                            </SortSignContainer>
                                        </Separate>
                                    </Th>
                                    <Th>จัดการ</Th>
                                </TrHearder>
                            </Thead>
                            <Tbody>
                                {
                                    persons.filter(x => x.isShowing === true).map(x =>
                                        <Tr key={x.id}>
                                            <Td><CheckBox readOnly type="checkbox" checked={x.isSelected} onClick={() => dispatcher(selectPerson({ id: x.id }))} />{x.name}</Td>
                                            <Td>{x.gender}</Td>
                                            <Td>{x.cellPhone}</Td>
                                            <Td>{x.nationality}</Td>
                                            <Td onClick={() => clickEditForm(x.id)}><FaEdit /></Td>
                                        </Tr>)
                                }

                            </Tbody>
                        </Table>
                        <br />
                        <br />
                        <center>
                            <PaginationContainer>
                                {/*<PaginationShiftLeft>&lt;</PaginationShiftLeft>*/}
                                {persons.length !== 0 ? <PaginationSelecter>
                                    <PaginationSlecter maxLength={persons.length} selectPage={(start, stop) => dispatcher(pagination({ indexStart: start, indexStop: stop }))} />
                                </PaginationSelecter> : <></>}
                                {/*<PaginationShiftRight>&gt;</PaginationShiftRight>*/}
                            </PaginationContainer>
                        </center>
                    </TableWraper>
                </FormWraperContainer>


            </FormContainer>
        </>
    )
}



