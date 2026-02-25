/** @type {import('jest').Config} */

const config = {
  verbose: true,
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "((\\.|/)(test|spec))\\.tsx?$", 
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};

export default config