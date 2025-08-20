import { writable } from "svelte/store"

interface IToast {
    message: string;
    type: "info" | "success" | "error";
}


export const toastStore = writable({
    message: "",
    type: "info",
    visible: false
})



export const Toaster = {
    ejectToast: (breadType: IToast) => {
        toastStore.set({
            ...breadType,
            visible: true
        });
        setTimeout(() => {
            toastStore.set({
                message: "",
                type: "info",
                visible: false
            })
        }, 3000)
    },
    burntToast: () => {
        toastStore.set({
            message: "A critical error has occurred! Please refresh the browser!",
            type: "error",
            visible: true
        })
    },
}