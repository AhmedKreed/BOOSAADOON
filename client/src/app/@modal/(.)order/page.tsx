import CartOrders from "@/components/sections/CartOrders";
import Modal from "@/components/ui/Modal";
const page = () => {
  return (
    <div className="fixed flex justify-center items-center bg-[#000c] h-screen w-screen left-0 top-0 ">
      <div className="relative">
        <Modal />
        <CartOrders />
      </div>
    </div>
  );
};

export default page;
