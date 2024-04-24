'use client'

import TimeClockAmPm from "@/components/TimeKiper/Timekiper"
import { CAT } from "@/type"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Tooltip } from "react-tooltip"

import TEModalHeader from '@/components/ui/components/Modal/ModalHeader/ModalHeader'
import TEModalBody from '@/components/ui/components/Modal/ModalBody/ModalBody'
import TEModalFooter from '@/components/ui/components/Modal/ModalFooter/ModalFooter'
import TEMModal from "@/components/ui/components/Modal/TEMModal"
import TEInput from "@/components/ui/components/Input/Input"
import dayjs from "dayjs"
import ButtonWithRipple from "@/components/ui/components/Button/ButtonWithRipple"

export default function SiteSettings() {

    const router = useRouter()
    const [form, setForm] = useState<CAT[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editSettings, setEditSettings] = useState<{
        name?: string,
        date?: any,
        salary?: string,
        index?: number,
        index2?: number,
        time?: string
    }>()

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    // const userId = session?.user?.id

    const accessToken = session?.user && session?.user?.accessToken || ''

    useEffect(() => {

        accessToken && axios.get('/api/category', {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then(response => {

            // const options: any[] = []

            const allCategory = response.data.categorys
            const allCategorys: CAT[] = []
            allCategory.map((cat: CAT) => {
                if (cat.parent?._id === '64bf7a05a02cd538cbee5f2e') {
                    allCategorys.push(cat)
                }
            })

            setForm(allCategorys)

        })

    }, [accessToken])

    if (form && form?.length <= 0) {
        return <div>loading...</div>
    }

    function handleEdit(p: any, index: number, index2: number, cat: CAT) {
        const splitAll = p.values[0].split('|')
        const salary = splitAll[1]
        const time = splitAll[0]
        const name = p.name

        const date = dayjs(`2023-01-01T${time}`)

        setEditSettings({ name, date, salary, index, index2, time })
        setShowModal(true)
    }
    // console.log('setEditSettings', editSettings);

    function handleCheange(part: string, newValue: any) {
        setEditSettings((prevState) => ({ ...prevState, [part]: newValue }))
    }

    function editS(newS: any): void {

        const salary = newS.salary
        const name = newS.name
        const index = newS.index
        const index2 = newS.index2
        setIsLoading(true)
        const h = newS.date.$H
        const m = newS.date.$m
        const nV = { name, values: [`${h}:${m}|${salary}`] }
        const data = form[index]

        data.propertys[index2] = nV

        accessToken && axios.patch(`/api/category/${data._id}`, { data }, {
            headers: {
                Authorization: `${accessToken}`
            }
        })

        setEditSettings(undefined)
        setIsLoading(false)
        setShowModal(false)
    }

    console.log(editSettings)

    return (

        <div className=" flex flex-col w-full">
            <TEMModal
                showModal={showModal}
                setShowModal={setShowModal}
                size="lg"

            >
                <TEModalHeader>

                    <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                        ویرایش دستمزد و ساعت شروع کار {editSettings?.name}
                    </h5>

                    <button
                        type="button"
                        className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                        aria-label="Close"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </TEModalHeader>

                <TEModalBody>

                    <TimeClockAmPm label={editSettings?.name!} time={editSettings?.date} onChange={handleCheange} />
                    <div className="relative mb-3 xl:w-96 pt-5">
                        <TEInput
                            type="text"
                            value={editSettings?.salary}
                            size='lg'
                            id="salary"
                            name="salary"
                            label="میزان حقوق"
                            onChange={(value) => handleCheange('salary', value.target.value)}
                            required
                        ></TEInput>
                    </div>
                </TEModalBody>
                <TEModalFooter>
                    <div
                        className=" flex flex-col gap-2 w-full">

                        <ButtonWithRipple
                            name="cancel"
                            onClick={() => setShowModal(false)}
                        >انصراف</ButtonWithRipple>

                        <ButtonWithRipple
                            name="edit"
                            onClick={() => editS(editSettings)}
                        >
                            {!isLoading ? <span>ویرایش</span> : <span>در حال ویرایش ...</span>}
                        </ButtonWithRipple>

                    </div>

                </TEModalFooter>
            </TEMModal>
            {
                form?.map((cat, index) => (

                    cat.propertys && cat.propertys.length > 0 && <div className=" flex flex-col gap-4 w-full mb-2 justify-center p-3 rounded-md border bg-zinc-100 shadow-md " key={cat._id}>

                        <h3 className=" text-lg p-3 shadow-md rounded-md w-full text-center bg-zinc-300 text-zinc-800">{cat.name}</h3>
                        {

                            cat.propertys.map((p, index2) => (
                                <div className=" flex flex-col bg-zinc-200 shadow-md gap-2 border rounded-md p-2 " key={index2}>
                                    <span className="flex w-full shadow-md p-3 justify-center">
                                        {p.name}
                                    </span>
                                    <div className=" flex flex-col gap-2 w-full ">

                                        <ButtonWithRipple
                                            name={`edit-p-${p.name}`}
                                            color="light"
                                            onClick={() => handleEdit(p, index, index2, cat)}>
                                            <span>میزان حقوق : </span>
                                            <span>
                                                {new Intl.NumberFormat('en').format(p.values[0].split('|')[1]).toString()}
                                            </span>
                                        </ButtonWithRipple>
                                        {/* <TERipple className="" rippleColor="white"> */}
                                        <ButtonWithRipple
                                            name={`edit-t-${p.name}`}
                                            color="light"
                                            onClick={() => handleEdit(p, index, index2, cat)}
                                        >
                                            {p.values[0].split('|')[0]}
                                            <Tooltip anchorSelect={`#edit-${p.name}`} >
                                                ویرایش
                                            </Tooltip>
                                        </ButtonWithRipple>
                                        {/* </TERipple> */}
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                ))
            }
        </div >
    )
}