import TEModal from '@/components/ui/components/Modal/Modal'
import TEModalDialog from '@/components/ui/components/Modal/ModalDialog/ModalDialog'
import TEModalContent from '@/components/ui/components/Modal/ModalContent/ModalContent'
import { ReactNode } from "react"

type Props = {
    showModal: boolean
    size: "sm" | "lg" | "xl" | "fullscreen" | undefined
    setShowModal: (e: any) => void
    children: ReactNode
}

function TEMModal({ showModal, size, setShowModal, children }: Props) {
    return (

        <TEModal show={showModal} setShow={(e: any) => setShowModal(e)}>
            <TEModalDialog size={size || 'sm'}>
                <TEModalContent>
                    {children}
                </TEModalContent>
            </TEModalDialog>
        </TEModal>

    )
}

export default TEMModal