'use client'

import HModal from '@/components/ui/components/Modal2/confirmModal'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {}

const Dashboard = (props: Props) => {

    const router = useRouter()

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })
    return (
        <div>
            <div>

                Dashboard
            </div>

        </div>
    )
}

export default Dashboard

