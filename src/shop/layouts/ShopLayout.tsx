import { Outlet } from "react-router"

export const ShopLayout = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        ShopLayout

      </h1>

      <Outlet/>
      </div>
  )
}
