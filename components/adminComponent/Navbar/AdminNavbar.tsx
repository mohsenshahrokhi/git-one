'use client'

import ButtonWithRipple from "@/components/ui/components/Button/ButtonWithRipple"
import ToggleSidebar from "../Sidebar/ToggleSidebar"
// import ThemeSwitch from '@/components/themeOptions/ThemeSwitch'
import ToggleColor from '@/components/themeOptions/ToggleColor'
import LinkWithRipple from "@/components/ui/components/Button/LinkWithRipple"
import { signOut, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Headroom from "react-headroom"
// import ThemeSwitcher from "@/components/ui/tw-elements/ThemeSwitcher"


const AdminNavbar = () => {
    const router = useRouter()
    const { data, status } = useSession()
    const isAuth = status === 'authenticated'
    // const sidebar = useSearchParams()
    // console.log(
    //     'theme', sidebar.get('theme')
    // );


    function handleClick() {
        signOut({ callbackUrl: "/" })
        // router.push('/login')
    }

    return (
        <Headroom>
            <div className=" flex w-full h-14 shadow-md items-center mb-2 py-2 px-5 justify-between border-b bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 border-b-zinc-300 dark:border-b-zinc-700 ">
                <ToggleSidebar />
                {/* <ToggleColor /> */}
                <div className=" flex w-130">
                    {isAuth ? <ButtonWithRipple
                        // href = "/logout"
                        onClick={(() => signOut({ callbackUrl: "/" }))}
                        name="logout"
                    >
                        خروج {data?.user?.name}
                    </ButtonWithRipple> : <LinkWithRipple
                        href="/login"
                        name="login"
                    >
                        ورود
                    </LinkWithRipple>
                    }
                </div>


            </div >
        </Headroom>
    )
}

export default AdminNavbar