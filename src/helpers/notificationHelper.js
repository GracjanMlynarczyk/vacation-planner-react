import { store } from 'react-notifications-component';

export function createSuccessNotifications(title, text) {
    store.addNotification({
        title: title,
        message: text,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 3000,
            pauseOnHover: true,
            onScreen: true
        }
    });

}

export function createErrorNotifications(title, text) {
    store.addNotification({
        title: title,
        message: text,
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 3000,
            pauseOnHover: true,
            onScreen: true
        }
    });
}