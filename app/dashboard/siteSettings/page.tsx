'use client'

import { CAT } from "@/type"
import axios from "axios"
import { useSession } from "next-auth/react"
import { ReadonlyURLSearchParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LinkWithRipple from "@/components/ui/components/Button/LinkWithRipple"
import dayjs from "dayjs"
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ButtonWithRipple from "@/components/ui/components/Button/ButtonWithRipple"
import queryString from "query-string"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { TextField } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
    // searchParams: ReadonlyURLSearchParams
}

export default function SiteSettings({ searchParams }: Props) {

    const router = useRouter()
    const pathName = usePathname()
    const [form, setForm] = useState<CAT[]>()
    const stringified = queryString.stringify(searchParams)
    // const time = searchParams.time as string || ''
    // const name = searchParams.name as string || ''
    // const salary = searchParams.salary as string || ''
    // const index = searchParams.index as string || ''
    // const index2 = searchParams.index2 as string || ''
    const {
        time,
        name,
        salary,
        index,
        index2
    } = searchParams
    const openM = searchParams.openM === 'true' ? true : false

    console.log('searchParams', searchParams);


    const [isLoading, setIsLoading] = useState(false)

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const accessToken = session?.user && session?.user?.accessToken || ''

    useEffect(() => {
        const parsed = {
            select: 'propertys',
            parent: '64bf7a05a02cd538cbee5f2e'
        }
        const stringified = queryString.stringify(parsed);
        accessToken && axios.get(`/api/category?${stringified}`, {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then(response => {

            setForm(response.data.categories)

        })

    }, [accessToken])

    function handleTimeChang(time: dayjs.Dayjs | null) {

        const params = new URLSearchParams(searchParams)
        params.delete('time')
        params.set('time', `${time?.hour()}:${time?.minute()}`)
        router.push(`${pathName}?${params}`)

    }

    function handleSalaryCheange(salary: string) {
        const params = new URLSearchParams(searchParams)
        params.delete('salary')
        params.set('salary', salary)
        router.push(`${pathName}?${params}`)

    }

    function editS(): void {

        setIsLoading(true)
        const nV = { name, values: [`${time}|${salary}`] }
        const data = form![Number(index)]

        if (data.propertys && data.propertys[Number(index2)]) {

            data.propertys[Number(index2)] = nV
        }

        accessToken && axios.patch(`/api/category/${data._id}`, { data }, {
            headers: {
                Authorization: `${accessToken}`
            }
        })

        handleClose()
        setIsLoading(false)

    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    function handleClose() {
        const params = new URLSearchParams(searchParams)
        params.delete('time')
        params.delete('name')
        params.delete('salary')
        params.delete('index')
        params.delete('index2')
        params.delete('openM')
        router.push(`${pathName}?${params}`)

    }

    return (

        <div className=" flex flex-col w-full">
            <div></div>
            <Modal
                open={openM}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-title">
                        <h6 className="text-md mb-3 font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                            ویرایش دستمزد و ساعت شروع کار {name}
                        </h6>

                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>

                        {<LocalizationProvider
                            dateAdapter={AdapterDayjs}
                        >
                            <DemoContainer
                                components={['TimePicker']}
                            >
                                <TimePicker
                                    label="With Time Clock"
                                    ampm={false}
                                    defaultValue={dayjs('2022-04-17T15:30')}
                                    value={dayjs(`2022-04-17T${time}`)}
                                    onChange={time => handleTimeChang(time)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>}
                        <div className="relative mb-3 xl:w-96 pt-5">
                            <TextField
                                type="number"
                                id="salary"
                                name="salary"
                                label="میزان حقوق"
                                variant="outlined"
                                value={salary}
                                onChange={(value) => handleSalaryCheange(value.target.value)}
                                required
                            />

                        </div>
                        <div
                            className=" flex flex-col gap-2 w-full"
                        >

                            <ButtonWithRipple
                                name="cancel"
                                onClick={handleClose}
                            >انصراف</ButtonWithRipple>

                            <ButtonWithRipple
                                name="edit"
                                onClick={editS}
                            >
                                {!isLoading ? <span>ویرایش</span> : <span>در حال ویرایش ...</span>}
                            </ButtonWithRipple>

                        </div>
                    </Typography>
                </Box>
            </Modal>

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

                                        <LinkWithRipple
                                            name={p.name}
                                            href={`?${stringified}&${new URLSearchParams({
                                                time: p.values[0].split('|')[0],
                                                name: p.name,
                                                index: index.toString(),
                                                index2: index2.toString(),
                                                salary: p.values[0].split('|')[1],
                                                openM: 'true'
                                            })}`}
                                        >
                                            <div className=" flex flex-col justify-center items-center gap-2">
                                                <div>

                                                    <span>میزان حقوق : </span>
                                                    <span>
                                                        {new Intl.NumberFormat('en').format(p.values[0].split('|')[1]).toString()}
                                                    </span>
                                                </div>
                                                <div>

                                                    <span>ساعت ورود : </span>
                                                    <span>
                                                        {p.values[0].split('|')[0]}
                                                    </span>
                                                </div>
                                            </div>

                                        </LinkWithRipple>

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