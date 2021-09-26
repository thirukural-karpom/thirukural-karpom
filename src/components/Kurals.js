import React from "react"
import { useTranslation } from "react-i18next";

const Kurals = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("Thirukural Karpom")}</h1>
    </div>
  )
}

export default Kurals
