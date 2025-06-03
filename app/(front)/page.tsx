import ContactComp from "@/components/contactBtn";
import Header from "@/components/headerMedium";
import EnhancedMainContent from "@/components/mainBody";
import EnhancedSidebar from "@/components/sideBar";
import ZapierChatbot from "@/components/zapierChatbot";

export default async function Home() {
  return (
    <div className="flex relative bg-gradient-to-b from-gray-900 to-black">
      <ContactComp />
      <ZapierChatbot />
      <div className="">
        <EnhancedSidebar />
      </div>
      <div className="lg:ml-[17rem] md:ml-[17rem] ml-0">
        <Header />
        <div className="px-2 pb-4 margin-top">
          <EnhancedMainContent />
        </div>
      </div>
    </div>
  );
}
