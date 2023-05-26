

const Subscription = ({
    subscription,
    changePrice,
    selected,
    index,
    onClick}
) => {
    return (
    <div className={`flex flex-row items-center justify-between
        cursor-pointer ml-8
        rounded border p-2 m-4 outline outline-1 
        ${selected ? 'outline-4 outline-blue-500' : 'outline-gray-400'}
        `}
        key={index}
        onClick={onClick}
        >
            <h2 className='text-xl'>{subscription.name}</h2>
            {/* <div className=''>
                <img className='object-contain' height={10} width={100} src={subscription.img_link} alt={subscription.name} />
            </div> */}
            {/* <input value={subscription.std_price} */}
                    {/* onChange={(e) => changePrice(e.target.value)}></input> */}
        <p>{subscription.std_price}</p>
    </div>
    )
}
export default Subscription