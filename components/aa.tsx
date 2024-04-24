'use client'

import TimeClockAmPm from "@/components/TimeKiper/Timekiper"
import ResponsiveTimePickers from "@/components/TimeKiper/Timekiper"
import TERipple from "@/components/ui/components/Ripple/Ripple"
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
import moment from "moment"
import dayjs from "dayjs"
import TEInput from "@/components/ui/components/Input/Input"

type Props = {}

function page({ }: Props) {

    const router = useRouter()

    // const [formww, setFormww] = useState([])
    const [form, setForm] = useState<CAT[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editSettings, setEditSettings] = useState<{ name: string, date: any, salary: string, index: number, index2: number, time: string }>()

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const userId = session?.user?.id

    const accessToken = session?.user && session?.user?.accessToken || ''

    useEffect(() => {

        accessToken && axios.get('/api/category', {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then(response => {

            const options: any[] = []

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


    // function handleStateChange(fieldName: string, value: any) {

    //     setFormww((prevState) => ({ ...prevState, [fieldName]: value }))
    //     // console.log(fieldName, value)

    // }

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

        console.log('e', part)
        part === 'date' && setEditSettings((prevState) => ({ ...prevState, date: newValue }))
        part === 'salary' && setEditSettings((prevState) => ({ ...prevState, salary: newValue }))

    }

    function editS(newS: any): void {

        const salary = newS.salary
        const name = newS.name
        const index = newS.index
        const index2 = newS.index2

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
        setShowModal(false)
    }
    const cats = form?.map((cat, index) => {


        return cat.propertys.length > 0 && <div className=" flex gap-4 w-1/2 ml-2 justify-around border " key={cat._id}>
            <h3 className=" text-lg">{cat.name}</h3>
            <TEMModal
                showModal={showModal}
                setShowModal={setShowModal}

            >
                <TEModalHeader>
                    {/* <!--Modal title--> */}
                    {/* <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                        {editSettings.name}
                    </h5> */}
                    {/* <!--Close button--> */}
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
                {/* <!--Modal body--> */}
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
                        className=" flex w-full justify-around items-center">
                        <TERipple rippleColor="white">

                            <button
                                onClick={() => setShowModal(false)}
                                className=" bg-slate-300 text-center justify-center items-center text-slate-600 py-1 px-4 rounded shadow-sm">خیر</button>
                        </TERipple>

                        <button
                            onClick={() => editS(editSettings)}
                            className="  text-slate-100 py-1 px-4 rounded shadow-sm bg-red-600 text-center justify-center items-center">
                            {!isLoading ? <span>بله حذف شود</span> : <span>Deleting...</span>}
                        </button>

                    </div>

                </TEModalFooter>
            </TEMModal>

            {cat.propertys.map((p, index2) => {

                const splitAll = p.values[0].split('|')
                const name = p.name
                // function handleDelete(p: { name: string; values: [string] }): void {
                //     throw new Error("Function not implemented.")
                // }

                return <div className=" flex gap-2 flex-col" key={name}>
                    <div className=" flex w-full">
                        {p.name}
                    </div>
                    <div className=" flex w-full">

                        <div className=" flex w-full">{splitAll[1]} </div>
                        <TERipple className="" rippleColor="white">
                            <button
                                type="button"
                                id={`edit-${p.name}`}
                                onClick={() => handleEdit(p, index, index2, cat)}
                            >
                                {splitAll[0]}
                                <Tooltip anchorSelect={`#edit-${p.name}`} >
                                    ویرایش
                                </Tooltip>
                            </button>
                        </TERipple>
                    </div>
                </div>
            })}
        </div>
    })
    console.log(editSettings)
    // console.log(form)
    return cats

}

export default page