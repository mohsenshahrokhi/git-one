'use client'

import TEInput from "@/components/ui/components/Input/Input"
import TERipple from '@/components/ui/components/Ripple/Ripple'
import { TextField } from "@mui/material"
import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function ExampleV2(): JSX.Element {

  const router = useRouter()

  const [form, setForm] = useState({ email: '', name: '', password: '' })
  const [busy, setBusy] = useState(false)
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })

  const accessToken = session?.user && session?.user?.accessToken || ''

  useEffect(() => {
    accessToken && accessToken !== '' ? router.push('/dashboard') : ''
  }, [accessToken, router])

  function handleState(name: string, value: string) {

    setForm({ ...form, [name]: value })

  }

  // async function handleSubmit(e:ChangeEvent<HTMLInputElement>) {
  async function handleSubmit(e: any) {

    e.preventDefault()
    setBusy(true)
    const res = await axios.post('/api/user', { form })
    setBusy(false)
    // console.log('res', res)
    router.replace('/login')

  }
  // console.log(form)
  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 md:flex md:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 sm:px-0 md:w-6/12">
                  <div className="sm:mx-6 sm:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <Image
                        width={30}
                        height={30}
                        className="mx-auto w-48"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are The Lotus Team
                      </h4>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                    >
                      <p className="mb-6">Please register an account</p>
                      <TextField
                        type="email"
                        id="email"
                        name="email"
                        label="email"
                        value={form.email}
                        variant="outlined"
                        onChange={e => e && handleState("email", e.target.value)}
                        required
                        className="mb-6"
                      />
                      {/* <TEInput
                        type="email"
                        label="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={e => e && handleState("email", e.target.value)}
                        required
                        className="mb-6"
                      ></TEInput> */}

                      <TEInput
                        type="text"
                        label="name"
                        id="name"
                        name="name"
                        onChange={e => e && handleState("name", e.target.value)}
                        required
                        className="mb-6"
                      ></TEInput>

                      <TEInput
                        type="password"
                        label="password"
                        id="password"
                        name="password"
                        onChange={e => e && handleState('password', e.target.value)}
                        required
                        className="mb-6"
                      ></TEInput>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Sign up
                          </button>
                        </TERipple>

                        {/* <!--Forgot password link--> */}
                        <a href="#!">Terms and conditions</a>
                      </div>

                      {/* <!--Register button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Have an account?</p>
                        <TERipple rippleColor="light">
                          <Link
                            href={'/login'}
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            Login
                          </Link>
                        </TERipple>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg md:w-6/12 md:rounded-r-lg md:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white sm:mx-6 sm:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
