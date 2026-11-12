import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScrennLoading';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { useProducts } from '@/shop/hooks/useProducts';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

export const AdminProductsPage = () => {

  const {data, isLoading}= useProducts();

  if(isLoading){
    return <CustomFullScreenLoading/>;
  }



  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aquí puedes ver y administrar tus productos"
        />

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[100px]">ID</TableHead> */}
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data!.products.map(product => (
              <TableRow>
                {/* <TableCell className="font-medium">1</TableCell> */}
                <TableCell>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>
                  <Link className="cursor-pointer hover:text-blue-500" to={`/admin/products/${product.id}`}>
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.gender}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.sizes.join(', ')}</TableCell>
                <TableCell className="text-right">
                  {/* <Link to={`t-shirt-teslo`}>Editar</Link> */}
                  <Link title='Editar' to={`/admin/products/${product.id}`}>
                    <PencilIcon className="w-5 h-5 text-gray-500 hover:text-blue-500" />
                  </Link>
                </TableCell>
              </TableRow>

            ))
          }
        </TableBody>
      </Table>

      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};