//将 xxx万 xxx亿转化为数字
export const compileNum = (v: string | number) => {
  if (typeof v === "number") return v;
  const _v = parseFloat(v);
  if (v.indexOf("万") > -1) {
    return _v * 10000;
  } else if (v.indexOf("亿") > -1) {
    return _v * 10000 * 10000;
  } else {
    return _v;
  }
};
//按3位分割数字
export const formatNum = (v: number | string) => {
  const str = v + "";
  const [int, floor] = str.split(".");
  const len = int.length;
  if (len <= 3) {
    return str;
  }
  const r = len % 3;
  const right = (int.slice(r, len).match(/\d{3}/g) || []).join(",");
  const left = int.slice(0, r);
  return (r > 0 ? `${left},${right}` : right) + (floor ? `.${floor}` : "");
};
//浮点数保留小数位
export const decimal = (num: number | string, n = 2) => {
  if (isNaN(+num)) {
    return num;
  } else {
    return (+num).toFixed(n);
  }
};
export const moneyTrans = (v: string | number, type: "f2y" | "y2f" = "f2y") => {
  if (!v) return 0;
  const _v = v + "";
  switch (type) {
    case "f2y":
      return parseInt(_v) / 100;
    case "y2f":
      return +(parseFloat(_v) * 100).toFixed(0);
  }
};
export const formatMoney = (v: number | string) =>
  formatNum(decimal(moneyTrans(v)));
