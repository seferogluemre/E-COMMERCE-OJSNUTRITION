

export const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

export async function loader() {
    const bestSellerResponse = await fetch(base_url + "/products/best-sellers");
    const bestSellerData = await bestSellerResponse.json();

    return { products: bestSellerData.data };

}

const BestSeller = () => {


    return <>

    </>
}

export default BestSeller;