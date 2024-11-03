import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";

const CategoryList = async () => {
  try {
    const wixClient = await wixClientServer();

    // Asegúrate de que el cliente de Wix esté configurado correctamente
    if (!wixClient) {
      throw new Error("Wix client could not be initialized");
    }

    // Realiza la consulta a las colecciones
    const cats = await wixClient.collections.queryCollections().find();

    return (
      <div className="px-4 overflow-x-scroll scrollbar-hide ">
        <div className="flex gap-4 md:gap-8">
          {cats.items.map((item) => (
            <Link
              href={`/list?cat=${item.slug}`}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
              key={item._id}
            >
              <div className="relative bg-slate-100 w-full h-96">
                <Image
                  src={item.media?.mainMedia?.image?.url || "cat.png"}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover rounded-md"
                />
              </div>
              <h1 className="mt-8 font-bold text-xl tracking-wide">{item.name}</h1>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-600">Error loading categories. Please try again later.</p>
      </div>
    );
  }
};

export default CategoryList;
