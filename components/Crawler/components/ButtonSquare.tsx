import React from 'react'

const ButtonSquare = ({
    type,
    click,
    clickSync,
    custom,
    disable,
    text
}: {
    type: "button" | "submit" | "reset" | undefined
    click?: () => Promise<void>
    clickSync?: () => void
    custom: string
    disable: boolean
    text: string | React.ReactElement
}) => <button type={type} onClick={click || clickSync} className={custom + ' text-lg h-[28px] sm:h-[28px] aspect-square text-white font-medium rounded disabled:opacity-50 grid place-items-center'} disabled={disable}>{text}</button>

export default ButtonSquare