import plugin from "tailwindcss/plugin";

export default plugin(function ({ addComponents }) {
  addComponents(
    {
      ".tg-title1": {
        fontSize: "28px",
        lineHeight: "34px",
        letterSpacing: "0.38px",
        fontWeight: "700",
      },
      ".tg-title2": {
        fontSize: "22px",
        lineHeight: "28px",
        letterSpacing: "-0.26px"
      },
      ".tg-title3": {
        fontSize: "20px",
        lineHeight: "24px",
        letterSpacing: "-0.45px"
      },
      ".tg-headline": {
        fontSize: "17px",
        lineHeight: "22px",
        letterSpacing: "-0.43px",
        fontWeight: "590"
      },
      ".tg-body": {
        fontSize: "17px",
        lineHeight: "22px",
        letterSpacing: "-0.43px",
      },
      ".tg-callout": {
        fontSize: "16px",
        lineHeight: "22px",
        letterSpacing: "-0.31px"
      },
      ".tg-subheadline1": {
        fontSize: "15px",
        lineHeight: "18px",
        letterSpacing: "-0.23px"
      },
      ".tg-subheadline2": {
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "-0.15px"
      },
      ".tg-footnote": {
        fontSize: "13px",
        lineHeight: "18px",
        letterSpacing: "-0.08px"
      },
      ".tg-caption1": {
        fontSize: "12px",
        lineHeight: "16px",
        letterSpacing: "0px"
      },
      ".tg-caption2": {
        fontSize: "11px",
        lineHeight: "13px",
        letterSpacing: "0.06px"
      }
    }    
  )
});
