const Subscription = ({
  subscription,
  changePrice,
  selected,
  index,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-row m-4 justify-between outline p-2 pl-4 rounded
            ${selected ? "outline-4 outline-blue-900" : "outline-gray-100"}`}
    >
      <div
        className={`
            cursor-pointer flex-1 flex flew-row justify-between items-center
            
            `}
        key={`SUB-index`}
        onClick={onClick}
      >
        <h2 className="text-xl">{subscription.name}</h2>
        {/* <div className=''>
                    <img className='object-contain' height={10} width={100} src={subscription.img_link} alt={subscription.name} />
                </div> */}
        {/* <p className="text-gray-200">{subscription.std_price === NaN ? 0 : subscription.std_price}</p> */}
      </div>
      <input
        value={subscription.std_price}
        type="number"
        className="border-0 rounded p-1 w-24 text-right text-lg"
        onChange={changePrice}
      ></input>
    </div>
  );
};
export default Subscription;
