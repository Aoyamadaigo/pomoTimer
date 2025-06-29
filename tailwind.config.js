/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    "bg-red-200", "bg-red-400", "bg-red-600",
    "bg-blue-200", "bg-blue-400", "bg-blue-600",
    "bg-green-200", "bg-green-400", "bg-green-600",
    "bg-yellow-200", "bg-yellow-400", "bg-yellow-600",
    "bg-purple-200", "bg-purple-400", "bg-purple-600",
    "bg-pink-200", "bg-pink-400", "bg-pink-600",
    "bg-teal-200", "bg-teal-400", "bg-teal-600",
    "bg-indigo-200", "bg-indigo-400", "bg-indigo-600",
    "bg-gray-200", "bg-gray-400", "bg-gray-600",
    "bg-orange-200", "bg-orange-400", "bg-orange-600",
  ],
  theme: {
    extend: {
      // フェードイン用アニメーションをここに追加
      animation: {
        'fade-in': 'fade-in 2s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};