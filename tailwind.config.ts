import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // 确保路径正确
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
