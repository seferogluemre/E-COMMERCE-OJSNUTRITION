export const BASE_URL = "https://fe1111.projects.academy.onlyjs.com/api/v1";
export const PHOTO_URL = "https://fe1111.projects.academy.onlyjs.com";
export async function getAllProducts(page: number, limit: number) {
  return (page - 1) * limit;
}
