import ProductItem from "@/components/products/ProductItem";
import { IProducts } from "@/interfaces/products.interfaces";
import { getBrandDetails } from "@/services/brands.service";

export default async function BrandProductsPage({
  params: { id },
}: {
  params: { id: string };
}) {
 const {data} : {data: IProducts[]} = await getBrandDetails(id);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Brand Products</h1>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </section>
  );
}
