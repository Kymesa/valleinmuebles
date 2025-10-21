import { Button } from "@/components/ui/button";
import { IconMapPin } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

export const SpringModal = ({
  isOpen,
  setIsOpen,
  propertyDelete,
  onClickDelete,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#7168D3] to-[#7168D3] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-2">
                {propertyDelete?.title}
              </h3>
              <p className="text-center mb-6">
                <div className="flex flex-col items-center text-white gap-y-2">
                  <IconMapPin className="w-4 h-4 text-white" />
                  <span>{`${propertyDelete.city}, ${propertyDelete.department} `}</span>
                  <span>{`${propertyDelete.address} `}</span>
                </div>
              </p>
              <div className="flex flex-row self-center items-center mx-auto w-full gap-2">
                <Button
                  onClick={() => onClickDelete()}
                  className="bg-transparent hover:bg-red-500 transition-colors text-white font-semibold py-2 rounded-3xl w-[50%]"
                >
                  Eliminar
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-[#7168D3] hover:opacity-90 transition-opacity font-semibold py-2 rounded text-white w-[50%]"
                >
                  Volver
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
