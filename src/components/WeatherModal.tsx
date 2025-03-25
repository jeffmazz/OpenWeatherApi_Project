import { ReactNode } from "react";
import styles from "./WeatherModal.module.css"

interface WeatherModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode
}

const WeatherModal = ({isOpen, onClose, children}: WeatherModalProps) => {

    if(!isOpen) return null

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeButton}>
                    close
                </button>
                {children}
            </div>
        </div>
    )

}

export default WeatherModal