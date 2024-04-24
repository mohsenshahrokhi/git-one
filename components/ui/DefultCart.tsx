import { DefultCart } from '@/typs'
import Link from 'next/link'
import Button from "@/components/ui/Button"
import { useAppDispatch } from '@/store/hooks'
import { setEditProduct } from '@/slices/editProduct'
// import DispatchButton from './DispatchButton'

const DefultCart = ({ title, pHref, product, handleDelete }: DefultCart) => {
    const dispatch = useAppDispatch();
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={pHref}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>

            <button
                type="button"
                id={product._id}
                name={product._id}
                onClick={() => dispatch(setEditProduct(JSON.stringify(product)))}
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                ویرایش کردن محصول
            </button>
            {/* {<DispatchButton
                value="ویرایش کردن محصول"
                size="base"
                _id={pId}
            />} */}
            {<Button
                color="red"
                value="پاک کردن محصول"
                size="base"
                _id={product._id}
                onClick={handleDelete}
            />}
        </div>
    )
}

export default DefultCart