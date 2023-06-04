const DisplayTotal = ({total}) => {
    return (
        <div className="fixed w-full bottom-8 text-center bg-blue-900">
            <p className='text-2xl p-2 text-white  w-max mx-auto rounded '>
                        Totaal: &euro;{total.toFixed(2)}
                </p>
        </div>
    )
}

export default DisplayTotal