const generateBlobFromJson = (json) => {
  return new Blob([json], { type: "application/json" });
  console.log("Hello world");
};
export { generateBlobFromJson };
