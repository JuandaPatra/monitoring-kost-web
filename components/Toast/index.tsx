import {
    Toast,
  } from "flowbite-react";
  import { HiCheck } from "react-icons/hi";

  interface ToastSubmitProps {
    show: boolean; // Menentukan apakah toast akan ditampilkan
    onDismiss: () => void; // Fungsi callback untuk menyembunyikan toast
    message : string
  }

export const ToastSubmit=({show, onDismiss, message}: ToastSubmitProps)=>{
    if(!show) return null
    return(
        <div className="fixed top-5 right-5 z-50 flex items-center w-auto max-w-xs p-4 space-x-4 ">
        <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-sm font-normal">
                    {message}
                  </div>
                  <Toast.Toggle onDismiss={onDismiss} />
                </Toast></div>
    )
}