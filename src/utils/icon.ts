import icon from "@/assets/favicon.ico";
export const setupIcon = () => {
  const { VITE_ICON } = import.meta.env;
  if (VITE_ICON) {
    const pre = `//at.alicdn.com/t/${VITE_ICON}.`;
    const js = document.createElement("script");
    js.src = `${pre}js`;
    document.head.appendChild(js);
    const css = document.createElement("link");
    css.href = `${pre}css`;
    document.head.appendChild(css);
  }
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = icon;
  document.head.appendChild(link);
};
