
type Props = { form: any }

function FormValues({ form }: Props) {

    const formData = new FormData(form)

    const val = [...formData.values()]
    const isEmpty = val.includes('')

    const data = Object.fromEntries(formData)

    return { data, isEmpty }

}

export default FormValues