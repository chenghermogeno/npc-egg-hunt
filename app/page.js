// import HomePage from "./components/HomePage";
// import { verifySession } from "@/lib/dal";
// import { prisma } from "@/lib/prisma"; // adjust the path to your prisma client if needed

// const categories = [
//   { name: "food", url: "https://hov.to/c1f65acb" },
//   { name: "retail", url: "https://hov.to/0b5e3fc0" },
//   { name: "services", url: "https://hov.to/a0eecfea" },
// ];

// // This should be defined outside the component
// async function getUserStampCountsByCategory(userId) {
//   const stampCounts = await prisma.stamp.groupBy({
//     by: ["categoryId"],
//     where: {
//       userId,
//     },
//     _count: {
//       id: true,
//     },
//   });

//   const results = await Promise.all(
//     stampCounts.map(async (stamp) => {
//       const category = await prisma.category.findUnique({
//         where: { id: stamp.categoryId },
//         select: { name: true },
//       });

//       return {
//         category: category?.name || "Unknown",
//         count: stamp._count.id,
//       };
//     })
//   );

//   return results;
// }

// export default async function Page() {
//   const session = await verifySession();
//   const { userId } = session;

//   const stampCounts = await getUserStampCountsByCategory(userId);

//   console.log(stampCounts);

//   return (
//     <HomePage
//       categories={categories}
//       userId={userId}
//       stampCounts={stampCounts} // <- Pass this to your HomePage
//     />
//   );
// }

import React from "react";

const Page = () => {
  return <div>Page</div>;
};

export default Page;
