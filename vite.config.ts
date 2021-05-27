import { AliasOptions, defineConfig, } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

const pathResolver = (path: string) => resolve(__dirname, ".", path);

const alias: AliasOptions = [
  { find: "@", replacement: pathResolver("./src") },
  { find: "@components", replacement: pathResolver("./src/components") },
  { find: "@css", replacement: pathResolver("./src/css") },
  { find: "@pages", replacement: pathResolver("./src/pages") },
  { find: "@utils", replacement: pathResolver("./src/utils") },
  { find: /^~/, replacement: "" },
];

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://static.linzhihui.online/",
  build:{
    assetsDir:"bilibili",
  },
  plugins: [vue()],
  optimizeDeps: {
    include: ["element-plus/lib/locale/lang/zh-cn"]
  },
  resolve: { alias },
  server: {
    port: 8809
  }
});
