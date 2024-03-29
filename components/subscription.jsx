const Subscription = ({
  subscription,
  setSubscription,
  deleteSubscription,
}) => {
  return (
    // <div className="border solid bg-gray-50 rounded w-full flex justify-center p-2 mb-4">

    <div className="flex flex-row justify-center w-full md:gap-2">
      <div className={`flex flex-row border solid rounded flex-grow`}>
        <input
          className="text-xl flex-grow px-2"
          value={subscription.name}
          onChange={(e) => {
            setSubscription({ ...subscription, name: e.target.value });
          }}
        ></input>
        <input
          value={subscription.std_price}
          type="number"
          className="border-0 rounded p-1 w-20 text-right text-lg"
          onChange={(e) => {
            let price = 0;
            try {
              price = parseFloat(e.target.value);
            } catch (error) {
              console.log(error);
            }
            setSubscription({ ...subscription, std_price: price });
          }}
        ></input>
      </div>
      <button onClick={deleteSubscription}>
        <svg
          className="w-6 h-6 text-red-500 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
        </svg>
      </button>
    </div>
  );
};
export default Subscription;
