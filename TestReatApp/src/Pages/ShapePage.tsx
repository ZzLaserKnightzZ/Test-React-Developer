import { useEffect, useState } from 'react'
import { PathImg, ShapeControlItem, ShapeControlPosition, ShapeControlSub, ShapeControlSubItem, ShapeControlTitle, ShapeItem, ShapeItemWraper, ShapeItemsContainer, ShapePageContainer, ShapePageLayoutAndStyle, ShapeSignDown, ShapeSignLeft, ShapeSignRight, ShapeSignUp, ShapeWraper } from '../styled/ShapePage.styled'
import { SelectLanguage } from '../styled/HomePage.styeld';
import { changeLanguage } from "i18next";
import { useTranslation } from 'react-i18next';



const RenderSubComponent = (renderNumber: number) => {
  switch (renderNumber) {
    case 0: return <ShapeItemWraper><PathImg clipPath='polygon(25% 0%,75% 0%, 75% 100%, 25% 100%)' /></ShapeItemWraper>;
    case 1: return <ShapeItemWraper style={{ padding: "0" }}><PathImg clipPath='circle(50.0% at 50% 50%)' style={{ width: "50px", height: "50px", scale: "2" }} /></ShapeItemWraper>;
    case 2: return <ShapeItemWraper><PathImg clipPath='ellipse(45% 31% at 50% 50%)' /></ShapeItemWraper>;
    case 3: return <ShapeItemWraper><PathImg clipPath='polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' /></ShapeItemWraper>;
    case 4: return <ShapeItemWraper><PathImg clipPath='' /></ShapeItemWraper>;
    case 5: return <ShapeItemWraper><PathImg clipPath='polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)' /></ShapeItemWraper>;
    default: return <></>;
  }
}

type Prop = {
  index: number;
  isRandomed: boolean;
  area: string;
}

const random = (refData: Prop[], start: number = 0) => {
  //1
  const notSelected = refData.filter(x => x.isRandomed === false).map(x => x.index);
  if (notSelected.length === 0) return;
  //if(notSelected.length === 1) 
  //2
  const randomIndex = notSelected[Math.floor(Math.random() * notSelected.length)];
  //3
  const temp = refData[start].index;
  //4
  refData[start].index = randomIndex;
  //5
  refData[start].isRandomed = true;
  //6
  refData[randomIndex].index = temp;
  //7
  refData[randomIndex].isRandomed = true;
  //console.log("start" + start, refData)

  random(refData, ++start);
}

export default function ShapePage() {

  const [rows, setRows] = useState(["c1r1 c1r1 c2r1 c2r1 c3r1 c3r1 c4r1 c4r1", "c1r2 c2r2 c2r2 c3r2 c3r2 c4r2 c4r2 c5r2"]);
  const [row1, setRow1] = useState("");
  const [row2, setRow2] = useState("");
  const { t } = useTranslation();
  
  const [items, setItems] = useState([
    { area: 'c2r1', index: 0 },
    { area: 'c3r1', index: 1 },
    { area: 'c4r1', index: 2 },
    { area: 'c2r2', index: 3 },
    { area: 'c3r2', index: 4 },
    { area: 'c4r2', index: 5 }]);


  const clickMovePosition = () => {
    const rr = rows.reverse();
    setRows(rr);
    setRow1(rr[0]);
    setRow2(rr[1]);
  }

  const clickRandom = () => {
    let ran = items.map(x => { return { ...x, isRandomed: false } }).sort((a, b) => a.index - b.index);
    random(ran);
    const _newRandom = ran.map(x => { return { index: x.index, area: x.area } });
    setItems(_newRandom);
  }

  const clickShiftLeft = () => {
    let max = 0, min = 0;
    items.map(x => x.index).forEach((i) => {
      if (i > max) max = i;
      if (i < min) min = i;
    });

    const shiftLeft = items.map(x => {
      return { ...x, index: x.index + 1 > max ? min : x.index + 1 }
    });

    setItems(shiftLeft);
  }

  const clickShiftRight = () => {
    let min = 0, max = 0;
    items.map(x => x.index).forEach((i) => {
      if (i > max) max = i;
      if (i < min) min = i;
    });

    const shiftRight = items.map(x => {
      return { ...x, index: x.index - 1 < min ? max : x.index - 1 }
    });

    setItems(shiftRight);
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.selectedIndex)
    switch (e.target.selectedIndex) {
      case 0: changeLanguage("en"); break;
      case 1: changeLanguage("th"); break;
    }
  };

  //init
  useEffect(() => {
    setRow1(rows[0]);
    setRow2(rows[1]);
  }, []);

  return (
    <>
      <ShapePageContainer>
        <ShapePageLayoutAndStyle>{t("TitleLayoutPage")}</ShapePageLayoutAndStyle>
        <SelectLanguage onChange={handleChange}>
            <option>EN</option>
            <option>TH</option>
          </SelectLanguage>
        <ShapeWraper>
          <ShapeControlPosition>

            <ShapeControlItem onClick={clickShiftLeft}>
              <ShapeSignLeft />
              <ShapeControlTitle>{t("MoveShape")}</ShapeControlTitle>
            </ShapeControlItem>

            <ShapeControlItem onClick={clickMovePosition}>
              <ShapeControlSubItem>

                <ShapeControlSub  >
                  <ShapeSignUp />
                </ShapeControlSub>

                <ShapeControlSub >
                  <ShapeSignDown />
                </ShapeControlSub>

              </ShapeControlSubItem>
              <ShapeControlTitle>{t("MovePosition")}</ShapeControlTitle>
            </ShapeControlItem>

            <ShapeControlItem onClick={clickShiftRight}>
              <ShapeSignRight />
              <ShapeControlTitle>{t("MoveShape")}</ShapeControlTitle>
            </ShapeControlItem>

          </ShapeControlPosition>
          <br />
          <br />
          <hr />
          <br />
          <br />
          <ShapeItemsContainer row1={row1} row2={row2} >
            {
              items.map((item, index) => <ShapeItem area={item.area} key={index} onClick={clickRandom}>{RenderSubComponent(item.index)}</ShapeItem>)
            }
          </ShapeItemsContainer>
        </ShapeWraper>
      </ShapePageContainer>
    </>
  )
}