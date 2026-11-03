import { CustomPagination } from "@/components/custom/CustomPagination"
import { products } from "@/mocks/products.mock"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useParams } from "react-router"

export const GenderPage = () => {

  const {gender} = useParams();

  const genderLabel = gender === 'men' ? 'Hombres' : gender === 'women' ? 'Mujeres' : gender === 'kid' ? 'Niños' : 'Todos los productos';

  return (
    <>
      <CustomJumbotron title={genderLabel} />
      <ProductsGrid products={products}/>
      <CustomPagination totalPages={5} />
    </>
  )
}
