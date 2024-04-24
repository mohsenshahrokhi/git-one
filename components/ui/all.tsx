// import { Select } from 'flowbite-react'
import React, { useState, useEffect, useRef } from "react";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TECollapse,
    TEModalFooter,
    TEInput
} from "tw-elements-react"
import SizesExample from './tw-elements/modal/examples/SizesExample';


type Props = {}

const AllComponents = (props: Props) => {
    const [showModalXL, setShowModalXL] = useState(false);
    const [showModalLg, setShowModalLg] = useState(false);
    const [showModalSm, setShowModalSm] = useState(false);
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);
    const [showFirstElement, setShowFirstElement] = useState(false);
    const [showSecondElement, setShowSecondElement] = useState(false);

    const toggleFirstElement = () => setShowFirstElement(!showFirstElement);
    const toggleSecondElement = () => setShowSecondElement(!showSecondElement);

    const toggleBothElements = () => {
        setShowFirstElement(!showFirstElement);
        setShowSecondElement(!showSecondElement);
    };

    const [showModalTopRight, setShowModalTopRight] = useState(false);
    const [showModalTopLeft, setShowModalTopLeft] = useState(false);
    const [showModalBottomRight, setShowModalBottomRight] = useState(false);
    const [showModalBottomLeft, setShowModalBottomLeft] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [showVerticalyCenteredModal, setShowVerticalyCenteredModal] =
        useState(false);
    const [
        showVerticalyCenteredScrollModal,
        setShowVerticalyCenteredScrollModal,
    ] = useState(false);

    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const backToTop = () => {
        document.documentElement.style.scrollBehavior = "smooth";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const checkboxRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = true;
        }
    }, []);
    return (
        <div className=" min-h-screen w-full">
            {/* <SizesExample /> */}

        </div>
    )
}

export default AllComponents