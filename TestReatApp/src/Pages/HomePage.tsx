import { useTranslation } from "react-i18next";
import { HomePageBox, HomePageContainer, HomePageDescription, HomePageTitle, HomePageWraper, SelectLanguage } from "../styled/HomePage.styeld";
import { changeLanguage } from "i18next";

export default function HomePage() {
    const { t } = useTranslation();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.selectedIndex) {
            case 0: changeLanguage("en"); break;
            case 1: changeLanguage("th"); break;
        }
    };

    return (
        <>
            <HomePageContainer>
                <HomePageWraper>
                    <SelectLanguage onChange={handleChange}>
                        <option>EN</option>
                        <option>TH</option>
                    </SelectLanguage>
                    <HomePageBox to={"/shape"}>
                        <HomePageTitle>{t("Test1")}</HomePageTitle>
                        <HomePageDescription>{t("ManageWeb")}</HomePageDescription>
                    </HomePageBox>
                    <HomePageBox to={""}>
                        <HomePageTitle>{t("Test2")}</HomePageTitle>
                        <HomePageDescription>{t("API")}</HomePageDescription>
                    </HomePageBox>
                    <HomePageBox to={"/form"}>
                        <HomePageTitle>{t("Test3")}</HomePageTitle>
                        <HomePageDescription>{t("FormManage")}</HomePageDescription>
                    </HomePageBox>

                </HomePageWraper>
            </HomePageContainer>
        </>
    )
}