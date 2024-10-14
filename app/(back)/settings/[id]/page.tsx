// import { fetchSingleUser } from "@/Actions/userActions";
// import { TabsComp } from "@/components/back/tabsComp";
// import React from "react";

// export default async function page({
//   params: { id },
// }: {
//   params: { id: string };
// }) {
//   const singleUser = await fetchSingleUser(id);
//   return (
//     <div>
//       <TabsComp data={singleUser} />
//     </div>
//   );
// }

import { fetchSingleUser } from "@/Actions/userActions";
import { TabsComp } from "@/components/back/tabsComp";
import { UserProps } from "@/types/type";
import React from "react";
// Assuming you have a types file

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const singleUser = await fetchSingleUser(id);

  // Check if singleUser is undefined or an empty array
  if (!singleUser || (Array.isArray(singleUser) && singleUser.length === 0)) {
    return <div>User not found</div>;
  }

  // If singleUser is an array, take the first item, otherwise use as is
  const userData: UserProps = Array.isArray(singleUser)
    ? singleUser[0]
    : singleUser;
  return (
    <div>
      <TabsComp data={userData} />
    </div>
  );
}
