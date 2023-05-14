import React from 'react'

const Button = ({
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
    disable?: boolean
    text: string | React.ReactElement
}) => <button type={type} onClick={click || clickSync} className={custom + ' text-sm h-[32px] w-[90px] bg-[#4D96FF] text-white font-medium rounded disabled:opacity-60'} disabled={disable}>{text}</button>

export default Button