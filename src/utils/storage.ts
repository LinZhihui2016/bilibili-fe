//localStorage setItem
export const setStorage = (
  key: string,
  obj: unknown,
  type: "LS" | "SS" = "LS"
) => {
  (type === "LS" ? localStorage : sessionStorage).setItem(
    `${import.meta.env.VITE_STORAGE}${key}`,
    JSON.stringify(obj)
  );
};
//localStorage getItem
export const getStorage = <T = Type.Obj>(
  key: string,
  type: "LS" | "SS" = "LS",
  json = true
) => {
  const data = (type === "LS" ? localStorage : sessionStorage).getItem(
    `${import.meta.env.VITE_STORAGE}${key}`
  );
  if (json) {
    try {
      return data ? (JSON.parse(data) as T) : "";
    } catch (error) {
      return data || "";
    }
  } else {
    return data || "";
  }
};
//localStorage removeItem
export const removeStorage = (key: string, type: "LS" | "SS" = "LS") => {
  (type === "LS" ? localStorage : sessionStorage).removeItem(
    `${import.meta.env.VITE_STORAGE}${key}`
  );
};
